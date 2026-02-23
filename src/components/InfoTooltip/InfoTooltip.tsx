import { type FC } from "react";
import { TooltipWrapperStyled, TooltipPopoverStyled } from "./InfoTooltip.styled";

interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ text }) => (
  <TooltipWrapperStyled>
    ⓘ
    <TooltipPopoverStyled role="tooltip">{text}</TooltipPopoverStyled>
  </TooltipWrapperStyled>
);
