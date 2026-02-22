import styled from 'styled-components'

export interface DropZoneProps {
  $dragging: boolean
}

export const DropZoneStyled = styled.div<DropZoneProps>`
  border: 2px dashed ${({ $dragging }) => ($dragging ? '#646cff' : '#555')};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: ${({ $dragging }) => ($dragging ? '#1a1a2e' : 'transparent')};
  transition:
    border-color 0.2s,
    background 0.2s;
  user-select: none;
`

export const HintStyled = styled.p`
  margin: 0;
  color: #aaa;
`

export const ErrorStyled = styled.p`
  margin: 8px 0 0;
  color: #ff4d4f;
  font-size: 0.875rem;
`

export const SpinnerStyled = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #555;
  border-top-color: #646cff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`
