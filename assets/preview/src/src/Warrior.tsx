import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";
import { RuntimeLoader } from "@rive-app/canvas";
import type {
  RiveCanvas,
  File,
  WrappedRenderer,
} from "@rive-app/canvas/rive_advanced.mjs";
RuntimeLoader.setWasmUrl(staticFile("brand/rive.wasm"));
RuntimeLoader.setWasmFallbackUrl(null);
let loaded: Promise<{ runtime: RiveCanvas; file: File }> | undefined;
const load = () =>
  (loaded ??= Promise.all([
    RuntimeLoader.awaitInstance(),
    fetch(staticFile("brand/warrior.riv")).then((r) => r.arrayBuffer()),
  ]).then(async ([runtime, bytes]) => ({
    runtime,
    file: await runtime.load(new Uint8Array(bytes), undefined, false),
  })));
/** Replay the original web-app state machine at 60 Hz, firing switch at 1000/2000/2330 ms, in sync with the level tings.
 * No wall-clock autoplay: arbitrary Remotion seeks render the same original Rive frame. */
export const Warrior = ({ t }: { t: number }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [handle] = useState(() => delayRender("Load original warrior Rive"));
  const [ready, setReady] = useState<{
    runtime: RiveCanvas;
    file: File;
    renderer: WrappedRenderer;
  } | null>(null);
  useEffect(() => {
    let active = true;
    let renderer: WrappedRenderer | undefined;
    load()
      .then(({ runtime, file }) => {
        if (!active) return;
        renderer = runtime.makeRenderer(canvas.current!);
        setReady({ runtime, file, renderer });
      })
      .catch(cancelRender);
    return () => {
      active = false;
      renderer?.delete();
    };
  }, []);
  useLayoutEffect(() => {
    if (!ready) return;
    try {
      const { runtime, file, renderer } = ready;
      const board = file.defaultArtboard();
      const state = new runtime.StateMachineInstance(
        board.stateMachineByIndex(0),
        board,
      );
      let trigger;
      for (let i = 0; i < state.inputCount(); i++) {
        const input = state.input(i);
        if (input.name === "switch") trigger = input.asTrigger();
      }
      state.advanceAndApply(0);
      board.advance(0);
      const frame = Math.max(0, Math.round(t * 60));
      for (let f = 1; f <= frame; f++) {
        if (f === 60 || f === 120 || f === 140) trigger?.fire();
        state.advanceAndApply(1 / 60);
        board.advance(1 / 60);
      }
      renderer.clear();
      renderer.save();
      renderer.align(
        runtime.Fit.contain,
        runtime.Alignment.center,
        { minX: 0, minY: 0, maxX: 800, maxY: 800 },
        board.bounds,
      );
      board.draw(renderer);
      renderer.restore();
      renderer.flush();
      runtime.resolveAnimationFrame();
      state.delete();
      board.delete();
      continueRender(handle);
    } catch (error) {
      cancelRender(error);
    }
  }, [ready, t, handle]);
  return (
    <canvas
      ref={canvas}
      width={800}
      height={800}
      style={{ width: 318, height: 318, display: "block", margin: "0 auto" }}
    />
  );
};
