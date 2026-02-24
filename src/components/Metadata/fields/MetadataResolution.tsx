import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";

interface MetadataResolutionProps {
  width: number;
  height: number;
}

export const MetadataResolution: FC<MetadataResolutionProps> = ({ width, height }) => (
  <MetadataField label="Resolution" compact>{width} × {height}</MetadataField>
);
