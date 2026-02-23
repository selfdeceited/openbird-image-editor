import { type FC, useState } from "react";
import LibRaw from "libraw-wasm";
import { type UploadedImage } from "../../ImageUploader/useUploadImage";
import {
  baseLibRawOptions,
  DEFAULT_BRIGHT,
} from "../../ImageUploader/useUploadImage";
import { renderRawImageData } from "../../../lib/renderRawImageData";
import { useCanvasContext } from "../CanvasContext";
import {
  RawEditBarStyled,
  SliderRowStyled,
  LabelStyled,
  SliderStyled,
  SliderValueStyled,
} from "./RawEditBar.styled";

interface RawEditBarProps {
  image: UploadedImage;
  onImageChange: (image: UploadedImage) => void;
}

export const RawEditBar: FC<RawEditBarProps> = ({ image, onImageChange }) => {
  const canvasRef = useCanvasContext();
  const [bright, setBright] = useState(DEFAULT_BRIGHT);
  const [decoding, setDecoding] = useState(false);

  async function applyBright(value: number) {
    setDecoding(true);
    try {
      const raw = new LibRaw();
      // LibRaw transfers (detaches) the ArrayBuffer via postMessage, so we must
      // copy it each time to keep the original intact for subsequent calls.
      await raw.open(image.rawBuffer.slice(), {
        ...baseLibRawOptions,
        bright: value,
      });
      const rawImageData = await raw.imageData();

      const canvas = canvasRef.current;
      if (!canvas) return;

      renderRawImageData(canvas, rawImageData);

      // Only signal the state change — rawImageData is not stored to avoid
      // copying large pixel buffers into React state on every adjustment.
      onImageChange({ ...image, state: "raw edit" });
    } finally {
      setDecoding(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBright(Number(e.target.value));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLInputElement>) {
    applyBright(Number((e.target as HTMLInputElement).value));
  }

  return (
    <RawEditBarStyled>
      <SliderRowStyled>
        <LabelStyled htmlFor="raw-bright">Brightness</LabelStyled>
        <SliderStyled
          id="raw-bright"
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={bright}
          disabled={decoding}
          onChange={handleChange}
          onPointerUp={handlePointerUp}
        />
        <SliderValueStyled>{bright.toFixed(1)}</SliderValueStyled>
      </SliderRowStyled>
    </RawEditBarStyled>
  );
};
