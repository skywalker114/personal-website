export type LabelPosition = { x: number; y: number };
export type LabelAnchor = LabelPosition & { id: string; width: number; height: number };
export type CompactLabelPlacement = LabelAnchor & { anchorX: number; anchorY: number };
type LabelBounds = { width: number; height: number; top: number; bottom: number };

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Retain collision offsets between frames instead of restarting the packing from each 3D point. */
export function layoutCompactLabels(
  anchors: LabelAnchor[],
  previous: ReadonlyMap<string, CompactLabelPlacement>,
  bounds: LabelBounds,
): Map<string, CompactLabelPlacement> {
  const next = new Map<string, CompactLabelPlacement>();
  const placed: CompactLabelPlacement[] = [];
  const gap = 6;
  for (const anchor of anchors) {
    const { id, width, height } = anchor;
    const maxX = Math.max(12, bounds.width - width - 12);
    const minY = bounds.top + height / 2;
    const maxY = Math.max(minY, bounds.height - bounds.bottom - height / 2);
    const anchorX = clamp(anchor.x, 12, maxX), anchorY = clamp(anchor.y, minY, maxY);
    const old = previous.get(id);
    const dx = old ? anchorX - old.anchorX : 0, dy = old ? anchorY - old.anchorY : 0;
    // Relax offsets only as the camera moves. A stationary scene must settle,
    // rather than continually pulling words into collisions and pushing them out.
    const relax = Math.min(.04, Math.hypot(dx, dy) * .005);
    let x = old ? old.x + dx : anchorX, y = old ? old.y + dy : anchorY;
    x = clamp(x + (anchorX - x) * relax, 12, maxX);
    y = clamp(y + (anchorY - y) * relax, minY, maxY);
    const overlaps = (cx: number, cy: number) => placed.some(box =>
      cx < box.x + box.width + gap && cx + width + gap > box.x &&
      cy - height / 2 < box.y + box.height / 2 + gap && cy + height / 2 > box.y - box.height / 2 - gap);
    if (overlaps(x, y)) {
      const candidatesY = [y, anchorY, minY, maxY, ...placed.flatMap(box => [
        box.y - box.height / 2 - height / 2 - gap - 1,
        box.y + box.height / 2 + height / 2 + gap + 1,
      ])].filter(cy => cy >= minY && cy <= maxY);
      let best: { x: number; y: number; cost: number } | undefined;
      const search = (candidatesX: number[]) => {
        for (const cx of candidatesX) for (const cy of candidatesY) {
          const cost = (cx - x) ** 2 + (cy - y) ** 2;
          if ((!best || cost < best.cost) && !overlaps(cx, cy)) best = { x: cx, y: cy, cost };
        }
      };
      search([x, anchorX, 12, maxX]);
      if (!best) search(placed.flatMap(box => [box.x - width - gap - 1, box.x + box.width + gap + 1]).filter(cx => cx >= 12 && cx <= maxX));
      if (best) { x = best.x; y = best.y; }
    }
    const placement = { ...anchor, x, y, anchorX, anchorY };
    placed.push(placement);
    next.set(id, placement);
  }
  // A greedy pass can leave a narrow, fragmented gap on a phone. Share the
  // remaining correction across neighbours instead of stacking the last words.
  // These are layout targets; the renderer still eases every visible position.
  for (let iteration = 0; iteration < 20; iteration++) {
    let corrected = false;
    for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) {
      const a = placed[i], b = placed[j];
      const overlapX = (a.width + b.width) / 2 + gap + .1 - Math.abs(a.x + a.width / 2 - b.x - b.width / 2);
      const overlapY = (a.height + b.height) / 2 + gap + .1 - Math.abs(a.y - b.y);
      if (overlapX <= .001 || overlapY <= .001) continue;
      const sx = a.x + a.width / 2 <= b.x + b.width / 2 ? -1 : 1;
      const sy = a.y <= b.y ? -1 : 1;
      const capacity = (box: CompactLabelPlacement, axis: "x" | "y", direction: number) => {
        const min = axis === "x" ? 12 : bounds.top + box.height / 2;
        const max = axis === "x" ? Math.max(min, bounds.width - box.width - 12) : Math.max(min, bounds.height - bounds.bottom - box.height / 2);
        return direction < 0 ? box[axis] - min : max - box[axis];
      };
      const ax = i === 0 ? 0 : capacity(a, "x", sx), bx = capacity(b, "x", -sx);
      const ay = i === 0 ? 0 : capacity(a, "y", sy), by = capacity(b, "y", -sy);
      const horizontal = ax + bx >= overlapX && (ay + by < overlapY || overlapX < overlapY);
      const axis = horizontal ? "x" : "y", sign = horizontal ? sx : sy;
      const needed = (horizontal ? overlapX : overlapY) + .01;
      const capA = horizontal ? ax : ay, capB = horizontal ? bx : by;
      let moveA = Math.min(capA, needed / 2);
      const moveB = Math.min(capB, needed - moveA);
      moveA = Math.min(capA, needed - moveB);
      if (moveA + moveB <= .001) continue;
      a[axis] += sign * moveA;
      b[axis] -= sign * moveB;
      corrected = true;
    }
    if (!corrected) break;
  }
  return next;
}

/** Ease after packing; collision corrections must never teleport the displayed word. */
export function advanceCompactLabel(previous: LabelPosition | undefined, target: LabelPosition, delta: number): LabelPosition {
  if (!previous) return { x: target.x, y: target.y };
  const dt = clamp(delta, 0, .05);
  const dx = target.x - previous.x, dy = target.y - previous.y;
  const distance = Math.hypot(dx, dy);
  if (distance === 0) return { x: target.x, y: target.y };
  const step = Math.min(distance * (1 - Math.exp(-8 * dt)), 96 * dt);
  return { x: previous.x + dx / distance * step, y: previous.y + dy / distance * step };
}
