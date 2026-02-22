import { useState } from 'react'
import styled from 'styled-components'
import ImageUploader from './components/ImageUploader'
import './App.css'

const ContainerStyled = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px;
`

const PreviewStyled = styled.div`
  margin-top: 24px;
`

const FileNameStyled = styled.p`
  color: #aaa;
  margin-bottom: 8px;
`

const PreviewImageStyled = styled.img`
  max-width: 100%;
  border-radius: 8px;
`

function App() {
  const [image, setImage] = useState<{ dataUrl: string; name: string } | null>(null)

  return (
    <ContainerStyled>
      <h1>Image Editor</h1>
      <ImageUploader
        onUpload={(dataUrl, file) => setImage({ dataUrl, name: file.name })}
      />
      {image && (
        <PreviewStyled>
          <FileNameStyled>{image.name}</FileNameStyled>
          <PreviewImageStyled src={image.dataUrl} alt={image.name} />
        </PreviewStyled>
      )}
    </ContainerStyled>
  )
}

export default App
