import DetailHeader from "@/components/sections/detail/DetailHeader";
import DetailGallery from "@/components/sections/detail/DetailGallery";
import OffPlanListedDate from "@/components/sections/offplan/OffPlanListedDate";
import OffPlanPaymentPlan from "@/components/sections/offplan/OffPlanPaymentPlan";
import OffPlanPropertyFeatures from "@/components/sections/offplan/OffPlanPropertyFeatures";
import DetailRelated from "@/components/sections/detail/DetailRelated";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import { PROPERTY_DETAIL } from "@/components/sections/detail/detailData";
import {
  getOffPlanCategory,
  getRelatedOffPlanHomes,
} from "@/components/sections/offplan/offplanCategoryConfig";

export default async function OffPlanCategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getOffPlanCategory(categoryKey);
  const home =
    category.homes.find((item) => item.slug === slug) || category.homes[0];
  const related = getRelatedOffPlanHomes(category, home.slug, 4);

  const property = {
    ...PROPERTY_DETAIL,
    slug,
    title: home.title,
    location: home.location,
    price: home.price,
    gallery:
      home.images?.length >= 5
        ? home.images
        : [...(home.images || []), ...PROPERTY_DETAIL.gallery].slice(0, 5),
  };

  return (
    <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
      <DetailHeader
        property={property}
        breadcrumbLabel="off plan Properties"
        breadcrumbHref="/off-plan"
        breadcrumbCurrent={category.heading}
      />
      <DetailGallery images={property.gallery} />
      <OffPlanListedDate />
      <OffPlanPaymentPlan />
      <OffPlanPropertyFeatures categoryLabel={category.heading} />
      <DetailRelated
        basePath={category.path}
        properties={related}
        heading="Explore Similar Offplan Properties"
      />
      <PropertyJourneyCta variant="offplan" heading="Ready to Start Your Holiday Property Journey?" />
    </div>
  );
}
