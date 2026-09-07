import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Star } from "lucide-react";
import { Logo } from "./Logo";
import { categories } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0f2c59] text-white">
      {/* MVP-style top badge strip in footer */}
      <div className="border-b border-white/10 py-6">
        <div className="container flex flex-wrap items-center justify-between gap-4 text-xs font-700 uppercase tracking-wider text-white/80">
          <span>Detroit Metro Heavy-Duty Truck Parts Supplier</span>
          <span className="hidden sm:inline">·</span>
          <span>Fast Michigan &amp; Nationwide Delivery</span>
          <span className="hidden sm:inline">·</span>
          <span>Wholesale Fleet &amp; Shop Accounts Available</span>
        </div>
      </div>

      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/80">
            Commercial heavy-duty truck parts for fleets, mechanics, and
            operators. The right part, the right price, fast.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-700 text-white">5.0</span>
            <span className="text-white/70">· 9 Google reviews</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-700 uppercase tracking-wider text-accent">
            Shop Catalog
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            <li>
              <Link to="/catalog" className="hover:text-accent">
                All Parts
              </Link>
            </li>
            <li>
              <Link to="/deals" className="hover:text-accent">
                Member Deals
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-accent">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-accent">
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-600 uppercase tracking-wider text-accent">
            Top Categories
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} className="hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-600 uppercase tracking-wider text-accent">
            Contact
          </h4>
          <ul className="mt-3 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                11902 Farmington Rd, Suite A<br />
                Livonia, MI 48150
              </span>
            </li>
            <li>
              <a
                href="tel:7347444091"
                className="flex items-center gap-2.5 hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" /> (734) 744-4091
              </a>
            </li>
            <li>
              <a
                href="mailto:parts@rumvalley.com"
                className="flex items-center gap-2.5 hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" /> parts@rumvalley.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-primary-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Rum Valley. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/about" className="hover:text-accent">
              About
            </Link>
            <Link to="/contact" className="hover:text-accent">
              Contact
            </Link>
            <span>Livonia, Michigan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
