import Image from "next/image";
import { isInlineImageSrc, resolveImageSrc } from "@/lib/admin/utils";

export default function MediaImage({
  src,
  alt = "",
  fill = false,
  className = "",
  sizes,
  priority = false,
  unoptimized = false,
}) {
  if (!src) return null;

  const url = resolveImageSrc(src);
  if (!url) return null;

  if (isInlineImageSrc(url)) {
    return (
      // Uploaded previews are data/blob URLs and cannot use next/image.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        className={fill ? `absolute inset-0 h-full w-full object-cover ${className}` : className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      className={className}
    />
  );
}
