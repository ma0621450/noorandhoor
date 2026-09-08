import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/public/svgs/logo.svg";
import { NAV_ITEMS } from "@/components/layout/navData";
import { SOCIAL_LINKS } from "@/components/layout/socialLinks";
import NewsletterForm from "@/components/layout/NewsletterForm";

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
              Trusted UAE real estate experts helping buyers, sellers, and
              investors find the right residential, commercial, and off-plan
              properties.
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

          <div
            id="newsletter"
            className="flex flex-col gap-6 rounded-2xl border border-[#ba8a44]/25 bg-[#141414] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-3">
              <ColumnHeading>Newsletter</ColumnHeading>
              <p className="text-sm leading-relaxed text-white/70">
                Never miss a new listing, market update, or investment
                opportunity in the UAE.
              </p>
            </div>

            <NewsletterForm />

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 min-[440px]:flex-row min-[440px]:items-center min-[440px]:justify-between">
              <p className="text-xs uppercase tracking-[1.6px] text-white/50">
                Follow Us
              </p>
              <div className="flex flex-wrap items-center gap-2 min-[440px]:justify-end">
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
          className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-white/10 py-12 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
        >
          {NAV_ITEMS.filter((category) => category.links || category.footerCta).map(
            (category) => (
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
              ) : category.footerCtaHref ? (
                <a href={category.footerCtaHref} className={LINK_CLASS}>
                  {category.footerCta}
                </a>
              ) : (
                <Link href={category.href} className={LINK_CLASS}>
                  {category.footerCta || `View ${category.label}`}
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
