const rawExtensions = [
  "cr2",
  "nef",
  "arw",
  "dng",
  "raf",
  "orf",
  "rw2",
  "pef",
  "srw",
];

export const RAW_EXTENSIONS = new Set(rawExtensions);

export const acceptInputType = rawExtensions.map((ex) => "." + ex).join(",");
