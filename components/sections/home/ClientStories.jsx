import Image from "next/image";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";

const CLIENT_STORIES = [
  { id: 1, image: carousel1, alt: "Luxury villa with pool" },
  { id: 2, image: carousel2, alt: "Modern home with patio" },
  { id: 3, image: carousel3, alt: "Apartment building exterior" },
  { id: 4, image: carousel4, alt: "Contemporary house with garden" },
];

export default function ClientStories() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="min-w-0 max-w-full shrink-0 lg:max-w-[500px]">
          <h3 className="section-sub-heading mb-4">Client Stories</h3>
          <h2 className="text-gold-gradient max-w-full">
            Why Clients Trust Our Expertise
          </h2>
        </div>

        <div className="hidden h-[94px] w-[4px] shrink-0 bg-[#B3813D] lg:mx-auto lg:my-auto lg:block" />

        <p className="max-w-full text-sm font-medium leading-relaxed text-white lg:max-w-[540px] lg:pt-8">
          At Noor & Hoor Properties, we put your dreams first. Whether you are
          searching for a luxury villa, selling an exclusive property, or
          expanding your investment portfolio in UAE, we deliver honest advice
          and clear transparency every step of the way.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
        {CLIENT_STORIES.map((story) => (
          <article
            key={story.id}
            className="overflow-hidden rounded-2xl border border-[#ba8a44]/40"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={story.image}
                alt={story.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
