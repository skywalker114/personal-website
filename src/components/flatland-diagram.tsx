// Original schematic, tracks and example timings; no coursework assets or solver code.
const trainPositions = [[80, 99], [236, 99], [236, 99], [303, 99]];
const feederPositions = [[236, 158], [236, 139], [236, 139], [236, 116]];

function Train({ x, y, vertical = false, secondary = false, stopped = false, reset = false }: { x: number; y: number; vertical?: boolean; secondary?: boolean; stopped?: boolean; reset?: boolean }) {
  return <g className={`motion-train ${secondary ? "is-secondary" : ""} ${stopped ? "is-stopped" : ""}`} style={{ transform: `translate(${x}px, ${y}px) rotate(${vertical ? -90 : 0}deg)`, transition: reset ? "none" : undefined }}>
    <rect x="-10" y="-6" width="20" height="12" rx="3" /><path className="motion-train-window" d="M3 -3H7V3H3Z" />
    <circle cx="-5" cy="7" r="1.7" /><circle cx="5" cy="7" r="1.7" />
  </g>;
}

export default function FlatlandDiagram({ step }: { step: number }) {
  const [ax, ay] = trainPositions[step], [bx, by] = feederPositions[step];
  const disrupted = step === 1 || step === 2;
  return <>
    <rect className="motion-panel" x="25" y="29" width="302" height="186" rx="10" />
    <rect className="motion-panel" x="351" y="29" width="184" height="186" rx="10" />
    <text className="motion-label" x="42" y="51">SHARED TRACK / SHARED TIME</text>
    <path className="motion-rail-bed" d="M49 99H313M236 158V99" />
    <path className="motion-rail" d="M49 99H313M236 158V99" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => <path key={i} className="motion-rail-sleeper" d={`M${52 + i * 21} 91V107`} />)}
    {[0, 1, 2].map(i => <path key={i} className="motion-rail-sleeper" d={`M228 ${119 + i * 17}H244`} />)}
    <circle className={`motion-junction ${disrupted ? "is-blocked" : ""}`} cx="236" cy="99" r="16" />
    <text className="motion-small" x="51" y="78">A</text><text className="motion-small" x="257" y="151">B</text>
    <Train x={ax} y={ay} stopped={disrupted} reset={step === 0} />
    <Train x={bx} y={by} vertical secondary reset={step === 0} />
    {disrupted && <g><path className="motion-disruption" d="M231 69L241 79M241 69L231 79" /><text className="motion-label" x="215" y="62">STOP</text></g>}
    <text className="motion-small" x="45" y="184">A</text><text className="motion-small" x="45" y="203">B</text>
    <rect className="motion-track" x="69" y="177" width="240" height="8" rx="3" /><rect className="motion-track" x="69" y="196" width="240" height="8" rx="3" />
    <rect className={`motion-reservation ${disrupted ? "is-delayed" : ""}`} x="70" y="177" width={step === 0 ? 100 : 160} height="8" rx="3" />
    {step >= 2 && <rect className="motion-reservation-wait" x="180" y="196" width="54" height="8" rx="3" />}
    <rect className="motion-reservation is-secondary" x={step >= 2 ? 242 : 180} y="196" width={step >= 2 ? 62 : 90} height="8" rx="3" />
    <text className="motion-label" x="368" y="54">SCHEDULE REPAIR</text>
    {["Plan routes", "Train stops", "Repair timing", "Resume movement"].map((label, index) => <g key={label}>
      <rect className="motion-code-highlight" x="364" y={75 + index * 30} width="158" height="25" rx="4" opacity={step === index ? 1 : 0} />
      <circle className="motion-maze-step" cx="376" cy={88 + index * 30} r="2.5" opacity={step === index ? 1 : .25} />
      <text className={step === index ? "motion-code is-emphasized" : "motion-small"} x="388" y={92 + index * 30}>{label}</text>
    </g>)}
  </>;
}
