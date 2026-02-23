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
