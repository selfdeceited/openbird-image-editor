import { type RawImageData } from "libraw-wasm";

export function renderRawImageData(
  canvas: HTMLCanvasElement,
  { width, height, data, colors }: RawImageData,
): void {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const pixels = ctx.createImageData(width, height);
  const rgba = pixels.data;
  const pixelCount = width * height;
  for (let i = 0; i < pixelCount; i++) {
    rgba[i * 4 + 0] = data[i * colors + 0];
    rgba[i * 4 + 1] = data[i * colors + 1];
    rgba[i * 4 + 2] = data[i * colors + 2];
    rgba[i * 4 + 3] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
}

const PREVIEW_MAX = 400;

export function capturePreviewPixels(canvas: HTMLCanvasElement): ImageData {
  const scale = PREVIEW_MAX / Math.max(canvas.width, canvas.height);
  const w = Math.max(1, Math.round(canvas.width * scale));
  const h = Math.max(1, Math.round(canvas.height * scale));
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  offscreen.getContext("2d")!.drawImage(canvas, 0, 0, w, h);
  return offscreen.getContext("2d")!.getImageData(0, 0, w, h);
}

export function renderPreviewWithBrightness(
  canvas: HTMLCanvasElement,
  pixels: ImageData,
  ratio: number,
): void {
  const src = pixels.data;
  const adjusted = new Uint8ClampedArray(src.length);
  for (let i = 0; i < src.length; i += 4) {
    adjusted[i + 0] = src[i + 0] * ratio;
    adjusted[i + 1] = src[i + 1] * ratio;
    adjusted[i + 2] = src[i + 2] * ratio;
    adjusted[i + 3] = src[i + 3];
  }
  const offscreen = document.createElement("canvas");
  offscreen.width = pixels.width;
  offscreen.height = pixels.height;
  offscreen.getContext("2d")!.putImageData(
    new ImageData(adjusted, pixels.width, pixels.height),
    0,
    0,
  );
  canvas.style.imageRendering = "pixelated";
  canvas.getContext("2d")!.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
}
