import { Link, Navigate } from "react-router-dom";
import { Package, Repeat, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { getProduct, formatPrice } from "@/lib/catalog";

export default function Orders() {
  const { user, orders } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Package className="h-7 w-7 text-accent" />
          <div>
            <h1 className="font-display text-3xl font-700 md:text-4xl">
              Orders & Quotes
            </h1>
            <p className="text-sm text-muted-foreground">
              {orders.length} records · {user.name}
            </p>
          </div>
        </div>
        <Button asChild className="font-700">
          <Link to="/catalog">
            New order <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center">
          <p className="font-display text-xl font-600">No orders yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your quotes and orders will appear here once you start purchasing.
          </p>
          <Button asChild className="mt-4 font-700">
            <Link to="/catalog">
              Browse catalog <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-700">{o.id}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(o.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span
                  className={`border px-2.5 py-1 text-xs font-600 ${o.status === "Delivered" ? "border-emerald-500/40 text-emerald-600" : o.status === "Processing" ? "border-amber-500/40 text-amber-600" : o.status === "Shipped" ? "border-blue-500/40 text-blue-600" : "border-border text-muted-foreground"}`}
                >
                  {o.status}
                </span>
              </div>
              <div className="divide-y divide-border">
                {o.lines.map((l) => {
                  const p = getProduct(l.productId);
                  if (!p) return null;
                  return (
                    <Link
                      key={l.productId}
                      to={`/product/${p.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-surface"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-14 w-14 shrink-0 border border-border object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-600">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.brand} · SKU {p.sku} · Qty {l.qty}
                        </p>
                      </div>
                      <span className="font-display font-700">
                        {formatPrice(
                          (user ? p.memberPrice : p.listPrice) * l.qty,
                        )}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
                <Button size="sm" variant="outline" className="font-600">
                  <Repeat className="mr-1.5 h-3.5 w-3.5" /> Reorder these items
                </Button>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Total
                  </p>
                  <p className="font-display text-xl font-700">
                    {formatPrice(o.total)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
