import styled from "styled-components";

export const DescriptionWrapperStyled = styled.div`
  position: relative;
  width: 100%;
`;

export const SuggestionsListStyled = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 220px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

export const SuggestionItemStyled = styled.li<{ $highlighted: boolean }>`
  padding: 6px 10px;
  cursor: pointer;
  font-size: 0.875rem;
  background: ${({ $highlighted }) =>
    $highlighted ? "rgba(100, 108, 255, 0.12)" : "transparent"};

  &:hover {
    background: rgba(100, 108, 255, 0.08);
  }
`;

export const BirdCardStyled = styled.div`
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 4px 10px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const BirdCardPhotoColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  align-self: center;
`;

export const BirdCardPhotoStyled = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
`;

export const WikiLinkStyled = styled.a`
  font-size: 0.7rem;
  color: #646cff;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const BirdCardFieldsStyled = styled.div`
  flex: 1;
  min-width: 0;
`;

export const BirdCardRowStyled = styled.div`
  display: flex;
  gap: 8px;
  padding: 3px 0;
  font-size: 0.8rem;
  border-bottom: 1px solid #2a2a2a;

  &:last-child {
    border-bottom: none;
  }
`;

export const BirdCardLabelStyled = styled.span`
  color: #aaa;
  white-space: nowrap;
  flex: 0 0 100px;
`;

export const BirdCardValueStyled = styled.span`
  color: #000;
`;

export const ExtinctBadgeStyled = styled.span`
  display: inline-block;
  background: #c0392b;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 4px;
  padding: 1px 5px;
  margin-left: 6px;
  vertical-align: middle;
`;
