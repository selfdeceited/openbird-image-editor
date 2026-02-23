import styled from "styled-components";

export const CropToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

export const AspectRatioGroupStyled = styled.div`
  display: flex;
  gap: 4px;
`;

export const AspectRatioButtonStyled = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  background: ${({ $active }) => ($active ? "#646cff" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#aaa")};
  border: 1px solid ${({ $active }) => ($active ? "#646cff" : "#444")};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background: ${({ $active }) => ($active ? "#535bf2" : "rgba(255,255,255,0.05)")};
    border-color: ${({ $active }) => ($active ? "#535bf2" : "#666")};
  }
`;

export const SeparatorStyled = styled.div`
  width: 1px;
  height: 24px;
  background: #444;
  margin: 0 4px;
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
