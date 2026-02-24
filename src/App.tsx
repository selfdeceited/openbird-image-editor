import { useState } from "react";
import { ImageUploader } from "./components/ImageUploader/ImageUploader";
import { EditBar } from "./components/EditBar/EditBar";
import { Metadata } from "./components/Metadata/Metadata";
import { type UploadedImage } from "./components/ImageUploader/useUploadImage";
import {
  ContainerStyled,
  PreviewStyled,
  PreviewEditorStyled,
  PreviewMetadataStyled,
  FileNameStyled,
  HeaderStyled,
} from "./App.styled";
import "./App.css";

export function App() {
  const [image, setImage] = useState<UploadedImage | null>(null); // todo: not store image in state?

  return (
    <ContainerStyled>
      <HeaderStyled>RAW Image Editor for OpenBird</HeaderStyled>

      {!image && <ImageUploader onUpload={setImage} />}
      {image && (
        <PreviewStyled>
          <PreviewEditorStyled>
            <FileNameStyled>{image.name}</FileNameStyled>
            <EditBar image={image} onCanvasReset={setImage} />
          </PreviewEditorStyled>
          <PreviewMetadataStyled>
            <Metadata
              rawMetadata={image.rawMetadata}
              fileMetadata={image.fileMetadata}
            />
          </PreviewMetadataStyled>
        </PreviewStyled>
      )}
    </ContainerStyled>
  );
}
