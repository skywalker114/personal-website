// Original example partitions, unrelated to any coursework records or exact folds.
export default function EvaluationDiagram({ step }: { step: number }) {
  return <>
    <rect className="motion-panel" x="25" y="29" width="302" height="186" rx="10" />
    <rect className="motion-panel" x="351" y="29" width="184" height="186" rx="10" />
    <text className="motion-label" x="42" y="52">EXAMPLE DATA SPLITS</text>
    <text className="motion-small" x="45" y="79">Mixed years</text>
    {Array.from({length:10},(_,i)=><rect key={i} className={`motion-data-split ${step >= 1 ? [1,7].includes(i) ? "is-test" : "is-train" : ""}`} x={47+i*25} y="90" width="20" height="24" rx="3" />)}
    <text className="motion-small" x="45" y="139">Past → future</text>
    {Array.from({length:10},(_,i)=><rect key={i} className={`motion-data-split ${step >= 2 ? i >= 7 ? "is-test" : "is-train" : ""}`} x={47+i*25} y="150" width="20" height="24" rx="3" />)}
    <path className="motion-split-boundary" d="M218 143V182" opacity={step >= 2 ? .8 : .15} />
    <rect className="motion-data-split is-train" x="48" y="192" width="10" height="9" rx="2" /><text className="motion-small" x="65" y="201">Training</text>
    <rect className="motion-data-split is-test" x="174" y="192" width="10" height="9" rx="2" /><text className="motion-small" x="191" y="201">Held out</text>
    <text className="motion-label" x="368" y="52">EXPERIMENT DESIGN</text>
    {["Inspect data", "Compare settings", "Respect time", "Read the errors"].map((label,index)=><g key={label}>
      <rect className="motion-code-highlight" x="364" y={75+index*30} width="158" height="25" rx="4" opacity={step===index?1:0} />
      <circle className="motion-maze-step" cx="376" cy={88+index*30} r="2.5" opacity={step===index?1:.25} />
      <text className={step===index?"motion-code is-emphasized":"motion-small"} x="388" y={92+index*30}>{label}</text>
    </g>)}
  </>;
}
