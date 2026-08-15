import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ContactAgentCard({ agent }) {
  const { role, name, image, bio, email } = agent;

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-xl border border-[rgba(201,168,76,0.18)] bg-[#141416] shadow-[0_2.5px_15px_rgba(0,0,0,0.4)]">
      <div className="relative h-[252px] w-full bg-[#1A1A1E]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(119,118,118,0.4)] to-[rgba(0,0,0,0.4)]" />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 py-4">
        <p className="text-[10px] font-normal uppercase tracking-[1.7px] text-[#C9A84C]">
          {role}
        </p>
        <h3 className="text-sm font-semibold leading-tight text-[#f5f5f5]">
          {name}
        </h3>
        <div className="h-0.5 w-5 bg-[#C9A84C]" />
        <p className="mt-1 flex-1 text-sm font-medium leading-4 text-[#9E9070]">
          {bio}
        </p>
        <Link href={`mailto:${email}`} className="mt-3 inline-flex self-start">
          <Button
            type="button"
            className="h-8 min-h-0 rounded-[2px] px-5 py-2 text-sm tracking-[1.3px] sm:px-10"
          >
            Contact Agent
          </Button>
        </Link>
      </div>
    </article>
  );
}
