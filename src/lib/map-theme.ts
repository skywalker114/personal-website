import { mapColors, type MapKind } from "@/content/personal-map";

export type MapTheme = "day" | "night";

export const mapPalettes: Record<MapTheme, Record<MapKind, string>> = {
  night: mapColors,
  day: {
    person: "#21372c",
    project: "#356127",
    work: "#62458c",
    study: "#285c85",
    life: "#754a1b",
  },
};

// Use the visitor's device clock, without requesting their location.
export function mapThemeAt(date: Date): MapTheme {
  const hour = date.getHours();
  return hour >= 7 && hour < 19 ? "day" : "night";
}
