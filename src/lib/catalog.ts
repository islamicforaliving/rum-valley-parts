// Rum Valley Parts - Complete Product Catalog (400+ products)

export type CategorySlug =
  | "engine"
  | "brakes"
  | "suspension"
  | "transmission"
  | "drivetrain"
  | "electrical"
  | "cooling"
  | "exhaust"
  | "filters-fluids"
  | "wheels-tires"
  | "cab-body"
  | "lighting";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: string;
  count: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: CategorySlug;
  partNumber: string;
  shortDescription: string;
  specs: { label: string; value: string }[];
  fits: string;
  memberPrice: number;
  listPrice: number;
  stock: "in-stock" | "limited" | "backorder";
  rating: number;
  reviews: number;
  membersOnly?: boolean;
  tags: string[];
  image: string;
}

export const categories: Category[] = [
  { slug: "engine", name: "Engine & Powertrain", short: "Engine", description: "Long blocks, cylinder heads, gaskets, camshafts, and internal engine components.", icon: "Cog", count: 1240 },
  { slug: "brakes", name: "Brakes & Air Systems", short: "Brakes", description: "Brake chambers, slack adjusters, drums, shoes, S-cams, and air valves.", icon: "Disc3", count: 980 },
  { slug: "suspension", name: "Suspension & Steering", short: "Suspension", description: "Air springs, ride struts, kingpins, tie rods, drag links, and steering gears.", icon: "Anchor", count: 760 },
  { slug: "transmission", name: "Transmission & Clutch", short: "Transmission", description: "Clutches, flywheel housings, shift forks, bearings, and transmission parts.", icon: "Settings2", count: 540 },
  { slug: "drivetrain", name: "Drivetrain & Axles", short: "Drivetrain", description: "Differentials, drive shafts, U-joints, carrier bearings, and axle shafts.", icon: "Rotate3d", count: 410 },
  { slug: "electrical", name: "Electrical & Electronics", short: "Electrical", description: "Alternators, starters, ECUs, sensors, switches, harnesses, and electrical parts.", icon: "Zap", count: 890 },
  { slug: "cooling", name: "Cooling & HVAC", short: "Cooling", description: "Radiators, charge air coolers, water pumps, fans, and HVAC components.", icon: "ThermometerSnowflake", count: 360 },
  { slug: "exhaust", name: "Exhaust & Emissions", short: "Exhaust", description: "DPF filters, mufflers, stacks, clamps, and aftertreatment components.", icon: "Wind", count: 320 },
  { slug: "filters-fluids", name: "Filters & Fluids", short: "Filters", description: "Oil, air, fuel, and coolant filters plus lubricants and fluids.", icon: "Droplets", count: 1520 },
  { slug: "wheels-tires", name: "Wheels & Tires", short: "Wheels", description: "Steel and aluminum wheels, hub pilots, lug nuts, and wheel-end hardware.", icon: "CircleDot", count: 480 },
  { slug: "cab-body", name: "Cab & Body", short: "Cab & Body", description: "Mirrors, grilles, bumpers, door hardware, glass, and body panels.", icon: "Truck", count: 670 },
  { slug: "lighting", name: "Lighting", short: "Lighting", description: "LED headlights, marker lights, strobes, harnesses, and DOT-compliant lighting.", icon: "Lightbulb", count: 590 },
];
