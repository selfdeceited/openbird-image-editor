import { useState, type FC } from "react";
import { type Metadata as RawMetadata } from "libraw-wasm";
import {
  MetadataContainerStyled,
  MetadataLayoutStyled,
  MetadataReadonlyCardStyled,
} from "./Metadata.styled";
import { MetadataCamera } from "./fields/MetadataCamera";
import { MetadataISO } from "./fields/MetadataISO";
import { MetadataShutter } from "./fields/MetadataShutter";
import { MetadataAperture } from "./fields/MetadataAperture";
import { MetadataFocalLength } from "./fields/MetadataFocalLength";
import { MetadataDate } from "./fields/MetadataDate";
import { MetadataArtist } from "./fields/MetadataArtist";
import { MetadataDescription } from "./fields/MetadataDescription";
import { MetadataResolution } from "./fields/MetadataResolution";

export interface FileMetadata {
  lastModified: number;
}

interface MetadataProps {
  rawMetadata: RawMetadata;
  fileMetadata: FileMetadata;
}

export const Metadata: FC<MetadataProps> = ({ rawMetadata, fileMetadata }) => {
  const [artist, setArtist] = useState(rawMetadata.artist ?? "");
  const [desc, setDesc] = useState(rawMetadata.desc ?? "");

  return (
    <>
      <h4>Review and fix metadata</h4>
      <MetadataContainerStyled>
        <MetadataLayoutStyled>
          <div>
            <MetadataArtist value={artist} onChange={setArtist} />
            <MetadataDescription value={desc} onChange={setDesc} />
            <MetadataDate
              timestamp={rawMetadata.timestamp}
              lastModified={fileMetadata.lastModified}
            />
          </div>
          <MetadataReadonlyCardStyled>
            {(rawMetadata.camera_make || rawMetadata.camera_model) && (
              <MetadataCamera
                camera_make={rawMetadata.camera_make}
                camera_model={rawMetadata.camera_model}
              />
            )}
            {!!rawMetadata.iso_speed && (
              <MetadataISO iso_speed={rawMetadata.iso_speed} />
            )}
            {!!rawMetadata.shutter && (
              <MetadataShutter shutter={rawMetadata.shutter} />
            )}
            {!!rawMetadata.aperture && (
              <MetadataAperture aperture={rawMetadata.aperture} />
            )}
            {!!rawMetadata.focal_len && (
              <MetadataFocalLength focal_len={rawMetadata.focal_len} />
            )}
            {!!(rawMetadata.width && rawMetadata.height) && (
              <MetadataResolution
                width={rawMetadata.width}
                height={rawMetadata.height}
              />
            )}
          </MetadataReadonlyCardStyled>
        </MetadataLayoutStyled>
      </MetadataContainerStyled>
    </>
  );
};
