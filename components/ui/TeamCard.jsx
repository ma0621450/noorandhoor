import Image from "next/image";
import teamCardBg from "@/public/images/landingpage/teamCardbg.png";

const TeamCard = ({ member }) => {
  const { image, name, title } = member;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#BC8741]">
      <div className="relative h-[320px]">
        <div className="absolute bottom-0 left-5 top-0 right-0">
          <Image
            src={teamCardBg}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain object-left"
            aria-hidden
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-0 flex justify-center overflow-hidden">
          <div className="relative h-full w-full max-w-full">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#BC8741] px-5 py-4">
        <p className="text-sm font-bold text-black">{name}</p>
        <p className="text-sm text-black">{title}</p>
      </div>
    </article>
  );
};

export default TeamCard;
