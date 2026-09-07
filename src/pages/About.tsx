import { Link } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  Headset,
  Truck,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMG =
  "https://vibe.filesafe.space/1787789511637791997/assets/12ef8b3c-1f47-4151-8026-cefb5227041a.png";

const pillars = [
  {
    icon: BadgeDollarSign,
    title: "Customer pricing",
    body: "Account holders unlock member pricing on the full catalog — built for repeat B2B purchasing.",
  },
  {
    icon: Clock,
    title: "Fast fulfillment",
    body: "Stocked locally in Livonia for quick dispatch to your shop, yard, or job site.",
  },
  {
    icon: ShieldCheck,
    title: "Quality you trust",
    body: "OEM-grade and rigorously sourced components for real uptime, not guesswork.",
  },
  {
    icon: Headset,
    title: "Knowledgeable staff",
    body: "Talk to people who know trucks. We help you find the right part the first time.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50" />
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
        </div>
        <div className="container relative py-16 md:py-24">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground">About</span>
          </nav>
          <span className="mt-4 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 text-xs font-600 uppercase tracking-wider text-accent">
            <Truck className="h-3.5 w-3.5" /> Truck Parts Supplier · Livonia, MI
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-700 leading-tight tracking-tight md:text-6xl">
            A serious parts supplier for people who keep trucks moving.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/80">
            Rum Valley is a truck parts supplier in Livonia, Michigan, built for
            fleets, mechanics, and operators who need the right part, the right
            price, and fast service.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-600">5.0 rating</span>
            <span className="text-primary-foreground/60">
              · 9 Google reviews
            </span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border bg-surface">
        <div className="container grid gap-px overflow-hidden border-x border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="bg-surface p-6">
              <p.icon className="h-7 w-7 text-accent" />
              <h3 className="mt-3 font-display text-lg font-600">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="container py-16 md:py-20">
        <p className="text-xs font-700 uppercase tracking-[0.2em] text-accent">
          Built for B2B
        </p>
        <h2 className="mt-2 font-display text-3xl font-700 tracking-tight md:text-4xl">
          Who we serve
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Trucking companies",
              d: "Source parts across your fleet with consistent pricing and fast reordering.",
            },
            {
              t: "Fleet managers",
              d: "Keep maintenance on schedule with stocked components and quote history.",
            },
            {
              t: "Diesel mechanics",
              d: "Find the exact part by system, SKU, or part number — fast.",
            },
            {
              t: "Repair shops",
              d: "Account pricing and saved products for repeat service work.",
            },
            {
              t: "Owner-operators",
              d: "Get the right part without dealership markups or guesswork.",
            },
            {
              t: "Parts buyers",
              d: "A scalable catalog ready for inventory feeds and supplier integration.",
            },
          ].map((s) => (
            <div key={s.t} className="border border-border bg-card p-5">
              <h3 className="font-display text-lg font-600">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface">
        <div className="container flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
          <div>
            <h2 className="font-display text-2xl font-700">
              Ready to get the right part, fast?
            </h2>
            <p className="mt-1 text-muted-foreground">
              Create a free account or browse the catalog.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="font-700">
              <Link to="/signup">
                Create account <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-600">
              <Link to="/catalog">Browse catalog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
