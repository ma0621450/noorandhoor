import MediaImage from "@/components/ui/MediaImage";
import { publicAmenities } from "@/lib/admin/propertyAmenities";

export default function DetailFeatures({ features = [], amenities = [] }) {
  const items = publicAmenities(
    Array.isArray(amenities) && amenities.length ? amenities : features,
  );

  if (!items.length) return null;

  return (
    <section className="w-full bg-[#111111] pb-10 sm:pb-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-10 sm:pt-14">
        <h2 className="detail-section-title m-0 text-[20px] font-medium leading-[30px] text-[#F5F5F5]">
          Features / Amenities
        </h2>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, index) => (
            <li key={`${item.name}-${index}`} className="min-w-0">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
                <MediaImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-base font-normal leading-6 text-[#F5F5F5]">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
