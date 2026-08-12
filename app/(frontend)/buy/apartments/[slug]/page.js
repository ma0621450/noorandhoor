import DetailHeader from "@/components/sections/detail/DetailHeader";
import DetailGallery from "@/components/sections/detail/DetailGallery";
import DetailAbout from "@/components/sections/detail/DetailAbout";
import DetailFeatures from "@/components/sections/detail/DetailFeatures";
import DetailRelated from "@/components/sections/detail/DetailRelated";
import DetailFAQs from "@/components/sections/detail/DetailFAQs";
import DetailAgentContact from "@/components/sections/detail/DetailAgentContact";
import BuyGetStarted from "@/components/sections/buy/BuyGetStarted";
import { PROPERTY_DETAIL } from "@/components/sections/detail/detailData";

export function generateStaticParams() {
  return [
    { slug: PROPERTY_DETAIL.slug },
    { slug: "downtown-apartment" },
    { slug: "two-bedroom-with-sauna" },
    { slug: "triplex-apartment" },
  ];
}

export function generateMetadata({ params }) {
  return {
    title: `${PROPERTY_DETAIL.title} | Noor and Hoor`,
    description: PROPERTY_DETAIL.about[0],
  };
}

export default async function BuyApartmentDetailPage({ params }) {
  const { slug } = await params;
  const property = { ...PROPERTY_DETAIL, slug };

  return (
    <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
      <DetailHeader property={property} />
      <DetailGallery images={property.gallery} />
      <DetailAbout property={property} />
      <DetailFeatures />
      <DetailRelated />
      <DetailFAQs />
      <DetailAgentContact agent={property.agent} />
      <BuyGetStarted />
    </div>
  );
}
