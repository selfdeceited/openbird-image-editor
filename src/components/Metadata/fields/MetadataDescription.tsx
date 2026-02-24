import { useEffect, useRef, useState, type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";
import { MetadataInputStyled } from "../MetadataField/MetadataField.styled";
import {
  DescriptionWrapperStyled,
  SuggestionItemStyled,
  SuggestionsListStyled,
} from "./MetadataDescription.styled";
import { useBirdSpecies, type BirdSpecies } from "./useBirdSpecies";

interface MetadataDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (bird: BirdSpecies | null) => void;
}

const MAX_SUGGESTIONS = 20;

function getSuggestions(species: BirdSpecies[], query: string): BirdSpecies[] {
  if (!query) return [];
  const q = query.toLowerCase();
  const startsWith: BirdSpecies[] = [];
  const includes: BirdSpecies[] = [];
  for (const s of species) {
    const name = s.english_name.toLowerCase();
    if (name.startsWith(q)) startsWith.push(s);
    else if (name.includes(q)) includes.push(s);
    if (startsWith.length + includes.length >= MAX_SUGGESTIONS) break;
  }
  return [...startsWith, ...includes].slice(0, MAX_SUGGESTIONS);
}

export const MetadataDescription: FC<MetadataDescriptionProps> = ({
  value,
  onChange,
  onSelect,
}) => {
  const { species, loading } = useBirdSpecies();
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = getSuggestions(species, query);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    onSelect(null);
    setHighlighted(0);
    setOpen(val.length > 0);
  }

  function select(bird: BirdSpecies) {
    setQuery(bird.english_name);
    onChange(bird.english_name);
    onSelect(bird);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <MetadataField label="Description">
      <DescriptionWrapperStyled ref={wrapperRef}>
        <MetadataInputStyled
          type="text"
          value={query}
          placeholder={
            !value
              ? "Start typing the bird name..."
              : loading
                ? "Loading birds…"
                : undefined
          }
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.length > 0 && suggestions.length > 0) setOpen(true);
          }}
          autoComplete="off"
        />
        {open && suggestions.length > 0 && (
          <SuggestionsListStyled>
            {suggestions.map((bird, i) => (
              <SuggestionItemStyled
                key={bird.latin_name}
                $highlighted={i === highlighted}
                onMouseDown={() => select(bird)}
                onMouseEnter={() => setHighlighted(i)}
              >
                {bird.english_name} ({bird.latin_name})
              </SuggestionItemStyled>
            ))}
          </SuggestionsListStyled>
        )}
      </DescriptionWrapperStyled>
    </MetadataField>
  );
};
