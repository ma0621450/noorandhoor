import Image from "next/image";
import Button from "@/components/ui/Button";
import card1 from "@/public/images/buy/partners/card-1.png";
import card2 from "@/public/images/buy/partners/card-2.png";
import card3 from "@/public/images/buy/partners/card-3.png";
import card4 from "@/public/images/buy/partners/card-4.png";
import card5 from "@/public/images/buy/partners/card-5.png";

const PARTNERS = [
  { image: card1, name: "ALL real estate" },
  { image: card2, name: "Modern House Real Estate" },
  { image: card3, name: "Eco House Real Estate" },
  { image: card4, name: "Luxury Real Estate" },
  { image: card5, name: "Emirates Real Estate" },
];

export default function TrustedDeveloperPartners() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="mb-5 flex flex-col items-center gap-4 text-center sm:mb-7">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Trusted Partners
          </p>
          <h2 className="text-gold-gradient">Trusted Developer Partners</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {PARTNERS.map((partner) => (
            <article
              key={partner.name}
              className="relative h-[140px] w-[min(207px,calc(50%-0.5rem))] overflow-hidden rounded-[11px] transition hover:-translate-y-1 sm:h-[160px] sm:w-[207px]"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                fill
                sizes="207px"
                className="object-cover object-center"
              />
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button href="/developers" className="min-w-[220px] px-8">
            View All Developers
          </Button>
        </div>
      </div>
    </section>
  );
}
