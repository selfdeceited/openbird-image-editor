import { createContext, useContext } from "react";

export const CanvasContext = createContext<React.RefObject<HTMLCanvasElement | null> | null>(null);

export function useCanvasContext(): React.RefObject<HTMLCanvasElement | null> {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("useCanvasContext must be used within EditBar");
  return ctx;
}
