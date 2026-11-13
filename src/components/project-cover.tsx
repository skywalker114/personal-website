/** Code-native illustrations, not screenshots of the original projects. */
export default function ProjectCover({ visual }: { visual: string }) {
  if (visual === "ctf") return <svg viewBox="0 0 360 230" aria-hidden="true" className="case-drawing">
    <path d="M180 40L235 61V106Q235 149 180 177Q125 149 125 106V61Z" fill="#c3f5b509" stroke="currentColor" strokeWidth="1.2" />
    <path d="M180 57L220 73V106Q220 139 180 161Q140 139 140 106V73Z" fill="none" stroke="currentColor" strokeOpacity=".2" />
    <path d="M164 95L151 107L164 119M196 95L209 107L196 119M186 88L174 126" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M125 83H72V60M235 83H288V60M125 123H62V164M235 123H298V164M180 177V202" stroke="currentColor" strokeOpacity=".25" fill="none" />
    {[[72,56],[288,56],[62,168],[298,168],[180,204]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" opacity=".6" />)}
    <text x="34" y="192" fill="currentColor" opacity=".5" fontFamily="monospace" fontSize="8">CAPTURE · LEARN · REPEAT</text>
  </svg>;
  if (visual === "attendance") return <svg viewBox="0 0 360 230" aria-hidden="true" className="case-drawing">
    <rect x="76" y="50" width="208" height="136" rx="5" fill="#c7c7ef05" stroke="currentColor" strokeOpacity=".5" />
    <path d="M76 79H284M92 63H97M103 63H108M114 63H119" fill="none" stroke="currentColor" strokeOpacity=".4" />
    {[98,127,156].map((y,i)=><g key={y}><rect x="94" y={y} width="13" height="13" rx="2" fill="none" stroke="currentColor" opacity=".7" /><path d={`M97 ${y+6}l3 3 5-6`} fill="none" stroke="currentColor" /><path d={`M121 ${y+4}H${i===1?229:248}M121 ${y+10}H${i===1?194:211}`} stroke="currentColor" strokeOpacity=".25" /></g>)}
    <path d="M56 110H35M304 110H325M180 30V17M180 206V218" stroke="currentColor" strokeOpacity=".25" />
  </svg>;
  return <svg viewBox="0 0 360 230" aria-hidden="true" className="case-drawing">
    <rect x="47" y="58" width="111" height="110" rx="4" fill="none" stroke="currentColor" strokeOpacity=".35" /><rect x="202" y="58" width="111" height="110" rx="4" fill="none" stroke="currentColor" strokeOpacity=".35" />
    <text x="64" y="82" fill="currentColor" fontFamily="monospace" fontSize="8" opacity=".6">VM</text><text x="219" y="82" fill="currentColor" fontFamily="monospace" fontSize="8" opacity=".6">ASSEMBLY</text>
    {[100,114,128,142].map((y,i)=><g key={y}><path d={`M64 ${y}H${i%2?113:136}M219 ${y}H${i%2?293:272}`} stroke="currentColor" strokeOpacity=".45" /></g>)}
    <path d="M169 112H191M184 105L191 112L184 119" stroke="currentColor" fill="none" /><text x="116" y="200" fill="currentColor" opacity=".5" fontFamily="monospace" fontSize="8">ONE LAYER DEEPER</text>
  </svg>;
}
