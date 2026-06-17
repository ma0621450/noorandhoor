"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import logo from "@/public/svgs/logo.svg";
import Button from "@/components/ui/Button";

const NAV_ITEMS = [
  {
    label: "Buy",
    links: ["Apartments", "Villas", "Penthouses", "Townhouses"],
  },
  {
    label: "Rent",
    links: ["Residential", "Commercial", "Short Stay"],
  },
  {
    label: "Sell",
    links: ["List Property", "Property Valuation", "Seller Guide"],
  },
  {
    label: "Off Plan",
    links: ["New Launches", "Payment Plans", "Developers"],
  },
  {
    label: "Developers",
    links: ["Emaar", "Damac", "Sobha", "Azizi"],
  },
  {
    label: "Services",
    links: ["Property Management", "Mortgage Services", "Golden Visa"],
  },
  {
    label: "About",
    href: "#about",
  },
];

function NavItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.links) {
    return (
      <Link
        href={item.href}
        className="text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[#ba8a44]"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[#ba8a44]"
        onClick={() => setIsOpen((open) => !open)}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-3 min-w-[180px] overflow-hidden rounded-md border border-white/10 bg-[#141414]/95 backdrop-blur-md">
          {item.links.map((link) => (
            <Link
              key={link}
              href="#"
              className="block px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#ba8a44]/20 hover:text-[#ba8a44]"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.links) {
    return (
      <Link
        href={item.href}
        className="block w-full border-b border-white/10 py-4 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[#ba8a44]"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="w-full border-b border-white/10">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between py-4 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-[#ba8a44]"
        onClick={() => setIsOpen((open) => !open)}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-3 pb-4 pl-4">
          {item.links.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-sm text-white/90 transition-colors hover:text-[#ba8a44]"
              onClick={onClose}
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] w-full bg-[#111] min-[1072px]:hidden">
          <nav className="flex h-full w-full flex-col overflow-y-auto px-6 pt-24 pb-8">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={closeMobile} />
            ))}

            <Link
              href="#contact"
              className="mt-6 inline-flex w-full"
              onClick={closeMobile}
            >
              <Button
                variant="primary"
                className="w-full justify-center gap-2 py-3 text-xs"
              >
                <span>Contact Us</span>
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </Link>
          </nav>
        </div>
      )}

      <header
        className={`fixed top-0 z-[100] w-full transition-colors duration-300 ${
          scrolled || mobileOpen ? "bg-[#111]" : "bg-transparent"
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 lg:px-6">
        <Link href="/" className="shrink-0">
          <Image
            src={logo}
            alt="Noor & Hoor Properties"
            height={64}
            width={200}
            className="h-16 w-auto lg:h-21"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 min-[1072px]:flex xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="#contact" className="hidden sm:inline-flex">
            <Button
              variant="primary"
              className="gap-2 px-5 py-2.5 text-xs lg:px-6 lg:py-3 lg:text-sm"
            >
              <span>Contact Us</span>
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="cursor-pointer text-white min-[1072px]:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      </header>
    </>
  );
}
