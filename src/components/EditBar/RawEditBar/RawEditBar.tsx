import { type FC, useState } from "react";
import LibRaw from "libraw-wasm";
import { type UploadedImage } from "../../ImageUploader/useUploadImage";
import {
  baseLibRawOptions,
  DEFAULT_BRIGHT,
  DEFAULT_HIGHLIGHT,
  DEFAULT_THRESHOLD,
  DEFAULT_EXP_SHIFT,
  DEFAULT_EXP_PRESER,
} from "../../ImageUploader/useUploadImage";
import { renderRawImageData } from "../../../lib/renderRawImageData";
import { useCanvasContext } from "../CanvasContext";
import { InfoTooltip } from "../../InfoTooltip/InfoTooltip";
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

interface Adjustments {
  bright: number;
  highlight: number;
  threshold: number;
  expShift: number;
  expPreser: number;
}

const DEFAULT_ADJUSTMENTS: Adjustments = {
  bright: DEFAULT_BRIGHT,
  highlight: DEFAULT_HIGHLIGHT,
  threshold: DEFAULT_THRESHOLD,
  expShift: DEFAULT_EXP_SHIFT,
  expPreser: DEFAULT_EXP_PRESER,
};

export const RawEditBar: FC<RawEditBarProps> = ({ image, onImageChange }) => {
  const canvasRef = useCanvasContext();
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [decoding, setDecoding] = useState(false);

  async function apply(next: Adjustments) {
    setDecoding(true);
    try {
      const raw = new LibRaw();
      // LibRaw transfers (detaches) the ArrayBuffer via postMessage, so we must
      // copy it each time to keep the original intact for subsequent calls.
      await raw.open(image.rawBuffer.slice(), {
        ...baseLibRawOptions,
        bright: next.bright,
        highlight: next.highlight,
        threshold: next.threshold,
        expShift: next.expShift,
        expPreser: next.expShift > DEFAULT_EXP_SHIFT ? next.expPreser : DEFAULT_EXP_PRESER,
        expCorrec: next.expShift !== DEFAULT_EXP_SHIFT,
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

  function handleChange(key: keyof Adjustments, value: number) {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  }

  function handlePointerUp(key: keyof Adjustments, value: number) {
    const next = { ...adjustments, [key]: value };
    setAdjustments(next);
    apply(next);
  }

  return (
    <RawEditBarStyled>
      <SliderRowStyled>
        <LabelStyled htmlFor="raw-bright">
          Brightness
          <InfoTooltip text="Overall image brightness. Default 1.0 = no change; higher values brighten the image." />
        </LabelStyled>
        <SliderStyled
          id="raw-bright"
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={adjustments.bright}
          disabled={decoding}
          onChange={(e) => handleChange("bright", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp("bright", Number((e.target as HTMLInputElement).value))
          }
        />
        <SliderValueStyled>{adjustments.bright.toFixed(1)}</SliderValueStyled>
      </SliderRowStyled>
      <SliderRowStyled>
        <LabelStyled htmlFor="raw-highlight">
          Highlights
          <InfoTooltip text="Highlight recovery mode. 0 = clip to white, 1 = unclip, 2 = blend, 3–9 = progressively reconstruct blown-out areas." />
        </LabelStyled>
        <SliderStyled
          id="raw-highlight"
          type="range"
          min={0}
          max={9}
          step={1}
          value={adjustments.highlight}
          disabled={decoding}
          onChange={(e) => handleChange("highlight", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp("highlight", Number((e.target as HTMLInputElement).value))
          }
        />
        <SliderValueStyled>{adjustments.highlight}</SliderValueStyled>
      </SliderRowStyled>
      <SliderRowStyled>
        <LabelStyled htmlFor="raw-threshold">
          Noise
          <InfoTooltip text="Wavelet denoise strength. 0 = off. Higher values smooth out noise but may reduce fine detail." />
        </LabelStyled>
        <SliderStyled
          id="raw-threshold"
          type="range"
          min={0}
          max={1000}
          step={10}
          value={adjustments.threshold}
          disabled={decoding}
          onChange={(e) => handleChange("threshold", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp("threshold", Number((e.target as HTMLInputElement).value))
          }
        />
        <SliderValueStyled>{adjustments.threshold}</SliderValueStyled>
      </SliderRowStyled>
      <SliderRowStyled>
        <LabelStyled htmlFor="raw-exp-shift">
          Exposure
          <InfoTooltip text="Exposure shift in linear scale. 1.0 = no change, 2.0 = +1 EV, 0.5 = −1 EV. Range: 0.25–8.0." />
        </LabelStyled>
        <SliderStyled
          id="raw-exp-shift"
          type="range"
          min={0.25}
          max={8.0}
          step={0.05}
          value={adjustments.expShift}
          disabled={decoding}
          onChange={(e) => handleChange("expShift", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp("expShift", Number((e.target as HTMLInputElement).value))
          }
        />
        <SliderValueStyled>{adjustments.expShift.toFixed(2)}</SliderValueStyled>
      </SliderRowStyled>
      {adjustments.expShift > DEFAULT_EXP_SHIFT && (
        <SliderRowStyled>
          <LabelStyled htmlFor="raw-exp-preser">
            Preserve
            <InfoTooltip text="Highlight preservation when exposure is boosted. 0 = no preservation, 1 = fully protect highlights from clipping." />
          </LabelStyled>
          <SliderStyled
            id="raw-exp-preser"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={adjustments.expPreser}
            disabled={decoding}
            onChange={(e) => handleChange("expPreser", Number(e.target.value))}
            onPointerUp={(e) =>
              handlePointerUp("expPreser", Number((e.target as HTMLInputElement).value))
            }
          />
          <SliderValueStyled>{adjustments.expPreser.toFixed(2)}</SliderValueStyled>
        </SliderRowStyled>
      )}
    </RawEditBarStyled>
  );
};
