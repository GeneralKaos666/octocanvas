/**
 * Shared theme palettes for DOM-rendered generators (Devémon Card, README Banner).
 *
 * The wallpaper generator keeps its own BACKGROUND_THEMES in
 * WallpaperGenerator.tsx because it renders SVG gradient stops.
 *
 * "Violet Overdrive" mirrors the Termux theme of the same name: true black
 * base, full-chroma neon pop layer, one purple in the highlight half.
 */

export type GeneratorTheme = "default" | "violet-overdrive";

export const GENERATOR_THEMES: Record<
  GeneratorTheme,
  { label: string }
> = {
  default: { label: "Default" },
  "violet-overdrive": { label: "Violet Overdrive" },
};

export interface GeneratorThemePalette {
  /** Page-level banner/card backdrop gradient */
  background: string;
  /** Inner card surface gradient */
  cardSurface: string;
  /** Primary accent (borders, glows, headings) */
  accent: string;
  accentGlow: string;
  accentGlowStrong: string;
  accentGlowSoft: string;
  accentTextShadow: string;
  hireBadgeBackground: string;
  hireBadgeText: string;
  /** Secondary text */
  muted: string;
  bio: string;
  /** Primary text */
  bodyText: string;
  /** Small uppercase labels (stat names) */
  statLabel: string;
  /** Dark surface behind art frames */
  artSurface: string;
}

export const GENERATOR_THEME_PALETTES: Record<
  GeneratorTheme,
  GeneratorThemePalette
> = {
  default: {
    background:
      "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)",
    cardSurface:
      "linear-gradient(to bottom right, rgba(16, 20, 17, 0.95), rgba(28, 32, 30, 0.95), rgba(16, 20, 17, 0.95))",
    accent: "#5fed83",
    accentGlow: "rgba(94, 237, 131, 0.15)",
    accentGlowStrong: "rgba(94, 237, 131, 0.3)",
    accentGlowSoft: "rgba(94, 237, 131, 0.1)",
    accentTextShadow: "rgba(94, 237, 131, 0.5)",
    hireBadgeBackground: "#5FED83",
    hireBadgeText: "#010409",
    muted: "#7d8590",
    bio: "#c9d1d9",
    bodyText: "#ffffff",
    statLabel: "#5fed83",
    artSurface: "#0d1117",
  },
  "violet-overdrive": {
    // Termux "Violet Overdrive": color0 -> background black, color13 purple accent,
    // color2 neon green pop, color7 lavender secondary text
    background: "linear-gradient(135deg, #0D0714 0%, #000000 55%, #0D0714 100%)",
    cardSurface:
      "linear-gradient(to bottom right, rgba(13, 7, 20, 0.95), rgba(0, 0, 0, 0.95), rgba(13, 7, 20, 0.95))",
    accent: "#C77DFF",
    accentGlow: "rgba(199, 125, 255, 0.18)",
    accentGlowStrong: "rgba(199, 125, 255, 0.35)",
    accentGlowSoft: "rgba(199, 125, 255, 0.12)",
    accentTextShadow: "rgba(168, 85, 247, 0.6)",
    hireBadgeBackground: "#00FF9C",
    hireBadgeText: "#000000",
    muted: "#D8CCF0",
    bio: "#D8CCF0",
    bodyText: "#EDE6FF",
    statLabel: "#00FF9C",
    artSurface: "#000000",
  },
};
