import { interpolate, Easing, spring } from "remotion";
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
export const smooth = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const pop = (t: number, d = 0) =>
  spring({
    frame: Math.max(0, (t - d) * 60),
    fps: 60,
    config: { damping: 19, stiffness: 170, mass: 0.8 },
  });
export const entrance = (t: number, d = 0) => ({
  opacity: ease(t, d, d + 0.3),
  transform: `translateY(${36 * (1 - ease(t, d, d + 0.65))}px)`,
});
export const bezier = (p: number, pts: number[][]) => {
  const q = 1 - p;
  return {
    x:
      q * q * q * pts[0][0] +
      3 * q * q * p * pts[1][0] +
      3 * q * p * p * pts[2][0] +
      p * p * p * pts[3][0],
    y:
      q * q * q * pts[0][1] +
      3 * q * q * p * pts[1][1] +
      3 * q * p * p * pts[2][1] +
      p * p * p * pts[3][1],
  };
};
