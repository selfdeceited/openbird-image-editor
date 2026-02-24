import { useEffect, useState } from "react";

export interface BirdSpecies {
  english_name: string;
  latin_name: string;
  authority: string;
  breeding_regions: string;
  breeding_subregions?: string;
  extinct: boolean;
}

function text(el: Element, tag: string): string {
  return el.querySelector(tag)?.textContent?.trim() ?? "";
}

function parseXml(xmlText: string): BirdSpecies[] {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  const result: BirdSpecies[] = [];

  for (const genus of doc.querySelectorAll("genus")) {
    const genusName = text(genus, ":scope > latin_name");

    for (const species of genus.querySelectorAll(":scope > species")) {
      const english_name = text(species, "english_name");
      if (!english_name) continue;

      const speciesEpithet = text(species, "latin_name");
      const authority = text(species, "authority");
      const breeding_regions = text(species, "breeding_regions");
      const breeding_subregions = text(species, "breeding_subregions") || undefined;
      const extinct = species.getAttribute("extinct") === "yes";

      result.push({
        english_name,
        latin_name: `${genusName} ${speciesEpithet}`,
        authority,
        breeding_regions,
        breeding_subregions,
        extinct,
      });
    }
  }

  return result;
}

export function useBirdSpecies(): { species: BirdSpecies[]; loading: boolean } {
  const [species, setSpecies] = useState<BirdSpecies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/ioc-names.xml")
      .then((res) => res.text())
      .then((xml) => setSpecies(parseXml(xml)))
      .finally(() => setLoading(false));
  }, []);

  return { species, loading };
}
