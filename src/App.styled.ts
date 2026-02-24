import styled from "styled-components";

export const ContainerStyled = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const HeaderStyled = styled.h1`
  font-size: 24px;
`;

export const PreviewStyled = styled.div`
  margin-top: 24px;

  @media (min-width: 1500px) {
    display: flex;
    align-items: flex-start;
    gap: 32px;
  }
`;

export const PreviewEditorStyled = styled.div`
  @media (min-width: 1500px) {
    flex: 0 0 720px;
  }
`;

export const PreviewMetadataStyled = styled.div`
  @media (min-width: 1500px) {
    flex: 1;
    min-width: 0;
  }
`;

export const FileNameStyled = styled.p`
  color: #aaa;
  margin-bottom: 8px;
`;
