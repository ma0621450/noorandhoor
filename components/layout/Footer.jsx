import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/public/svgs/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#111]">
      <div className="section-container !pb-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src={logo}
                alt="Noor & Hoor Properties"
                height={56}
                width={180}
                className="h-16 w-auto lg:h-21"
              />
            </Link>
            <p className="max-w-[280px] text-sm leading-relaxed text-white/80">
              Your access to the globe&apos;s most esteemed real estate.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="!font-accent text-sm font-medium uppercase tracking-wide text-[#ba8a44]">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+971526938886"
                  className="flex items-center gap-3 text-sm text-white transition-colors hover:text-[#ba8a44]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#ba8a44]" strokeWidth={1.5} />
                  +971526938886
                </a>
              </li>
              <li>
                <a
                  href="mailto:Admin@noorandhoorproperties.com"
                  className="flex items-center gap-3 text-sm text-white transition-colors hover:text-[#ba8a44]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#ba8a44]" strokeWidth={1.5} />
                  Admin@noorandhoorproperties.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ba8a44]" strokeWidth={1.5} />
                Dubai, United Arab Emirates
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="!font-accent text-sm font-medium uppercase tracking-wide text-[#ba8a44]">
              Newsletter
            </h3>
            <form className="flex overflow-hidden rounded-lg">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer bg-[#ba8a44] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ba8a44]/80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-md text-white">
            © noorandhoorproperties — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
