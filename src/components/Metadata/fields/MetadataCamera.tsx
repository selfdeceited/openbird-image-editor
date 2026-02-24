import { type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";

interface MetadataCameraProps {
  camera_make: string;
  camera_model: string;
}

export const MetadataCamera: FC<MetadataCameraProps> = ({ camera_make, camera_model }) => (
  <MetadataField label="Camera" compact>{camera_make} {camera_model}</MetadataField>
);
