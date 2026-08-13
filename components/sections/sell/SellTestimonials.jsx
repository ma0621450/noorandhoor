import BuyTestimonialCard from "@/components/sections/buy/BuyTestimonialCard";
import james from "@/public/images/buy/testimonials/james.png";
import mei from "@/public/images/buy/testimonials/mei.png";
import zayan from "@/public/images/buy/testimonials/zayan.png";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "“Finding a home in Dubai was overwhelming, but Noor & Hoor made it easy. They understood our needs, showed the best options, and handled all paperwork. Truly an honest team”.",
    name: "Tariq Al-Mansoori",
    title: "Senior Executive",
    avatar: james,
  },
  {
    id: 2,
    quote:
      "“Excellent service from start to finish! They helped us secure a premium commercial space in record time. Highly professional, transparent, and efficient”.",
    name: "Fatima Al-Hashimi",
    title: "Founder & CEO",
    avatar: mei,
  },
  {
    id: 3,
    quote:
      "“As an overseas investor, I trust them fully to manage my apartments. Their exceptional team handles tenants, maintenance, and rent collection flawlessly, giving me absolute peace of mind”.",
    name: "Zayan Al-Sayed",
    title: "Managing Director",
    avatar: zayan,
  },
];

export default function SellTestimonials() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner flex flex-col items-center">
        <div className="mb-8 flex max-w-[1118px] flex-col items-center gap-5 text-center sm:mb-10">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Testimonials
          </p>
          <h2 className="text-gold-gradient">What Our Customers Saying</h2>
          <div className="section-divider" />
          <p className="max-w-[800px] text-sm font-medium leading-[26px] text-[#f5f5f5] sm:text-base">
            Buy or sell your home with Our agents. Our agents are knowledgeable,
            professional and dedicated to everyone&apos;s satisfaction!
          </p>
        </div>

        <div className="grid w-full max-w-[1118px] grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <BuyTestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
