import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";
import heroBg from "@/public/images/landingpage/landingpagebg.jpg";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import buyHero from "@/public/images/buy/hero/buy-hero.jpg";
import dubai2024 from "@/public/images/buy/insights/dubai-2024.png";
import dubaiQ1 from "@/public/images/buy/insights/dubai-q1-2025.png";

export const BLOG_CATEGORIES = [
  "All",
  "Market Insights",
  "Off-Plan",
  "Buying Guide",
  "Investment",
  "Lifestyle",
];

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "dubai-property-market-trends",
    featured: true,
    image: carousel1,
    date: "March 12, 2026",
    category: "Market Insights",
    title: "Dubai Property Market Trends to Watch",
    excerpt:
      "Explore the latest shifts in Dubai's real estate market, from rising demand in waterfront communities to new off-plan launches shaping investor opportunities across the UAE.",
    paragraphs: [
      "Dubai's property market continues to attract global buyers, with waterfront communities, branded residences, and well-connected mid-market developments leading enquiry volumes in 2026.",
      "Demand remains strongest in established addresses such as Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay, while newer master communities are drawing investors looking for longer payment plans and capital growth.",
      "Off-plan launches are still a major part of the conversation. Buyers are paying closer attention to developer track records, handover timelines, and service-charge projections before committing.",
      "For end users, the focus has shifted toward liveable layouts, school access, and amenities that support daily life. Investors, meanwhile, are comparing rental yields against purchase price, community maturity, and upcoming infrastructure.",
    ],
    items: [
      "Waterfront and branded residences continue to command premium interest.",
      "Payment-plan flexibility is influencing off-plan buying decisions.",
      "Ready homes in mature communities remain attractive for rental income.",
      "Due diligence on developer delivery and community charges is essential.",
    ],
  },
  {
    id: 2,
    slug: "smart-guide-to-off-plan-investments",
    image: carousel2,
    date: "March 8, 2026",
    category: "Off-Plan",
    title: "A Smart Guide to Off-Plan Investments",
    excerpt:
      "Learn how off-plan properties work, what to evaluate before buying, and how to secure strong returns with the right developer, payment plan, and location strategy.",
    paragraphs: [
      "Off-plan property is purchased before construction is complete, usually directly from a developer. In the UAE, this route can offer staged payments, entry at launch pricing, and access to new communities before they are fully occupied.",
      "The opportunity comes with responsibility. Buyers should review the developer's previous handovers, construction progress, escrow arrangements, and the quality of comparable completed projects.",
      "Location still decides long-term value. A competitive payment plan is useful, but it cannot replace connectivity, amenities, and genuine demand in the surrounding area.",
      "A clear exit plan matters as much as the purchase. Decide whether you intend to occupy, rent, or resell, and check expected service charges, completion dates, and likely rental demand before you sign.",
    ],
    items: [
      "Confirm the developer’s delivery history and current construction status.",
      "Compare payment plans against your cash-flow and financing options.",
      "Review community plans, nearby schools, retail, and transport links.",
      "Ask about expected service charges and snagging support at handover.",
    ],
  },
  {
    id: 3,
    slug: "top-areas-to-buy-property-in-dubai",
    image: carousel3,
    date: "March 3, 2026",
    category: "Buying Guide",
    title: "Top Areas to Buy Property in Dubai",
    excerpt:
      "From Dubai Marina to Business Bay, discover the neighborhoods offering the best lifestyle, rental yields, and long-term value for homeowners and investors alike.",
    paragraphs: [
      "Choosing the right community is often more important than choosing the right tower. Dubai’s neighbourhoods differ in lifestyle, tenant demand, school catchments, and long-term capital growth.",
      "Dubai Marina and JBR remain popular with professionals who want waterfront living and strong short-term rental demand. Downtown Dubai appeals to buyers who value landmark addresses and city convenience.",
      "Palm Jumeirah continues to attract premium end users and investors looking for villa, apartment, and branded-residence options. Business Bay offers a more central, mixed-use alternative with a growing residential base.",
      "Newer master communities can offer more space and family amenities at a different price point. The right choice depends on whether you are buying to live, to rent, or to hold for growth.",
    ],
    items: [
      "Dubai Marina and JBR: lifestyle, views, and rental liquidity.",
      "Downtown Dubai: landmark living and city access.",
      "Palm Jumeirah: premium waterfront homes and villas.",
      "Business Bay: central apartments with mixed-use convenience.",
    ],
  },
  {
    id: 4,
    slug: "how-to-choose-the-right-developer",
    image: carousel4,
    date: "February 24, 2026",
    category: "Off-Plan",
    title: "How to Choose the Right Developer in the UAE",
    excerpt:
      "A developer’s track record can protect your capital. Here is how to assess delivery quality, community planning, and after-sales support before you buy.",
    paragraphs: [
      "In off-plan and new-build purchases, the developer is as important as the unit. A strong launch campaign is not the same as a strong handover.",
      "Start with completed projects. Visit them if you can, speak with residents, and look at finishing quality, common areas, and how the community has aged.",
      "Then review the pipeline. A developer with too many delayed projects, unclear escrow information, or frequent specification changes deserves extra caution.",
      "After-sales support is often overlooked. Snagging, warranty handling, and building management all affect your experience long after the reservation form is signed.",
    ],
    items: [
      "Inspect previously handed-over communities, not only show apartments.",
      "Check construction progress and published completion timelines.",
      "Ask how service charges are estimated and reviewed.",
      "Confirm the after-sales and snagging process in writing.",
    ],
  },
  {
    id: 5,
    slug: "understanding-dubai-rental-yields",
    image: dubai2024,
    date: "February 18, 2026",
    category: "Investment",
    title: "Understanding Dubai Rental Yields in 2026",
    excerpt:
      "Gross yield is only the starting point. Learn how occupancy, service charges, and community demand shape net returns for Dubai investors.",
    paragraphs: [
      "Rental yield remains one of the first numbers investors ask for, but it should never be read in isolation. Gross yield does not account for vacancy, service charges, furnishing, or agency fees.",
      "Communities with deep tenant demand and good transport links often deliver more reliable occupancy than headline-yield locations with thinner renter pools.",
      "Ready properties can start generating income immediately, while off-plan purchases delay cash flow until handover. That timing should sit inside your wider investment plan.",
      "A useful comparison looks at net yield, likely days vacant, and capital growth prospects together. Our advisors can help you model those numbers against specific buildings and unit types.",
    ],
    items: [
      "Use net yield, not only advertised gross yield.",
      "Factor in service charges, furnishing, and maintenance.",
      "Check tenant demand for the exact community and layout.",
      "Balance income today against growth over the next five years.",
    ],
  },
  {
    id: 6,
    slug: "selling-your-dubai-property",
    image: luxuryHome,
    date: "February 11, 2026",
    category: "Buying Guide",
    title: "Selling Your Dubai Property: What to Expect",
    excerpt:
      "From pricing strategy to viewings and transfer, here is a clear overview of how a well-managed sale typically unfolds in Dubai.",
    paragraphs: [
      "A successful sale starts with an honest valuation. Overpricing can slow enquiry, while underpricing can leave money on the table. Comparable recent transactions in the same building or community are the most useful guide.",
      "Presentation matters. Clear photography, accurate floor plans, and a well-prepared viewing experience help serious buyers move faster.",
      "Once an offer is accepted, the process typically includes a memorandum of understanding, deposit, NOC from the developer, and transfer at the Dubai Land Department.",
      "Working with an advisor who already understands your community can shorten the timeline and keep negotiations focused on qualified buyers.",
    ],
    items: [
      "Price against recent comparable sales, not asking prices.",
      "Prepare the home and listing materials before launching.",
      "Confirm developer NOC requirements early.",
      "Keep documents ready to avoid delays at transfer.",
    ],
  },
  {
    id: 7,
    slug: "palm-jumeirah-vs-dubai-marina",
    image: buyHero,
    date: "February 4, 2026",
    category: "Lifestyle",
    title: "Palm Jumeirah vs Dubai Marina: Which Lifestyle Fits You?",
    excerpt:
      "Two of Dubai’s most recognised waterfront addresses offer very different daily living. Compare space, atmosphere, and investment profile before you decide.",
    paragraphs: [
      "Palm Jumeirah and Dubai Marina are often compared because both offer waterfront living, but the day-to-day experience is not the same.",
      "The Palm is more residential and resort-like, with villas, low-rise buildings, and a quieter pace. It suits buyers who want space, privacy, and a landmark address.",
      "Dubai Marina is denser, more vertical, and closer to a walkable urban waterfront with restaurants, marinas, and a large professional renter base.",
      "Neither is universally better. The right choice depends on whether you value villa living and prestige, or city convenience and rental liquidity.",
    ],
    items: [
      "Choose Palm Jumeirah for space, villas, and a resort atmosphere.",
      "Choose Dubai Marina for apartments, amenities, and rental demand.",
      "Compare service charges and unit sizes, not only the view.",
      "Visit both at different times of day before you commit.",
    ],
  },
  {
    id: 8,
    slug: "off-plan-payment-plans-explained",
    image: dubaiQ1,
    date: "January 28, 2026",
    category: "Off-Plan",
    title: "Off-Plan Payment Plans Explained",
    excerpt:
      "Staged payments can make a new launch more accessible. Understand typical structures, post-handover options, and the questions to ask before you reserve.",
    paragraphs: [
      "Payment plans are one of the main reasons buyers consider off-plan property. Instead of paying the full amount upfront, you typically pay a booking amount, construction-linked instalments, and a handover balance.",
      "Some launches also offer post-handover plans. These can improve cash flow, but you should still confirm the total cost, any interest element, and what happens if completion is delayed.",
      "A plan that looks generous on paper may still be a poor fit if the instalments clash with your other commitments. Map every payment against your timeline before reserving.",
      "Always ask how payments are protected, which milestones trigger each instalment, and whether the schedule can change if construction moves faster or slower than expected.",
    ],
    items: [
      "List every instalment date and amount before you sign.",
      "Clarify what is due at booking, during construction, and at handover.",
      "Ask whether post-handover terms include additional fees.",
      "Confirm how payments are held and when they are released.",
    ],
  },
  {
    id: 9,
    slug: "first-time-buyer-checklist-dubai",
    image: heroBg,
    date: "January 21, 2026",
    category: "Buying Guide",
    title: "First-Time Buyer Checklist for Dubai",
    excerpt:
      "Buying your first home or investment in Dubai is more straightforward with a clear checklist covering budget, documents, viewings, and transfer.",
    paragraphs: [
      "First-time buyers in Dubai often feel there are too many moving parts: community choice, service charges, mortgage or cash purchase, and the transfer itself. A simple checklist keeps the process calm and complete.",
      "Begin with budget. Include the purchase price, DLD fees, agency commission, potential mortgage costs, furnishing, and annual service charges.",
      "Then shortlist communities that match your lifestyle or rental strategy. View more than one building, and compare layouts of the same bedroom count rather than relying on marketing images alone.",
      "When you are ready to proceed, your advisor can coordinate the offer, paperwork, and transfer so you know what is needed at each stage.",
    ],
    items: [
      "Set a total budget, including fees and service charges.",
      "Prepare identification and proof-of-funds documents early.",
      "View comparable homes in person or by video tour.",
      "Confirm occupancy, rental, and visa implications for your situation.",
    ],
  },
];

export function getBlogBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug, limit = 3) {
  return BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, limit);
}

export const LATEST_POSTS = BLOG_POSTS.slice(0, 3);
