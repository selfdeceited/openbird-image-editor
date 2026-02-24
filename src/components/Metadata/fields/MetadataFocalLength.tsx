import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";

interface MetadataFocalLengthProps {
  focal_len: number;
}

export const MetadataFocalLength: FC<MetadataFocalLengthProps> = ({ focal_len }) => (
  <MetadataField label="Focal length" compact>{focal_len}mm</MetadataField>
);
