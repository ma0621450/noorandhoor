import Link from "next/link";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";

export default function FeaturedPropertySection({
  eyebrow = "Featured Properties",
  title,
  href,
  ctaLabel = "View Properties",
  properties,
  badge,
  categoryLabel,
}) {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">{eyebrow}</h3>
          <h2 className="text-gold-gradient max-w-[640px]">{title}</h2>
        </div>

        {href ? (
          <Link href={href} className="w-full shrink-0 sm:w-auto lg:self-end">
            <Button variant="secondary" className="h-14 w-full sm:w-auto">
              {ctaLabel}
            </Button>
          </Link>
        ) : null}
      </div>

      {categoryLabel ? (
        <p className="mb-6 text-xs font-normal uppercase tracking-[2.2px] text-[#E9C349]">
          {categoryLabel}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            badge={property.badge || badge}
          />
        ))}
      </div>
    </section>
  );
}
