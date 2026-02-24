import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";
import { MetadataInputStyled } from "../MetadataField/MetadataField.styled";

interface MetadataArtistProps {
  value: string;
  onChange: (value: string) => void;
}

export const MetadataArtist: FC<MetadataArtistProps> = ({ value, onChange }) => (
  <MetadataField label="Artist">
    <MetadataInputStyled
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </MetadataField>
);
