import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";

interface MetadataISOProps {
  iso_speed: number;
}

export const MetadataISO: FC<MetadataISOProps> = ({ iso_speed }) => (
  <MetadataField label="ISO" compact>{iso_speed}</MetadataField>
);
