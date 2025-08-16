import NextImage from "next/image";
import { ImageProps } from "./Image.types";

export const Image = ({
  src,
  alt = "",
  className = "",
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  sizes,
  ...props
}: ImageProps) => {
  // Pokud je fill true, nepotřebujeme width/height
  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={className}
        {...props}
      />
    );
  }

  // Pro normální použití s width/height
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={className}
      {...props}
    />
  );
};
