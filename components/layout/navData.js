import {
  IconApartments,
  IconTownhouses,
  IconPenthouses,
  IconVillas,
  IconProperties,
  IconResidential,
  IconListProperty,
  IconGuide,
} from "@/components/layout/navIcons";

export const NAV_ITEMS = [
  {
    label: "Buy",
    href: "/buy",
    links: [
      { label: "Buy Apartments", href: "/buy/apartments", Icon: IconApartments },
      { label: "Buy Town houses", href: "/buy/townhouses", Icon: IconTownhouses },
      { label: "Penthouses", href: "/buy/penthouses", Icon: IconPenthouses },
      { label: "Residential Villas", href: "/buy/villas", Icon: IconVillas },
      { label: "Buy Properties", href: "/buy/properties", Icon: IconProperties },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    links: [
      {
        label: "Properties rent",
        href: "/rent/properties",
        Icon: IconProperties,
      },
      {
        label: "Apartment rent",
        href: "/rent/apartments",
        Icon: IconApartments,
      },
      { label: "House rent", href: "/rent/houses", Icon: IconVillas },
      {
        label: "Renting in Dubai",
        href: "/rent/dubai",
        Icon: IconResidential,
      },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    links: [
      {
        label: "Noor & Hoor Properties",
        href: "/sell/noor-hoor",
        Icon: IconResidential,
      },
      {
        label: "Selling Properties",
        href: "/sell/properties",
        Icon: IconListProperty,
      },
      {
        label: "Selling Apartment",
        href: "/sell/apartments",
        Icon: IconApartments,
      },
    ],
  },
  {
    label: "Off Plan",
    href: "/off-plan",
    links: [
      { label: "Villas", href: "/off-plan/villas", Icon: IconVillas },
      { label: "Apartments", href: "/off-plan/apartments", Icon: IconApartments },
      {
        label: "Commercial / Residential",
        href: "/off-plan/commercial",
        Icon: IconResidential,
      },
      { label: "Penthouse", href: "/off-plan/penthouses", Icon: IconPenthouses },
      { label: "Townhouse", href: "/off-plan/townhouses", Icon: IconTownhouses },
      { label: "Off plan guide", href: "/off-plan/guide", Icon: IconGuide },
    ],
  },
  {
    label: "Developers",
    href: "/developers",
    footerCta: "View all developers",
  },
  {
    label: "Blog",
    href: "/blog",
    footerCta: "View all articles",
  },
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
