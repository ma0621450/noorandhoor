import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";

const FEATURES = { bedroom: 6, bathroom: 2, area: 2900 };
const PRICE = 45000000;

const BASE_PROPERTIES = [
  {
    image: villasImage,
    title: "Palm Jumeirah Villa",
    location: "Dubai UAE",
  },
  {
    image: penthouseImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
  },
  {
    image: otherPropertiesImage,
    title: "Aljada Luxury Mansion",
    location: "Aljada, Sharjah",
  },
  {
    image: townhousesImage,
    title: "Al Zorah Beachfront Villa",
    location: "Al Zorah, Ajman",
  },
  {
    image: apartmentsImage,
    title: "Palm Jumeirah Villa",
    location: "Dubai UAE",
  },
  {
    image: luxuryHome,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
  },
  {
    image: propertyImg,
    title: "Aljada Luxury Mansion",
    location: "Aljada, Sharjah",
  },
  {
    image: carousel1,
    title: "Al Zorah Beachfront Villa",
    location: "Al Zorah, Ajman",
  },
];

export const OFF_PLAN_PROPERTIES = Array.from({ length: 12 }, (_, index) => {
  const base = BASE_PROPERTIES[index % BASE_PROPERTIES.length];
  return {
    id: index + 1,
    ...base,
    features: FEATURES,
    price: PRICE,
    featured: true,
  };
});
