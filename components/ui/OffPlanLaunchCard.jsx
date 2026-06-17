import Image from "next/image";
import Button from "@/components/ui/Button";

const OffPlanLaunchCard = ({ launch }) => {
  const { image, title, developer, price } = launch;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#ba8a44]/40 bg-[#121212]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <h3 className="!font-accent text-sm font-normal uppercase leading-snug text-white">
            {title}
          </h3>
          <p className="text-xs font-semibold text-white">
            by <span className="text-[#ba8a44]">{developer}</span>
          </p>
          <p className="text-xs font-medium text-white">
            Starting Price{" "}
            <span className="text-[#ba8a44]">AED {price}</span>
          </p>
        </div>

        <Button variant="primary" className="w-full py-3 text-xs">
          View Details
        </Button>
      </div>
    </article>
  );
};

export default OffPlanLaunchCard;
