import * as THREE from "three";

/** Coarse device capability tier used to scale 3D quality. */
export type PerfTier = "low" | "mid" | "high";

export function detectPerfTier(): PerfTier {
  if (typeof window === "undefined") return "mid";
  const cores = navigator.hardwareConcurrency ?? 4;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || (mobile && cores <= 4)) return "low";
  if (mobile || cores <= 6) return "mid";
  return "high";
}

export const dprFor = (tier: PerfTier): [number, number] =>
  tier === "low" ? [1, 1] : tier === "mid" ? [1, 1.4] : [1, 1.85];

export const damp = (current: number, target: number, lambda: number, dt: number) =>
  THREE.MathUtils.damp(current, target, lambda, dt);

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Maps a global progress value into a 0..1 range for one stage. */
export const stage = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));

export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const steelMaterialProps = {
  color: "#8d949c",
  metalness: 1,
  roughness: 0.34,
} as const;

export const emberColor = "#ff8a2b";