import { useCallback, useRef, useState } from "react";

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseCropOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useCrop({ canvasRef }: UseCropOptions) {
  const [isActive, setIsActive] = useState(false);
  const cropRectRef = useRef<CropRect | null>(null);
  const [canApplyCrop, setCanApplyCrop] = useState(false);

  const activate = useCallback(() => {
    cropRectRef.current = null;
    setCanApplyCrop(false);
    setIsActive(true);
  }, []);

  const cancel = useCallback(() => {
    setIsActive(false);
    cropRectRef.current = null;
    setCanApplyCrop(false);
  }, []);

  const onCropChange = useCallback((rect: CropRect | null) => {
    cropRectRef.current = rect;
    setCanApplyCrop(rect !== null && rect.width > 0 && rect.height > 0);
  }, []);

  const applyCrop = useCallback(() => {
    const rect = cropRectRef.current;
    const canvas = canvasRef.current;
    if (!rect || !canvas) return;
    const { x, y, width, height } = rect;
    // Copy cropped region to a temp canvas, repaint source at new size.
    // No ImageData stored in state — canvas is the sole pixel store.
    const tmp = document.createElement("canvas");
    tmp.width = width;
    tmp.height = height;
    tmp
      .getContext("2d")!
      .drawImage(canvas, x, y, width, height, 0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")!.drawImage(tmp, 0, 0);

    cancel();
  }, [canvasRef, cancel]);

  return { isActive, canApplyCrop, activate, cancel, applyCrop, onCropChange };
}
