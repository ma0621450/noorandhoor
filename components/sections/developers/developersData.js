import developer1 from "@/public/images/landingpage/developer1.png";
import developer2 from "@/public/images/landingpage/developer2.png";
import developer3 from "@/public/images/landingpage/developer3.png";
import developer4 from "@/public/images/landingpage/developer4.png";
import developer5 from "@/public/images/landingpage/developer5.png";
import developer6 from "@/public/images/landingpage/developer6.png";
import partnerAll from "@/public/images/buy/partners/all.png";
import partnerModern from "@/public/images/buy/partners/modern.png";
import partnerEco from "@/public/images/buy/partners/eco.png";
import partnerLuxury from "@/public/images/buy/partners/luxury.png";
import partnerEmirates from "@/public/images/buy/partners/emirates.png";
import cardAll from "@/public/images/buy/partners/card-all.png";
import cardModern from "@/public/images/buy/partners/card-modern.png";
import card1 from "@/public/images/buy/partners/card-1.png";
import card2 from "@/public/images/buy/partners/card-2.png";
import card3 from "@/public/images/buy/partners/card-3.png";
import card4 from "@/public/images/buy/partners/card-4.png";
import card5 from "@/public/images/buy/partners/card-5.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import dubai2024 from "@/public/images/buy/insights/dubai-2024.png";
import dubaiQ1 from "@/public/images/buy/insights/dubai-q1-2025.png";
import dubaiQ2 from "@/public/images/buy/insights/dubai-q2-2025.png";
import buyHero from "@/public/images/buy/hero/buy-hero.jpg";

export const CATEGORY_PILLS = [
  "Off-Plan Properties",
  "Existing Properties",
  "Ultra Luxury",
];

const DEVELOPER_IMAGES = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  luxuryHome,
  propertyImg,
  card1,
  card2,
  card3,
  card4,
  card5,
];

function featuredDeveloper(name, logo, image, cta = "View Live Projects") {
  return { name, region: "Dubai", logo, image, cta };
}

export const FEATURED_DEVELOPERS = [
  featuredDeveloper("All Real Estate", partnerAll, card1),
  featuredDeveloper("Modern House Real Estate", partnerModern, cardModern),
  featuredDeveloper("Eco House Real Estate", partnerEco, card3),
  featuredDeveloper("Luxury Real Estate", partnerLuxury, card4),
  featuredDeveloper("Emirates Real Estate", partnerEmirates, card5),
  featuredDeveloper("Emaar Properties", developer1, carousel1),
  featuredDeveloper("DAMAC", developer3, carousel3),
  featuredDeveloper("Sobha Realty", developer4, carousel4),
  featuredDeveloper("Nakheel", developer2, carousel2),
  featuredDeveloper("Meraas", developer5, luxuryHome),
  featuredDeveloper("Binghatti", developer6, propertyImg),
  featuredDeveloper("Danube", developer1, DEVELOPER_IMAGES[0]),
  featuredDeveloper("Ellington", developer2, DEVELOPER_IMAGES[1]),
  featuredDeveloper("Aldar", developer3, DEVELOPER_IMAGES[2]),
  featuredDeveloper("Azizi", developer4, DEVELOPER_IMAGES[3]),
  featuredDeveloper("Samana", developer5, DEVELOPER_IMAGES[4]),
  featuredDeveloper("Omniyat", developer5, luxuryHome, "Request Portfolio"),
  featuredDeveloper("Wasl", developer6, propertyImg, "Request Portfolio"),
  featuredDeveloper("Deyaar", developer1, DEVELOPER_IMAGES[5]),
  featuredDeveloper("Alain", developer2, DEVELOPER_IMAGES[6]),
];

export const COMPARISON_ROWS = [
  { developer: "Emaar", specialty: "Core Specialty", milestone: "Low", rating: "A1" },
  { developer: "Nakheel", specialty: "Infrastructure Projects", milestone: "Yes", rating: "B2" },
  { developer: "wasl", specialty: "Luxury", milestone: "Yes", rating: "B1" },
  { developer: "Sobha", specialty: "Retail / Commercial", milestone: "High", rating: "A2" },
  { developer: "Damac", specialty: "Infrastructure", milestone: "Yes", rating: "B2" },
  { developer: "Omniyat", specialty: "Hospitality", milestone: "Yes", rating: "A3" },
];

export const BUYER_GUIDES = [
  {
    title: "Top Dubai 2024 Market Data Due Diligence Playbook",
    image: dubai2024,
    name: "BOBAI",
    location: "Downtown, Palm",
  },
  {
    title: "Understanding Post-Handover Payment Plans",
    image: dubaiQ1,
    name: "ADII ONMRI",
    location: "West Dubai",
  },
  {
    title: "Developer Selection Checklist",
    image: dubaiQ2,
    name: "NORTHERN MARKETS",
    location: "Eti-Osa, Lagos",
  },
  {
    title: "Portfolio Diversification Playbook",
    image: buyHero,
    name: "TORCHLIGHT",
    location: "Sintang, Borneo",
  },
];

export const DEVELOPER_FAQS = [
  {
    id: 1,
    question: "How do I choose the right developer?",
    answer:
      "Look at the developer's past projects, delivery record, build quality, and overall reputation. We only work with developers who meet our standards for reliability and quality.",
  },
  {
    id: 2,
    question: "Are all developers on this platform verified?",
    answer:
      "Yes! We carefully review each developer's financial background, project history, reputation, and quality standards before listing their projects on our platform.",
  },
  {
    id: 3,
    question: "Do these developers offer payment plans?",
    answer:
      "Yes, most developers offer flexible payment plans, often starting with a small booking deposit. The payment structure and schedule can vary depending on the project.",
  },
  {
    id: 4,
    question: "Do developers offer after sales support?",
    answer:
      "Yes, most developers provide after sales support after handover, which may include maintenance assistance, warranties, and other property related services depending on the project.",
  },
  {
    id: 5,
    question: "How do I start working with a developer?",
    answer:
      "Simply book a free consultation with our team. We'll understand your goals, budget, and preferences, then connect you with a developer and project that best matches your needs.",
  },
];
