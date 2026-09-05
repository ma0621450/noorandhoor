import { buildMapEmbedSrc } from "@/lib/propertyMap";

export default function PropertyLocationMap({
  map,
  location = "",
  className = "relative h-[270px] w-full overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white shadow-[0px_6.75px_10.125px_-2.025px_rgba(0,0,0,0.1),0px_2.7px_4.05px_-2.7px_rgba(0,0,0,0.1)]",
}) {
  const label = map?.label || location || "Property location";
  const src = buildMapEmbedSrc({
    lat: map?.lat,
    lng: map?.lng,
    label,
    location,
  });

  return (
    <div className={className}>
      <iframe
        title={label}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
