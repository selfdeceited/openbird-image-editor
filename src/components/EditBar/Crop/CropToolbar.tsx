import {
  CropToolbarStyled,
  ApplyButtonStyled,
  CancelButtonStyled,
  AspectRatioGroupStyled,
  AspectRatioButtonStyled,
  SeparatorStyled,
} from "./CropToolbar.styled";

export type AspectRatio = null | { w: number; h: number };

const ASPECT_RATIOS: { label: string; ratio: AspectRatio }[] = [
  { label: "Free", ratio: null },
  { label: "1:1", ratio: { w: 1, h: 1 } },
  { label: "4:3", ratio: { w: 4, h: 3 } },
  { label: "16:9", ratio: { w: 16, h: 9 } },
];

interface CropToolbarProps {
  onApply: () => void;
  onCancel: () => void;
  canApply: boolean;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
}

export function CropToolbar({
  onApply,
  onCancel,
  canApply,
  aspectRatio,
  onAspectRatioChange,
}: CropToolbarProps) {
  return (
    <CropToolbarStyled>
      <AspectRatioGroupStyled>
        {ASPECT_RATIOS.map(({ label, ratio }) => {
          const isActive =
            ratio === null
              ? aspectRatio === null
              : aspectRatio !== null &&
                aspectRatio.w === ratio.w &&
                aspectRatio.h === ratio.h;
          return (
            <AspectRatioButtonStyled
              key={label}
              $active={isActive}
              onClick={() => onAspectRatioChange(ratio)}
            >
              {label}
            </AspectRatioButtonStyled>
          );
        })}
      </AspectRatioGroupStyled>
      <SeparatorStyled />
      <ApplyButtonStyled onClick={onApply} disabled={!canApply}>
        Apply
      </ApplyButtonStyled>
      <CancelButtonStyled onClick={onCancel}>Cancel</CancelButtonStyled>
    </CropToolbarStyled>
  );
}
