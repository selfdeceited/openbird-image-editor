import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import styled from 'styled-components'

interface DropZoneProps {
  $dragging: boolean
}

const DropZoneStyled = styled.div<DropZoneProps>`
  border: 2px dashed ${({ $dragging }) => ($dragging ? '#646cff' : '#555')};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: ${({ $dragging }) => ($dragging ? '#1a1a2e' : 'transparent')};
  transition: border-color 0.2s, background 0.2s;
  user-select: none;
`

const HintStyled = styled.p`
  margin: 0;
  color: #aaa;
`

interface ImageUploaderProps {
  onUpload: (dataUrl: string, file: File) => void
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') onUpload(result, file)
    }
    reader.readAsDataURL(file)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <DropZoneStyled
      $dragging={dragging}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <HintStyled>Drag & drop an image here, or click to select</HintStyled>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </DropZoneStyled>
  )
}
