import styled from "styled-components";

export const TooltipWrapperStyled = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  color: #666;
  font-size: 0.75rem;
  cursor: default;
  line-height: 1;

  &:hover > span,
  &:focus-within > span {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const TooltipPopoverStyled = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  padding: 7px 10px;
  background: #1e1e2e;
  border: 1px solid #444;
  border-radius: 6px;
  color: #ccc;
  font-size: 0.75rem;
  line-height: 1.4;
  white-space: normal;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 10;

  /* Arrow */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #444;
  }
`;
