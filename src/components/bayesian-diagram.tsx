// Original generic influence-diagram illustration, with arbitrary visual values.
// It contains no assessed network structure, records or inference code.
export default function BayesianDiagram({ step }: { step: number }) {
  const widths = step === 3 ? [38, 82, 26] : [82, 52, 26];
  const preferred = step === 3 ? 1 : 0;
  return <>
    <rect className="motion-panel" x="25" y="29" width="302" height="186" rx="10" />
    <rect className="motion-panel" x="351" y="29" width="184" height="186" rx="10" />
    <text className="motion-label" x="42" y="52">EVIDENCE → BELIEFS</text>
    <text className="motion-small" x="84" y="80" textAnchor="middle">Evidence A</text>
    <text className="motion-small" x="244" y="80" textAnchor="middle">Evidence B</text>
    <path className={`motion-belief-link ${step >= 1 ? "is-active" : ""}`} d="M98 116L151 151M230 116L181 151" />
    <path className="motion-belief-arrow" d="M142 149L151 151L148 142M184 142L181 151L190 149" opacity={step >= 1 ? 1 : .2} />
    <circle className="motion-belief-node is-observed" cx="84" cy="105" r="17" />
    <circle className={`motion-belief-node ${step >= 1 ? "is-observed" : ""}`} cx="244" cy="105" r="17" />
    <text className="motion-value" x="84" y="110" textAnchor="middle">✓</text>
    <text className="motion-value" x="244" y="110" textAnchor="middle">{step >= 1 ? "✓" : "?"}</text>
    <circle className={`motion-belief-node ${step >= 1 ? "is-observed" : ""}`} cx="166" cy="164" r="20" />
    {[0, 1, 2].map(i => <rect className="motion-progress" key={i} x={155 + i * 8} y={174 - (step >= 1 ? [7, 21, 12][i] : 5)} width="5" height={step >= 1 ? [7, 21, 12][i] : 5} rx="1" />)}
    <text className="motion-small" x="166" y="202" textAnchor="middle">Posterior beliefs</text>
    <text className="motion-label" x="368" y="52">EXPECTED UTILITY</text>
    {["Option A", "Option B", "Option C"].map((label, i) => <g key={label}>
      <text className={step >= 2 && preferred === i ? "motion-code is-emphasized" : "motion-small"} x="365" y={91 + i * 31}>{label}</text>
      <rect className="motion-track" x="430" y={81 + i * 31} width="88" height="12" rx="3" />
      <rect className={`motion-utility-bar ${preferred === i ? "is-preferred" : ""}`} x="430" y={81 + i * 31} width={step >= 2 ? widths[i] : 0} height="12" rx="3" />
    </g>)}
    <text className="motion-small" x="443" y="185" textAnchor="middle">{step === 3 ? "Assumptions changed" : "Assumed utilities"}</text>
    <path className="motion-route" d="M327 159H351" />
  </>;
}
