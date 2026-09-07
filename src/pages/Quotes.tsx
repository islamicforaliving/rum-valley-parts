import { Link, Navigate } from "react-router-dom";
import { FileText, ArrowRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { getProduct, formatPrice } from "@/lib/catalog";

export default function Quotes() {
  const { user, quotes } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-accent" />
          <div>
            <h1 className="font-display text-3xl font-700 md:text-4xl">
              Quotes
            </h1>
            <p className="text-sm text-muted-foreground">
              {quotes.length} quote{quotes.length === 1 ? "" : "s"} ·{" "}
              {user.name}
            </p>
          </div>
        </div>
        <Button asChild className="font-700">
          <Link to="/request-part">
            Request a quote <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {quotes.length === 0 ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center">
          <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-display text-xl font-600">No quotes yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Quotes created by our team for your account will appear here.
            Request a part to get started.
          </p>
          <Button asChild className="mt-4 font-700">
            <Link to="/request-part">
              Request a part <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {quotes.map((q) => {
            const expired =
              q.status === "Expired" ||
              new Date(q.expires).getTime() < Date.now();
            return (
              <div key={q.id} className="border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-700">{q.id}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(q.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span
                    className={`border px-2.5 py-1 text-xs font-600 ${q.status === "Accepted" ? "border-emerald-500/40 text-emerald-600" : q.status === "Expired" || expired ? "border-border text-muted-foreground" : "border-amber-500/40 text-amber-600"}`}
                  >
                    {expired && q.status !== "Accepted" ? "Expired" : q.status}
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {q.lines.map((l) => {
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
                          className="h-12 w-12 shrink-0 border border-border object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-600">{p.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {p.brand} · Qty {l.qty}
                          </p>
                        </div>
                        <span className="font-display font-700">
                          {formatPrice(p.memberPrice * l.qty)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Expires{" "}
                    {new Date(q.expires).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Quoted total
                      </p>
                      <p className="font-display text-xl font-700">
                        {formatPrice(q.total)}
                      </p>
                    </div>
                    {q.status === "Accepted" ? (
                      <span className="inline-flex items-center gap-1.5 border border-emerald-500/40 px-3 py-2 text-sm font-600 text-emerald-600">
                        <Check className="h-4 w-4" /> Accepted
                      </span>
                    ) : (
                      <Button size="sm" className="font-600">
                        Accept quote
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">
            Demo quotes shown for layout. Real quotes will be created by Rum
            Valley staff and connected to your account.
          </p>
        </div>
      )}
    </div>
  );
}
