// Original schematic and example maze; no coursework code or assets are used.
const maze = [
  "###########",
  "#.....#...#",
  "#.###.#.#.#",
  "#.....#.#.#",
  "#.#####.#.#",
  "#.........#",
  "###########",
];
const agentPositions = [[1, 1], [1, 1], [1, 5], [5, 5]];
const ghostColumns = [5, 4, 3, 2];

export default function PacmanDiagram({ step }: { step: number }) {
  const [column, row] = agentPositions[step];
  const cx = (x: number) => 70 + x * 20;
  const cy = (y: number) => 74 + y * 20;
  return <>
    <rect className="motion-panel" x="25" y="29" width="302" height="186" rx="10" />
    <rect className="motion-panel" x="351" y="29" width="184" height="186" rx="10" />
    <text className="motion-label" x="42" y="51">A SMALL MAZE / A NEXT MOVE</text>
    {maze.flatMap((line, y) => [...line].map((cell, x) => cell === "#"
      ? <rect className="motion-maze-wall" key={`${x}-${y}`} x={cx(x) - 9} y={cy(y) - 9} width="18" height="18" rx="3" />
      : <circle className="motion-maze-food" key={`${x}-${y}`} cx={cx(x)} cy={cy(y)} r={x === 9 && y === 1 ? 3.5 : 1.6} opacity={step >= 2 && x === 1 && y <= 5 || step === 3 && y === 5 && x <= 5 ? .12 : .65} />))}
    <path className="motion-maze-exploration" d={`M${cx(1)} ${cy(1)}H${cx(5)}`} opacity={step < 2 ? .55 : .15} />
    <path className="motion-maze-route" d={`M${cx(1)} ${cy(1)}V${cy(5)}H${cx(9)}V${cy(1)}`} opacity={step >= 1 ? .75 : .1} />
    <g className="motion-maze-character" style={{ transform: `translate(${cx(column)}px, ${cy(row)}px)`, transition: step === 0 ? "none" : undefined }}>
      <path className="motion-maze-agent" d="M0 0L6.8 -4.4A8 8 0 1 0 6.8 4.4Z" />
    </g>
    <g className="motion-maze-character" style={{ transform: `translate(${cx(ghostColumns[step])}px, ${cy(1)}px)`, transition: step === 0 ? "none" : undefined }}>
      <path className="motion-maze-ghost" d="M-7 7V0A7 7 0 0 1 7 0V7L3.5 4L0 7L-3.5 4Z" />
      <circle className="motion-maze-eye" cx="-2.5" cy="-1" r="1.6" /><circle className="motion-maze-eye" cx="2.5" cy="-1" r="1.6" />
    </g>
    <text className="motion-label" x="368" y="54">DECISION LOOP</text>
    {["Read the maze", "Compare routes", "Consider ghosts", "Choose a move"].map((label, index) => <g key={label}>
      <rect className="motion-code-highlight" x="364" y={75 + index * 30} width="158" height="25" rx="4" opacity={step === index ? 1 : 0} />
      <circle className="motion-maze-step" cx="376" cy={88 + index * 30} r="2.5" opacity={step === index ? 1 : .25} />
      <text className={step === index ? "motion-code is-emphasized" : "motion-small"} x="388" y={92 + index * 30}>{label}</text>
    </g>)}
  </>;
}
