
import React, { useState } from "react";
import { handleImageError } from "@/lib/imageFallback";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const Image = ({
  src,
  alt = "",
  fallbackSrc = "/placeholder.svg",
  className,
  ...props
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={handleError}
      className={cn("object-cover", className)}
      {...props}
    />
  );
};

export { Image };
