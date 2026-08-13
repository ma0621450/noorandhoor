import {
  IconApartments,
  IconTownhouses,
  IconPenthouses,
  IconVillas,
  IconProperties,
  IconResidential,
  IconListProperty,
  IconGuide,
  IconLaunch,
  IconPayment,
  IconDeveloper,
  IconService,
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
    links: [
      { label: "New Launches", href: "#", Icon: IconLaunch },
      { label: "Payment Plans", href: "#", Icon: IconPayment },
      { label: "Developers", href: "#", Icon: IconDeveloper },
    ],
  },
  {
    label: "Developers",
    links: [
      { label: "Emaar", href: "#", Icon: IconDeveloper },
      { label: "Damac", href: "#", Icon: IconDeveloper },
      { label: "Sobha", href: "#", Icon: IconDeveloper },
      { label: "Azizi", href: "#", Icon: IconDeveloper },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "Property Management", href: "#", Icon: IconService },
      { label: "Mortgage Services", href: "#", Icon: IconPayment },
      { label: "Golden Visa", href: "#", Icon: IconGuide },
    ],
  },
  {
    label: "About",
    href: "#about",
  },
];
