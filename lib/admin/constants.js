export const ADMIN_BLOGS_KEY = "nh.admin.blogs";
export const ADMIN_PROPERTIES_KEY = "nh.admin.properties";

export const PROPERTY_MARKETS = ["buy", "rent", "sell", "off-plan"];
export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "House",
  "Commercial",
];
export const PROPERTY_STATUSES = ["available", "reserved", "sold"];
export const BLOG_STATUSES = ["draft", "published"];

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", match: "exact" },
  { href: "/admin/properties", label: "Properties", match: "prefix" },
  { href: "/admin/properties/new", label: "Add property", match: "exact", indent: true },
  { href: "/admin/blogs", label: "Blogs", match: "prefix" },
  { href: "/admin/blogs/new", label: "Upload blog", match: "exact", indent: true },
];

export const PAGE_SIZE = 8;
export const MAX_COVER_IMAGE_BYTES = 1.5 * 1024 * 1024;
export const MAX_GALLERY_IMAGES = 12;

export const DEFAULT_PROPERTY_FEATURES = [
  "Air Conditioning",
  "Central A/C",
  "High-speed Internet",
  "WiFi",
  "Swimming Pool",
  "Fitness Center",
  "24/7 Security",
  "Parking",
  "Balcony",
  "Laundry",
  "Sauna",
  "Window Coverings",
  "Lawn",
];

export const DEFAULT_PROPERTY_DOCUMENTS = [
  { name: "Purchase-Agreement", available: false },
  { name: "Offering-Memorandum", available: false },
  { name: "Market-Information", available: false },
];

export const DEFAULT_PROPERTY_AGENT = {
  name: "Waqar ahmed",
  phone: "+971526938886",
};
