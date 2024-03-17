import Image from "next/image";

interface Props {
  src?: string;
  width: number;
  height: number;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>[`className`];
  style?: React.StyleHTMLAttributes<HTMLImageElement>[`style`];
}

export const ProductImage = ({
  src,
  width = 80,
  height = 80,
  alt,
  className,
  style,
}: Props) => {
  let localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  if (localSrc === "/products/undefined") {
    localSrc = "/imgs/placeholder.jpg";
  }

  return (
    <Image
      style={style}
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};
