import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageCanvas from "./components/ImageCanvas";
import RawMetadata from "./components/RawMetadata";
import { type UploadedImage } from "./components/useUploadImage";
import {
  ContainerStyled,
  PreviewStyled,
  FileNameStyled,
  HeaderStyled,
} from "./App.styled";
import "./App.css";

function App() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  return (
    <ContainerStyled>
      <HeaderStyled>RAW Image Editor for OpenBird</HeaderStyled>

      {!image && <ImageUploader onUpload={setImage} />}
      {image && (
        <PreviewStyled>
          <FileNameStyled>{image.name}</FileNameStyled>
          <ImageCanvas image={image} />
          {image.type === "raw" && <RawMetadata metadata={image.metadata} />}
        </PreviewStyled>
      )}
    </ContainerStyled>
  );
}

export default App;
