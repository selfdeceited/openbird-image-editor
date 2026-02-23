import styled from "styled-components";

export const RawEditBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const SliderRowStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LabelStyled = styled.label`
  font-size: 0.8rem;
  color: #aaa;
  min-width: 70px;
`;

export const SliderStyled = styled.input`
  flex: 1;
  accent-color: #646cff;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SliderValueStyled = styled.span`
  font-size: 0.8rem;
  color: #ccc;
  min-width: 32px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;
