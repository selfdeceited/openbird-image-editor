import { type FC } from "react";
import {
  BirdCardFieldsStyled,
  BirdCardLabelStyled,
  BirdCardPhotoColumnStyled,
  BirdCardPhotoStyled,
  BirdCardRowStyled,
  BirdCardStyled,
  BirdCardValueStyled,
  ExtinctBadgeStyled,
  WikiLinkStyled,
} from "./MetadataDescription.styled";
import { type BirdSpecies } from "./useBirdSpecies";
import { useWikiThumbnail } from "./useWikiThumbnail";

interface BirdCardProps {
  species: BirdSpecies;
}

export const BirdCard: FC<BirdCardProps> = ({ species }) => {
  const thumbnail = useWikiThumbnail(species.latin_name);

  return (
    <BirdCardStyled>
      <BirdCardPhotoColumnStyled>
        {thumbnail && (
          <BirdCardPhotoStyled src={thumbnail} alt={species.english_name} />
        )}
        <WikiLinkStyled
          href={`https://en.wikipedia.org/wiki/${species.latin_name.replace(/ /g, "_")}`}
          target="_blank"
          rel="noreferrer"
        >
          Wikipedia ↗
        </WikiLinkStyled>
      </BirdCardPhotoColumnStyled>
      <BirdCardFieldsStyled>
        <BirdCardRowStyled>
          <BirdCardLabelStyled>Latin name</BirdCardLabelStyled>
          <BirdCardValueStyled>
            <em>{species.latin_name}</em>
            {species.extinct && <ExtinctBadgeStyled>extinct</ExtinctBadgeStyled>}
          </BirdCardValueStyled>
        </BirdCardRowStyled>
        <BirdCardRowStyled>
          <BirdCardLabelStyled>Authority</BirdCardLabelStyled>
          <BirdCardValueStyled>{species.authority}</BirdCardValueStyled>
        </BirdCardRowStyled>
        <BirdCardRowStyled>
          <BirdCardLabelStyled>Breeding regions</BirdCardLabelStyled>
          <BirdCardValueStyled>{species.breeding_regions}</BirdCardValueStyled>
        </BirdCardRowStyled>
        {species.breeding_subregions && (
          <BirdCardRowStyled>
            <BirdCardLabelStyled>Subregions</BirdCardLabelStyled>
            <BirdCardValueStyled>{species.breeding_subregions}</BirdCardValueStyled>
          </BirdCardRowStyled>
        )}
      </BirdCardFieldsStyled>
    </BirdCardStyled>
  );
};
