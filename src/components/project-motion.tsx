"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { bubbleSortFrames, sortExample, type ProjectMotionKind } from "@/lib/project-motion";

const sortFrames = bubbleSortFrames(sortExample);
const stories = {
  ctf: {
    title: "A challenge becomes a score",
    description: "An illustrated capture-the-flag workflow, from selecting a challenge to updating the leaderboard.",
    steps: ["Choose a challenge and start solving.", "Submit a candidate flag for checking.", "A valid submission is accepted.", "The leaderboard reflects the new score."],
  },
  attendance: {
    title: "A check-in becomes a record",
    description: "An illustrated attendance workflow connecting check-in, a stored record and an hours report.",
    steps: ["An employee begins the attendance workflow.", "The check-in time is captured.", "The record joins the attendance log.", "Recorded hours are brought into a report."],
  },
  vm: {
    title: "One instruction, a layer deeper",
    description: "An illustrative stack adds seven and eight, alongside the lower-level instructions for addition.",
    steps: ["Read push constant 7: put seven on the stack.", "Read push constant 8: place eight above it.", "Read add: replace both operands with fifteen.", "Lower-level instructions express the stack operation."],
  },
  sorting: {
    title: "Watch the order emerge",
    description: "A working bubble-sort trace showing comparisons and swaps on five example values.",
    steps: [],
  },
};

function Panel({ x, y = 48, width = 142, height = 145 }: { x: number; y?: number; width?: number; height?: number }) {
  return <rect className="motion-panel" x={x} y={y} width={width} height={height} rx={10} />;
}

function CtfDiagram({ step }: { step: number }) {
  const scored = step === 3;
  return <>
    <path className="motion-route" d="M167 121H209M351 121H393" />
    <circle className="motion-packet" r="4" cx={step < 2 ? 188 : 372} cy="121" />
    <Panel x={25} /><Panel x={209} /><Panel x={393} />
    <text className="motion-label" x="40" y="72">01 / CHALLENGE</text>
    <path className="motion-shield" d="M96 88l26 10v25q0 25-26 36-26-11-26-36V98Z" />
    <path className="motion-symbol" d="M85 120l-7 7 7 7m22-14 7 7-7 7m-8-12-6 15" />
    <text className="motion-small" x="96" y="179" textAnchor="middle">Web security</text>
    <text className="motion-label" x="224" y="72">02 / SUBMISSION</text>
    <text className="motion-code" x="228" y="108">$ submit flag</text>
    <rect className="motion-track" x="228" y="124" width="104" height="5" rx="2" />
    <rect className="motion-progress" x="228" y="124" width={step === 0 ? 0 : step === 1 ? 50 : 104} height="5" rx="2" />
    <text className="motion-value" x="280" y="158" textAnchor="middle">{step < 1 ? "Ready" : step === 1 ? "Checking…" : "Accepted ✓"}</text>
    <text className="motion-label" x="408" y="72">03 / SCORES</text>
    {[["Orion", scored ? "1250" : "1000"], ["Lyra", "1120"], ["Vega", "860"]].map(([name, score], i) => <g key={name} className={`motion-team ${scored && i === 0 ? "is-highlighted" : ""}`} style={{ transform: `translate(0px, ${scored ? i === 0 ? 0 : i === 1 ? 30 : 60 : i === 0 ? 30 : i === 1 ? 0 : 60}px)` }}><text x="408" y="108">{name}</text><text x="520" y="108" textAnchor="end">{score}</text></g>)}
  </>;
}

function AttendanceDiagram({ step }: { step: number }) {
  return <>
    <path className="motion-route" d="M167 121H209M351 121H393" />
    <circle className="motion-packet" r="4" cx={step < 2 ? 188 : 372} cy="121" />
    <Panel x={25} /><Panel x={209} /><Panel x={393} />
    <text className="motion-label" x="40" y="72">01 / CHECK-IN</text>
    <circle className="motion-shield" cx="96" cy="113" r="16" /><path className="motion-symbol" d="M74 152q0-23 22-23t22 23" />
    <text className="motion-value" x="96" y="179" textAnchor="middle">{step === 0 ? "Ready" : "09:00 ✓"}</text>
    <text className="motion-label" x="224" y="72">02 / RECORD</text>
    <text className="motion-small" x="228" y="105">Example employee</text>
    <text className="motion-code" x="228" y="131">09:00 → 17:00</text>
    <rect className="motion-track" x="228" y="149" width="103" height="24" rx="4" />
    <text className="motion-small" x="280" y="165" textAnchor="middle">{step < 2 ? "Pending" : "Recorded ✓"}</text>
    <text className="motion-label" x="408" y="72">03 / REPORT</text>
    {[45, 66, 56, 78].map((height, i) => <rect key={i} className={`motion-report-bar ${step === 3 ? "is-ready" : ""}`} x={411 + i * 27} y={159 - height} width="16" height={height} rx="3" />)}
    <text className="motion-value" x="464" y="181" textAnchor="middle">{step === 3 ? "8.0 hours" : "Hours summary"}</text>
  </>;
}

function VmDiagram({ step }: { step: number }) {
  return <>
    <Panel x={25} width={163} /><Panel x={215} width={125} /><Panel x={367} width={168} />
    <path className="motion-route" d="M188 121H215M340 121H367" />
    <text className="motion-label" x="40" y="72">VM INPUT</text>
    {["push constant 7", "push constant 8", "add"].map((line, i) => <g key={line}><rect className="motion-code-highlight" x="35" y={89 + i * 29} width="142" height="24" rx="4" opacity={Math.min(step, 2) === i ? 1 : 0} /><text className="motion-code" x="42" y={105 + i * 29}>{line}</text></g>)}
    <text className="motion-label" x="231" y="72">STACK</text>
    <path className="motion-stack" d="M238 92V177H317V92" />
    <rect className="motion-stack-item" x="243" y="143" width="69" height="28" rx="4" /><text className="motion-value" x="277" y="162" textAnchor="middle">{step < 2 ? "7" : "15"}</text>
    {step === 1 && <g><rect className="motion-stack-item" x="243" y="109" width="69" height="28" rx="4" /><text className="motion-value" x="277" y="128" textAnchor="middle">8</text></g>}
    <text className="motion-label" x="382" y="72">ASSEMBLY / ADD</text>
    {["@SP", "AM=M-1", "D=M", "A=A-1", "M=D+M"].map((line, i) => <text className={`motion-code ${step === 3 ? "is-emphasized" : ""}`} key={line} x="385" y={96 + i * 19}>{line}</text>)}
  </>;
}

function SortDiagram({ frameIndex }: { frameIndex: number }) {
  const frame = sortFrames[frameIndex];
  return <>
    <path className="motion-route" d="M59 194H501" />
    <text className="motion-label" x="59" y="45">BUBBLE SORT / FIVE VALUES</text>
    {sortExample.map(value => {
      const index = frame.values.indexOf(value);
      const comparing = frame.compared?.includes(index);
      const sorted = index >= frame.sortedFrom;
      return <g key={value} className={`motion-sort-bar ${comparing ? "is-comparing" : ""} ${sorted ? "is-sorted" : ""}`} style={{ transform: `translate(${80 + index * 86}px, 0)` }}><rect x="0" y={183 - value * 22} width="54" height={value * 22} rx="5" /><text className="motion-value" x="27" y="214" textAnchor="middle">{value}</text>{comparing && <circle className="motion-compare-dot" cx="27" cy={170 - value * 22} r="3" />}</g>;
    })}
  </>;
}

export default function ProjectMotion({ kind, compact = false }: { kind: ProjectMotionKind; compact?: boolean }) {
  const [frame, setFrame] = useState(0);
  const [playback, setPlayback] = useState<"auto" | "playing" | "paused">("auto");
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const figure = useRef<HTMLElement>(null);
  const running = playback === "playing" || (playback === "auto" && !reduced);
  const count = kind === "sorting" ? sortFrames.length : 4;
  const story = stories[kind];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    const visibility = () => setPageVisible(!document.hidden);
    update(); visibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .1 });
    if (figure.current) observer.observe(figure.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    if (!running || !visible || !pageVisible) return;
    const timer = window.setInterval(() => setFrame(current => (current + 1) % count), kind === "sorting" ? 700 : 1500);
    return () => window.clearInterval(timer);
  }, [running, visible, pageVisible, count, kind]);

  const current = frame % count;
  return <figure ref={figure} className={`project-motion ${compact ? "is-compact" : ""}`} data-kind={kind} data-running={running && visible && pageVisible}>
    <div className="motion-heading"><span>{story.title}</span><div><button onClick={() => { setFrame(0); }} aria-label="Restart project illustration" title="Restart illustration"><RotateCcw size={13} /></button><button onClick={() => setPlayback(running ? "paused" : "playing")} aria-label={running ? "Pause project illustration" : "Play project illustration"} title={running ? "Pause illustration" : "Play illustration"}>{running ? <Pause size={13} /> : <Play size={13} />}</button></div></div>
    <svg viewBox="0 0 560 240" role="img" aria-label={story.description}>
      {kind === "ctf" ? <CtfDiagram step={current} /> : kind === "attendance" ? <AttendanceDiagram step={current} /> : kind === "vm" ? <VmDiagram step={current} /> : <SortDiagram frameIndex={current} />}
    </svg>
    <figcaption><span className="motion-step-number">{String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span><p>{kind === "sorting" ? sortFrames[current].caption : story.steps[current]}</p></figcaption>
    <small className="motion-disclaimer">{kind === "sorting" ? "Live algorithm illustration · example values" : "Illustrated workflow · example data"}</small>
  </figure>;
}
