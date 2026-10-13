import React, { useState, useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
} from "remotion";
import {
  Intro,
  Setup,
  Quiz,
  Path,
  Create,
  Chat,
  Progress,
  Finale,
} from "./scenes";
import { BombPractice } from "./BombPractice";
import { C, FONT, TIMING } from "./theme";
import { clamp, mix, smooth } from "./motion";
const fonts = [
  {
    file: "jakarta-latin.woff2",
    range:
      "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  },
  {
    file: "jakarta-vietnamese.woff2",
    range:
      "U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB",
  },
];
const FoldWipe = ({
  t,
  at,
  index,
}: {
  t: number;
  at: number;
  index: number;
}) => {
  const q = clamp((t - at + 0.32) / 0.64);
  if (q === 0 || q === 1) return null;
  const travel = smooth(q, 0, 1);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <g transform={`translate(${mix(-4300, 2500, travel)} 0)`}>
          <path
            d="M0 -250L3300 -250L4000 1080L700 1330Z"
            fill={index % 3 === 1 ? C.lavender : C.indigo}
          />
          <path
            d="M2200 -250L3300 -250L4000 1080Z"
            fill={index % 3 === 1 ? "#ededff" : "#6866ee"}
          />
          <path
            d="M2200 -250L4000 1080L2750 740Z"
            fill={index % 3 === 1 ? "#b1b5ef" : C.indigoDark}
          />
          <path
            d="M2200 -250L2750 740L4000 1080"
            fill="none"
            stroke="#ffffff55"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};
export const Film = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps;
  const [handle] = useState(() => delayRender("Load original brand fonts"));
  useEffect(() => {
    Promise.all(
      fonts.map(async ({ file, range }) => {
        const face = new FontFace(
          "Jakarta",
          `url(${staticFile("fonts/" + file)})`,
          { weight: "200 800", unicodeRange: range },
        );
        await face.load();
        document.fonts.add(face);
      }),
    ).then(() => continueRender(handle));
  }, [handle]);
  const entries = [
    [0, Intro],
    [4, Setup],
    [8, Quiz],
    [12, Path],
    [15.5, BombPractice],
    [21.5, Create],
    [26.5, Chat],
    [32.5, Progress],
    [36.5, Finale],
  ] as const;
  const [start, Scene] = [...entries].reverse().find(([at]) => t >= at)!;
  const local = t - start;
  const sceneTime = local;
  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        background: C.paper,
        color: C.ink,
        overflow: "hidden",
        fontWeight: 500,
      }}
    >
      <style>{`*{box-sizing:border-box}svg{flex-shrink:0}body{margin:0} ::selection{background:transparent}`}</style>
      <Audio src={staticFile("soundtrack.wav")} />
      <Scene t={sceneTime} />
      {[4, 8, 12, 15.5, 21.5, 26.5, 32.5, 36.5].map((at, i) => (
        <FoldWipe key={at} t={t} at={at} index={i} />
      ))}
      {t >= 4 && t < 32.5 && (
        <div
          style={{
            position: "absolute",
            left: t >= 15.5 && t < 21.5 ? 1420 : 103,
            bottom: 16,
            color: t >= 26.5 ? "#d3d6e0" : "#787d8d",
            fontSize: t >= 15.5 && t < 21.5 ? 12 : 14,
            letterSpacing: 0.3,
          }}
        >
          Minh họa tương tác · Dữ liệu học tập minh họa
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${(t / 42.5) * 100}%`,
          height: 3,
          background: t >= 36.5 ? C.lime : C.indigo,
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
