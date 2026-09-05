import TestimonialSlider from "@/components/common/TestimonialSlider";

const QUOTES = {
  home: [
    "Finding a home in Dubai was overwhelming, but Noor & Hoor made it easy. They understood our needs, showed the best options, and handled all paperwork. Truly an honest team.",
    "Excellent service from start to finish! They helped us secure a premium commercial space in record time. Highly professional, transparent, and efficient.",
    "As an overseas investor, I trust them fully to manage my apartments. Their exceptional team handles tenants, maintenance, and rent collection flawlessly, giving me absolute peace of mind.",
    "Their market knowledge is outstanding. They guided us to a villa that checked every box, negotiated firmly, and kept communication clear throughout.",
    "From the first call to handover, the experience felt premium. Responsive, trustworthy, and genuinely invested in getting the right outcome for us.",
  ],
  buy: [
    "I was buying from overseas and nervous about it. The team walked me through every single step, answered every question at odd hours, and made sure I never felt lost. By the time I signed, I felt like I'd known them for years.",
    "From property match to handover, everything felt organized. I never had to chase anyone for updates, which made the whole process far less stressful than I expected it to be.",
    "I appreciated how honest they were about pricing and location trade-offs. No sales pressure, just real advice. It made my decision so much easier, and I trusted every recommendation they gave me.",
    "They shortlisted quality options fast, arranged viewings efficiently, and handled due diligence with complete transparency. A truly professional buying partner.",
    "Clear timelines, strong negotiation, and excellent after-sales support. I would recommend Noor & Hoor to anyone buying in the UAE.",
  ],
  rent: [
    "The whole process was faster than I expected. I moved in within a week, and the team handled every document properly from start to finish.",
    "I was relocating for work and had zero time to search for a place myself. They shortlisted options based on my budget, arranged viewings around my schedule, and handled the entire lease agreement without a single delay.",
    "I appreciated how they explained every clause in the contract before I signed. As a first-time renter in a new country, I really valued that clarity.",
    "Professional, friendly, and reliable. Finding a rental in Dubai felt simple because they managed the hard parts for me.",
    "Great communication and carefully vetted listings. I felt confident in every recommendation they made.",
  ],
  default: [
    "Finding a home in Dubai was overwhelming, but Noor & Hoor made it easy. They understood our needs, showed the best options, and handled all paperwork.",
    "Excellent service from start to finish. They helped us secure a premium commercial space quickly with complete transparency.",
    "As an overseas investor, I trust their team to manage tenants, maintenance, and rent collection, giving me complete peace of mind.",
    "Clear advice, smooth paperwork, and consistent follow-up. The team made a complex process feel straightforward.",
    "Professional service with genuine care for client goals. I felt supported at every stage of the journey.",
  ],
};

const PEOPLE = {
  home: [
    ["Tariq Al-Mansoori", "Senior Executive"],
    ["Fatima Al-Hashimi", "Founder & CEO"],
    ["Zayan Al-Sayed", "Managing Director"],
    ["Aisha Rahman", "Portfolio Investor"],
    ["Omar Haddad", "Family Office Advisor"],
  ],
  buy: [
    ["James Whitfield", "Investment Banker, London"],
    ["Mei Lin Chen", "Business Owner, Singapore"],
    ["Carlos Mendoza", "Tech Entrepreneur, Toronto"],
    ["Sofia Alvarez", "Private Investor, Madrid"],
    ["Daniel Okonkwo", "Consultant, Lagos"],
  ],
  rent: [
    ["Michael Turner", "Consultant, New York"],
    ["Hana Yoshida", "Marketing Executive, Tokyo"],
    ["Camille Dubois", "Graphic Designer, Paris"],
    ["Liam O'Connor", "Engineer, Dublin"],
    ["Noor Al-Farsi", "Product Manager, Muscat"],
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
