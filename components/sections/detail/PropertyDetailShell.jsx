"use client";

import Link from "next/link";
import DetailHeader from "@/components/sections/detail/DetailHeader";
import DetailGallery from "@/components/sections/detail/DetailGallery";
import DetailAbout from "@/components/sections/detail/DetailAbout";
import DetailAboutRent from "@/components/sections/detail/DetailAboutRent";
import DetailFeatures from "@/components/sections/detail/DetailFeatures";
import DetailRelated from "@/components/sections/detail/DetailRelated";
import FaqSection from "@/components/common/FaqSection";
import DetailAgentContact from "@/components/sections/detail/DetailAgentContact";
import DetailAgentContactRent from "@/components/sections/detail/DetailAgentContactRent";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import OffPlanListedDate from "@/components/sections/offplan/OffPlanListedDate";
import OffPlanPaymentPlan from "@/components/sections/offplan/OffPlanPaymentPlan";
import OffPlanPropertyFeatures from "@/components/sections/offplan/OffPlanPropertyFeatures";
import useAdminProperties from "@/hooks/useAdminProperties";
import {
  adminToDetailProperty,
  findAdminProperty,
  isPublicProperty,
  relatedListingHomes,
} from "@/lib/admin/propertyPublic";
import { formatDisplayDate } from "@/lib/admin/utils";

export default function PropertyDetailShell({
  variant = "buy",
  slug,
  market,
  header,
  relatedHeading,
  relatedEyebrow,
  offPlanCategoryLabel,
}) {
  const { properties, isReady } = useAdminProperties();
  const matched =
    isReady && slug ? findAdminProperty(properties, slug, market) : null;
  const admin = matched && isPublicProperty(matched) ? matched : null;
  const property = admin ? adminToDetailProperty(admin) : null;
  const related = admin ? relatedListingHomes(properties, admin) : [];

  if (!isReady) {
    return <div className="min-h-[70vh] w-full bg-[#111111]" />;
  }

  if (!property) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 bg-[#111111] px-6 text-center text-white">
        <p className="text-lg">This property is not available.</p>
        <Link
          href={header?.breadcrumbHref || "/buy/properties"}
          className="text-sm text-[#eec876] underline-offset-4 hover:underline"
        >
          Back to listings
        </Link>
      </div>
    );
  }

  if (variant === "off-plan") {
    return (
      <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
        <DetailHeader property={property} {...header} />
        <DetailGallery images={property.gallery} />
        <OffPlanListedDate
          date={
            property.listedAt
              ? formatDisplayDate(property.listedAt)
              : "27 June 2026"
          }
        />
        <OffPlanPaymentPlan defaultPrice={property.price} />
        <OffPlanPropertyFeatures
          categoryLabel={offPlanCategoryLabel}
          property={property}
        />
        <DetailRelated
          basePath={header.breadcrumbHref}
          properties={related}
          heading={relatedHeading || "Explore Similar Offplan Properties"}
        />
        <PropertyJourneyCta
          variant="offplan"
          heading="Ready to Start Your Holiday Property Journey?"
        />
      </div>
    );
  }

  if (variant === "buy") {
    return (
      <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
        <DetailHeader property={property} {...header} />
        <DetailGallery images={property.gallery} />
        <DetailAbout property={property} />
        <DetailFeatures features={property.features} />
        <DetailRelated
          basePath={header.breadcrumbHref}
          properties={related}
        />
        <FaqSection variant="detail" />
        <DetailAgentContact />
        <PropertyJourneyCta variant="buy" />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
      <DetailHeader property={property} {...header} />
      <DetailGallery images={property.gallery} />
      <DetailAboutRent property={property} />
      <DetailRelated
        basePath={header.breadcrumbHref}
        eyebrow={relatedEyebrow || "Related Properties"}
        heading={relatedHeading}
        properties={related}
      />
      <FaqSection variant="detail" />
      <DetailAgentContactRent />
      <PropertyJourneyCta variant="detail" />
    </div>
  );
}
