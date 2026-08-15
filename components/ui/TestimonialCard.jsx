import Image from "next/image";
import { Quote, Star } from "lucide-react";
import avatar from "@/public/svgs/user-avatar.svg";

const TestimonialCard = ({ testimonial }) => {
  const { quote, name, title } = testimonial;

  return (
    <article className="mx-auto flex h-full w-full max-w-none flex-col gap-6 border border-[#E9C34926] p-5 sm:p-8 md:p-10">
      <div className="flex items-start justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-[#ba8a44] text-[#ba8a44]"
              strokeWidth={0}
            />
          ))}
        </div>
        <Quote className="h-6 w-6 fill-[#ba8a44] text-[#ba8a44]" strokeWidth={0} />
      </div>

      <p className="text-sm leading-relaxed text-white">
        {quote}
      </p>

      <div className="mt-auto border-t border-[#E9C34926] pt-5">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold uppercase tracking-wide text-white">
              {name}
            </p>
            <p className="text-xs text-white/60">{title}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
