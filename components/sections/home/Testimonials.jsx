import TestimonialCard from "@/components/ui/TestimonialCard";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "“Finding a home in Dubai was overwhelming, but Noor & Hoor made it easy. They understood our needs, showed the best options, and handled all paperwork. Truly an honest team”.",
    name: "Tariq Al-Mansoori",
    title: "Senior Executive",
  },
  {
    id: 2,
    quote:
      "“Excellent service from start to finish! They helped us secure a premium commercial space in record time. Highly professional, transparent, and efficient”.",
    name: "Fatima Al-Hashimi",
    title: "Founder & CEO",
  },
  {
    id: 3,
    quote:
      "“As an overseas investor, I trust them fully to manage my apartments. Their exceptional team handles tenants, maintenance, and rent collection flawlessly, giving me absolute peace of mind”.",
    name: "Zayan Al-Sayed",
    title: "Managing Director",
  },
];

export default function Testimonials() {
  return (
    <section className="section-container py-12 sm:py-16 flex flex-col items-center justify-center">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center sm:mb-12 lg:mb-16">
        <h3 className="section-sub-heading">Testimonials</h3>
        <h2 className="text-gold-gradient">What Our Clients Say</h2>
        <div className="h-[4px] w-25 bg-[#B3813D]" />
        <p className="w-full max-w-[700px] text-sm font-medium leading-relaxed text-white sm:text-base">
          Real stories from people who found their perfect spaces with us. Our
          dedicated team works tirelessly to ensure your real estate journey is
          smooth, rewarding, and completely stress-free.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
