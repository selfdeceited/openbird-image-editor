import { useState } from "react";
import LibRaw, {
  type LibRawOptions,
  type Metadata,
  type RawImageData,
} from "libraw-wasm";
import { RAW_EXTENSIONS } from "./RAW_EXTENSIONS";

const options: LibRawOptions = {
  bright: 1.0, // -b <float> : brightness
  threshold: 0.0, // -n <float> : wavelet denoise threshold
  autoBrightThr: 0.01, // portion of clipped pixels for auto-brightening
  adjustMaximumThr: 0.75, // auto-adjust max if channel overflow above threshold
  expShift: 1.0, // exposure shift in linear scale (requires expCorrec=1)
  expPreser: 0.0, // preserve highlights when expShift>1 (0..1)

  halfSize: false, // -h  : output at 1/2 size
  fourColorRgb: true, // -f  : separate interpolation for two green channels
  highlight: 0, // -H  : highlight mode (0..9)
  useAutoWb: false, // -a  : auto white balance
  useCameraWb: true, // -w  : camera's recorded WB
  useCameraMatrix: 1, // +M/-M : color profile usage (0=off,1=on if WB,3=always)
  outputColor: 2, // -o  : output colorspace (0..8) (0=raw,1=sRGB,2=Adobe, etc.)
  outputBps: 8, // -4  : 8 or 16 bits per sample
  outputTiff: false, // -T  : output TIFF if true, else PPM
  outputFlags: 0, // bitfield for custom output flags
  userFlip: -1, // -t  : flip/rotate (0..7, default=-1 means use RAW value)
  userQual: 3, // -q  : interpolation quality (0..12)
  userBlack: -1, // -k  : user black level
  userCblack: [-1, -1, -1, -1], // per-channel black offsets
  userSat: 0, // -S  : saturation level
  medPasses: 0, // -m  : median filter passes
  noAutoBright: false, // -W  : don't apply auto brightness
  useFujiRotate: -1, // -j  : -1=use, 0=off, 1=on, for Fuji sensor rotation
  greenMatching: false, // fix green channel imbalance (not a dcraw key)
  dcbIterations: -1, // additional DCB passes (-1=off)
  dcbEnhanceFl: false, // enhance color fidelity in DCB
  fbddNoiserd: 0, // 0=off,1=light,2=full FBDD denoise
  expCorrec: false, // enable exposure correction (then expShift, expPreser apply)
  noAutoScale: false, // skip scale_colors (affects WB)
  noInterpolation: false, // skip demosaic entirely (outputs raw mosaic)

  greybox: null, // -A x y w h : rectangle (x,y,width,height) for WB calc
  cropbox: null, // Cropping rectangle (left, top, w, h) applied before rotation
  aber: null, // -C (red multiplier = aber[0], blue multiplier = aber[2])
  gamm: null, // -g power toe_slope (1/power -> gamm[0], gamm[1] -> slope)
  userMul: null, // -r mul0 mul1 mul2 mul3 : user WB multipliers (r, g, b, g2)

  outputProfile: null, // -o <filename> : output ICC profile (if compiled w/ LCMS)
  cameraProfile: null, // -p <filename> or 'embed' : camera ICC profile
  badPixels: null, // -P <file> : file with bad pixels map
  darkFrame: null, // -K <file> : file with dark frame (16-bit PGM)
};

export type UploadedImage =
  | { type: "raw"; imageData: RawImageData; metadata: Metadata; name: string }
  | { type: "image"; dataUrl: string; name: string };

interface UseUploadImageProps {
  onUpload: (image: UploadedImage) => void;
}

function isRawFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return RAW_EXTENSIONS.has(ext);
}

async function decodeRawFile(
  file: File,
): Promise<{ imageData: RawImageData; metadata: Metadata }> {
  const buffer = await file.arrayBuffer();
  const raw = new LibRaw();
  await raw.open(new Uint8Array(buffer), options);
  const metadata = await raw.metadata();
  const imageData = await raw.imageData();
  console.log({ metadata });
  return { imageData, metadata };
}

function imageFileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") resolve(result);
      else reject(new Error("Failed to read file"));
    };
    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}

export function useUploadImage({ onUpload }: UseUploadImageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(f: File) {
    setLoading(true);
    setError(null);
    try {
      if (isRawFile(f)) {
        const { imageData, metadata } = await decodeRawFile(f);
        onUpload({ type: "raw", imageData, metadata, name: f.name });
      } else {
        const dataUrl = await imageFileToDataUrl(f);
        onUpload({ type: "image", dataUrl, name: f.name });
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to process file");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleFile };
}
