import React from "react";
import { registerRoot, Composition } from "remotion";
import { RiveInspect } from "./RiveInspect";
import { Film } from "./Film";
const Root = () => (
  <>
    {" "}
    <Composition
      id="MascotEyesOpen"
      component={RiveInspect}
      width={512}
      height={512}
      fps={60}
      durationInFrames={1200}
    />{" "}
    <Composition
      id="RiveInspect"
      component={RiveInspect}
      width={800}
      height={800}
      fps={60}
      durationInFrames={1200}
    />
    <Composition
      id="Promo"
      component={Film}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={2550}
    />
  </>
);
registerRoot(Root);
