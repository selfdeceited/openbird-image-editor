import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";

interface MetadataShutterProps {
  shutter: number;
}

export const MetadataShutter: FC<MetadataShutterProps> = ({ shutter }) => (
  <MetadataField label="Shutter" compact>1/{Math.round(1 / shutter)}s</MetadataField>
);
