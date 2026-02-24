import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";
import { MetadataInputStyled } from "../MetadataField/MetadataField.styled";

interface MetadataDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export const MetadataDescription: FC<MetadataDescriptionProps> = ({ value, onChange }) => (
  <MetadataField label="Description">
    <MetadataInputStyled
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </MetadataField>
);
