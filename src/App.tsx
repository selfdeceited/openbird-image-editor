import { useState } from "react";
import { ImageUploader } from "./components/ImageUploader/ImageUploader";
import { EditBar } from "./components/EditBar/EditBar";
import { RawMetadata } from "./components/RawMetadata/RawMetadata";
import { type UploadedImage } from "./components/ImageUploader/useUploadImage";
import {
  ContainerStyled,
  PreviewStyled,
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
          <FileNameStyled>{image.name}</FileNameStyled>
          <EditBar image={image} onApply={setImage} />

          {image.metadata && <RawMetadata metadata={image.metadata} />}
        </PreviewStyled>
      )}
    </ContainerStyled>
  );
}
