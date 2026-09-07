// Rum Valley Parts - Full Product Catalog

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
  categoryLabel: string;
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
const brands = ["Detroit Diesel", "Cummins", "Caterpillar", "Mack", "Paccar", "Navistar", "Volvo", "Freightliner", "Kenworth", "Peterbilt", "International", "MAN", "Scania", "Mercedes-Benz", "Renault", "Volvo Trucks", "Ford", "Chevrolet", "GMC", "Kenworth"];
const image = "https://placehold.co/400x400/1a1a1a/white?text=Truck+Part";

function makeProduct(id: string, category: CategorySlug, name: string, sku: string, partNumber: string, memberPrice: number, rating: number, reviews: number, membersOnly: boolean = false): Product {
  const listPrice = Math.floor(memberPrice * (1.2 + Math.random() * 0.5));
  return {
    id,
    sku,
    name,
    brand: brands[Math.floor(Math.random() * brands.length)],
    category,
    categoryLabel: categories.find(c => c.slug === category)?.name || category,
    partNumber,
    shortDescription: `High-quality ${name.toLowerCase()} for heavy-duty truck applications.`,
    specs: [
      { label: "Material", value: "Heavy-duty steel" },
      { label: "Warranty", value: "1-2 years" },
      { label: "Condition", value: "New aftermarket" },
    ],
    fits: "Multiple truck applications",
    memberPrice,
    listPrice,
    stock: Math.random() > 0.1 ? "in-stock" : "limited",
    rating,
    reviews,
    membersOnly,
    tags: [category],
    image,
  };
}

const allProducts: Product[] = [];
let idCounter = 1;

const productsByCategory: Record<string, string[]> = {
  engine: ["Cylinder Head", "Engine Gasket Set", "Camshaft", "Piston Set", "Connecting Rod", "Oil Pump", "Water Pump", "Timing Gear Set", "Flywheel", "Clutch Assembly", "Turbocharger", "Intercooler", "Engine Mount", "Crankshaft", "Valve Train", "Fuel Injector", "Glow Plug", "Engine Block", "Head Gasket", "Oil Pan", "Rocker Arm", "Lifter", "Pushrod", "Timing Cover", "Water Neck"],
  brakes: ["Brake Chamber", "Slack Adjuster", "Brake Drum", "Brake Shoe", "S-Cam", "Brake Pad", "ABS Sensor", "Air Valve", "Relay Valve", "Chamber Spring", "Push Rod", "Cam Bolt", "Brake Line", "Fitting", "Gladhose"],
  suspension: ["Air Spring", "Ride Strut", "Kingpin Kit", "Tie Rod", "Drag Link", "Steering Gear", "Pitman Arm", "Upper Arm", "Lower Arm", "Equalizer", "Parabolic Spring", "Leaf Spring", "Shackle", "U-Bolt"],
  transmission: ["Clutch Kit", "Flywheel", "Pressure Plate", "Throwout Bearing", "Shift Fork", "Synchro", "Gear Set", "Main Shaft", "Counter Shaft", "Tail Housing", "Bearings", "Seals", "Gaskets", "Converter", "Torque Splitter"],
  drivetrain: ["Drive Shaft", "U-Joint", "Carrier Bearing", "Yoke", "Axle Shaft", "Differential", "Ring Gear", "Pinion", "Axle Seal", "Hub Assembly", "Wheel End", "Final Drive", "Reducer", "Transmission Mount", "Transfer Case"],
  electrical: ["Alternator", "Starter", "ECU", "Sensor", "Switch", "Relay", "Harness", "Connector", "Wiring", "Fuse Box", "Battery", "Terminal", "Ground Strap", "Voltage Regulator", "Soloid"],
  cooling: ["Radiator", "Charge Air Cooler", "Water Pump", "Fan Clutch", "Fan Blade", "Thermostat", "Hose", "Clamp", "Reservoir", "Overflow", "Coolant", "Thermostat Housing", "Water Neck", "Heat Exchanger", "Fan Shroud"],
  exhaust: ["DPF Filter", "Muffler", "Stack", "Clamp", "Manifold", "Flex Pipe", "EGR Cooler", "SCR System", "Def Tank", "Node", "Sensor", "Tuning", "Aftertreatment", "Converter", "Catalytic"],
  "filters-fluids": ["Oil Filter", "Air Filter", "Fuel Filter", "Coolant Filter", "Hydraulic Filter", "Transmission Filter", "Fuel Pump Filter", "Breather Filter", "Spin-on Filter", "Element", "Lube", "Gear Oil", "Antifreeze", "Dexron", "Jake Brake Fluid"],
  "wheels-tires": ["Wheel", "Lug Nut", "Hub Pilot", "Spacer", "Stud", "Tire", "Tubeless Valve", "Rim", "Beading Ring", "Lock Ring", "Wheel Cover", "Center Cap", "Valve Stem", "Balancer", "Nut"],
  "cab-body": ["Mirror", "Grille", "Bumper", "Door Handle", "Window", "Windshield", "Glass", "Seal", "Weatherstrip", "Hinge", "Latch", "Damper", "Shock", "Hood", "Fender", "Torch", "Side Panel", "Roof Deflector", "Splash Shield", "Step"],
  lighting: ["Headlight", "Marker Light", "Turn Signal", "Tail Light", "Brake Light", "Interior Light", "Fog Light", "Work Light", "Strobe Light", "Flasher", "Bulb", "LED Strip", "Harness", "Switch", "Relay"],
};

Object.entries(productsByCategory).forEach(([category, items]) => {
  items.forEach((item) => {
    allProducts.push(makeProduct(
      `p-${idCounter.toString().padStart(4, '0')}`,
      category as CategorySlug,
      item,
      `RV-${category.substring(0, 3).toUpperCase()}-${idCounter}`,
      `OE-${idCounter.toString().padStart(4, '0')}`,
      Math.floor(Math.random() * 400) + 20,
      parseFloat((4.0 + Math.random() * 1.0).toFixed(1)),
      Math.floor(Math.random() * 50) + 1,
      Math.random() > 0.7
    ));
  });
});
export function getProduct(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    p.partNumber.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
}

export const stockMeta: Record<string, { label: string; tone: string }> = {
  "in-stock": { label: "In Stock", tone: "green" },
  "limited": { label: "Limited Stock", tone: "amber" },
  "backorder": { label: "Backorder", tone: "red" },
};

export { allProducts };
