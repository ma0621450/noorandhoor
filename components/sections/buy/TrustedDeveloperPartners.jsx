import Image from "next/image";
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

        <div className="flex justify-start gap-[16px] overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden">
          {PARTNERS.map((partner) => (
            <article
              key={partner.name}
              className="relative h-[160px] w-[207px] shrink-0 cursor-pointer overflow-hidden rounded-[11px] transition hover:-translate-y-1"
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
      </div>
    </section>
  );
}
