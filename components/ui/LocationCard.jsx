import Image from "next/image";

const LocationCard = ({ image, name, propertyCount, width = 250 }) => {
  return (
    <article
      className="relative h-[450px] shrink-0 overflow-hidden rounded-md"
      style={{ width }}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes={`${width}px`}
        draggable={false}
        className="pointer-events-none object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 rounded-md border border-[#B3813D]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-6 left-5 flex items-stretch gap-3">
        <div className="w-[3px] shrink-0 bg-[#B3813D]" />
        <div className="flex flex-col gap-1">
          <h3 className="!font-accent text-3xl font-normal uppercase">
            {name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wider text-[#B3813D]">
            {propertyCount} Properties
          </p>
        </div>
      </div>
    </article>
  );
};

export default LocationCard;
