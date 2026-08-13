import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";
import agentImage from "@/public/images/landingpage/team1.png";

export const PROPERTY_DETAIL = {
  slug: "spacious-apartment-with-parking",
  title: "Spacious Apartment With Parking",
  location: "Ajman, United Arab Emirates",
  price: 85000000,
  tags: [
    { label: "3 Beds", type: "bed" },
    { label: "2 Baths", type: "bath" },
    { label: "2,400 sqft", type: "area" },
    { label: "2 Parking", type: "parking" },
    { label: "Burj Khalifa", type: "view" },
    { label: "5 days ago", type: "calendar" },
  ],
  gallery: [
    propertyImg,
    luxuryHome,
    carousel1,
    carousel2,
    carousel3,
  ],
  about: [
    "Welcome to this stunning spacious apartment located in the heart of Dubai Marina. This beautifully designed residence offers modern living with breathtaking views and premium amenities.",
    "The apartment features high-end finishes throughout, floor-to-ceiling windows that flood the space with natural light, and an open-plan layout perfect for entertaining. With convenient parking for two vehicles and proximity to world-class dining, shopping, and entertainment, this property represents the pinnacle of Dubai luxury living.",
  ],
  documents: [
    { name: "Purchase-Agreement", available: false },
    { name: "Offering-Memorandum", available: true },
    { name: "Market-Information", available: false },
  ],
  map: {
    lat: 25.4052,
    lng: 55.5136,
    label: "Ajman, UAE",
  },
  features: [
    "Air Conditioning",
    "Sauna",
    "Window Coverings",
    "Laundry",
    "Swimming Pool",
    "Lawn",
    "WiFi",
  ],
  agent: {
    name: "Waqar ahmed",
    image: agentImage,
    phone: "+971526938886",
  },
};

export const RENT_PROPERTY_DETAIL = {
  slug: "spacious-apartment-with-parking",
  title: "Spacious Apartment With Parking",
  location: "Ajman, United Arab Emirates",
  price: 120000,
  priceLabel: "Monthly Rent",
  tags: [
    { label: "3 Beds", type: "bed" },
    { label: "2 Baths", type: "bath" },
    { label: "2,400 sqft", type: "area" },
    { label: "2 Parking", type: "parking" },
    { label: "Burj Khalifa", type: "view" },
    { label: "5 days ago", type: "calendar" },
  ],
  gallery: [
    propertyImg,
    luxuryHome,
    carousel1,
    carousel2,
    carousel3,
  ],
  about: [
    "Discover refined luxury in this exquisite 3-bedroom apartment, perfectly situated in the heart of Ajman with breathtaking views of the iconic Burj Khalifa. Spanning 2,400 sq ft, this residence offers an exceptional blend of comfort, elegance, and modern living.",
    "Each room has been meticulously designed to provide both beauty and functionality. Floor-to-ceiling windows fill the spaces with natural light, while 2 dedicated parking spaces and modern bathrooms complete this outstanding rental opportunity.",
  ],
  description: [
    "Type: Luxury Apartment",
    "Bedrooms: 3 spacious bedrooms with built-in wardrobes",
    "Bathrooms: 2 modern bathrooms with premium fixtures",
    "Parking: 2 covered parking spaces",
    "View: Stunning Burj Khalifa views",
  ],
  features: [
    "High-speed Internet",
    "Central A/C",
    "Swimming Pool",
    "24/7 Security",
    "Fitness Center",
    "Balcony",
  ],
  map: {
    lat: 25.4052,
    lng: 55.5136,
    label: "Ajman, UAE",
  },
  agent: {
    name: "Waqar ahmed",
    image: agentImage,
    phone: "+971526938886",
  },
};

export const RELATED_PROPERTIES = [
  {
    id: 1,
    images: [apartmentsImage, carousel1],
    title: "Spacious Apartment",
    location: "Ajman, United Arab Emirates",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    slug: "spacious-apartment-with-parking",
  },
  {
    id: 2,
    images: [carousel4, villasImage],
    title: "Downtown Apartment",
    location: "Abu Dhabi, United Arab Emirates",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    slug: "downtown-apartment",
  },
  {
    id: 3,
    images: [penthouseImage, carousel2],
    title: "Two-Bedroom With Sauna",
    location: "Abu Dhabi, United Arab Emirates",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    slug: "two-bedroom-with-sauna",
  },
  {
    id: 4,
    images: [otherPropertiesImage, townhousesImage, carousel3],
    title: "Triplex Apartment",
    location: "Sharjah, United Arab Emirates",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    slug: "triplex-apartment",
  },
];

export const DETAIL_FAQS = [
  {
    id: 1,
    question: "What is the minimum investment required for Noor & Hoor?",
    answer:
      "The minimum investment is AED250,000 for properties in non-premium zones and AED 800,000 for properties in premium zones.",
  },
  {
    id: 2,
    question: "How can I find good real estate agents in Dubai?",
    answer:
      "Work with licensed brokers like Noor & Hoor who specialize in your preferred communities and investment goals.",
  },
  {
    id: 3,
    question: "Who is the best real estate broker in Dubai?",
    answer:
      "The best broker depends on your needs. We provide end-to-end support from selection to handover.",
  },
  {
    id: 4,
    question: "How long does the property purchase process take?",
    answer:
      "Most purchases complete within a few weeks, depending on financing, documentation, and developer timelines.",
  },
  {
    id: 5,
    question: "How much down payment is typically needed?",
    answer:
      "Down payments commonly start around 20%, though exact figures vary by bank and property type.",
  },
  {
    id: 6,
    question: "How do I determine the value of my property?",
    answer:
      "We provide comparative market analysis based on recent sales, community demand, and property condition to help you price accurately.",
  },
];
