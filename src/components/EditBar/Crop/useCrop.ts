import { useCallback, useRef, useState } from "react";
import { type UploadedImage } from "../../ImageUploader/useUploadImage";

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseCropOptions {
  image: UploadedImage | null;
  onApply: (image: UploadedImage) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useCrop({ image, onApply, canvasRef }: UseCropOptions) {
  const [isActive, setIsActive] = useState(false);
  const cropRectRef = useRef<CropRect | null>(null);
  const [canApply, setCanApply] = useState(false);

  const activate = useCallback(() => {
    cropRectRef.current = null;
    setCanApply(false);
    setIsActive(true);
  }, []);

  const cancel = useCallback(() => {
    setIsActive(false);
    cropRectRef.current = null;
    setCanApply(false);
  }, []);

  const onCropChange = useCallback((rect: CropRect | null) => {
    cropRectRef.current = rect;
    setCanApply(rect !== null && rect.width > 0 && rect.height > 0);
  }, []);

  const apply = useCallback(() => {
    const rect = cropRectRef.current;
    const canvas = canvasRef.current;
    if (!rect || !canvas || !image) return;
    const { x, y, width, height } = rect;
    // Copy cropped region to a temp canvas, repaint source at new size.
    // No ImageData stored in state — canvas is the sole pixel store.
    const tmp = document.createElement("canvas");
    tmp.width = width;
    tmp.height = height;
    tmp.getContext("2d")!.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")!.drawImage(tmp, 0, 0);
    onApply({ type: "cropped", name: image.name, metadata: image.metadata });
    cancel();
  }, [canvasRef, image, onApply, cancel]);

  return { isActive, canApply, activate, cancel, apply, onCropChange };
}
