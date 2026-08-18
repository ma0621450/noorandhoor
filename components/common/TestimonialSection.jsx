import { Quote, Star } from "lucide-react";

const QUOTES = {
  home: [
    "Finding a home in Dubai was overwhelming, but Noor & Hoor made it easy. They understood our needs, showed the best options, and handled all paperwork. Truly an honest team.",
    "Excellent service from start to finish! They helped us secure a premium commercial space in record time. Highly professional, transparent, and efficient.",
    "As an overseas investor, I trust them fully to manage my apartments. Their exceptional team handles tenants, maintenance, and rent collection flawlessly, giving me absolute peace of mind.",
  ],
  buy: [
    "I was buying from overseas and nervous about it. The team walked me through every single step, answered every question at odd hours, and made sure I never felt lost. By the time I signed, I felt like I'd known them for years.",
    "From property match to handover, everything felt organized. I never had to chase anyone for updates, which made the whole process far less stressful than I expected it to be.",
    "I appreciated how honest they were about pricing and location trade-offs. No sales pressure, just real advice. It made my decision so much easier, and I trusted every recommendation they gave me.",
  ],
  rent: [
    "The whole process was faster than I expected. I moved in within a week, and the team handled every document properly from start to finish.",
    "I was relocating for work and had zero time to search for a place myself. They shortlisted options based on my budget, arranged viewings around my schedule, and handled the entire lease agreement without a single delay.",
    "I appreciated how they explained every clause in the contract before I signed. As a first-time renter in a new country, I really valued that clarity.",
  ],
  default: [
    "Finding a home in Dubai was overwhelming, but Noor & Hoor made it easy. They understood our needs, showed the best options, and handled all paperwork.",
    "Excellent service from start to finish. They helped us secure a premium commercial space quickly with complete transparency.",
    "As an overseas investor, I trust their team to manage tenants, maintenance, and rent collection, giving me complete peace of mind.",
  ],
};

const PEOPLE = {
  home: [
    ["Tariq Al-Mansoori", "Senior Executive"],
    ["Fatima Al-Hashimi", "Founder & CEO"],
    ["Zayan Al-Sayed", "Managing Director"],
  ],
  buy: [
    ["James Whitfield", "Investment Banker, London"],
    ["Mei Lin Chen", "Business Owner, Singapore"],
    ["Carlos Mendoza", "Tech Entrepreneur, Toronto"],
  ],
  rent: [
    ["Michael Turner", "Consultant, New York"],
    ["Hana Yoshida", "Marketing Executive, Tokyo"],
    ["Camille Dubois", "Graphic Designer, Paris"],
  ],
};

const COPY = {
  home: {
    heading: "What Our Clients Say",
    description:
      "Real stories from people who found their perfect spaces with us. Our dedicated team works tirelessly to ensure your real estate journey is smooth, rewarding, and completely stress-free.",
  },
  buy: {
    heading: "What Our Clients Say",
    description:
      "Hear directly from clients who trusted us with their biggest investment.",
  },
  rent: {
    heading: "What Our Customers Say",
    description:
      "Real experiences from tenants who found their home through our rental process.",
  },
  sell: {
    heading: "What Our Customers Say",
    description:
      "Our experienced selling agents provide professional and transparent support.",
  },
};

function TestimonialCard({ quote, person }) {
  const [name, title] = person;

  return (
    <article className="flex h-full min-h-[320px] w-full flex-col gap-6 rounded-xl border border-[#e9c34926] p-5 transition hover:border-[#e9c34973] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-[#ba8a44] text-[#ba8a44]"
              strokeWidth={0}
            />
          ))}
        </div>
        <Quote
          className="h-6 w-6 shrink-0 fill-[#ba8a44] text-[#ba8a44]"
          strokeWidth={0}
        />
      </div>

      <p className="flex-1 text-sm leading-7 text-white/90 sm:text-base">
        “{quote}”
      </p>

      <div className="border-t border-[#e9c34926] pt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-white">
          {name}
        </p>
        <p className="mt-1 text-xs text-white/60">{title}</p>
      </div>
    </article>
  );
}

export default function TestimonialSection({ variant = "home" }) {
  const copy = COPY[variant] || COPY.home;
  const people = PEOPLE[variant] || PEOPLE.home;
  const quotes = QUOTES[variant] || QUOTES.default;

  return (
    <section className="section-container flex flex-col items-center">
      <div className="mb-10 flex max-w-3xl flex-col items-center gap-4 text-center sm:mb-12">
        <p className="section-sub-heading">Testimonials</p>
        <h2 className="text-gold-gradient">{copy.heading}</h2>
        <div className="section-divider" />
        <p className="text-sm leading-relaxed text-white/85 sm:text-base">
          {copy.description}
        </p>
      </div>

      <div className="grid w-full max-w-[1120px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {quotes.map((quote, index) => (
          <TestimonialCard
            key={people[index][0]}
            quote={quote}
            person={people[index]}
          />
        ))}
      </div>
    </section>
  );
}
