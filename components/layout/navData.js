import {
  IconApartments,
  IconTownhouses,
  IconPenthouses,
  IconVillas,
  IconProperties,
  IconResidential,
  IconCommercial,
  IconShortStay,
  IconListProperty,
  IconValuation,
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
      { label: "Buy Properties", href: "/buy", Icon: IconProperties },
    ],
  },
  {
    label: "Rent",
    links: [
      { label: "Residential", href: "#", Icon: IconResidential },
      { label: "Commercial", href: "#", Icon: IconCommercial },
      { label: "Short Stay", href: "#", Icon: IconShortStay },
    ],
  },
  {
    label: "Sell",
    links: [
      { label: "List Property", href: "#", Icon: IconListProperty },
      { label: "Property Valuation", href: "#", Icon: IconValuation },
      { label: "Seller Guide", href: "#", Icon: IconGuide },
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
