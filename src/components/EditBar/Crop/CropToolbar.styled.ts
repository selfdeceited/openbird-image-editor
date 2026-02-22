import styled from "styled-components";

export const ToolbarStyled = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const ApplyButtonStyled = styled.button`
  padding: 8px 16px;
  background: #646cff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background: #535bf2;
  }
`;

export const CancelButtonStyled = styled.button`
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
