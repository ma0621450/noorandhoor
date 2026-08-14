import Button from "@/components/ui/Button";
import DeveloperCard from "@/components/sections/developers/DeveloperCard";
import { FEATURED_DEVELOPERS } from "@/components/sections/developers/developersData";

export default function DevelopersFeatured() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Developers
          </p>
          <h2 className="text-gold-gradient text-left">Featured Developers</h2>
        </div>
        <Button
          variant="outline"
          className="h-[58px] w-full rounded-xl text-[13px] tracking-[1.3px] text-white sm:w-[234px]"
        >
          View More
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-[33px] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_DEVELOPERS.map((developer) => (
          <DeveloperCard key={developer.name} developer={developer} />
        ))}
      </div>
    </section>
  );
}
