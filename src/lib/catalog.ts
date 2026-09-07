// Rum Valley Parts - Complete Product Catalog (400+ products)

export type CategorySlug =
  | "engine" | "brakes" | "suspension" | "transmission"
  | "drivetrain" | "electrical" | "cooling" | "exhaust"
  | "filters-fluids" | "wheels-tires" | "cab-body" | "lighting"
  | "steering" | "transmission-parts" | "turbo" | "fuel-system"
  | "cooling-parts" | "emissions" | "starter-alternator"
  | "belts-hoses" | "gaskets" | "bearings" | "sensors" | "valves" | "pumps";

export interface Category { slug: string; name: string; short: string; description: string; icon: string; count: number; }
export interface Product {
  id: string; sku: string; name: string; brand: string; category: CategorySlug;
  partNumber: string; shortDescription: string; specs: { label: string; value: string }[];
  fits: string; memberPrice: number; listPrice: number; stock: "in-stock"|"limited"|"backorder";
  rating: number; reviews: number; membersOnly?: boolean; tags: string[]; image: string;
}

export const categories: Category[] = [
  { slug: "engine", name: "Engine & Powertrain", short: "Engine", description: "Long blocks, heads, gaskets, camshafts.", icon: "Cog", count: 320 },
  { slug: "brakes", name: "Brakes & Air Systems", short: "Brakes", description: "Chambers, adjusters, drums, shoes.", icon: "Disc", count: 280 },
  { slug: "suspension", name: "Suspension & Steering", short: "Suspension", description: "Air springs, struts, kingpins.", icon: "Anchor", count: 220 },
  { slug: "transmission", name: "Transmission & Clutch", short: "Transmission", description: "Clutches, flywheels, gears.", icon: "Settings2", count: 180 },
  { slug: "drivetrain", name: "Drivetrain & Axles", short: "Drivetrain", description: "Drive shafts, U-joints, differentials.", icon: "Gauge", count: 150 },
  { slug: "electrical", name: "Electrical & Electronics", short: "Electrical", description: "Wiring, connectors, switches.", icon: "Zap", count: 280 },
  { slug: "cooling", name: "Cooling & HVAC", short: "Cooling", description: "Radiators, water pumps, thermostats.", icon: "Thermometer", count: 120 },
  { slug: "exhaust", name: "Exhaust & Emissions", short: "Exhaust", description: "Turbochargers, manifolds, DPFs.", icon: "Wind", count: 100 },
  { slug: "filters-fluids", name: "Filters & Fluids", short: "Filters", description: "Oil, fuel, air filters.", icon: "Filter", count: 80 },
  { slug: "wheels-tires", name: "Wheels & Tires", short: "Wheels", description: "Truck wheels and tires.", icon: "Disc3", count: 60 },
  { slug: "cab-body", name: "Cab & Body", short: "Cab", description: "Mirrors, doors, bumpers.", icon: "Building", count: 90 },
  { slug: "lighting", name: "Lighting", short: "Lighting", description: "Headlights, taillights, markers.", icon: "Lightbulb", count: 70 },
];

const brands = ["Caterpillar","Cummins","Detroit Diesel","Navistar","International","Mack","Volvo","Freightliner","Kenworth","Peterbilt"];
const engParts = ["Engine Gasket Set","Head Gasket","Rocker Arm Assembly","Valve Spring Kit","Timing Gear Set","Oil Pan Gasket","Front Main Seal","Rear Main Seal","Camshaft Bearing Set","Connecting Rod Bearing","Main Bearing Set","Piston Ring Set","Piston Pin Kit","Cylinder Liner Set","Valve Guide Set","Pushrod","Oil Pump Assembly","Water Pump","Thermostat Housing","Engine Mount","Flexplate","Flywheel","Clutch Housing","Turbocharger Gasket","Manifold Gasket","Exhaust Valve","Intake Valve","Valve Seal","Timing Cover Gasket","Oil Filter Housing Gasket"];
const brkParts = ["Brake Chamber","Slack Adjuster","S-Cam","Brake Drum","Brake Shoe Lining","Brake Pad Set","Caliper Assembly","Brake Hose","Air Brake Valve","ABS Sensor","Wheel Cylinder","Master Cylinder","Brake Booster","Parking Brake Cable","Spring Brake Cams","Push Rod","Brake Lever","Drag Link","Tie Rod End","Steering Arm"];
const susParts = ["Air Spring","Ride Strut","King Pin Kit","Tie Rod","Drag Link","Steering Gear","Pitman Arm","Idler Arm","Track Bar","Leaf Spring","Spring Shackle","U-Bolt","Shock Absorber","Air Compressor","Pressure Gauge","Height Control Valve"];
const transParts = ["Clutch Kit","Pressure Plate","Throwout Bearing","Flywheel","Clutch Disc","Shift Fork","Synchro Ring","Main Shaft","Counter Shaft","Gear Set","Oil Seal","Gasket Kit","Transfer Case Kit","Driveshaft Yoke","Universal Joint"];
const elecParts = ["Wiring Harness","Connector Kit","Switch Assembly","Relay","Fuse Panel","Battery Cable","Ground Strap","Alternator","Starter Motor","Voltage Regulator","Instrument Cluster","Turn Signal Switch","Horn Assembly","Blower Motor"];
const coolParts = ["Radiator","Water Pump","Thermostat","Fan Clutch","Fan Blade","Coolant Hose","Overflow Tank","Heater Core","Temperature Gauge","Pressure Cap","Shroud Assembly","Intercooler","Charge Air Cooler","Coolant Filter"];
const fltParts = ["Oil Filter","Fuel Filter","Air Filter","Transmission Filter","Coolant Filter","Hydraulic Filter","Fuel Water Separator","Cabin Air Filter","Pre-Filter","Oil Filter Adapter","Spin-on Filter","Cartridge Filter"];
const cabParts = ["Side Mirror","Door Handle","Bumper","Grille Assembly","Hood Latch","Windshield","Door Seal","Weatherstrip","Step Board","Fender","Fender Mirror","Light Bracket","Mirror Arm","Mirror Glass","Deflector","Splash Shield"];
const ligParts = ["Headlight Assembly","Taillight","Turn Signal","Brake Light","Running Light","Marker Light","Work Light","Fog Light","LED Strip","License Plate Light","Instrument Light","Interior Dome Light"];
const drvParts = ["Drive Shaft","U-Joint","Yoke","Differential Gear","Axle Shaft","Wheel Hub","Wheel Bearing","Final Drive","Transfer Case","Transfer Shaft","Output Flange"];
const exhaustParts = ["Turbocharger","Exhaust Manifold","Downpipe","DPF Filter","EGR Cooler","Exhaust Valve","Stack","Muffler","Tailpipe"," Exhaust Pipe"];

const makeProducts = (prefix: string, parts: string[], cat: CategorySlug, count: number): Product[] => {
  const result: Product[] = [];
  parts.forEach((part, i) => {
    brands.slice(0, Math.min(5, Math.floor(count / parts.length) + 1)).forEach((brand) => {
      if (result.length < count) {
        result.push({
          id: `${prefix}-${result.length}`,
          sku: `RVP-${prefix.toUpperCase()}-${String(result.length).padStart(4,'0')}`,
          name: `${brand} ${part}`,
          brand,
          category: cat,
          partNumber: `${prefix.toUpperCase()}-${brand.substring(0,3)}-${String(i+1).padStart(3,'0')}`,
          shortDescription: `OEM-grade ${part.toLowerCase()} for ${brand} trucks`,
          specs: [{label:"Material",value:"Alloy Steel"},{label:"Warranty",value:"2 Years"},{label:"Certification",value:"DOT Approved"}],
          fits: `${brand} trucks 2010-2024`,
          memberPrice: Math.round((10 + Math.random()*400)*100)/100,
          listPrice: Math.round((20 + Math.random()*500)*100)/100,
          stock: Math.random()>0.2?"in-stock":"limited",
          rating: Math.round((3.5+Math.random()*1.5)*10)/10,
          reviews: Math.floor(5+Math.random()*45),
          membersOnly: true,
          tags: [cat,"oem","replacement"],
          image: `https://placehold.co/400x400/1e293b/ffffff?text=${encodeURIComponent(part.substring(0,20))}`
        });
      }
    });
  });
  return result;
};

export const allProducts = [
  ...makeProducts("ENG", engParts, "engine", 160),
  ...makeProducts("BRK", brkParts, "brakes", 140),
  ...makeProducts("SUS", susParts, "suspension", 100),
  ...makeProducts("TRN", transParts, "transmission", 80),
  ...makeProducts("ELE", elecParts, "electrical", 100),
  ...makeProducts("CCL", coolParts, "cooling", 50),
  ...makeProducts("FLT", fltParts, "filters-fluids", 40),
  ...makeProducts("CAB", cabParts, "cab-body", 40),
  ...makeProducts("LIG", ligParts, "lighting", 30),
  ...makeProducts("DRV", drvParts, "drivetrain", 20),
  ...makeProducts("EXH", exhaustParts, "exhaust", 20),
].slice(0, 420);

export const products = allProducts;

export const getProductsByCategory = (slug: CategorySlug): Product[] => allProducts.filter((p)=>p.category===slug);
export const getProduct = (id: string): Product | undefined => allProducts.find((p)=>p.id===id);
export const getCategory = (slug: string): Category | undefined => categories.find((c)=>c.slug===slug);
export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return allProducts.filter(p=>p.name.toLowerCase().includes(q)||p.sku.toLowerCase().includes(q)||p.partNumber.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q));
};
export const formatPrice = (price: number): string => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(price);
export const stockMeta: Record<string,{label:string;tone:string}> = {"in-stock":{label:"In Stock",tone:"green"},limited:{label:"Limited Stock",tone:"amber"},backorder:{label:"Backorder",tone:"red"}};
