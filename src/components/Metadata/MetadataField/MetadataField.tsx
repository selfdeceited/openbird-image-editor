import { type FC, type ReactNode } from "react";
import { MetadataLabelStyled, MetadataRowStyled, MetadataValueStyled } from "./MetadataField.styled";

interface MetadataFieldProps {
  label: string;
  compact?: boolean;
  children: ReactNode;
}

export const MetadataField: FC<MetadataFieldProps> = ({ label, compact, children }) => (
  <MetadataRowStyled $compact={compact}>
    <MetadataLabelStyled>{label}</MetadataLabelStyled>
    <MetadataValueStyled>{children}</MetadataValueStyled>
  </MetadataRowStyled>
);
