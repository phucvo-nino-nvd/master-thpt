import { bundle } from "@remotion/bundler";
import {
  selectComposition,
  renderStill,
  renderMedia,
  openBrowser,
} from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
const root = path.resolve(import.meta.dirname, "..");
const mode = process.argv[2] || "video";
const browserExecutable = process.env.CHROME_PATH;
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.tsx") });
const browser = await openBrowser("chrome", { browserExecutable });
const composition = await selectComposition({
  serveUrl,
  id: process.env.COMPOSITION || "Promo",
  puppeteerInstance: browser,
});
if (mode === "qa") {
  const out = path.resolve(root, ".work/qa");
  fs.mkdirSync(out, { recursive: true });
  const frames = process.argv[3]
    ? process.argv[3].split(",").map(Number)
    : [
        120, 210, 345, 420, 570, 670, 835, 990, 1190, 1330, 1450, 1570, 1710,
        1820, 1990, 2050, 2130, 2240,
      ];
  for (const frame of frames) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: path.join(out, `frame-${frame}.png`),
      puppeteerInstance: browser,
      onBrowserLog: (log) => console.log(log.text),
      scale: process.env.COMPOSITION ? 1 : 0.6666667,
    });
    console.log(
      "Frame",
      frame,
      createHash("sha256")
        .update(fs.readFileSync(path.join(out, `frame-${frame}.png`)))
        .digest("hex")
        .slice(0, 16),
    );
  }
  await browser.close({ silent: true });
} else {
  // Bound Chrome memory: each section gets a fresh browser, then stream-copy the picture.
  await browser.close({ silent: true });
  const partsDir = path.resolve(root, ".work/parts");
  fs.mkdirSync(partsDir, { recursive: true });
  const ranges = [
    [0, 929],
    [930, 1289],
    [1290, 1949],
    [1950, 2189],
    [2190, 2549],
  ];
  const files = [];
  const fromPart = Number(process.env.RENDER_FROM_PART || 0);
  const selectedParts = process.env.RENDER_PARTS?.split(",").map(Number);
  for (let index = 0; index < ranges.length; index++) {
    if (index < fromPart || (selectedParts && !selectedParts.includes(index))) {
      const existing = path.join(partsDir, `part-${index}.mp4`);
      if (!fs.existsSync(existing))
        throw new Error(`Missing reusable section: ${existing}`);
      files.push(existing);
      continue;
    }
    const partBrowser = await openBrowser("chrome", { browserExecutable });
    const outputLocation = path.join(partsDir, `part-${index}.mp4`);
    let lastProgress = -1;
    try {
      await renderMedia({
        serveUrl,
        composition,
        frameRange: ranges[index],
        outputLocation,
        codec: "h264",
        crf: 17,
        pixelFormat: "yuv420p",
        muted: true,
        concurrency: index === 3 ? 1 : 2,
        puppeteerInstance: partBrowser,
        onProgress: ({ progress, renderedFrames, encodedFrames }) => {
          const percent = Math.floor(progress * 10) * 10;
          if (percent !== lastProgress) {
            console.log(
              `Section ${index + 1}/5: ${percent}% (${renderedFrames} drawn, ${encodedFrames} encoded)`,
            );
            lastProgress = percent;
          }
        },
      });
      files.push(outputLocation);
    } finally {
      await partBrowser.close({ silent: true });
    }
  }
  const list = path.join(partsDir, "concat.txt");
  fs.writeFileSync(
    list,
    files.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n") +
      "\n",
  );
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-v",
      "error",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      list,
      "-i",
      path.join(root, "public/soundtrack.wav"),
      "-map",
      "0:v:0",
      "-map",
      "1:a:0",
      "-c:v",
      "copy",
      "-c:a",
      "aac",
      "-b:a",
      "320k",
      "-ar",
      "48000",
      "-t",
      "42.5",
      "-movflags",
      "+faststart",
      path.resolve(root, "../preview.mp4"),
    ],
    { stdio: "inherit" },
  );
  console.log("Complete: 42.5-second MP4 with audio.");
}
