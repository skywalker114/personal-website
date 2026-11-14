"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { cloudConnections, mapColors, type CloudPoint, type MapFilter } from "@/content/personal-map";

export type ViewCommand = { id: number; type: "reset" | "in" | "out" };
type SceneProps = {
  points: CloudPoint[];
  filter: MapFilter;
  compact: boolean;
  selected: string;
  hovered: string | null;
  moving: boolean;
  viewCommand: ViewCommand;
  labels: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  onReady: () => void;
  onFailure: () => void;
};

function Scatter({ points, filter, compact, selected, hovered, moving, viewCommand, labels }: SceneProps) {
  const { camera, gl, size, invalidate } = useThree();
  const controls = useRef<OrbitControls | null>(null);
  const dragging = useRef(false);
  const fitDistance = 8.6 * Math.max(1, .92 / (size.width / size.height));
  const initialDirection = useMemo(() => new THREE.Vector3(.26, .2, 1).normalize(), []);
  const projection = useMemo(() => new THREE.Vector3(), []);
  const labelPositions = useRef(new Map<string, { x: number; y: number }>());
  const { locations, chapters, chapterColors, topics, topicColors, normalLines, activeLines, activeColors, background } = useMemo(() => {
    const locations = new Map<string, THREE.Vector3>();
    const center = new THREE.Vector3();
    const anchors = points.filter(point => point.isChapter);
    if (filter !== "all") {
      anchors.forEach(point => center.add(new THREE.Vector3(...point.position)));
      center.divideScalar(anchors.length);
    }
    points.forEach(point => locations.set(point.id, new THREE.Vector3(...point.position).sub(center)));
    const chapters: number[] = [], chapterColors: number[] = [], topics: number[] = [], topicColors: number[] = [];
    points.forEach(point => {
      (point.isChapter ? chapters : topics).push(...locations.get(point.id)!.toArray());
      (point.isChapter ? chapterColors : topicColors).push(...new THREE.Color(mapColors[point.kind]).toArray());
    });
    const normalLines: number[] = [], activeLines: number[] = [], activeColors: number[] = [];
    const focus = hovered || selected;
    cloudConnections.forEach(([from, to]) => {
      const a = locations.get(from), b = locations.get(to);
      if (!a || !b) return;
      const active = focus !== "harry" && (from === focus || to === focus);
      (active ? activeLines : normalLines).push(...a.toArray(), ...b.toArray());
      if (active) {
        const color = new THREE.Color(mapColors[points.find(point => point.id === to)!.kind]);
        activeColors.push(...color.toArray(), ...color.toArray());
      }
    });
    const background: number[] = [];
    for (let i = 0; i < (compact ? 45 : 110); i++) {
      const radius = 2.6 + (i % 9) * .08;
      const angle = i * 2.39996;
      const y = 1 - (i / (compact ? 44 : 109)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      background.push(Math.cos(angle) * ring * radius, y * radius, Math.sin(angle) * ring * radius);
    }
    return {
      locations, chapters: new Float32Array(chapters), chapterColors: new Float32Array(chapterColors),
      topics: new Float32Array(topics), topicColors: new Float32Array(topicColors),
      normalLines: new Float32Array(normalLines), activeLines: new Float32Array(activeLines), activeColors: new Float32Array(activeColors),
      background: new Float32Array(background),
    };
  }, [points, filter, selected, hovered, compact]);

  useEffect(() => {
    const orbit = new OrbitControls(camera, gl.domElement);
    orbit.enablePan = false;
    orbit.enableDamping = false;
    orbit.rotateSpeed = .65;
    orbit.zoomSpeed = .7;
    orbit.autoRotateSpeed = .85;
    orbit.minPolarAngle = .18;
    orbit.maxPolarAngle = Math.PI - .18;
    const changed = () => invalidate();
    orbit.addEventListener("change", changed);
    const start = () => { dragging.current = true; };
    const end = () => { dragging.current = false; invalidate(); };
    orbit.addEventListener("start", start);
    orbit.addEventListener("end", end);
    controls.current = orbit;
    return () => {
      orbit.removeEventListener("change", changed);
      orbit.removeEventListener("start", start);
      orbit.removeEventListener("end", end);
      orbit.dispose();
      controls.current = null;
    };
  }, [camera, gl, invalidate]);

  useEffect(() => {
    const orbit = controls.current;
    if (!orbit) return;
    orbit.minDistance = Math.max(4.9, fitDistance * .55);
    orbit.maxDistance = fitDistance * 2.15;
    camera.position.copy(initialDirection).multiplyScalar(fitDistance);
    orbit.target.set(0, 0, 0);
    orbit.update();
    invalidate();
  }, [fitDistance, camera, initialDirection, invalidate]);

  useEffect(() => {
    const orbit = controls.current;
    if (!orbit) return;
    if (viewCommand.type === "reset") {
      camera.position.copy(initialDirection).multiplyScalar(fitDistance);
      orbit.target.set(0, 0, 0);
    } else {
      const offset = camera.position.clone().sub(orbit.target);
      const distance = THREE.MathUtils.clamp(offset.length() * (viewCommand.type === "in" ? .82 : 1.22), orbit.minDistance, orbit.maxDistance);
      camera.position.copy(orbit.target).add(offset.normalize().multiplyScalar(distance));
    }
    orbit.update();
    invalidate();
  }, [viewCommand, camera, fitDistance, initialDirection, invalidate]);

  useEffect(() => { invalidate(); }, [points, selected, hovered, moving, invalidate]);

  useFrame((state, delta) => {
    const orbit = controls.current;
    if (orbit) {
      orbit.autoRotate = moving && !hovered && !dragging.current;
      orbit.update(Math.min(delta, .05));
    }
    state.camera.updateMatrixWorld();
    const projected = points.flatMap(point => {
      const element = labels.current[point.id];
      if (!element) return [];
      const position = locations.get(point.id)!;
      projection.copy(position).project(state.camera);
      const distance = position.distanceTo(state.camera.position);
      return [{ point, element, x: (projection.x * .5 + .5) * size.width, y: (-projection.y * .5 + .5) * size.height, distance, scale: THREE.MathUtils.clamp(fitDistance / distance, .72, 1.18), priority: point.isChapter ? 0 : 1 }];
    }).sort((a, b) => a.priority - b.priority || a.distance - b.distance);
    const placed: { x: number; y: number; w: number; h: number }[] = [];
    const topSafe = compact ? 128 : 102;
    const bottomSafe = 82;
    for (const entry of projected) {
      const { element, point, scale, distance } = entry;
      const width = element.offsetWidth * scale, height = element.offsetHeight * scale;
      // Freeze the complete label arrangement during hover/focus. Keeping only
      // the hovered word fixed still lets another label move under the pointer.
      const locked = Boolean(hovered) && element.style.left.endsWith("%") && element.style.top.endsWith("%");
      const x = locked ? parseFloat(element.style.left) / 100 * size.width : THREE.MathUtils.clamp(entry.x + 8, 12, Math.max(12, size.width - width - 12));
      let y = locked ? parseFloat(element.style.top) / 100 * size.height : THREE.MathUtils.clamp(entry.y, topSafe, size.height - bottomSafe);
      // Keep words legible as perspective changes, without removing any story.
      const labelGap = Math.max(24, Math.ceil(height + 6));
      for (const step of locked ? [] : [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]) {
        const offset = step * labelGap;
        const candidate = THREE.MathUtils.clamp(entry.y + offset, topSafe, size.height - bottomSafe);
        const overlap = placed.some(box => x < box.x + box.w + 4 && x + width + 4 > box.x && candidate - height / 2 < box.y + box.h + 3 && candidate + height / 2 > box.y - 3);
        if (!overlap) { y = candidate; break; }
      }
      placed.push({ x, y: y - height / 2, w: width, h: height });
      const previous = labelPositions.current.get(point.id) || { x, y };
      const displayX = locked ? x : THREE.MathUtils.damp(previous.x, x, 18, Math.min(delta, .05));
      const displayY = locked ? y : THREE.MathUtils.damp(previous.y, y, 18, Math.min(delta, .05));
      labelPositions.current.set(point.id, { x: displayX, y: displayY });
      if (!moving && !locked && Math.hypot(displayX - x, displayY - y) > .1) invalidate();
      element.style.left = `${displayX / size.width * 100}%`;
      element.style.top = `${displayY / size.height * 100}%`;
      element.style.setProperty("--depth-scale", String(scale));
      element.style.opacity = String(point.id === selected || point.id === hovered ? 1 : THREE.MathUtils.clamp(1.22 - (distance - fitDistance + 2.4) * .105, point.isChapter ? .57 : .38, 1));
      element.style.zIndex = String(600 - Math.round(distance * 20) + (point.id === selected || point.id === hovered ? 300 : 0));
    }
  });

  const focus = locations.get(selected);
  return <>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[background, 3]} /></bufferGeometry><pointsMaterial color="#b7ceae" size={.015} transparent opacity={.32} /></points>
    <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[normalLines, 3]} /></bufferGeometry><lineBasicMaterial color="#a9c2a1" transparent opacity={.20} /></lineSegments>
    <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[activeLines, 3]} /><bufferAttribute attach="attributes-color" args={[activeColors, 3]} /></bufferGeometry><lineBasicMaterial vertexColors transparent opacity={.72} /></lineSegments>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[topics, 3]} /><bufferAttribute attach="attributes-color" args={[topicColors, 3]} /></bufferGeometry><pointsMaterial vertexColors size={.035} transparent opacity={.85} /></points>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[chapters, 3]} /><bufferAttribute attach="attributes-color" args={[chapterColors, 3]} /></bufferGeometry><pointsMaterial vertexColors size={.075} transparent opacity={1} /></points>
    {focus && <mesh position={focus}><sphereGeometry args={[.085, 14, 14]} /><meshBasicMaterial color={mapColors[points.find(point => point.id === selected)!.kind]} transparent opacity={.35} /></mesh>}
  </>;
}

function SceneLifecycle({ onReady, onFailure }: Pick<SceneProps, "onReady" | "onFailure">) {
  const { gl } = useThree();
  useEffect(() => {
    const failure = () => onFailure();
    gl.domElement.addEventListener("webglcontextlost", failure);
    onReady();
    return () => gl.domElement.removeEventListener("webglcontextlost", failure);
  }, [gl, onReady, onFailure]);
  return null;
}

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function PersonalMapScene(props: SceneProps) {
  return <SceneBoundary onFailure={props.onFailure}>
    <Canvas camera={{ position: [2.1, 1.6, 8.4], fov: 43, near: .1, far: 80 }} dpr={props.compact ? 1 : [1, 1.5]} frameloop={props.moving ? "always" : "demand"} gl={{ alpha: true, antialias: !props.compact, powerPreference: "low-power" }}>
      <SceneLifecycle onReady={props.onReady} onFailure={props.onFailure} />
      <Scatter {...props} />
    </Canvas>
  </SceneBoundary>;
}
