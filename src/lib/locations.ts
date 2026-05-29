export type Location = {
  slug: string;
  city: string;
  address: string;
  postal: string;
  phone: string;
  phoneHref: string;
  status: "open" | "comingSoon";
  // Approximate geo for LocalBusiness schema; can be replaced with real GPS later
  geo: { lat: number; lng: number };
};

export const LOCATIONS: Location[] = [
  {
    slug: "victoria",
    city: "Victoria",
    address: "1812 Cook St",
    postal: "V8T 3P6",
    phone: "236-464-2652",
    phoneHref: "tel:+12364642652",
    status: "open",
    geo: { lat: 48.4357, lng: -123.3565 },
  },
  {
    slug: "saanich",
    city: "Saanich",
    address: "771 Vernon Ave",
    postal: "V8X 2W4",
    phone: "250-893-7778",
    phoneHref: "tel:+12508937778",
    status: "open",
    geo: { lat: 48.4631, lng: -123.3700 },
  },
  {
    slug: "sidney",
    city: "Sidney",
    address: "2506 Beacon Ave",
    postal: "V8L 1Y2",
    phone: "250-886-8501",
    phoneHref: "tel:+12508868501",
    status: "open",
    geo: { lat: 48.6504, lng: -123.3984 },
  },
  {
    slug: "courtenay",
    city: "Courtenay",
    address: "450 Ryan Rd",
    postal: "V9N 3R5",
    phone: "250-885-6922",
    phoneHref: "tel:+12508856922",
    status: "open",
    geo: { lat: 49.6925, lng: -124.9879 },
  },
  {
    slug: "surrey",
    city: "Surrey",
    address: "15428 Fraser Hwy",
    postal: "V3R 3P5",
    phone: "604-716-2551",
    phoneHref: "tel:+16047162551",
    status: "open",
    geo: { lat: 49.1882, lng: -122.8049 },
  },
  {
    slug: "kelowna",
    city: "Kelowna",
    address: "Coming soon",
    postal: "",
    phone: "",
    phoneHref: "",
    status: "comingSoon",
    geo: { lat: 49.8880, lng: -119.4960 },
  },
];

export const getLocation = (slug: string) =>
  LOCATIONS.find((l) => l.slug === slug);
