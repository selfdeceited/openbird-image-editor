import styled from "styled-components";

export const CanvasWrapperStyled = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const ToolbarRowStyled = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const CropButtonStyled = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background: rgba(100, 108, 255, 0.1);
  }
`;

export const ResetButtonStyled = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #aaa;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const TransformingOverlayStyled = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
`;

export const SpinnerStyled = styled.span`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
`;
