import { type Metadata } from "libraw-wasm";
import {
  MetadataTableStyled,
  MetadataRowStyled,
  MetadataLabelStyled,
  MetadataValueStyled,
} from "./RawMetadata.styled";

interface RawMetadataProps {
  metadata: Metadata;
}

type Field = {
  label: string;
  key: keyof Metadata;
  format?: (value: unknown, meta: Metadata) => string;
};

const FIELDS: Field[] = [
  {
    label: "Camera",
    key: "camera_make",
    format: (v, meta) => `${v} ${meta.camera_model}`,
  },
  { label: "ISO", key: "iso_speed" },
  {
    label: "Shutter",
    key: "shutter",
    format: (v) => `1/${Math.round(1 / (v as number))}s`,
  },
  { label: "Aperture", key: "aperture", format: (v) => `f/${v}` },
  { label: "Focal length", key: "focal_len", format: (v) => `${v}mm` },
  {
    label: "Date",
    key: "timestamp",
    format: (v) => (v as Date).toLocaleString(),
  },
  { label: "Artist", key: "artist" },
  { label: "Description", key: "desc" },
  {
    label: "Resolution",
    key: "width",
    format: (_, meta) => `${meta.width} × ${meta.height}`,
  },
];

export function RawMetadata({ metadata }: RawMetadataProps) {
  return (
    <MetadataTableStyled>
      <tbody>
        {FIELDS.map(({ label, key, format }) => {
          const value = metadata[key];
          if (!value && value !== 0) return null;
          const display = format ? format(value, metadata) : String(value);
          return (
            <MetadataRowStyled key={key}>
              <MetadataLabelStyled>{label}</MetadataLabelStyled>
              <MetadataValueStyled>{display}</MetadataValueStyled>
            </MetadataRowStyled>
          );
        })}
      </tbody>
    </MetadataTableStyled>
  );
}
