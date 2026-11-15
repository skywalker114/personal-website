function Panel({ x, width = 142 }: { x: number; width?: number }) {
  return <rect className="motion-panel" x={x} y="48" width={width} height="145" rx="10" />;
}

export function ClassifierDiagram({ step }: { step: number }) {
  const pixels = ["0010100", "0111110", "0111110", "0011100", "0011100", "0011100", "0001000"];
  return <>
    <path className="motion-route" d="M167 121H209M351 121H393" />
    <Panel x={25} /><Panel x={209} /><Panel x={393} />
    <text className="motion-label" x="40" y="72">01 / IMAGE</text>
    {pixels.flatMap((row, y) => [...row].map((pixel, x) => <rect key={`${x}-${y}`} className={`motion-pixel ${pixel === "1" ? "is-filled" : ""}`} x={64 + x * 9} y={88 + y * 9} width="7" height="7" rx="1" />))}
    <text className="motion-small" x="96" y="179" textAnchor="middle">28 × 28 → 784</text>
    <text className="motion-label" x="224" y="72">02 / DENSE NET</text>
    {[0, 1].flatMap(layer => [0, 1, 2].flatMap(from => [0, 1, 2].map(to => <line key={`${layer}-${from}-${to}`} className={`motion-neural-link ${step >= 2 ? "is-active" : ""}`} x1={240 + layer * 40} y1={100 + from * 28} x2={280 + layer * 40} y2={100 + to * 28} />)))}
    {[0, 1, 2].flatMap(layer => [0, 1, 2].map(row => <circle key={`${layer}-${row}`} className={`motion-neuron ${step >= 1 && layer <= step - 1 ? "is-active" : ""}`} cx={240 + layer * 40} cy={100 + row * 28} r="5" />))}
    <text className="motion-small" x="280" y="179" textAnchor="middle">Compare designs</text>
    <text className="motion-label" x="408" y="72">03 / 24 CLASSES</text>
    {["A", "B", "C"].map((label, i) => <g key={label}><text className="motion-code" x="409" y={108 + i * 25}>{label}</text><rect className="motion-track" x="430" y={98 + i * 25} width="85" height="10" rx="3" /><rect className="motion-progress" x="430" y={98 + i * 25} width={step === 3 ? [68, 24, 14][i] : 0} height="10" rx="3" /></g>)}
    <text className="motion-small" x="464" y="179" textAnchor="middle">Example scores</text>
  </>;
}

export function ShellDiagram({ step }: { step: number }) {
  return <>
    <rect className="motion-panel" x="25" y="33" width="510" height="42" rx="8" />
    <text className="motion-code" x="43" y="59">$ cat notes.txt | grep AI</text>
    <path className="motion-route" d="M165 143H235M355 143H425" />
    <circle className="motion-packet" cx={step <= 1 ? 199 : 389} cy="143" r="4" />
    <rect className="motion-panel" x="25" y="100" width="140" height="91" rx="8" />
    <rect className="motion-panel" x="235" y="100" width="120" height="91" rx="8" />
    <rect className="motion-panel" x="425" y="100" width="110" height="91" rx="8" />
    <text className="motion-label" x="39" y="123">CHILD PROCESS</text><text className="motion-value" x="95" y="152" textAnchor="middle">cat</text><text className="motion-small" x="95" y="176" textAnchor="middle">read a file</text>
    <text className="motion-label" x="248" y="123">CHILD PROCESS</text><text className="motion-value" x="295" y="152" textAnchor="middle">grep AI</text><text className="motion-small" x="295" y="176" textAnchor="middle">filter text</text>
    <text className="motion-label" x="440" y="123">STDOUT</text><text className="motion-code" x="439" y="152">{step === 3 ? "AI notes" : "…"}</text>
    <text className="motion-label" x="199" y="215" textAnchor="middle">PIPE</text><text className="motion-label" x="389" y="215" textAnchor="middle">OUTPUT</text>
  </>;
}

export function BookingDiagram({ step }: { step: number }) {
  return <>
    <Panel x={25} /><Panel x={209} /><Panel x={393} />
    <path className="motion-route" d="M167 121H209M351 121H393" />
    <circle className="motion-packet" r="4" cx={step < 2 ? 188 : 372} cy="121" />
    <text className="motion-label" x="40" y="72">01 / BROWSER</text>
    <rect className="motion-shield" x="56" y="96" width="80" height="45" rx="4" />
    <path className="motion-symbol" d="M56 131H136M64 121V112H87V121M56 145V152M136 145V152" />
    <text className="motion-small" x="96" y="179" textAnchor="middle">Room 204</text>
    <text className="motion-label" x="224" y="72">02 / EXPRESS</text>
    <text className="motion-code" x="229" y="106">account</text><text className={`motion-code ${step >= 1 ? "is-emphasized" : ""}`} x="229" y="132">session</text><text className={`motion-code ${step >= 2 ? "is-emphasized" : ""}`} x="229" y="158">reservation</text>
    <text className="motion-label" x="408" y="72">03 / MYSQL</text>
    {[0, 1, 2].map(i => <g key={i}><rect className="motion-track" x="411" y={89 + i * 24} width="106" height="18" rx="3" /><text className="motion-small" x="420" y={102 + i * 24}>{["users", "rooms", "bookings"][i]}</text></g>)}
    <text className="motion-value" x="464" y="179" textAnchor="middle">{step === 3 ? "Record saved ✓" : "Await request"}</text>
  </>;
}

export function GamesDiagram({ step }: { step: number }) {
  const before = [3, 6, 2, 5, 4, 7, 8, 1, 9];
  const changed = [1, 3, 4, 5, 7];
  return <>
    <Panel x={25} width={244} /><Panel x={291} width={244} />
    <text className="motion-label" x="40" y="72">CLICK / UPDATE / REDRAW</text>
    {before.map((value, i) => <g key={i}><rect className={`motion-game-tile ${step >= 1 && changed.includes(i) ? "is-active" : ""}`} x={48 + i % 3 * 33} y={88 + Math.floor(i / 3) * 29} width="29" height="25" rx="3" /><text className="motion-code" x={62 + i % 3 * 33} y={105 + Math.floor(i / 3) * 29} textAnchor="middle">{value + (step >= 1 && changed.includes(i) ? 1 : 0)}</text></g>)}
    <circle className="motion-shield" cx="191" cy="125" r={step === 0 ? 12 : 18} /><path className="motion-symbol" d="M187 114L187 135L193 130L198 139L202 137L197 128L205 127Z" />
    <text className="motion-small" x="147" y="186" textAnchor="middle">Neighbour-update puzzle</text>
    <text className="motion-label" x="306" y="72">MOUSE / TIMER / MOVE</text>
    {[0, 1, 2, 3, 4].map(i => <path key={i} className="motion-route" d={`M${322 + i * 44} 88V157`} />)}
    <g className="motion-plane" style={{ transform: `translate(${step * 13}px, ${step % 2 * -8}px)` }}><path className="motion-shield" d="M375 106L381 124L400 136V141L380 136L379 148L386 154V158L375 154L364 158V154L371 148L370 136L350 141V136L369 124Z" /><path className="motion-symbol" d="M375 98V89" /></g>
    <text className="motion-small" x="413" y="179" textAnchor="middle">40 Hz timer configured</text>
  </>;
}
