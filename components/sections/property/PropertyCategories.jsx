"use client";

import { useMemo } from "react";
import LocationCard from "@/components/ui/LocationCard";
import useAdminProperties from "@/hooks/useAdminProperties";
import { NAV_ITEMS } from "@/components/layout/navData";
import { listingHomes } from "@/lib/admin/propertyPublic";
import villasImage from "@/public/images/buy/villas.png";
import apartmentsImage from "@/public/images/buy/apartments.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import dubaiImage from "@/public/images/landingpage/dubai.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";

const CATEGORY_IMAGES = {
  villas: villasImage,
  apartments: apartmentsImage,
  townhouses: townhousesImage,
  penthouses: penthouseImage,
  houses: villasImage,
  properties: otherPropertiesImage,
  dubai: dubaiImage,
  "noor-hoor": luxuryHome,
  commercial: propertyImg,
  guide: penthouseImage,
};

const MARKET_NAV = {
  buy: "/buy",
  rent: "/rent",
  sell: "/sell",
  "off-plan": "/off-plan",
};

function navLinksForMarket(market) {
  const href = MARKET_NAV[market];
  return NAV_ITEMS.find((item) => item.href === href)?.links || [];
}

function categoryKeyFromHref(href) {
  return href.split("/").filter(Boolean).at(-1) || "";
}

const COPY = {
  buy: {
    eyebrow: "Categories",
    title: "Property Categories",
    description: "Tailored architecture to match your intent",
  },
  rent: {
    eyebrow: "Categories",
    title: "Rental Categories",
    description: "Find the right rental type for your lifestyle",
  },
  sell: {
    eyebrow: "Categories",
    title: "Selling Categories",
    description: "Choose how you want to list and sell",
  },
  "off-plan": {
    eyebrow: "Categories",
    title: "Off Plan Categories",
    description: "Explore developments by property type",
  },
};

function countLabel(count) {
  return `${count} ${count === 1 ? "Property" : "Properties"}`;
}

export default function PropertyCategories({ market = "buy" }) {
  const { properties, isReady } = useAdminProperties();

  const categories = useMemo(() => {
    return navLinksForMarket(market).map((item) => {
      const key = categoryKeyFromHref(item.href);
      const count = isReady
        ? listingHomes(properties, {
            market,
            category: { key, path: item.href },
          }).length
        : null;

      return {
        key: item.href,
        name: item.label,
        href: item.href,
        image: CATEGORY_IMAGES[key] || otherPropertiesImage,
        propertyCount: count,
      };
    });
  }, [isReady, market, properties]);

  const copy = COPY[market] || COPY.buy;

  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="section-sub-heading !text-[#B3813D]">{copy.eyebrow}</h3>
        <h2 className="text-gold-gradient">{copy.title}</h2>
        <div className="section-divider" />
        <p className="max-w-[346px] text-sm text-[#f5f5f5] md:text-base">
          {copy.description}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 lg:mt-12 lg:gap-8">
        {categories.map((category) => (
          <LocationCard
            key={category.key}
            image={category.image}
            name={category.name}
            subtitle={
              category.propertyCount == null
                ? "Loading..."
                : countLabel(category.propertyCount)
            }
            href={category.href}
            width={290}
          />
        ))}
      </div>
    </section>
  );
}
