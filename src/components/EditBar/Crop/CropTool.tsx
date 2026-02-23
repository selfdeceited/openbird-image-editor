import { useCallback, useEffect, useRef } from "react";
import { type CropRect } from "./useCrop";
import { type AspectRatio } from "./CropToolbar";
import { useCanvasContext } from "../CanvasContext";
import { CropOverlayStyled } from "./CropTool.styled";

interface CropToolProps {
  onCropChange: (rect: CropRect | null) => void;
  aspectRatio: AspectRatio;
}

export function CropTool({ onCropChange, aspectRatio }: CropToolProps) {
  const imageCanvasRef = useCanvasContext();
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const currentRect = useRef<CropRect | null>(null);
  const aspectRatioRef = useRef<AspectRatio>(aspectRatio);

  useEffect(() => {
    aspectRatioRef.current = aspectRatio;
  }, [aspectRatio]);

  const redraw = useCallback(
    (overlay: HTMLCanvasElement, cropRect: CropRect | null) => {
      const imageCanvas = imageCanvasRef.current;
      if (!imageCanvas) return;
      const ctx = overlay.getContext("2d")!;
      const scaleX = overlay.width / imageCanvas.width;
      const scaleY = overlay.height / imageCanvas.height;

      ctx.clearRect(0, 0, overlay.width, overlay.height);
      if (!cropRect || cropRect.width === 0 || cropRect.height === 0) return;

      // Dim everything outside the crop rect
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, overlay.width, overlay.height);

      // Clear the crop rect to show the image underneath
      const dx = cropRect.x * scaleX;
      const dy = cropRect.y * scaleY;
      const dw = cropRect.width * scaleX;
      const dh = cropRect.height * scaleY;
      ctx.clearRect(dx, dy, dw, dh);

      // Draw border
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.strokeRect(dx, dy, dw, dh);
    },
    [imageCanvasRef],
  );

  // Keep overlay sized to match the image canvas
  useEffect(() => {
    const imageCanvas = imageCanvasRef.current;
    const overlay = overlayRef.current;
    if (!imageCanvas || !overlay) return;

    const observer = new ResizeObserver(() => {
      overlay.width = imageCanvas.offsetWidth;
      overlay.height = imageCanvas.offsetHeight;
      redraw(overlay, currentRect.current);
    });
    observer.observe(imageCanvas);
    return () => observer.disconnect();
  }, [imageCanvasRef, redraw]);

  const getCanvasPos = useCallback(
    (e: MouseEvent): { x: number; y: number } => {
      const imageCanvas = imageCanvasRef.current!;
      const overlay = overlayRef.current!;
      const rect = overlay.getBoundingClientRect();
      // Scale from display pixels to image pixels
      const scaleX = imageCanvas.width / overlay.width;
      const scaleY = imageCanvas.height / overlay.height;
      return {
        x: Math.round((e.clientX - rect.left) * scaleX),
        y: Math.round((e.clientY - rect.top) * scaleY),
      };
    },
    [imageCanvasRef, overlayRef],
  );

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    function onMouseDown(e: MouseEvent) {
      const pos = getCanvasPos(e);
      dragStart.current = pos;
      currentRect.current = null;
      onCropChange(null);
      redraw(overlay!, null);
    }

    function buildRect(pos: { x: number; y: number }): CropRect {
      const start = dragStart.current!;
      let width = Math.abs(pos.x - start.x);
      let height = Math.abs(pos.y - start.y);
      const ratio = aspectRatioRef.current;
      if (ratio !== null) {
        // Constrain to the aspect ratio by fitting within the dragged area
        const targetRatio = ratio.w / ratio.h;
        if (width / height > targetRatio) {
          width = Math.round(height * targetRatio);
        } else {
          height = Math.round(width / targetRatio);
        }
      }
      return {
        x: Math.min(start.x, start.x + Math.sign(pos.x - start.x) * width),
        y: Math.min(start.y, start.y + Math.sign(pos.y - start.y) * height),
        width,
        height,
      };
    }

    function onMouseMove(e: MouseEvent) {
      if (!dragStart.current) return;
      const pos = getCanvasPos(e);
      const rect = buildRect(pos);
      currentRect.current = rect;
      redraw(overlay!, rect);
    }

    function onMouseUp(e: MouseEvent) {
      if (!dragStart.current) return;
      const pos = getCanvasPos(e);
      const rect = buildRect(pos);
      dragStart.current = null;
      currentRect.current = rect;
      onCropChange(rect.width > 0 && rect.height > 0 ? rect : null);
      redraw(overlay!, rect);
    }

    overlay.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      overlay.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onCropChange, imageCanvasRef, redraw, getCanvasPos]);

  return <CropOverlayStyled ref={overlayRef} />;
}
