import { type FC, useRef, useState } from "react";
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
import {
  renderRawImageData,
  capturePreviewPixels,
  renderPreviewWithBrightness,
} from "../../../lib/renderRawImageData";
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
  onDecodingChange: (v: boolean) => void;
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

const DEBOUNCE_MS = 1000;

// Keys whose changes can be previewed instantly via pixel brightness math.
const PIXEL_PREVIEW_KEYS = new Set<keyof Adjustments>(["bright", "expShift"]);

export const RawEditBar: FC<RawEditBarProps> = ({
  image,
  onImageChange,
  onDecodingChange,
}) => {
  const canvasRef = useCanvasContext();
  const [adjustments, setAdjustments] =
    useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Monotonically increasing generation counter. Each handlePointerUp increments it.
  // Async operations check their captured generation against the current value and
  // bail out if a newer interaction has started — preventing races and stale renders.
  const generationRef = useRef(0);
  // Serializes LibRaw calls so rawBuffer.slice() is never called while a previous
  // LibRaw instance is still transferring the same ArrayBuffer via postMessage.
  const librawQueueRef = useRef<Promise<void>>(Promise.resolve());
  // Keep a ref to the latest image so debounced/async calls always use current data.
  const imageRef = useRef(image);
  imageRef.current = image;
  // Downscaled pixel snapshot captured after each full LibRaw render.
  // Used to compute the instant brightness/exposure preview without re-running LibRaw.
  const previewPixelsRef = useRef<ImageData | null>(null);
  // The adjustments that were active when LibRaw last rendered — used as the
  // baseline for computing the brightness ratio in the instant preview.
  const baseAdjustmentsRef = useRef<Adjustments>(DEFAULT_ADJUSTMENTS);

  function buildOptions(next: Adjustments) {
    return {
      ...baseLibRawOptions,
      bright: next.bright,
      highlight: next.highlight,
      threshold: next.threshold,
      expShift: next.expShift,
      expPreser:
        next.expShift > DEFAULT_EXP_SHIFT ? next.expPreser : DEFAULT_EXP_PRESER,
      expCorrec: next.expShift !== DEFAULT_EXP_SHIFT,
    };
  }

  function apply(next: Adjustments, generation: number) {
    // Copy the buffer BEFORE queuing, while the ArrayBuffer is guaranteed intact.
    const bufferCopy = imageRef.current.rawBuffer.slice();

    // Enqueue behind any in-flight LibRaw call to prevent concurrent postMessage
    // transfers from detaching the shared ArrayBuffer.
    const task = librawQueueRef.current.then(async () => {
      if (generationRef.current !== generation) return; // superseded while waiting
      const currentImage = imageRef.current;
      console.log("[RawEdit] full render started", next);
      const t0 = performance.now();
      try {
        const raw = new LibRaw();
        await raw.open(bufferCopy, buildOptions(next));
        if (generationRef.current !== generation) return; // superseded
        const rawImageData = await raw.imageData();
        if (generationRef.current !== generation) return; // superseded

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.style.imageRendering = "";
        renderRawImageData(canvas, rawImageData);

        // Capture downscaled pixels for future instant previews.
        previewPixelsRef.current = capturePreviewPixels(canvas);
        baseAdjustmentsRef.current = next;

        console.log(
          `[RawEdit] full render done in ${(performance.now() - t0).toFixed(0)}ms`,
        );

        // Only signal the state change — rawImageData is not stored to avoid
        // copying large pixel buffers into React state on every adjustment.
        onImageChange({ ...currentImage, state: "raw edit" });
      } finally {
        if (generationRef.current === generation) {
          onDecodingChange(false);
        }
      }
    });
    librawQueueRef.current = task;
  }

  function handleChange(key: keyof Adjustments, value: number) {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  }

  function handlePointerUp(key: keyof Adjustments, value: number) {
    const next = { ...adjustments, [key]: value };
    setAdjustments(next);

    const generation = ++generationRef.current;

    // Instant pixel-math preview for brightness and exposure sliders.
    // Operates on the same gamma-encoded pixels LibRaw produced, so the
    // preview matches the final render exactly (no gamma mismatch).
    if (PIXEL_PREVIEW_KEYS.has(key) && previewPixelsRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const base = baseAdjustmentsRef.current;
        const ratio =
          (next.bright * next.expShift) / (base.bright * base.expShift);
        renderPreviewWithBrightness(canvas, previewPixelsRef.current, ratio);
      }
    }

    onDecodingChange(true);

    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      apply(next, generation);
    }, DEBOUNCE_MS);
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
          onChange={(e) => handleChange("bright", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp(
              "bright",
              Number((e.target as HTMLInputElement).value),
            )
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
          onChange={(e) => handleChange("highlight", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp(
              "highlight",
              Number((e.target as HTMLInputElement).value),
            )
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
          onChange={(e) => handleChange("threshold", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp(
              "threshold",
              Number((e.target as HTMLInputElement).value),
            )
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
          onChange={(e) => handleChange("expShift", Number(e.target.value))}
          onPointerUp={(e) =>
            handlePointerUp(
              "expShift",
              Number((e.target as HTMLInputElement).value),
            )
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
            onChange={(e) => handleChange("expPreser", Number(e.target.value))}
            onPointerUp={(e) =>
              handlePointerUp(
                "expPreser",
                Number((e.target as HTMLInputElement).value),
              )
            }
          />
          <SliderValueStyled>
            {adjustments.expPreser.toFixed(2)}
          </SliderValueStyled>
        </SliderRowStyled>
      )}
    </RawEditBarStyled>
  );
};
