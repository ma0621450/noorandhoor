import Image from "next/image";
import { isInlineImageSrc } from "@/lib/admin/utils";

export default function MediaThumb({ src, alt }) {
  if (!src) {
    return <div className="h-full w-full bg-white/8" />;
  }

  if (isInlineImageSrc(src)) {
    return (
      // Uploaded previews are data/blob URLs and cannot use next/image.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    );
  }

  return <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />;
}
