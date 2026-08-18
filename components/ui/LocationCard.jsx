import Image from "next/image";
import Link from "next/link";

const LocationCard = ({
  image,
  name,
  propertyCount,
  subtitle,
  width = 290,
  href,
}) => {
  const caption =
    subtitle ||
    (propertyCount != null ? `${propertyCount} Properties` : null);

  const content = (
    <article
      className="group relative h-[360px] w-[min(240px,75vw)] shrink-0 snap-start cursor-pointer overflow-hidden rounded-[10px] transition-transform duration-200 hover:scale-[1.02] sm:h-[450px] sm:w-[min(290px,80vw)]"
      style={width !== 290 ? { width: `min(${width}px, 80vw)` } : undefined}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes={`${width}px`}
        draggable={false}
        className="pointer-events-none object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 rounded-[10px] border border-[rgba(212,175,55,0.6)] transition-colors group-hover:border-[#eec876]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-[17px] left-4 flex items-stretch gap-3">
        <div className="w-[2px] shrink-0 bg-[#E9C349]" />
        <div className="flex flex-col gap-[7px]">
          <h3 className="!font-accent text-[clamp(1.5rem,2.2vw,2rem)] font-normal uppercase leading-9 text-white">
            {name}
          </h3>
          {caption && (
            <p className="text-[11px] font-normal uppercase tracking-[0.98px] text-[#E9C349]">
              {caption}
            </p>
          )}
        </div>
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="shrink-0" aria-label={`Browse ${name}`}>
      {content}
    </Link>
  );
};

export default LocationCard;
