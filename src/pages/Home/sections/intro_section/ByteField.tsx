import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "../../../../core/Utility";
import "./bytefield.css";

const className = "bytefield";

const FONT_SIZE = 13;
const LINE_HEIGHT = 22;
const FRAME_MS = 1000 / 24;
const START_DELAY_MS = 4200;
const SWEEP_MS = 7000;
const REST_MS = 6000;
const BAND_COLUMNS = 4;
const SKEW = 0.35;
const BASE_ALPHA = 0.2;
const GLOW_ALPHA = 0.26;
const GLOW_DECAY = 0.88;
const ACCENT_GLOW = 0.7;
const FLICKER_INTENSITY = 0.3;
const ZERO_BYTE_CHANCE = 0.35;

function randomByte(): string {
  if (Math.random() < ZERO_BYTE_CHANCE) return "00";
  return Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0");
}

export default function ByteField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const style = getComputedStyle(canvas);
    const textColor = style.color;
    const accentColor = style.getPropertyValue("--fa-color-accent").trim();
    const font = `${FONT_SIZE}px ${style.fontFamily}`;
    const still = prefersReducedMotion();
    const startedAt = performance.now();

    let columns = 0;
    let rows = 0;
    let cellWidth = 0;
    let bytes: string[] = [];
    let glow = new Float32Array(0);
    let frame = 0;
    let lastFrameAt = 0;
    let onScreen = false;
    let disposed = false;

    function layout() {
      if (disposed) return;
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = canvas!.getBoundingClientRect();
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      context!.font = font;
      context!.textBaseline = "top";
      cellWidth = context!.measureText("00 ").width;
      columns = Math.ceil(width / cellWidth);
      rows = Math.ceil(height / LINE_HEIGHT);
      bytes = Array.from({ length: columns * rows }, randomByte);
      glow = new Float32Array(columns * rows);
      draw();
    }

    function bandAt(now: number): number | null {
      const elapsed = now - startedAt - START_DELAY_MS;
      if (elapsed < 0) return null;
      const phase = elapsed % (SWEEP_MS + REST_MS);
      if (phase > SWEEP_MS) return null;
      const travel = columns + 2 * BAND_COLUMNS + rows * SKEW;
      return (phase / SWEEP_MS) * travel - BAND_COLUMNS - rows * SKEW;
    }

    function step(now: number) {
      const band = bandAt(now);
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = row * columns + column;
          glow[index] *= GLOW_DECAY;
          const intensity = band === null ? 0 : 1 - Math.abs(column - (band + row * SKEW)) / BAND_COLUMNS;
          if (intensity > 0) {
            glow[index] = Math.max(glow[index], intensity);
            if (intensity > FLICKER_INTENSITY) bytes[index] = randomByte();
          }
        }
      }
    }

    function draw() {
      context!.clearRect(0, 0, columns * cellWidth, rows * LINE_HEIGHT);
      const offset = (LINE_HEIGHT - FONT_SIZE) / 2;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = row * columns + column;
          context!.globalAlpha = BASE_ALPHA + glow[index] * GLOW_ALPHA;
          context!.fillStyle = glow[index] > ACCENT_GLOW ? accentColor : textColor;
          context!.fillText(bytes[index], column * cellWidth, row * LINE_HEIGHT + offset);
        }
      }
    }

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (now - lastFrameAt < FRAME_MS) return;
      lastFrameAt = now;
      step(now);
      draw();
    }

    const resize = new ResizeObserver(layout);
    resize.observe(canvas);
    void document.fonts.ready.then(layout);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (onScreen && !still) frame = requestAnimationFrame(tick);
    });
    visibility.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas className={className} ref={ref} aria-hidden="true" />;
}
