import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  X,
  Phone,
  MapPin,
  Star,
  Package,
  LayoutDashboard,
  LogOut,
  Heart,
  ShoppingCart,
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { AccountMenu } from './AccountMenu';
import { useCart } from '@/lib/cart';

const nav = [
  { label: 'Catalog', to: '/catalog' },
  { label: 'Categories', to: '/categories' },
  { label: 'Deals', to: '/deals' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate(`/catalog?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      {/* MVP Top announcement bar */}
      <div className="bg-muted/70 text-foreground border-b border-border text-[11px] font-500 py-1 px-4">
        <div className="container flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent" />
              11902 Farmington Rd, Suite A, Livonia, MI 48150
            </span>
            <span className="text-border">|</span>
            <a
              href="tel:7347444091"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Phone className="h-3 w-3 text-accent" />
              (734) 744-4091
            </a>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-2 text-center">
            <span>
              SAME DAY &amp;{" "}
              <strong className="text-primary font-700">FREE SHIPPING</strong>{" "}
              ON QUALIFYING ORDERS!
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/signup"
              className="bg-accent text-accent-foreground px-2.5 py-0.5 font-700 text-[11px] uppercase tracking-wider hover:opacity-90"
            >
              Sign up for Wholesale !
            </Link>
            <Link
              to="/contact"
              className="bg-sky-500 text-white px-2.5 py-0.5 font-700 text-[11px] uppercase tracking-wider hover:bg-sky-600"
            >
              Click for Our Reps
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar: Logo, large centered search, user actions */}
      <div className="container flex h-20 items-center justify-between gap-6 py-2">
        <Logo />

        {/* Big MVP-style search bar */}
        <form
          onSubmit={submit}
          className="relative hidden flex-1 max-w-2xl md:flex items-center"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="I'm shopping for..."
            className="h-11 w-full rounded-l-md border border-r-0 border-border bg-white px-4 text-sm text-foreground outline-none focus:border-primary"
          />
          <Button
            type="submit"
            size="default"
            className="h-11 rounded-none rounded-r-md bg-primary px-6 font-700 uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
          >
            Search
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <Link
            to="/saved"
            className="hidden sm:flex flex-col items-center text-xs text-muted-foreground hover:text-primary"
            title="Saved parts"
          >
            <Heart className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">Saved</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      {itemCount()}
                    </span>
                  )}
                </Button>
              </Link>
              <AccountMenu />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      {itemCount()}
                    </span>
                  )}
                </Button>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs font-700 text-foreground hover:text-primary px-2 py-1 uppercase tracking-wider"
              >
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="bg-accent text-accent-foreground text-xs font-800 uppercase tracking-wider px-3 py-1.5 rounded hover:opacity-90"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            className="inline-flex h-10 w-10 items-center justify-center border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MVP-style Primary Navigation Bar (Navy strip) */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between text-xs font-700 uppercase tracking-wider">
          <div className="flex items-center">
            <Link
              to="/categories"
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-3 font-800 transition-opacity hover:opacity-95"
            >
              <Menu className="h-4 w-4" />
              <span>Brand Categories</span>
            </Link>
            <Link
              to="/catalog"
              className="px-4 py-3 hover:bg-white/10 transition-colors"
            >
              Part Categories
            </Link>
            <Link
              to="/catalog"
              className="px-4 py-3 hover:bg-white/10 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/deals"
              className="relative px-4 py-3 text-accent hover:bg-white/10 transition-colors"
            >
              Specials
              <span className="ml-1 rounded bg-red-600 px-1 py-0.2 text-[9px] text-white">
                HOT
              </span>
            </Link>
            <Link
              to="/contact"
              className="px-4 py-3 hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/catalog"
              className="px-4 py-3 hover:bg-white/10 transition-colors"
            >
              Catalogs
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs font-500 normal-case text-white/90">
            <a
              href="tel:7347444091"
              className="inline-flex items-center gap-1.5 hover:text-accent font-600"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              (734) 744-4091
            </a>
            <span className="text-white/40">|</span>
            <a href="mailto:parts@rumvalley.com" className="hover:text-accent">
              parts@rumvalley.com
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container space-y-3 py-4">
            <form onSubmit={submit} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search parts…"
                className="h-11 w-full border border-border bg-muted pl-9 pr-3 text-sm outline-none focus:border-accent"
              />
            </form>
            <nav className="grid gap-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 border-l-2 px-3 py-2.5 text-sm font-600 ${
                      isActive
                        ? "border-accent text-accent"
                        : "border-transparent text-foreground"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-l-2 border-transparent px-3 py-2.5 text-sm font-600"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link
                    to="/saved"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-l-2 border-transparent px-3 py-2.5 text-sm font-600"
                  >
                    <Heart className="h-4 w-4" /> Saved
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-l-2 border-transparent px-3 py-2.5 text-sm font-600"
                  >
                    <Package className="h-4 w-4" /> Orders & Quotes
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/");
                    }}
                    className="flex w-full items-center gap-2 border-l-2 border-transparent px-3 py-2.5 text-left text-sm font-600 text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
