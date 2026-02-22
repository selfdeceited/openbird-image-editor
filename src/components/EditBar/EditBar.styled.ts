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
