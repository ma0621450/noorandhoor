import developer1 from "@/public/images/landingpage/developer1.png";
import developer2 from "@/public/images/landingpage/developer2.png";
import developer3 from "@/public/images/landingpage/developer3.png";
import developer4 from "@/public/images/landingpage/developer4.png";
import developer5 from "@/public/images/landingpage/developer5.png";
import developer6 from "@/public/images/landingpage/developer6.png";
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

export const FEATURED_DEVELOPERS = [
  { name: "Emaar", logo: developer1, image: carousel1, cta: "View Live Projects" },
  { name: "Nakheel", logo: developer2, image: carousel2, cta: "View Live Projects" },
  { name: "Damac", logo: developer3, image: carousel3, cta: "View Live Projects" },
  { name: "Sobha", logo: developer4, image: carousel4, cta: "View Live Projects" },
  { name: "Omniyat", logo: developer5, image: luxuryHome, cta: "Request Portfolio" },
  { name: "wasl", logo: developer6, image: propertyImg, cta: "Request Portfolio" },
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

export const FAQ_RESOURCES = [
  { title: "The 2030 Strategic Plan", image: carousel1 },
  { title: "Understanding Real Estate Market Development", image: carousel2 },
  { title: "Developer Reputation & Strategic Choices", image: carousel3 },
];

export const DEVELOPER_FAQS = [
  {
    id: 1,
    question: "How to buy off-plan property?",
    answer:
      "Reserve a unit with the developer, complete KYC and the sales agreement, then follow the payment plan through to handover. We guide you at every step.",
  },
  {
    id: 2,
    question: "Which developers offer payment plans?",
    answer:
      "Most leading UAE developers offer structured payment plans. We match you with options that fit your timeline and capital.",
  },
  {
    id: 3,
    question: "Is off-plan property a good investment?",
    answer:
      "Off-plan can deliver strong capital growth when you choose a proven developer, a high-demand community, and a realistic payment schedule.",
  },
  {
    id: 4,
    question: "What are core commercial properties?",
    answer:
      "Core commercial assets include offices, retail, and mixed-use space in established districts with stable occupancy and long leases.",
  },
  {
    id: 5,
    question: "How to buy a plan property?",
    answer:
      "Select the project, review the payment plan, sign the SPA, and complete milestone payments until completion and title transfer.",
  },
];
