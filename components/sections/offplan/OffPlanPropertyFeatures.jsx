import PropertyLocationMap from "@/components/common/PropertyLocationMap";

const ABOUT = [
  "Discover refined luxury in this exquisite 3-bedroom apartment, where contemporary design meets timeless elegance. Floor-to-ceiling windows frame sweeping views, while premium finishes create a warm, sophisticated atmosphere throughout.",
  "Each room has been meticulously designed to provide comfort and style. The open-plan living area flows effortlessly onto a private balcony, making this residence equally suited to entertaining and everyday living.",
];

const FEATURES = [
  "High-speed Internet",
  "Central A/C",
  "Swimming Pool",
  "24/7 Security",
  "Fitness Center",
  "Balcony",
];

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
  const about = property?.about?.length ? property.about : ABOUT;
  const features = property?.features?.length ? property.features : FEATURES;
  const description = property?.description?.length
    ? property.description
    : [
        `Type: Luxury ${typeLabel}`,
        "Bedrooms: 3 spacious bedrooms with built-in wardrobes",
        "Bathrooms: 2 modern bathrooms with premium fixtures",
        "Parking: 2 covered parking spaces",
        "View: Stunning Burj Khalifa views",
      ];

  return (
    <section className="w-full bg-[#111111] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <h2 className="text-gold-gradient mb-8 text-center sm:mb-10">
          Property features
        </h2>

        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-8">
          <div className="flex w-full max-w-[714px] flex-1 flex-col">
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

            <h3 className="detail-section-title m-0 pt-6 text-xl font-semibold leading-7 text-[#F5F5F5]">
              Features
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-base leading-6 text-[#D1D5DB]"
                >
                  <span
                    className="btn-gold size-2 shrink-0 rounded-full"
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>
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
