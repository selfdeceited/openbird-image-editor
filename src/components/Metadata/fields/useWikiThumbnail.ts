import { useEffect, useState } from "react";

export function useWikiThumbnail(latinName: string | null): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!latinName) {
      setUrl(null);
      return;
    }

    const title = latinName.replace(/ /g, "_");
    let cancelled = false;

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { thumbnail?: { source: string } } | null) => {
        if (!cancelled) setUrl(data?.thumbnail?.source ?? null);
      })
      .catch(() => { if (!cancelled) setUrl(null); });

    return () => { cancelled = true; };
  }, [latinName]);

  return url;
}
