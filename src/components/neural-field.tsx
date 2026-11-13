"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

export type FieldSettings = { density: number; speed: number; connected: boolean; paused: boolean };
const defaultSettings: FieldSettings = { density: 150, speed: 0.35, connected: true, paused: false };

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function Network({ settings, reduced }: { settings: FieldSettings; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const { positions, segments, highlights } = useMemo(() => {
    const rng = random(42);
    const points: number[] = [];
    const count = reduced ? Math.min(settings.density, 80) : settings.density;
    // Fibonacci sphere, with a lightly scattered interior. Stable across renders.
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      const scale = 1.55 * (0.72 + rng() * 0.3);
      points.push(Math.cos(angle) * radius * scale, y * scale, Math.sin(angle) * radius * scale);
    }
    const lines: number[] = [];
    for (let i = 0; i < count; i++) {
      const neighbors: { j: number; distance: number }[] = [];
      for (let j = i + 1; j < count; j++) {
        const distance = Math.hypot(points[i * 3] - points[j * 3], points[i * 3 + 1] - points[j * 3 + 1], points[i * 3 + 2] - points[j * 3 + 2]);
        if (distance < 0.69) neighbors.push({ j, distance });
      }
      neighbors.sort((a, b) => a.distance - b.distance).slice(0, 3).forEach(({ j }) => {
        lines.push(...points.slice(i * 3, i * 3 + 3), ...points.slice(j * 3, j * 3 + 3));
      });
    }
    return {
      positions: new Float32Array(points),
      segments: new Float32Array(lines),
      highlights: new Float32Array(points.filter((_, i) => Math.floor(i / 3) % 9 === 0)),
    };
  }, [settings.density, reduced]);

  useFrame((state, delta) => {
    if (!group.current || settings.paused || reduced) return;
    const step = Math.min(delta, 0.05);
    pointer.current.lerp(state.pointer, 0.025);
    group.current.rotation.y += step * settings.speed * 0.19;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.current.y * 0.22 - 0.12, 3, step);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, pointer.current.x * 0.1, 3, step);
  });

  return (
    <group ref={group} rotation={[-0.12, 0.5, 0]}>
      {settings.connected && <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[segments, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#a2dcb5" transparent opacity={0.23} depthWrite={false} />
      </lineSegments>}
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <pointsMaterial color="#c8f3c0" size={0.022} sizeAttenuation transparent opacity={0.9} />
      </points>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[highlights, 3]} /></bufferGeometry>
        <pointsMaterial color="#eeffcf" size={0.05} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}

function StaticField() {
  return (
    <div className="static-field" role="img" aria-label="An abstract constellation of connected ideas">
      <svg viewBox="0 0 440 440" aria-hidden="true">
        <defs><radialGradient id="sphere-light"><stop stopColor="#c3f5b5" stopOpacity=".09" /><stop offset="1" stopColor="#c3f5b5" stopOpacity="0" /></radialGradient></defs>
        <circle cx="220" cy="220" r="180" fill="url(#sphere-light)" />
        {[0, 30, 60, 90, 120, 150].map(a => <ellipse key={a} cx="220" cy="220" rx="160" ry="65" fill="none" stroke="#a2dcb5" strokeOpacity=".3" transform={`rotate(${a} 220 220)`} />)}
        {Array.from({ length: 40 }, (_, i) => {
          const a = i * 2.4; const r = 55 + (i % 6) * 21;
          return <circle key={i} cx={220 + Math.cos(a) * r} cy={220 + Math.sin(a) * r} r={i % 7 === 0 ? 3 : 1.5} fill="#c3f5b5" />;
        })}
      </svg>
    </div>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <StaticField /> : this.props.children; }
}

export default function NeuralField({ settings = defaultSettings }: { settings?: FieldSettings }) {
  const [capability, setCapability] = useState<{ webgl: boolean; reduced: boolean; mobile: boolean } | null>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)");
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    const webgl = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const update = () => setCapability({ webgl, reduced: motion.matches, mobile: mobile.matches });
    update();
    motion.addEventListener("change", update);
    mobile.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return (
    <div className="neural-canvas" ref={container} aria-hidden="true">
      {capability?.webgl ? (
        <WebGLBoundary>
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 47 }}
            dpr={capability.mobile ? 1 : [1, 1.5]}
            frameloop={!inView || !pageVisible || settings.paused || capability.reduced || capability.mobile ? "demand" : "always"}
            gl={{ antialias: !capability.mobile, alpha: true, powerPreference: "low-power" }}
            fallback={<StaticField />}
          >
            <Network settings={settings} reduced={capability.reduced || capability.mobile} />
          </Canvas>
        </WebGLBoundary>
      ) : <StaticField />}
    </div>
  );
}
