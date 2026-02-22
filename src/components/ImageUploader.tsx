import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { useUploadImage, type UploadedImage } from "./useUploadImage";
import {
  DropZoneStyled,
  ErrorStyled,
  HintStyled,
  SpinnerStyled,
} from "./ImageUploader.styled";
import { acceptInputType } from "./RAW_EXTENSIONS";

interface ImageUploaderProps {
  onUpload: (image: UploadedImage) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, error, handleFile } = useUploadImage({ onUpload });

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <DropZoneStyled
      $dragging={dragging}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {loading ? (
        <SpinnerStyled />
      ) : (
        <HintStyled>Drag & drop an image here, or click to select</HintStyled>
      )}
      {error && <ErrorStyled>{error}</ErrorStyled>}
      <input
        ref={inputRef}
        type="file"
        accept={`image/*, ${acceptInputType}`}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </DropZoneStyled>
  );
}
