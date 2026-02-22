import { useEffect, useRef } from "react";
import { type UploadedImage } from "./useUploadImage";
import { CanvasStyled } from "./ImageCanvas.styled";

interface ImageCanvasProps {
  image: UploadedImage;
}

export default function ImageCanvas({ image }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    if (image.type === "raw") {
      const { width, height, data, colors } = image.imageData;
      canvas.width = width;
      canvas.height = height;
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
    } else {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
      };
      img.src = image.dataUrl;
    }
  }, [image]);

  return <CanvasStyled ref={canvasRef} />;
}
