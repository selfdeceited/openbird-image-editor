import styled from "styled-components";

export const MetadataRowStyled = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: baseline;
  gap: 12px;
  border-bottom: 1px solid #2a2a2a;
  padding: ${({ $compact }) => ($compact ? "3px 0" : "6px 0")};
  font-size: ${({ $compact }) => ($compact ? "0.8rem" : "0.875rem")};

  &:last-child {
    border-bottom: none;
  }
`;

export const MetadataLabelStyled = styled.span`
  color: #aaa;
  white-space: nowrap;
  flex: 0 0 120px;
`;

export const MetadataValueStyled = styled.span`
  color: #000;
  flex: 1;
  min-width: 0;
`;

export const MetadataInputStyled = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #555;
  color: #000;
  font-size: 0.875rem;
  padding: 0 2px;
  outline: none;
  width: 100%;

  &:focus {
    border-bottom-color: #646cff;
  }
`;
