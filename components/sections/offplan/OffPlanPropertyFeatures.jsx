import PropertyLocationMap from "@/components/common/PropertyLocationMap";

function singularLabel(heading = "Apartment") {
  if (heading.toLowerCase().endsWith("s") && heading.toLowerCase() !== "guide") {
    return heading.slice(0, -1);
  }
  return heading;
}

export default function OffPlanPropertyFeatures({
  categoryLabel = "Apartments",
  property,
}) {
  const typeLabel = singularLabel(categoryLabel);
  const about = Array.isArray(property?.about) ? property.about : [];
  const description = property?.description?.length
    ? property.description
    : [
        `Type: Luxury ${typeLabel}`,
        property?.tags?.find((tag) => tag.type === "bed")?.label &&
          `Bedrooms: ${property.tags.find((tag) => tag.type === "bed").label}`,
        property?.tags?.find((tag) => tag.type === "bath")?.label &&
          `Bathrooms: ${property.tags.find((tag) => tag.type === "bath").label}`,
        property?.tags?.find((tag) => tag.type === "parking")?.label &&
          `Parking: ${property.tags.find((tag) => tag.type === "parking").label}`,
        property?.tags?.find((tag) => tag.type === "view")?.label &&
          `View: ${property.tags.find((tag) => tag.type === "view").label}`,
      ].filter(Boolean);

  return (
    <section className="w-full bg-[#111111] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <h2 className="text-gold-gradient mb-8 text-center sm:mb-10">
          Property features
        </h2>

        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-8">
          <div className="flex w-full max-w-[714px] flex-1 flex-col">
            {about.length ? (
              <>
                <h3 className="detail-section-title m-0 text-2xl font-semibold leading-8 text-[#F5F5F5]">
                  About This Property
                </h3>
                {about.map((paragraph, index) => (
                  <p
                    key={`${paragraph.slice(0, 32)}-${index}`}
                    className="m-0 pt-4 text-base leading-[26px] text-[#D1D5DB]"
                  >
                    {paragraph}
                  </p>
                ))}
              </>
            ) : null}

            {description.length ? (
              <>
                <h3 className="detail-section-title m-0 pt-6 text-xl font-semibold leading-7 text-[#F5F5F5]">
                  Property Description
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {description.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-base leading-6 text-[#D1D5DB]"
                    >
                      <span className="text-[#D6A85E]" aria-hidden>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div className="w-full shrink-0 lg:w-[496px]">
            <PropertyLocationMap
              map={property?.map}
              location={property?.location || ""}
              className="relative h-[270px] w-full overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white shadow-[0px_6.75px_10.125px_-2.025px_rgba(0,0,0,0.1)] lg:w-[454px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
