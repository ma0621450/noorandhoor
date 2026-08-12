import Image from "next/image";
import quoteIcon from "@/public/images/buy/testimonials/quote.svg";
import starIcon from "@/public/images/buy/testimonials/star.svg";

export default function BuyTestimonialCard({ testimonial }) {
  const { quote, name, title, avatar } = testimonial;

  return (
    <article className="relative flex h-full min-h-[438px] w-full cursor-pointer flex-col gap-8 border border-[rgba(233,195,73,0.15)] px-[41px] pb-[67px] pt-[41px] transition hover:border-[rgba(233,195,73,0.45)]">
      <Image
        src={quoteIcon}
        alt=""
        width={17}
        height={12}
        className="absolute right-8 top-8"
      />

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={starIcon}
            alt=""
            width={20}
            height={19}
            className="h-[19px] w-5"
          />
        ))}
      </div>

      <p className="flex-1 text-base font-light leading-[26px] text-[#f5f5f5]">
        {quote}
      </p>

      <div className="mt-auto border-t border-[rgba(233,195,73,0.1)] pt-[25px]">
        <div className="flex items-center gap-5">
          <div className="relative size-12 shrink-0 overflow-hidden opacity-80 grayscale">
            <Image
              src={avatar}
              alt={name}
              fill
              sizes="48px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[13px] uppercase leading-6 tracking-[0.325px] text-[#f5f5f5]">
              {name}
            </p>
            <p className="text-xs font-light leading-6 text-[#f5f5f5]/80">
              {title}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
