import { ComponentProps } from "react";
import NextImage from "next/image";

export interface ImageProps
  extends Omit<ComponentProps<typeof NextImage>, "alt"> {
  src: string;
  alt?: string; // Volitelný alt text
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
}
