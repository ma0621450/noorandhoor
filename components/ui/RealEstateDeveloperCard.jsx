import Image from "next/image";
import { ChevronRight } from "lucide-react";

const RealEstateDeveloperCard = ({ developer }) => {
  const { image, name, handover, description } = developer;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#ba8a44]/40 bg-[#121212]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div
          className="absolute left-4 top-4 rounded-md px-3 py-1.5 text-xs font-medium text-[#F5F5F5]"
          style={{
            background:
              "linear-gradient(135deg, rgba(188, 135, 65, 0.4), rgba(214, 168, 94, 0.4)) padding-box, linear-gradient(135deg, rgba(188, 135, 65, 0.3), rgba(214, 168, 94, 0.3)) border-box",
            border: "1px solid transparent",
            backdropFilter: "blur(11.55px)",
            WebkitBackdropFilter: "blur(11.55px)",
          }}
        >
          Handover: {handover}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="flex items-center gap-1 text-sm font-semibold text-[#ba8a44]">
          {name}
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-white/90">
          {description}
        </p>
      </div>
    </article>
  );
};

export default RealEstateDeveloperCard;
