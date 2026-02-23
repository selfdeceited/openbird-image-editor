import { type Metadata as RawMetadata } from "libraw-wasm";
import {
  MetadataTableStyled,
  MetadataRowStyled,
  MetadataLabelStyled,
  MetadataValueStyled,
} from "./Metadata.styled";

export interface FileMetadata {
  lastModified: number;
}

interface RawMetadataProps {
  rawMetadata: RawMetadata;
  fileMetadata: FileMetadata;
}

type Field = {
  label: string;
  key: keyof RawMetadata;
  format?: (value: unknown, meta: RawMetadata) => string;
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

export function Metadata({ rawMetadata }: RawMetadataProps) {
  return (
    <>
      <h4>Review and fix metadata</h4>
      <MetadataTableStyled>
        <tbody>
          {FIELDS.map(({ label, key, format }) => {
            const value = rawMetadata[key];
            if (!value && value !== 0) return null;
            const display = format ? format(value, rawMetadata) : String(value);
            return (
              <MetadataRowStyled key={key}>
                <MetadataLabelStyled>{label}</MetadataLabelStyled>
                <MetadataValueStyled>{display}</MetadataValueStyled>
                <MetadataValueStyled>
                  {/* todo: make it not a table but separate components with action bar
                    not this shit: () => component({ rawMetadata, fileMetadata })
                    */}
                </MetadataValueStyled>
              </MetadataRowStyled>
            );
          })}
        </tbody>
      </MetadataTableStyled>
    </>
  );
}
