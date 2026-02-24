import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";

interface MetadataApertureProps {
  aperture: number;
}

export const MetadataAperture: FC<MetadataApertureProps> = ({ aperture }) => (
  <MetadataField label="Aperture" compact>f/{aperture}</MetadataField>
);
