import Image from "next/image";
import Link from "next/link";

const LocationCard = ({
  image,
  name,
  propertyCount,
  subtitle,
  href,
  fluid = false,
}) => {
  const caption =
    subtitle ||
    (propertyCount != null ? `${propertyCount} Properties` : null);

  const content = (
    <article
      className={`group relative overflow-hidden rounded-[10px] transition-transform duration-200 hover:scale-[1.02] ${
        fluid
          ? "mx-auto h-[280px] w-full sm:h-[340px] lg:h-[380px]"
          : "mx-auto h-[300px] w-[min(280px,calc(100vw-2rem))] sm:h-[380px] lg:h-[420px]"
      }`}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes={
          fluid
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            : "(max-width: 640px) 100vw, 280px"
        }
        draggable={false}
        className="pointer-events-none object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 rounded-[10px] border border-[rgba(212,175,55,0.6)] transition-colors group-hover:border-[#eec876]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="flex items-stretch gap-3">
          <div className="w-[2px] shrink-0 bg-[#E9C349]" />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className="!font-accent text-[1.15rem] font-normal uppercase leading-snug text-white sm:text-[1.35rem]">
              {name}
            </h3>
            {caption ? (
              <p className="text-[11px] font-normal uppercase tracking-[0.98px] text-[#E9C349]">
                {caption}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className={`relative z-[1] ${fluid ? "block w-full" : "w-full max-w-[280px] shrink-0"}`}
      aria-label={`Browse ${name}`}
    >
      {content}
    </Link>
  );
};

export default LocationCard;
