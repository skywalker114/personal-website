export type ProjectMotionKind = "ctf" | "attendance" | "vm" | "sorting";

export type SortFrame = {
  values: number[];
  compared: [number, number] | null;
  sortedFrom: number;
  caption: string;
};

export const sortExample = [5, 2, 4, 1, 3];

/** A real bubble-sort trace, used only to explain the coursework visually. */
export function bubbleSortFrames(input: number[]): SortFrame[] {
  const values = [...input];
  const frames: SortFrame[] = [{ values: [...values], compared: null, sortedFrom: values.length, caption: "Start with an unsorted sequence." }];
  for (let end = values.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      frames.push({ values: [...values], compared: [i, i + 1], sortedFrom: end + 1, caption: `Compare neighbours: ${values[i]} and ${values[i + 1]}.` });
      if (values[i] > values[i + 1]) {
        [values[i], values[i + 1]] = [values[i + 1], values[i]];
        frames.push({ values: [...values], compared: [i, i + 1], sortedFrom: end + 1, caption: "Swap the pair to put the smaller value first." });
      }
    }
    frames.push({ values: [...values], compared: null, sortedFrom: end, caption: "One more value has reached its final position." });
  }
  frames.push({ values: [...values], compared: null, sortedFrom: 0, caption: "Sorted. The same values, now in ascending order." });
  return frames;
}
