import React from "react";
import { Img, staticFile } from "remotion";
import { C } from "./theme";
import { ease, entrance, mix } from "./motion";
export const Card: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: "#fff",
      border: `2px solid ${C.line}`,
      borderRadius: 28,
      boxShadow: `0 7px 0 ${C.line}`,
      padding: 28,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Pill: React.FC<{
  children?: React.ReactNode;
  color?: string;
  bg?: string;
  style?: React.CSSProperties;
}> = ({ children, color = C.muted, bg = "#fff", style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 19px",
      border: `2px solid ${C.line}`,
      borderRadius: 17,
      background: bg,
      color,
      fontSize: 21,
      fontWeight: 800,
      boxShadow: `0 4px 0 ${C.line}`,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Button: React.FC<{
  children?: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
  pressed?: boolean;
}> = ({ children, color = C.indigo, style, pressed }) => (
  <div
    style={{
      background: color,
      color: "#fff",
      borderRadius: 17,
      padding: "17px 28px",
      fontWeight: 800,
      fontSize: 23,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 ${pressed ? 2 : 6}px 0 ${color === C.coral ? C.coralDark : color === C.green ? "#0b8c4b" : C.indigoDark}`,
      transform: `translateY(${pressed ? 4 : 0}px)`,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Icon = ({
  name,
  size = 28,
  color = "currentColor",
}: {
  name: string;
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {name === "chat" ? (
      <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3H3V6a2 2 0 0 1 2-2ZM7 9h10M7 13h6" />
    ) : name === "path" ? (
      <path d="M6 20h10a4 4 0 0 0 0-8H8a4 4 0 0 1 0-8h10M6 18v4M18 2v4" />
    ) : name === "exam" ? (
      <>
        <rect x="5" y="3" width="14" height="18" rx="3" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ) : name === "lock" ? (
      <>
        <rect x="5" y="10" width="14" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ) : name === "search" ? (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ) : name === "check" ? (
      <path d="m5 12 4 4L19 6" />
    ) : (
      <path d="M12 3v18M3 12h18" />
    )}
  </svg>
);
export const Heading = ({
  t,
  kicker,
  children,
  sub,
}: {
  t: number;
  kicker: string;
  children: React.ReactNode;
  sub?: string;
}) => (
  <div
    style={{
      position: "absolute",
      left: 104,
      top: 64,
      right: 104,
      ...entrance(t, 0.08),
    }}
  >
    <div
      style={{
        color: C.indigo,
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: 2.5,
        marginBottom: 14,
      }}
    >
      {kicker}
    </div>
    <div
      style={{
        fontSize: 58,
        lineHeight: 1.16,
        fontWeight: 800,
        letterSpacing: -2.6,
      }}
    >
      {children}
    </div>
    {sub && (
      <div style={{ fontSize: 23, color: C.muted, marginTop: 17 }}>{sub}</div>
    )}
  </div>
);
export const Variation = ({ highlight = false }: { highlight?: boolean }) => (
  <svg
    width="650"
    height="175"
    viewBox="0 0 650 175"
    style={{ display: "block", margin: "10px auto" }}
  >
    <g stroke={C.navy} strokeWidth="1.5">
      <path d="M25 55H625M25 96H625M105 15V163" />
    </g>
    <g
      fill={C.ink}
      fontFamily="Georgia,serif"
      fontSize="29"
      textAnchor="middle"
    >
      <text x="61" y="43" fontStyle="italic">
        x
      </text>
      <text x="63" y="84" fontStyle="italic">
        f′(x)
      </text>
      <text x="63" y="133" fontStyle="italic">
        f(x)
      </text>
      <text x="155" y="43">
        −∞
      </text>
      <text x="298" y="43">
        −1
      </text>
      <text x="460" y="43">
        1
      </text>
      <text x="587" y="43">
        +∞
      </text>
      <text x="215" y="84">
        +
      </text>
      <text x="298" y="84">
        0
      </text>
      <text x="380" y="84">
        −
      </text>
      <text x="460" y="84">
        0
      </text>
      <text x="545" y="84">
        +
      </text>
      <text x="155" y="153">
        −∞
      </text>
      <text x="224" y="135">
        ↗
      </text>
      <text x="298" y="119">
        2
      </text>
      <text x="380" y="135">
        ↘
      </text>
      <text x="460" y="155">
        −3
      </text>
      <text x="540" y="135">
        ↗
      </text>
      <text x="604" y="114">
        +∞
      </text>
    </g>
    {highlight && (
      <g fill="none" stroke={C.indigo} strokeWidth="3">
        <ellipse cx="298" cy="73" rx="30" ry="21" />
        <ellipse cx="460" cy="73" rx="30" ry="21" />
      </g>
    )}
  </svg>
);
export const PaperPlane = ({
  x,
  y,
  size = 70,
  angle = 0,
  fold = 1,
  color = C.indigo,
  opacity = 1,
}: {
  x: number;
  y: number;
  size?: number;
  angle?: number;
  fold?: number;
  color?: string;
  opacity?: number;
}) => {
  const s = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
    ],
    p = [
      [0, 20],
      [100, 0],
      [62, 92],
      [44, 53],
    ];
  const pts = s
    .map((v, i) => `${mix(v[0], p[i][0], fold)},${mix(v[1], p[i][1], fold)}`)
    .join(" ");
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%,-50%) rotate(${angle}deg)`,
        opacity,
        filter: "drop-shadow(0 13px 10px #17183a20)",
        zIndex: 20,
      }}
    >
      <svg width="100%" height="100%" viewBox="-8 -8 116 116">
        <polygon points={pts} fill={color} />
        <path
          d={`M ${mix(0, 0, fold)} ${mix(0, 20, fold)} L100 0 L${mix(50, 44, fold)} ${mix(50, 53, fold)} Z`}
          fill="#fff"
          opacity={0.45 * fold}
        />
        <path
          d={`M100 0L${mix(50, 44, fold)} ${mix(50, 53, fold)}L${mix(50, 38, fold)} ${mix(100, 78, fold)}`}
          fill={C.navy}
          opacity={fold * 0.35}
        />
        <path
          d={`M100 0L${mix(50, 44, fold)} ${mix(50, 53, fold)}`}
          stroke="#fff"
          opacity={fold * 0.75}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
