import { Link } from "react-router-dom";
import { ChevronRight, Lock, ArrowRight, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, visibleProducts } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";

export default function Deals() {
  const { user } = useAuth();
  const all = visibleProducts(user);
  // "Deals" = member-priced items with the biggest list vs member gap, plus member-only items.
  const deals = [...all].sort(
    (a, b) =>
      (b.listPrice - b.memberPrice) / b.listPrice -
      (a.listPrice - a.memberPrice) / a.listPrice,
  );

  return (
    <div>
      <div className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="container relative py-12">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground">Deals</span>
          </nav>
          <div className="mt-3 flex items-center gap-3">
            <BadgePercent className="h-9 w-9 text-accent" />
            <h1 className="font-display text-4xl font-700 tracking-tight md:text-5xl">
              Member Deals
            </h1>
          </div>
          <p className="mt-2 max-w-xl text-primary-foreground/75">
            Customer pricing on high-demand parts. Create an account to unlock
            member rates and exclusive products.
          </p>
          {!user && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="lg" className="font-700">
                <Link to="/signup">
                  Create free account <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent font-600 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container py-10">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Lock className="h-4 w-4 text-accent" />
          <span className="text-muted-foreground">
            {user
              ? "Member pricing is active — your discounted rates are shown below."
              : "Member pricing hidden — sign in to see your rates."}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
