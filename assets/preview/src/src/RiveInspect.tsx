// Asset inspection/export tool. Production warrior uses the deterministic original state machine in Warrior.tsx.
import React, { useRef, useEffect, useState } from "react";
import {
  useCurrentFrame,
  delayRender,
  continueRender,
  staticFile,
} from "remotion";
import { Rive, RuntimeLoader, Layout, Fit, Alignment } from "@rive-app/canvas";
RuntimeLoader.setWasmUrl(staticFile("brand/rive.wasm"));
export const RiveInspect = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const f = useCurrentFrame();
  const [h] = useState(() => delayRender("Original Rive art"));
  useEffect(() => {
    const mascot = f < 600;
    const asset = mascot ? "mascot_hello" : "warrior";
    const r = new Rive({
      canvas: canvas.current!,
      src: staticFile(`brand/${asset}.riv`),
      autoplay: false,

      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas(1);
        if (mascot) {
          r.scrub("To record", 0);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              r.pause();
              continueRender(h);
            }),
          );
        } else {
          r.stop();
          const layers = ["pop tête  lvl 3", "pop 3 star", "loop degradé"];
          r.pause(layers);
          r.scrub(layers, 0.5);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              r.pause();
              continueRender(h);
            }),
          );
        }
      },
    });
    return () => r.cleanup();
  }, []);
  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 800,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvas}
        width={800}
        height={800}
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          left: f < 600 ? -145 : 0,
          top: f < 600 ? -215 : 0,
        }}
      />
    </div>
  );
};
