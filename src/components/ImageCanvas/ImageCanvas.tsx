import { useEffect } from "react";
import { type UploadedImage } from "../ImageUploader/useUploadImage";
import { useCanvasContext } from "../EditBar/CanvasContext";
import { renderRawImageData } from "../../lib/renderRawImageData";
import { CanvasStyled } from "./ImageCanvas.styled";

interface ImageCanvasProps {
  image: UploadedImage;
}

export function ImageCanvas({ image }: ImageCanvasProps) {
  const canvasRef = useCanvasContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (["completed", "image edit", "raw edit"].includes(image.state)) {
      // canvas is being changed by the editBar directly - no need to rerender from the raw data
      return;
    }

    renderRawImageData(canvas, image.rawImageData);
  }, [image, canvasRef]);

  return <CanvasStyled ref={canvasRef} />;
}
