import styled from "styled-components";

export const DateRowStyled = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const DateInputStyled = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
`;

export const UseDateButtonStyled = styled.button`
  padding: 2px 8px;
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
    background: rgba(100, 108, 255, 0.1);
  }
`;
