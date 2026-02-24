import { useRef, useState } from "react";
import { type UploadedImage } from "../ImageUploader/useUploadImage";
import { CanvasContext } from "./CanvasContext";
import { useCrop } from "./Crop/useCrop";
import { CropTool } from "./Crop/CropTool";
import { CropToolbar, type AspectRatio } from "./Crop/CropToolbar";
import { RawEditBar } from "./RawEditBar/RawEditBar";
import { ImageCanvas } from "../ImageCanvas/ImageCanvas";
import {
  ToolbarRowStyled,
  CropButtonStyled,
  ResetButtonStyled,
  CanvasWrapperStyled,
  TransformingOverlayStyled,
  SpinnerStyled,
} from "./EditBar.styled";

interface EditBarProps {
  image: UploadedImage;
  onCanvasReset: (image: UploadedImage) => void;
}

export function EditBar({ image, onCanvasReset }: EditBarProps) {
  const [state, setState] = useState<typeof image.state>(image.state);
  const [isDecoding, setIsDecoding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isModified = state === "image edit";
  // todo: move aspectRatio to croptoolbar
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(null);

  const { isActive, canApplyCrop, activate, cancel, applyCrop, onCropChange } =
    useCrop({ canvasRef });

  // todo: bad design, state should be handled inside CropTool and propagated to EditBar and App
  // (or be in state manager)
  const handleCropChange: typeof onCropChange = (rect) => {
    setState("image edit");
    onCropChange(rect);
  };

  const handleReset = () => {
    setState("initial");
    onCanvasReset({ ...image, state: "initial" });
  };

  return (
    <CanvasContext value={canvasRef}>
      <RawEditBar
        image={image}
        onImageChange={onCanvasReset}
        onDecodingChange={setIsDecoding}
      />
      <CanvasWrapperStyled>
        <ImageCanvas image={image} />
        {isActive && (
          <CropTool onCropChange={handleCropChange} aspectRatio={aspectRatio} />
        )}
        {isDecoding && (
          <TransformingOverlayStyled>
            <SpinnerStyled />
            Transforming…
          </TransformingOverlayStyled>
        )}
      </CanvasWrapperStyled>
      {!isActive && (
        <ToolbarRowStyled>
          <CropButtonStyled onClick={activate}>Crop</CropButtonStyled>
          {isModified && (
            <ResetButtonStyled onClick={handleReset}>Reset</ResetButtonStyled>
          )}
        </ToolbarRowStyled>
      )}
      {isActive && (
        <CropToolbar
          onApply={applyCrop}
          onCancel={cancel}
          canApply={canApplyCrop}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
        />
      )}
    </CanvasContext>
  );
}
