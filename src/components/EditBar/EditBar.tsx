import { useRef, useState } from "react";
import { type UploadedImage } from "../ImageUploader/useUploadImage";
import { CanvasContext } from "./CanvasContext";
import { useCrop } from "./Crop/useCrop";
import { CropTool } from "./Crop/CropTool";
import { CropToolbar, type AspectRatio } from "./Crop/CropToolbar";
import { ImageCanvas } from "../ImageCanvas/ImageCanvas";
import {
  ToolbarRowStyled,
  CropButtonStyled,
  ResetButtonStyled,
  CanvasWrapperStyled,
} from "./EditBar.styled";

interface EditBarProps {
  image: UploadedImage;
  onApply: (image: UploadedImage) => void;
}

export function EditBar({ image, onApply }: EditBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalRef = useRef<UploadedImage>(image);
  const isModified = image !== originalRef.current;
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(null);

  const { isActive, canApply, activate, cancel, apply, onCropChange } =
    useCrop({ image, onApply, canvasRef });

  return (
    <CanvasContext value={canvasRef}>
      <CanvasWrapperStyled>
        <ImageCanvas image={image} />
        {isActive && <CropTool onCropChange={onCropChange} aspectRatio={aspectRatio} />}
      </CanvasWrapperStyled>
      {!isActive && (
        <ToolbarRowStyled>
          <CropButtonStyled onClick={activate}>Crop</CropButtonStyled>
          {isModified && (
            <ResetButtonStyled onClick={() => onApply(originalRef.current)}>
              Reset
            </ResetButtonStyled>
          )}
        </ToolbarRowStyled>
      )}
      {isActive && (
        <CropToolbar
          onApply={apply}
          onCancel={cancel}
          canApply={canApply}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
        />
      )}
    </CanvasContext>
  );
}
