import {
  ToolbarStyled,
  ApplyButtonStyled,
  CancelButtonStyled,
} from "./CropToolbar.styled";

interface CropToolbarProps {
  onApply: () => void;
  onCancel: () => void;
  canApply: boolean;
}

export function CropToolbar({
  onApply,
  onCancel,
  canApply,
}: CropToolbarProps) {
  return (
    <ToolbarStyled>
      <ApplyButtonStyled onClick={onApply} disabled={!canApply}>
        Apply
      </ApplyButtonStyled>
      <CancelButtonStyled onClick={onCancel}>Cancel</CancelButtonStyled>
    </ToolbarStyled>
  );
}
