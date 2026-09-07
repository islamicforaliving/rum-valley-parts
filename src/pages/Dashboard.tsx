import { Link, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Heart,
  Truck,
  FileText,
  Wrench,
  ArrowRight,
  Repeat,
  ChevronRight,
  BadgePercent,
  Boxes,
  BadgeDollarSign,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAuth,
  visibleProducts,
  exclusiveProducts,
  customerPrice,
} from "@/lib/auth";
import { getProduct, formatPrice } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const dealTypeLabel: Record<string, string> = {
  fleet: "Fleet",
  bulk: "Bulk",
  limited: "Limited time",
  percentage: "Discount",
  dollar: "Dollar off",
  clearance: "Clearance",
  supplier: "Supplier",
};

export default function Dashboard() {
  const { user, saved, orders, quotes, deals, trucks, recentlyViewed } =
    useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const exclusive = exclusiveProducts(user).slice(0, 4);
  const recent = recentlyViewed.map(getProduct).filter(Boolean).slice(0, 4);
  const savedItems = saved.map(getProduct).filter(Boolean).slice(0, 4);
  const totalSpend = orders.reduce((s, o) => s + o.total, 0);
  const openQuotes = quotes.filter(
    (q) => q.status !== "Accepted" && q.status !== "Expired",
  ).length;

  const firstName = user.name.split(" ")[0];

  const quickActions = [
    { label: "Browse Parts", to: "/catalog", icon: LayoutDashboard },
    { label: "Request a Part", to: "/request-part", icon: Wrench },
    { label: "View Quotes", to: "/quotes", icon: FileText },
    { label: "View Orders", to: "/orders", icon: Package },
    { label: "Saved Parts", to: "/saved", icon: Heart },
    { label: "My Trucks", to: "/trucks", icon: Truck },
  ];

  const summary = [
    {
      icon: FileText,
      label: "Open quotes",
      value: String(openQuotes),
      to: "/quotes",
    },
    {
      icon: Package,
      label: "Recent orders",
      value: String(orders.length),
      to: "/orders",
    },
    {
      icon: Heart,
      label: "Saved parts",
      value: String(saved.length),
      to: "/saved",
    },
    {
      icon: Truck,
      label: "Saved trucks",
      value: String(trucks.length),
      to: "/trucks",
    },
  ];

  // A few products to illustrate customer pricing architecture.
  const pricingSamples = visibleProducts(user).slice(0, 3);

  return (
    <div className="container py-10">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs font-700 uppercase tracking-[0.2em] text-accent">
            My Rum Valley
          </p>
          <h1 className="mt-2 font-display text-3xl font-700 md:text-4xl">
            {greeting()}, {firstName}.
          </h1>
          <p className="mt-1 text-muted-foreground">
            What are you working on today?
          </p>
        </div>
        <Button asChild className="font-700">
          <Link to="/catalog">
            Browse catalog <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="group flex flex-col items-center gap-2 border border-border bg-card p-4 text-center transition-colors hover:border-accent"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-surface text-accent">
              <a.icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-600">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group flex items-center gap-3 border border-border bg-card p-4 hover:border-accent"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-surface text-accent">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-xl font-700">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>

      {/* Customer pricing */}
      <section className="mt-10">
        <div className="flex items-center gap-2.5">
          <BadgeDollarSign className="h-6 w-6 text-accent" />
          <div>
            <h2 className="font-display text-xl font-700">
              Your Customer Pricing
            </h2>
            <p className="text-sm text-muted-foreground">
              Your account may receive pricing that differs from public list
              pricing.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingSamples.map((p) => {
            const { price, list, save } = customerPrice(p, user);
            return (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="border border-border bg-card p-4 transition-colors hover:border-accent"
              >
                <p className="truncate text-sm font-600">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.brand}</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      List price
                    </p>
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(list)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-accent">
                      Your price
                    </p>
                    <p className="font-display text-2xl font-700">
                      {formatPrice(price)}
                    </p>
                  </div>
                </div>
                {save > 0 && (
                  <p className="mt-2 text-xs font-600 text-emerald-600">
                    You save {formatPrice(save)}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Customer pricing is determined by your account group and may include
          fleet, shop, negotiated, and quantity pricing.
        </p>
      </section>

      {/* Exclusive products */}
      {exclusive.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Boxes className="h-6 w-6 text-accent" />
              <div>
                <h2 className="font-display text-xl font-700">
                  Available to Your Account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Products reserved for registered customers.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exclusive.map((p, i) => (
              <div key={p.id} className="relative">
                <span className="absolute left-2.5 top-2.5 z-10 bg-accent px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-accent-foreground">
                  Account exclusive
                </span>
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exclusive deals */}
      <section className="mt-10">
        <div className="flex items-center gap-2.5">
          <BadgePercent className="h-6 w-6 text-accent" />
          <div>
            <h2 className="font-display text-xl font-700">
              Your Exclusive Deals
            </h2>
            <p className="text-sm text-muted-foreground">
              Promotions tied to your account.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => {
            const p = d.productId ? getProduct(d.productId) : undefined;
            return (
              <div
                key={d.id}
                className="flex flex-col border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="border border-accent/40 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-accent">
                    {dealTypeLabel[d.type] ?? d.type}
                  </span>
                  <span className="text-[10px] font-600 uppercase tracking-wider text-muted-foreground">
                    Exclusive to your account
                  </span>
                </div>
                <p className="mt-3 font-display text-lg font-700">{d.title}</p>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  {d.summary}
                </p>
                {p && (
                  <Link
                    to={`/product/${p.id}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-600 text-accent hover:underline"
                  >
                    View {p.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                {d.expires && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> Expires{" "}
                    {new Date(d.expires).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent orders */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-700">
            Recent orders & quotes
          </h2>
          <Link to="/orders" className="text-sm font-600 text-accent">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-hidden border border-border">
          {orders.length === 0 ? (
            <p className="bg-card p-6 text-sm text-muted-foreground">
              No orders yet. Once you purchase, they'll appear here for quick
              reordering.
            </p>
          ) : (
            orders.slice(0, 3).map((o, i) => (
              <div
                key={o.id}
                className={`flex flex-wrap items-center justify-between gap-3 bg-card p-4 ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <div>
                  <p className="font-mono text-sm font-600">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {o.lines.length} item{o.lines.length > 1 ? "s" : ""}
                  </p>
                </div>
                <span
                  className={`border px-2 py-0.5 text-xs font-600 ${o.status === "Delivered" ? "border-emerald-500/40 text-emerald-600" : o.status === "Processing" ? "border-amber-500/40 text-amber-600" : "border-border text-muted-foreground"}`}
                >
                  {o.status}
                </span>
                <p className="font-display text-lg font-700">
                  {formatPrice(o.total)}
                </p>
                <Button size="sm" variant="outline" className="font-600">
                  <Repeat className="mr-1.5 h-3.5 w-3.5" /> Reorder
                </Button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Recently viewed */}
      {recent.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-700">Recently viewed</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((p, i) => (
              <ProductCard key={p!.id} product={p!} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Saved */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-700">Saved products</h2>
          <Link to="/saved" className="text-sm font-600 text-accent">
            View all
          </Link>
        </div>
        {savedItems.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {savedItems.map((p, i) => (
              <ProductCard key={p!.id} product={p!} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3 border border-dashed border-border p-6 text-muted-foreground">
            <Star className="h-5 w-5 text-accent" />
            <span>
              No saved products yet. Tap the star on any part to save it for
              quick reordering.
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
