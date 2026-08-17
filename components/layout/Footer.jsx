import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import logo from "@/public/svgs/logo.svg";
import { NAV_ITEMS } from "@/components/layout/navData";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const CONTACT_DETAILS = [
  {
    Icon: Phone,
    label: "+971 52 693 8886",
    href: "tel:+971526938886",
  },
  {
    Icon: Mail,
    label: "Admin@noorandhoorproperties.com",
    href: "mailto:Admin@noorandhoorproperties.com",
  },
  {
    Icon: MapPin,
    label: "Dubai, United Arab Emirates",
  },
];

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.07-.9.04-1.4.2-1.7.32-.43.17-.74.37-1.06.7-.33.32-.53.63-.7 1.06-.12.3-.28.8-.32 1.7C3.35 8.5 3.34 8.9 3.34 12s0 3.5.08 4.8c.04.9.2 1.4.32 1.7.17.43.37.74.7 1.06.32.33.63.53 1.06.7.3.12.8.28 1.7.32 1.3.07 1.7.08 4.8.08s3.5 0 4.8-.08c.9-.04 1.4-.2 1.7-.32.43-.17.74-.37 1.06-.7.33-.32.53-.63.7-1.06.12-.3.28-.8.32-1.7.07-1.3.08-1.7.08-4.8s0-3.5-.08-4.8c-.04-.9-.2-1.4-.32-1.7a2.9 2.9 0 0 0-.7-1.06 2.9 2.9 0 0 0-1.06-.7c-.3-.12-.8-.28-1.7-.32-1.3-.07-1.7-.07-4.8-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 8.15a3.21 3.21 0 1 0 0-6.42 3.21 3.21 0 0 0 0 6.42Zm6.3-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.2 9.75h3.56V21H3.2V9.75Zm6 0h3.41v1.54h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5V21h-3.55v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9.2V9.75Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { Icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
];

const LINK_CLASS =
  "inline-block text-sm text-white/70 transition-colors duration-200 hover:text-[#eec876]";

function ColumnHeading({ children, href }) {
  const titleClass =
    "!font-accent text-[13px] font-semibold uppercase tracking-[1.6px] text-[#eec876] transition-colors duration-200 hover:text-[#ba8a44]";

  return (
    <div className="flex flex-col gap-2">
      {href ? (
        <Link href={href} className={titleClass}>
          {children}
        </Link>
      ) : (
        <h3 className={titleClass}>{children}</h3>
      )}
      <span className="h-px w-9 bg-gradient-to-r from-[#eec876] to-transparent" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ba8a44] to-transparent" />

      <div className="section-inner py-14 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="w-fit">
              <Image
                src={logo}
                alt="Noor & Hoor Properties"
                height={56}
                width={180}
                className="h-16 w-auto lg:h-20"
              />
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-white/70">
              Your access to the globe&apos;s most esteemed real estate. We guide
              buyers, sellers, and investors across the UAE with trusted local
              expertise.
            </p>

            <ul className="flex flex-col gap-3">
              {CONTACT_DETAILS.map(({ Icon, label, href }) => {
                const content = (
                  <>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#ba8a44]/35 bg-[#ba8a44]/10 text-[#eec876]">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 break-words">{label}</span>
                  </>
                );

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-3 text-sm text-white/80 transition-colors duration-200 hover:text-[#eec876]"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3 text-sm text-white/80">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-[#ba8a44]/25 bg-[#141414] p-6 sm:p-8">
            <div className="flex flex-col gap-3">
              <ColumnHeading>Newsletter</ColumnHeading>
              <p className="text-sm leading-relaxed text-white/70">
                Get new launches, market insights, and exclusive listings
                delivered to your inbox.
              </p>
            </div>

            <form className="flex flex-col gap-3 min-[440px]:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#ba8a44]"
              />
              <button
                type="submit"
                className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#bc8741] to-[#d6a85e] px-6 py-3 text-sm font-semibold uppercase tracking-[1.3px] text-white transition-all duration-200 hover:from-[#d6a85e] hover:to-[#eec876]"
              >
                Subscribe
                <Send className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 min-[440px]:flex-row min-[440px]:items-center min-[440px]:justify-between">
              <p className="text-xs uppercase tracking-[1.6px] text-white/50">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-[#ba8a44] hover:text-[#eec876]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 py-12 sm:grid-cols-3 lg:grid-cols-6"
        >
          {NAV_ITEMS.map((category) => (
            <div key={category.href} className="flex min-w-0 flex-col gap-4">
              <ColumnHeading href={category.href}>{category.label}</ColumnHeading>

              {category.links?.length ? (
                <ul className="flex flex-col gap-2.5">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link href={category.href} className={LINK_CLASS}>
                  View all developers
                </Link>
              )}
            </div>
          ))}

          <div className="flex min-w-0 flex-col gap-4">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/55">
            © 2026 Noor &amp; Hoor Properties. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className={LINK_CLASS}>
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className={LINK_CLASS}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
