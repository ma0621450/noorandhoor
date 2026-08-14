import Image from "next/image";
import Button from "@/components/ui/Button";

export default function DeveloperCard({ developer }) {
  const { name, logo, image, cta } = developer;

  return (
    <article className="relative flex min-h-[479px] w-full flex-col items-center justify-end overflow-hidden rounded-[12px] border border-[rgba(212,175,55,0.6)] px-3 py-5">
      <Image
        src={image}
        alt=""
        fill
        sizes="351px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex w-full flex-col items-center gap-8">
        <div className="relative h-[72px] w-[206px]">
          <Image
            src={logo}
            alt={name}
            fill
            sizes="206px"
            className="object-contain"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-sm font-medium capitalize leading-7 text-[#F5F5F5]">
            Avg. 3-Year Capital Growth{" "}
            <span className="text-[#E9C349]">+16.2%</span>
          </p>
          <div className="h-px w-full border-t-2 border-[#E9C349]" />
          <ul className="flex flex-col gap-0 text-sm font-semibold capitalize leading-7 text-[#F5F5F5]">
            <li className="flex items-center gap-1.5">
              <span className="text-[#E9C349]" aria-hidden>
                •
              </span>
              Active Master Communities
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#E9C349]" aria-hidden>
                •
              </span>
              Delivery Record (29,930)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#E9C349]" aria-hidden>
                •
              </span>
              Starting Price
            </li>
          </ul>
        </div>

        <Button className="h-[41px] w-full max-w-[288px] rounded-[8px] px-4 text-[13px] tracking-[1.66px] sm:text-sm">
          {cta}
        </Button>
      </div>
    </article>
  );
}
