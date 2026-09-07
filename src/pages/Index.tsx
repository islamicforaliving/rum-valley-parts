import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Truck,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  ArrowRight,
  Star,
  PackageCheck,
  Headset,
  Wrench,
  ChevronRight,
  Cog,
  Disc3,
  Anchor,
  Settings2,
  Rotate3d,
  Zap,
  ThermometerSnowflake,
  Wind,
  Droplets,
  CircleDot,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/catalog";
import { useAuth, visibleProducts } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";
import { HeroFitmentWidget } from "@/components/HeroFitmentWidget";

const HERO_IMG =
  "https://vibe.filesafe.space/1787789511637791997/assets/12ef8b3c-1f47-4151-8026-cefb5227041a.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cog,
  Disc3,
  Anchor,
  Settings2,
  Rotate3d,
  Zap,
  ThermometerSnowflake,
  Wind,
  Droplets,
  CircleDot,
  Truck,
  Lightbulb,
};

const valueProps = [
  {
    icon: BadgeDollarSign,
    title: "Customer pricing",
    body: "Account holders unlock member pricing on thousands of parts.",
  },
  {
    icon: Clock,
    title: "Fast fulfillment",
    body: "Stocked in Livonia for quick dispatch to your shop or yard.",
  },
  {
    icon: ShieldCheck,
    title: "Quality you trust",
    body: "OEM-grade and rigorously sourced components for real uptime.",
  },
  {
    icon: Headset,
    title: "Knowledgeable staff",
    body: "Talk to people who know trucks — find the right part, fast.",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { user } = useAuth();
  const featured = visibleProducts(user).slice(0, 8);

  return (
    <div>
      {/* MVP-STYLE HERO BANNER WITH INTEGRATED FITMENT CHECKER */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src="https://mvptruckparts.com/cdn/shop/files/corelmvpbanner2_1950x.jpg?v=1627647851"
            alt="Commercial heavy duty semi trucks"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071d3d] via-[#0c2f62]/90 to-[#071d3d]/70" />
        </div>
        <div className="container relative py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              <span className="inline-block bg-accent px-3 py-1 text-xs font-800 uppercase tracking-wider text-accent-foreground">
                Heavy Duty Truck Parts Supplier · Livonia, MI
              </span>
              <h1 className="mt-4 font-display text-4xl font-900 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
                Become a Rum Valley
                <br />
                <span className="text-accent">Wholesale Partner</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm text-white/90 md:text-base">
                Access{" "}
                <strong className="text-accent font-700">
                  wholesale pricing
                </strong>
                , dedicated support, and reliable commercial truck parts.
                Same-day dispatch from Livonia, Michigan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground font-800 uppercase tracking-wider hover:bg-accent/90 shadow-lg"
                >
                  <Link to="/signup">Apply Now →</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white font-700 hover:bg-white/20"
                >
                  <Link to="/catalog">Explore Catalog</Link>
                </Button>
              </div>
            </div>

            {/* Right Hero Fitment Card (MVP style Find Your Truck Part) */}
            <div className="lg:col-span-5">
              <HeroFitmentWidget />
            </div>
          </div>
        </div>
      </section>

      {/* MVP-STYLE 4 SERVICE BADGES */}
      <section className="border-b border-border bg-white py-6">
        <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-700 uppercase tracking-wider text-foreground">
                Free Shipping
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Free shipping on all US orders above $100
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <Headset className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-700 uppercase tracking-wider text-foreground">
                Expert Support
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Call our Livonia parts specialists direct
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-700 uppercase tracking-wider text-foreground">
                30-Day Returns
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Hassle-free exchanges &amp; return window
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-700 uppercase tracking-wider text-foreground">
                100% Guaranteed
              </h4>
              <p className="text-[11px] text-muted-foreground">
                OEM-spec heavy duty commercial quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MVP MAIN CATEGORIES BLOCK */}
      <section className="container py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-800 uppercase tracking-tight text-foreground">
            Main Categories
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 bg-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              name: "Suspension Parts",
              count: "485 products",
              slug: "suspension",
            },
            {
              name: "Filters & Fluids",
              count: "110 products",
              slug: "filters-fluids",
            },
            { name: "Body Parts", count: "527 products", slug: "cab-body" },
            {
              name: "Chrome Accessories",
              count: "56 products",
              slug: "cab-body",
            },
            {
              name: "Brakes & Air Systems",
              count: "392 products",
              slug: "brakes",
            },
            {
              name: "Deer Guards & Bumpers",
              count: "64 products",
              slug: "cab-body",
            },
            {
              name: "Valves & Air Lines",
              count: "215 products",
              slug: "brakes",
            },
            {
              name: "Engine & Powertrain",
              count: "1,240 products",
              slug: "engine",
            },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center justify-center border border-border bg-muted/40 p-5 text-center transition-all hover:border-primary hover:bg-white hover:shadow-sm"
            >
              <h3 className="text-xs font-700 uppercase tracking-wider text-foreground group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* MVP PROMO BANNER 1: SIGN UP TO BECOME A RETAIL / WHOLESALE PARTNER */}
      <section className="container my-8">
        <div className="relative overflow-hidden bg-[#0c4a8a] text-white p-8 md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="relative flex items-center justify-center md:justify-start">
              <div className="relative inline-block rotate-[-6deg] bg-cyan-400 px-8 py-5 text-center font-display text-3xl md:text-5xl font-900 tracking-tight text-primary shadow-lg">
                % Discounts
                <span className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-800 leading-tight">
                Sign up to
                <br />
                become a retail partner and
                <br />
                <span className="text-accent">
                  receive wholesale discounts!
                </span>
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Unlock tiered volume pricing, tax-exempt purchasing, and credit
                lines for fleets and shops.
              </p>
              <div className="mt-5">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground font-800 uppercase tracking-wider hover:bg-accent/90"
                >
                  <Link to="/signup">Sign Up Now !</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MVP DUAL BANNER: SAVE MONEY & TIME + AIR SPRINGS */}
      <section className="container my-8 grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden bg-muted min-h-[220px] flex items-center justify-between p-6 border border-border">
          <div className="relative z-10 max-w-[65%]">
            <span className="text-xs font-700 uppercase tracking-wider text-primary">
              Best Quality Truck Parts
            </span>
            <h3 className="mt-1 font-display text-3xl font-900 uppercase leading-tight text-foreground">
              Save Money &amp; Time
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct-to-operator pricing with zero middleman markup.
            </p>
            <Link
              to="/catalog"
              className="mt-3 inline-block text-xs font-700 uppercase tracking-wider text-primary hover:underline"
            >
              Shop Now →
            </Link>
          </div>
          <img
            src="https://mvptruckparts.com/cdn/shop/articles/Plus.ai-level-4-self-driving-truck-on-highway-1536x864_540x.png?v=1604483749"
            alt="Commercial semi truck"
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
          />
        </div>

        <div className="relative overflow-hidden bg-red-950 text-white min-h-[220px] flex items-center p-6 border border-red-900">
          <div className="relative z-10 max-w-[65%]">
            <span className="text-xs font-700 uppercase tracking-wider text-accent">
              Heavy-Duty Lineup
            </span>
            <h3 className="mt-1 font-display text-3xl font-900 uppercase leading-tight text-white">
              Rum Valley <span className="text-accent">Air Springs</span>
            </h3>
            <p className="mt-1 text-xs text-white/80">
              Long-life dual convoluted &amp; rolling lobe air bags.
            </p>
            <Link
              to="/category/suspension"
              className="mt-3 inline-block text-xs font-700 uppercase tracking-wider text-accent hover:underline"
            >
              View Air Bags →
            </Link>
          </div>
          <img
            src="https://mvptruckparts.com/cdn/shop/files/Freightliner-9780-Air-Spring-Bag-for-W01-358-9780-1_540x.jpg?v=1770728428"
            alt="Air spring bag"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-36 w-36 object-contain"
          />
        </div>
      </section>

      {/* MVP BEST SELLERS GRID */}
      <section className="container py-12">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
          <h2 className="font-display text-2xl font-800 uppercase tracking-tight text-foreground">
            Best Sellers
          </h2>
          <Link
            to="/catalog"
            className="text-xs font-700 uppercase tracking-wider text-primary hover:underline"
          >
            See all products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground font-700 uppercase tracking-wider hover:bg-primary/90"
          >
            <Link to="/catalog">View More →</Link>
          </Button>
        </div>
      </section>

      {/* MVP NOT SURE WHAT YOU NEED DIAGRAM / CONTACT STRIP */}
      <section className="container my-10">
        <div className="border border-border bg-gradient-to-r from-muted/60 via-white to-muted/60 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="text-xs font-800 uppercase tracking-widest text-red-600">
                Specialized Sourcing
              </span>
              <h2 className="mt-2 font-display text-4xl md:text-5xl font-900 uppercase leading-none text-foreground">
                Not Sure What You Need?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Send us your truck's VIN, old part number, or photos of the
                failed component. Our Livonia parts counter will cross-reference
                and locate it in minutes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground font-700 uppercase tracking-wider hover:bg-primary/90"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-700"
                >
                  <a href="tel:7347444091">(734) 744-4091</a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://mvptruckparts.com/cdn/shop/articles/Plus.ai-level-4-self-driving-truck-on-highway-1536x864_720x.png?v=1604483749"
                alt="Truck parts diagram reference"
                className="max-h-72 w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MVP GOLDEN DISTRIBUTOR STRIP */}
      <section className="bg-accent text-accent-foreground py-8">
        <div className="container text-center">
          <p className="text-xs font-800 uppercase tracking-[0.25em] text-accent-foreground/80">
            Rum Valley is a proud distributor of quality commercial brands
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-8 text-sm font-800 tracking-wider">
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              BENDIX
            </span>
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              FIRESTONE
            </span>
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              EATON
            </span>
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              DELCO REMY
            </span>
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              SPICER
            </span>
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              ACCURIDE
            </span>
            <span className="border-b-2 border-accent-foreground/30 pb-0.5">
              WABCO
            </span>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="border-t border-border bg-surface">
        <div className="container flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
          <div>
            <h2 className="font-display text-2xl font-700">
              Can't find the part you need?
            </h2>
            <p className="mt-1 text-muted-foreground">
              Our team sources parts across suppliers. Tell us what you're
              looking for.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="font-700">
              <Link to="/contact">Request a part</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-600">
              <a href="tel:7347444091">(734) 744-4091</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
