import React from "react";
import { C } from "./theme";
import { smooth, ease, clamp } from "./motion";
import { PaperPlane } from "./ui";
export type Route = [number[], number[], number[], number[]];
/** Plane artwork points at -45°. Add 45° to the path's tangent bearing. */
export const flightPose = (p: number, v: Route) => {
  const u = clamp(p),
    q = 1 - u;
  const x =
    q * q * q * v[0][0] +
    3 * q * q * u * v[1][0] +
    3 * q * u * u * v[2][0] +
    u * u * u * v[3][0];
  const y =
    q * q * q * v[0][1] +
    3 * q * q * u * v[1][1] +
    3 * q * u * u * v[2][1] +
    u * u * u * v[3][1];
  const dx =
    3 * q * q * (v[1][0] - v[0][0]) +
    6 * q * u * (v[2][0] - v[1][0]) +
    3 * u * u * (v[3][0] - v[2][0]);
  const dy =
    3 * q * q * (v[1][1] - v[0][1]) +
    6 * q * u * (v[2][1] - v[1][1]) +
    3 * u * u * (v[3][1] - v[2][1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI + 45 };
};
export const Flight = ({
  t,
  at = 0,
  duration = 2,
  points,
  size = 60,
  color = C.indigo,
  trail = true,
  hold = 0,
}: {
  t: number;
  at?: number;
  duration?: number;
  points: Route;
  size?: number;
  color?: string;
  trail?: boolean;
  hold?: number;
}) => {
  if (t + 1e-7 < at || t >= at + duration + hold - 1e-7) return null;
  const p = smooth(t, at, at + duration),
    pose = flightPose(p, points);
  // Route coordinates represent the nose, so a click lands on its exact target.
  const bearing = ((pose.angle - 45) * Math.PI) / 180;
  const noseDistance = (Math.SQRT2 * 50 * size) / 116;
  const x = pose.x - Math.cos(bearing) * noseDistance;
  const y = pose.y - Math.sin(bearing) * noseDistance;
  const opacity = 1;
  const d = `M${points[0].join(" ")}C${points[1].join(" ")} ${points[2].join(" ")} ${points[3].join(" ")}`;
  return (
    <>
      {trail && (
        <svg
          width="1920"
          height="1080"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: opacity * 0.22,
          }}
        >
          <path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - p}
          />
        </svg>
      )}
      <PaperPlane
        {...pose}
        x={x}
        y={y}
        size={size}
        color={color}
        opacity={opacity}
      />
    </>
  );
};
