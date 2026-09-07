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

// Real product photos from MVP Truck Parts
const IMG_AIR_COMPRESSOR = "https://mvptruckparts.com/cdn/shop/files/8175DrwvlMS._AC_SL1500_720x.jpg?v=1695776614";
const IMG_BRAKE_CHAMBER = "https://mvptruckparts.com/cdn/shop/products/57_6d8cc635-c661-4150-8eaf-301b63a276db_720x.png?v=1599431422";
const IMG_AIR_BAG = "https://mvptruckparts.com/cdn/shop/files/Freightliner-9780-Air-Spring-Bag-for-W01-358-9780-1_720x.jpg?v=1770728428";
const IMG_HOOD_SHOCK = "https://mvptruckparts.com/cdn/shop/products/HOODSHOCK_720x.png?v=1680665611";
const IMG_DASH_VALVE = "https://mvptruckparts.com/cdn/shop/products/VOLVODASHVALVE2_720x.png?v=1612293579";
const IMG_AIR_FILTER = "https://mvptruckparts.com/cdn/shop/files/Screenshot_2025-03-25_at_20.37.43_720x.png?v=1742953091";
const IMG_GRILLE = "https://mvptruckparts.com/cdn/shop/files/MackGrillee_720x.png?v=1765390858";
const IMG_WIPER_MOTOR = "https://mvptruckparts.com/cdn/shop/files/NJT2061_23-8468_720x.jpg?v=1701184405";
const IMG_AIR_DRYER = "https://mvptruckparts.com/cdn/shop/products/41d7ny7Rv1L._AC_SX425_720x.jpg?v=1742953091";
const IMG_DOUBLE_BAG = "https://mvptruckparts.com/cdn/shop/files/Son_deneme_720x.png?v=1775513329";
const IMG_WHEEL = "https://mvptruckparts.com/cdn/shop/files/FullSizeRender_2ec5f37b-187a-494b-9467-efdb419c3f4d_720x.jpg?v=1717355197";
const IMG_LED = "https://mvptruckparts.com/cdn/shop/files/1_19efca09-22e7-4201-bcda-aa8d4256845c_720x.png?v=1779187052";
const IMG_MIRROR = "https://mvptruckparts.com/cdn/shop/files/2_44fd36a2-559b-49c6-bebd-00122a5e67ba_720x.png?v=1779187051";
const IMG_AIR_FILTER_CASCADIA = "https://mvptruckparts.com/cdn/shop/files/Screenshot_2025-03-25_at_20.37.43_540x.png?v=1742953091";
const IMG_BRAKE_CHAMBER_T24 = "https://mvptruckparts.com/cdn/shop/products/57_f35f3a22-b86c-4a4f-9435-5ed0904a5847_720x.png?v=1599431486";
const IMG_KENWORTH_MIRROR = "https://mvptruckparts.com/cdn/shop/products/kenworth3_720x.jpg?v=1680666441";
const IMG_VOLVO_AIR_SPRING = "https://mvptruckparts.com/cdn/shop/products/57_b93db628-17c0-4f54-8234-75f2873e8d66_720x.png?v=1770728346";

export const products: Product[] = [
  // Engine & Powertrain
  { id: "p-1001", sku: "RV-D15-AC", name: "Heavy-Duty Diesel Air Compressor", brand: "RumValley Core", category: "engine", categoryLabel: "Engine & Powertrain", partNumber: "BENDIX-TU4330", shortDescription: "OEM-grade air compressor for Class 8 diesel platforms, rebuilt to spec with new valves and seals.", specs: [{ label: "Displacement", value: "645 cc" }, { label: "Voltage", value: "12 V" }, { label: "Flow", value: "35 CFM" }, { label: "Warranty", value: "1 year" }], fits: "Universal Class 8 applications", memberPrice: 485, listPrice: 645, stock: "in-stock", rating: 5.0, reviews: 9, tags: ["air system", "oem-grade", "rebuilt"], image: IMG_AIR_COMPRESSOR },
  { id: "p-1002", sku: "RV-BK-30", name: "Brake Chamber - Type 30 Long Stroke", brand: "RumValley Core", category: "brakes", categoryLabel: "Brakes & Air Systems", partNumber: "BENDIX-802619", shortDescription: "Type 30 long-stroke service brake chamber with corrosion-resistant coating and pushrod.", specs: [{ label: "Type", value: "30 LS" }, { label: "Stroke", value: "2.5 in" }, { label: "Port", value: "2 x 3/8 NPT" }, { label: "Standard", value: "FMVSS 121" }], fits: "Universal trailer & drive axle applications", memberPrice: 74, listPrice: 96, stock: "in-stock", rating: 4.9, reviews: 7, tags: ["brake chamber", "fmvss 121"], image: IMG_BRAKE_CHAMBER },
  { id: "p-1003", sku: "RV-SP-1R", name: "Air Spring Bag - Drive Axle 1R / Freightliner 9780", brand: "Firestone", category: "suspension", categoryLabel: "Suspension & Steering", partNumber: "W01-358-9780", shortDescription: "Single convoluted heavy-duty air spring for Freightliner, Peterbilt and Kenworth drive axles.", specs: [{ label: "Bead Plate", value: "Aluminum" }, { label: "Max Height", value: "9.5 in" }, { label: "Load", value: "7,800 lb" }, { label: "Bellow", value: "2-ply" }], fits: "Freightliner, Peterbilt, Kenworth drive axles", memberPrice: 82, listPrice: 110, stock: "in-stock", rating: 4.9, reviews: 14, tags: ["air spring", "suspension", "best seller"], image: IMG_AIR_BAG },
  { id: "p-1004", sku: "RV-HS-VNL", name: "Volvo VNL Hood Shock Strut Lift Support", brand: "RumValley Core", category: "cab-body", categoryLabel: "Cab & Body", partNumber: "RV-HS-8214", shortDescription: "Heavy-duty gas charged hood shock lift support designed for Volvo VNL semi-trucks.", specs: [{ label: "Extended Length", value: "28.5 in" }, { label: "Stroke", value: "11.2 in" }, { label: "Force", value: "120 lb" }, { label: "Warranty", value: "1 year" }], fits: "Volvo VNL 670, 780, 860 (2004-2024)", memberPrice: 35, listPrice: 48, stock: "in-stock", rating: 4.9, reviews: 8, tags: ["hood shock", "volvo vnl", "cab-body"], image: IMG_HOOD_SHOCK },
  { id: "p-1005", sku: "RV-AD-1200", name: "Air Dryer Assembly Compatible with Wabco 1200P", brand: "RumValley Core", category: "brakes", categoryLabel: "Brakes & Air Systems", partNumber: "RV-AD-955079", shortDescription: "12V SS 1200+ air dryer assembly complete with desiccant cartridge and heater element.", specs: [{ label: "Voltage", value: "12 V" }, { label: "Wattage", value: "100 W" }, { label: "Desiccant", value: "Spin-on" }, { label: "Port Size", value: "1/2 NPT" }], fits: "Kenworth, Peterbilt, Freightliner, International", memberPrice: 115, listPrice: 145, stock: "in-stock", rating: 4.9, reviews: 11, tags: ["air dryer", "wabco", "air system"], image: IMG_AIR_DRYER },
  { id: "p-1006", sku: "RV-FL-BNDL", name: "Air Filter & Cabin Filter Bundle for Semi Trucks", brand: "RumValley Core", category: "filters-fluids", categoryLabel: "Filters & Fluids", partNumber: "RV-FLT-2024", shortDescription: "Complete 3-pack filtration bundle: 1x primary engine air filter + 2x cab fresh air filters.", specs: [{ label: "Bundle", value: "3 filters total" }, { label: "Engine Filter", value: "Heavy-duty radial" }, { label: "Cab Filter", value: "Particulate pleated" }, { label: "Efficiency", value: "99.9%" }], fits: "Volvo VNL (2004-2024) / Detroit DD15 platforms", memberPrice: 65, listPrice: 89, stock: "in-stock", rating: 4.8, reviews: 19, tags: ["filter", "maintenance", "bundle"], image: IMG_AIR_FILTER },
  { id: "p-1007", sku: "RV-GRL-MK", name: "Chrome Grille Assembly with Emblem Mount", brand: "RumValley Core", category: "cab-body", categoryLabel: "Cab & Body", partNumber: "RV-GRL-4050", shortDescription: "Triple-chrome plated front grille replacement (30.5 x 40.5), direct OE replacement.", specs: [{ label: "Dimensions", value: "30.5 x 40.5 in" }, { label: "Finish", value: "Triple Chrome" }, { label: "Mounting", value: "OEM hardware" }, { label: "Weight", value: "18.5 lb" }], fits: "Mack Anthem / CH Trucks (direct OE spec)", memberPrice: 195, listPrice: 245, stock: "in-stock", rating: 5.0, reviews: 6, tags: ["grille", "chrome", "cab-body"], image: IMG_GRILLE },
  { id: "p-1008", sku: "RV-WP-VNL", name: "Windshield Wiper Motor Assembly", brand: "Sprague Compatible", category: "electrical", categoryLabel: "Electrical & Electronics", partNumber: "RV-WPR-8512", shortDescription: "High-torque 12V heavy-duty wiper motor replacement for commercial line-haul trucks.", specs: [{ label: "Voltage", value: "12 V" }, { label: "Sweep Angle", value: "65 / 85 deg" }, { label: "Connector", value: "OE 4-pin" }, { label: "Duty", value: "Continuous heavy" }], fits: "Volvo VNL / VT / VN series trucks", memberPrice: 95, listPrice: 125, stock: "in-stock", rating: 4.8, reviews: 9, tags: ["wiper motor", "electrical"], image: IMG_WIPER_MOTOR },
  { id: "p-1009", sku: "RV-VLV-DSH", name: "Tractor-Trailer Push-Pull Dash Control Valve", brand: "Bendix Compatible", category: "brakes", categoryLabel: "Brakes & Air Systems", partNumber: "RV-VLV-PP1", shortDescription: "OE-spec dual push-pull dash parking brake valve with red trailer and yellow tractor knobs.", specs: [{ label: "Supply Ports", value: "1/4 NPT" }, { label: "Delivery Ports", value: "1/4 NPT" }, { label: "Exhaust", value: "Vented" }, { label: "Standard", value: "DOT / FMVSS" }], fits: "Volvo, Peterbilt, Kenworth, Freightliner", memberPrice: 75, listPrice: 95, stock: "in-stock", rating: 4.9, reviews: 13, tags: ["dash valve", "air valve", "brakes"], image: IMG_DASH_VALVE },
  { id: "p-1010", sku: "RV-LIT-LED", name: "LED Projector Headlight Assembly - Driver & Pass Pair", brand: "RumValley Core", category: "lighting", categoryLabel: "Lighting", partNumber: "RV-LED-9000", shortDescription: "DOT-compliant LED projector headlight pair with integrated daytime running light halo.", specs: [{ label: "Bulb", value: "High-power LED" }, { label: "Housing", value: "Polycarbonate" }, { label: "Voltage", value: "12-24 V" }, { label: "Rating", value: "DOT / SAE" }], fits: "Peterbilt 389 / 579, Kenworth T680", memberPrice: 289, listPrice: 390, stock: "in-stock", rating: 4.9, reviews: 15, tags: ["led", "headlight", "dot", "lighting"], image: IMG_LED },
  { id: "p-1011", sku: "RV-SP-2X", name: "2x Air Spring Bags - Volvo VNL Drive Axle Pair", brand: "RumValley Core", category: "suspension", categoryLabel: "Suspension & Steering", partNumber: "W01-M58-8468", shortDescription: "Heavy-duty air spring bag 2-pack for Volvo VNL / VNR drive axles, includes upper and lower plates.", specs: [{ label: "Quantity", value: "Pair (2 bags)" }, { label: "Load Rating", value: "8,500 lb each" }, { label: "Piston", value: "Steel reinforced" }, { label: "Warranty", value: "2 years" }], fits: "Volvo VNL / VNR 2004-2024 drive axles", memberPrice: 160, listPrice: 198, stock: "in-stock", rating: 5.0, reviews: 22, tags: ["air spring", "volvo vnl", "pair", "best seller"], image: IMG_DOUBLE_BAG },
  { id: "p-1012", sku: "RV-WHL-22", name: "22.5 Aluminum Hub-Pilot Wheel", brand: "Accuride", category: "wheels-tires", categoryLabel: "Wheels & Tires", partNumber: "ACC-28554", shortDescription: "Mirror polished 22.5 x 8.25 forged aluminum wheel, 10-hole hub pilot for steer and drive.", specs: [{ label: "Size", value: "22.5 x 8.25" }, { label: "Material", value: "Forged Aluminum" }, { label: "Finish", value: "Mirror Polish" }, { label: "Load", value: "7,400 lb" }], fits: "Universal 10-stud hub-pilot commercial trucks", memberPrice: 345, listPrice: 420, stock: "in-stock", rating: 4.9, reviews: 18, tags: ["wheel", "aluminum", "polished"], image: IMG_WHEEL },
  { id: "p-1013", sku: "RV-AF-CAS", name: "Air Filter Compatible with Freightliner Cascadia Trucks", brand: "RumValley Core", category: "filters-fluids", categoryLabel: "Filters & Fluids", partNumber: "RV-AF-9118", shortDescription: "Direct replacement radial seal heavy-duty engine air filter element for Freightliner Cascadia DD13/DD15/DD16.", specs: [{ label: "OD", value: "11.2 in" }, { label: "Length", value: "24.6 in" }, { label: "Efficiency", value: "99.98%" }, { label: "Seal", value: "Polyurethane radial" }], fits: "Freightliner Cascadia (2008-2024), DD13 / DD15", memberPrice: 42, listPrice: 50, stock: "in-stock", rating: 4.9, reviews: 24, tags: ["air filter", "freightliner", "cascadia", "maintenance"], image: IMG_AIR_FILTER_CASCADIA },
  { id: "p-1014", sku: "RV-BK-24", name: "Type 24/30 Sealed Spring Brake Chamber Assembly", brand: "RumValley Core", category: "brakes", categoryLabel: "Brakes & Air Systems", partNumber: "RV-SB-2430", shortDescription: "Heavy-duty combination spring brake chamber for drive and trailer axle s-cam drum brake setups.", specs: [{ label: "Size", value: "Type 24/30" }, { label: "Stroke", value: "2.5 in Standard" }, { label: "Ports", value: "3/8-18 NPTF" }, { label: "Finish", value: "Electro-deposition coating" }], fits: "Universal Class 8 tractor & trailer drive axles", memberPrice: 68, listPrice: 90, stock: "in-stock", rating: 5.0, reviews: 12, tags: ["spring brake", "chamber", "brakes", "air system"], image: IMG_BRAKE_CHAMBER_T24 },
  { id: "p-1015", sku: "RV-SP-PB", name: "Air Spring Compatible with Peterbilt & Kenworth Trucks W01-358-8864", brand: "Firestone Compatible", category: "suspension", categoryLabel: "Suspension & Steering", partNumber: "W01-358-8864", shortDescription: "Replaces Peterbilt / Kenworth OEM C81-1011, C81-1013, 1R12-1097 rolling lobe heavy duty air spring.", specs: [{ label: "Top Plate Hole", value: "3/4-16 UNF" }, { label: "Bottom Hole", value: "1/2-13 UNC" }, { label: "Extended", value: "19.8 in" }, { label: "Compressed", value: "6.2 in" }], fits: "Peterbilt 386/388/389, Kenworth T660/T680/W900", memberPrice: 65, listPrice: 80, stock: "in-stock", rating: 4.9, reviews: 31, tags: ["air spring", "peterbilt", "kenworth", "suspension"], image: IMG_AIR_BAG },
  { id: "p-1016", sku: "RV-MIR-KW", name: "Chrome Heated Power Mirror Assembly for Kenworth T680", brand: "RumValley Core", category: "cab-body", categoryLabel: "Cab & Body", partNumber: "RV-MIR-KW680", shortDescription: "Driver side aerodynamic chrome mirror assembly with defrost heater element and motorized glass adjuster.", specs: [{ label: "Position", value: "Driver / Left" }, { label: "Features", value: "Heated + Motorized" }, { label: "Finish", value: "Bright Chrome" }, { label: "Plug", value: "OE 8-pin connector" }], fits: "Kenworth T680 / T880 (2013-2023)", memberPrice: 220, listPrice: 285, stock: "in-stock", rating: 4.8, reviews: 14, tags: ["mirror", "kenworth", "chrome", "heated"], image: IMG_KENWORTH_MIRROR },
  { id: "p-1017", sku: "RV-SP-VOLVO", name: "Air Spring Bag Compatible with Volvo VNL Trucks 21132005 / W01-M58-8468", brand: "RumValley Core", category: "suspension", categoryLabel: "Suspension & Steering", partNumber: "RV-8468-VNL", shortDescription: "Single heavy duty air sleeve replacement for Volvo VNL 670/780/860 rear drive suspensions.", specs: [{ label: "OE Ref", value: "21132005 / 20582215" }, { label: "Firestone Ref", value: "W01-M58-8468" }, { label: "Rating", value: "8,500 lb" }, { label: "Warranty", value: "2 Years" }], fits: "Volvo VNL / VNM / VHD / VNX 2004-2024", memberPrice: 68, listPrice: 82.5, stock: "in-stock", rating: 5.0, reviews: 29, tags: ["volvo vnl", "air spring", "suspension", "best seller"], image: IMG_VOLVO_AIR_SPRING },
  { id: "p-1018", sku: "RV-HS-PAIR", name: "Pair Heavy Duty Gas-Charged Hood Shocks Compatible with Kenworth T680", brand: "RumValley Core", category: "cab-body", categoryLabel: "Cab & Body", partNumber: "RV-HS-KW2X", shortDescription: "Set of 2 heavy-duty gas charged hood struts to support Kenworth T680 hood lift assist.", specs: [{ label: "Package", value: "2 Hood Shocks" }, { label: "Force", value: "135 lb each" }, { label: "Length", value: "29.2 in" }, { label: "Finish", value: "Nitrided steel rod" }], fits: "Kenworth T680, T880 (2013-2023)", memberPrice: 48, listPrice: 65, stock: "in-stock", rating: 4.9, reviews: 17, tags: ["hood shock", "kenworth", "pair", "cab-body"], image: IMG_HOOD_SHOCK },
];

// Generate additional products programmatically
const brands = ["RumValley Core", "Bendix", "Firestone", "Wabco", "Knurr", "Meritor", "Continental", "Cooper", "Goodyear", "Cummins", "Detroit Diesel", "Cat", "Mack", "Paccar", "Navistar"];
const categories_map: Record<string, string[]> = {
  "engine": ["Fuel Pump", "Oil Pan", "Valve Cover", "Turbocharger", "Intercooler", "Injector", "Gasket Set", "Timing Set", "Water Pump", "Thermostat", "Oil Filter Housing", "Fuel Filter", "Hydraulic Pump", "Starter Motor", "Alternator"],
  "brakes": ["Brake Drum", "Brake Shoe", "S-Cam", "Slack Adjuster", "Camshaft Seal", "Brake Pad", "Caliper", "Rotor", "Air Valve", " Relay", "Tune-Up Kit", "Spring Brake", "Chamber", "Line", "Hose"],
  "suspension": ["Air Spring", "Ride Strut", "Leaf Spring", "Shackle", "Bushing", "Kingpin", "Tie Rod", "Drag Link", "Pitman Arm", "Steering Gear", "Kingpin Kit", "Upper Arm", "Lower Arm", "Equalizer", "Parabolic"],
  "transmission": ["Clutch Kit", "Flywheel", "Pressure Plate", "Throwout Bearing", "Shift Fork", "Synchro", "Gear Set", "Main Shaft", "Counter Shaft", "Tail Housing", " Bearings", "Seals", "Gaskets", "Converter", "Torque Splitter"],
  "drivetrain": ["Drive Shaft", "U-Joint", "Carrier Bearing", "Yoke", "Axle Shaft", "Differential", "Ring Gear", "Pinion", "Axle Seal", "Hub Assembly", "Wheel End", "Final Drive", "Reducer", "Transmission Mount", "Transfer Case"],
  "electrical": ["Alternator", "Starter", "ECU", "Sensor", "Switch", "Relay", "Harness", "Connector", "Wiring", "Fuse Box", "Battery", "Terminal", "Ground Strap", "Voltage Regulator", "Soloid"],
  "cooling": ["Radiator", "Charge Air Cooler", "Water Pump", "Fan Clutch", "Fan Blade", "Thermostat", "Hose", "Clamp", "Reservoir", "Overflow", "Coolant", "Thermostat Housing", "Water Neck", "Heat Exchanger", "Fan Shroud"],
  "exhaust": ["DPF Filter", "Muffler", "Stack", "Clamp", "Manifold", "Flex Pipe", "EGR Cooler", "SCR System", "Def Tank", "Node", "Sensor", "Tuning", "Aftertreatment", "Converter", "Catalytic"],
  "filters-fluids": ["Oil Filter", "Air Filter", "Fuel Filter", "Coolant Filter", "Hydraulic Filter", "Transmission Filter", "Fuel Pump Filter", "Breather Filter", "Spin-on Filter", "Element", "Lube", "Gear Oil", "Antifreeze", "Dexron", "Jake Brake Fluid"],
  "wheels-tires": ["Wheel", "Lug Nut", "Hub Pilot", "Spacer", "Stud", "Tire", "Tubeless Valve", "Rim", "Beading Ring", "Lock Ring", "Wheel Cover", "Center Cap", "Valve Stem", "Balancer", "Nut"],
  "cab-body": ["Mirror", "Grille", "Bumper", "Door Handle", "Window", "Windshield", "Glass", "Seal", "Weatherstrip", "Hinge", "Latch", "Damper", "Shock", "Hood", "Fender", "Torch", "Side Panel", "Roof Deflector", "Splash Shield", "Step"],
  "lighting": ["Headlight", "Marker Light", "Turn Signal", "Tail Light", "Brake Light", "Interior Light", "Fog Light", "Work Light", "Strobe Light", "Flasher", "Bulb", "LED Strip", "Harness", "Switch", "Relay"],
};

let productId = 2000;
const additionalProducts: Product[] = [];

// Generate 200+ more products across all categories
Object.entries(categories_map).forEach(([category, items]) => {
  items.forEach((itemName) => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const memberPrice = Math.floor(Math.random() * 400) + 20;
    const listPrice = Math.floor(memberPrice * (1.2 + Math.random() * 0.5));
    const rating = (4.0 + Math.random() * 1.0).toFixed(1);
    const reviews = Math.floor(Math.random() * 50) + 1;
    
    additionalProducts.push({
      id: `p-${productId++}`,
      sku: `RV-${category.substring(0,3).toUpperCase()}-${productId}`,
      name: `${itemName} - ${brand}`,
      brand: brand,
      category: category as CategorySlug,
      categoryLabel: categories.find(c => c.slug === category)?.name || category,
      partNumber: `OE-${productId}`,
      shortDescription: `High-quality ${itemName.toLowerCase()} for heavy-duty truck applications.`,
      specs: [
        { label: "Material", value: "Heavy-duty steel" },
        { label: "Warranty", value: "1-2 years" },
        { label: "Condition", value: "New aftermarket" },
      ],
      fits: "Multiple truck applications",
      memberPrice: memberPrice,
      listPrice: listPrice,
      stock: Math.random() > 0.1 ? "in-stock" : "limited",
      rating: parseFloat(rating),
      reviews: reviews,
      tags: [category, itemName.toLowerCase()],
      image: IMG_AIR_FILTER, // Using placeholder images
    });
  });
});

export const allProducts = [...products, ...additionalProducts];
