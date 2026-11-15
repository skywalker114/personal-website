// Original schematic; no competition images, model weights or live predictions.
export default function VisionDiagram({ step }: { step: number }) {
  return <>
    {[{x:25,w:107},{x:154,w:129},{x:305,w:137},{x:464,w:71}].map(panel=><rect key={panel.x} className="motion-panel" x={panel.x} y="48" width={panel.w} height="145" rx="9" />)}
    <path className="motion-route" d="M132 121H154M283 121H305M442 121H464" />
    <circle className="motion-packet" cx={step===0?143:step===1?294:453} cy="121" r="3" />
    <text className="motion-label" x="38" y="72">3 VIEWS</text>
    {[0,1,2].map(i=><g key={i} transform={`translate(${38+i*6} ${88+i*13})`}>
      <rect className="motion-vision-image" width="61" height="37" rx="3" />
      <circle className="motion-vision-sun" cx={i===1?15:47} cy="10" r="3" />
      <path className="motion-symbol" d={i===1?"M6 29L25 15L37 25L48 19L55 29":"M6 29L18 19L30 25L43 15L55 29"} />
    </g>)}
    <text className="motion-vision-small" x="78" y="179" textAnchor="middle">Base / flip / JPEG</text>
    <text className="motion-label" x="166" y="72">FROZEN DINOv3</text>
    <text className="motion-value" x="218" y="104" textAnchor="middle">ViT-H+/16</text>
    <path className="motion-symbol" d="M210 131V125A8 8 0 0 1 226 125V131M207 131H229V151H207Z" />
    <circle className="motion-vision-sun" cx="218" cy="140" r="2" />
    <text className="motion-small" x="218" y="179" textAnchor="middle">2,560 features</text>
    <text className="motion-label" x="319" y="72">2 TRAINED HEADS</text>
    {[{label:"MLP",weight:"80.625%",y:88},{label:"Linear",weight:"19.375%",y:133}].map(head=><g key={head.label}>
      <rect className={`motion-vision-head ${step>=2?"is-active":""}`} x="319" y={head.y} width="108" height="35" rx="5" />
      <text className="motion-code" x="373" y={head.y+14} textAnchor="middle">{head.label}</text>
      <text className="motion-vision-small" x="373" y={head.y+28} textAnchor="middle">{head.weight}</text>
    </g>)}
    <text className="motion-vision-small" x="373" y="184" textAnchor="middle">Blend probabilities</text>
    <text className="motion-vision-small" x="500" y="72" textAnchor="middle">20 CLASSES</text>
    {Array.from({length:20},(_,i)=><circle key={i} className={`motion-vision-class ${step===3&&i===6?"is-selected":""}`} cx={479+i%4*13} cy={95+Math.floor(i/4)*14} r="3" />)}
    <text className="motion-vision-small" x="500" y="179" textAnchor="middle">Predict</text>
    <path className="motion-vision-loop" d="M500 193V215H373V193M369 199L373 193L377 199" opacity={step===3?.8:.16} />
    <text className="motion-vision-small" x="438" y="233" textAnchor="middle">Gated pseudo-label feedback</text>
  </>;
}
