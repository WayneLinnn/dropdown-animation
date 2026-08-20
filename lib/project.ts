export const project = {
  name: "Skyline Bay",
  tagline: "Waterfront high-rise residences",
  address: "88 Riverside Drive, North Bay District, Sample City",
  phone: "+1 (800) 555-1688",
  phoneHref: "tel:+18005551688",
  hours: "Sales gallery open 09:00 — 20:00",
} as const

export const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#units", label: "Residences" },
  { href: "#daylight", label: "Light study" },
  { href: "#surroundings", label: "Neighbourhood" },
  { href: "#inquiry", label: "Book a viewing" },
] as const

export const stats = [
  { value: "126,000", unit: "m²", label: "Total floor area" },
  { value: "6", unit: "towers", label: "High-rise buildings" },
  { value: "3.1", unit: "m", label: "Standard floor height" },
  { value: "2027", unit: "", label: "Expected completion" },
] as const

export type Unit = {
  code: string
  rooms: string
  area: string
  facing: string
  price: string
  highlights: string[]
  status: "Available" | "Limited" | "Sold out"
}

export const units: Unit[] = [
  {
    code: "Plan A",
    rooms: "3 bed · 2 bath",
    area: "118 m²",
    facing: "Due south",
    price: "From $920,000",
    highlights: [
      "6.2 m living room frontage",
      "Cross ventilation north to south",
      "Primary suite with walk-in closet",
    ],
    status: "Available",
  },
  {
    code: "Plan B",
    rooms: "4 bed · 2 bath",
    area: "143 m²",
    facing: "South-east dual aspect",
    price: "From $1,140,000",
    highlights: [
      "Wrap-around view balcony",
      "Separate wet and dry kitchens",
      "Both baths split wet and dry",
    ],
    status: "Limited",
  },
  {
    code: "Plan C",
    rooms: "2 bed · 1 bath",
    area: "89 m²",
    facing: "Due south",
    price: "From $705,000",
    highlights: [
      "Efficient square layout",
      "Every room has a window",
      "Suited to first-time buyers",
    ],
    status: "Available",
  },
]

export const amenities = [
  {
    title: "Central gardens",
    copy: "A 4,200 m² lawn framed by planting that stays green year round.",
  },
  {
    title: "Pool and clubhouse",
    copy: "25 m heated pool, gym, and a shared lounge for residents.",
  },
  {
    title: "Parking",
    copy: "1.2 spaces per home, with vehicles separated from walkways.",
  },
  {
    title: "All ages",
    copy: "Playground, jogging loop, and a quiet garden for older residents.",
  },
]

export const surroundings = [
  { name: "Bay Station, Metro Line 4", distance: "8 min walk" },
  { name: "Riverside Primary School", distance: "10 min walk" },
  { name: "North Bay Public Hospital", distance: "6 min drive" },
  { name: "Grand Plaza shopping centre", distance: "9 min drive" },
  { name: "Riverside Sports Park", distance: "12 min walk" },
  { name: "Central Library, new wing", distance: "7 min drive" },
]
