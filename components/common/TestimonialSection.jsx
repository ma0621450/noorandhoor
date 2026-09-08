import TestimonialSlider from "@/components/common/TestimonialSlider";

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
    "I wanted to diversify my portfolio with a UAE property but wasn't familiar with the market. Their team helped me understand the different areas, investment options, and potential returns without making unrealistic promises. I felt confident throughout.",
    "Buying a property from another country felt complicated at first, but the team made it surprisingly easy. They arranged virtual viewings, handled the paperwork, and kept me updated at every stage. I couldn't have asked for a smoother experience.",
  ],
  rent: [
    "The whole process was faster than I expected. I moved in within a week, and the team handled every document properly from start to finish.",
    "I was relocating for work and had zero time to search for a place myself. They shortlisted options based on my budget, arranged viewings around my schedule, and handled the entire lease agreement without a single delay.",
    "I appreciated how they explained every clause in the contract before I signed. As a first-time renter in a new country, I really valued that clarity.",
  ],
  sell: [
    "I was nervous about pricing it right, but they walked me through every number until I felt confident. Sold within a month, and I never once felt in the dark.",
    "Selling a property you've lived in for years is emotional. They understood that and never rushed me, just kept things moving at a pace I was comfortable with.",
    "What stood out was how honest they were about my asking price. They didn't just tell me what I wanted to hear and that honesty got me a better deal in the end.",
    "I sold my late father's apartment through them. They were patient and respectful through what was a hard time for our family, that meant more than the sale itself.",
    "Honestly, I expected a lot of back-and-forth and stress. Instead, I had one point of contact who handled everything and actually returned my calls.",
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
    ["Omar Khalid", "Real Estate Investor, Riyadh"],
    ["Emily Carter", "Corporate Executive, Melbourne"],
  ],
  rent: [
    ["Michael Turner", "Consultant, New York"],
    ["Hana Yoshida", "Marketing Executive, Tokyo"],
    ["Camille Dubois", "Graphic Designer, Paris"],
  ],
  sell: [
    ["Ahmed Al-Rashidi", "Villa Owner, Dubai Hills"],
    ["Elena Petrova", "Apartment Owner, JBR"],
    ["Layla Haddad", "Penthouse Owner, Palm Jumeirah"],
    ["Fatima Hassan", "Family Representative, Al Barsha"],
    ["David Chen", "Townhouse Owner, Arabian Ranches"],
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
    heading: "What Our Sellers Say",
    description:
      "Real experiences from property owners who trusted us to sell with care, speed, and honesty.",
  },
};

export default function TestimonialSection({ variant = "home" }) {
  const copy = COPY[variant] || COPY.home;
  const people = PEOPLE[variant] || PEOPLE.home;
  const quotes = QUOTES[variant] || QUOTES.default;
  const items = quotes.map((quote, index) => ({
    quote,
    person: people[index] || people[0],
    name: (people[index] || people[0])[0],
  }));

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

      <TestimonialSlider items={items} />
    </section>
  );
}
