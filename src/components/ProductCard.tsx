import { Link } from "react-router-dom";
import { Star, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { formatPrice, stockMeta, type Product } from "@/lib/catalog";
import { toast } from "sonner";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { user, toggleSaved, isSaved } = useAuth();
  const { addItem } = useCart();
  const stock = stockMeta[product.stock];
  const toneClasses: Record<string, string> = {
    green: "text-emerald-600 dark:text-emerald-400",
    amber: "text-amber-600 dark:text-amber-400",
    red: "text-red-600 dark:text-red-400",
  };
  const saved = isSaved(product.id);
  const locked = product.membersOnly && !user;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success("Added to cart!");
  };

  return (
    <article
      className="group relative flex flex-col border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-white p-3"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 flex flex-col gap-1.5 p-2.5">
          {product.membersOnly && (
            <span className="bg-accent px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-accent-foreground">
              Member
            </span>
          )}
          {product.stock === "limited" && (
            <span className="bg-amber-600 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-white">
              Limited
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (user) toggleSaved(product.id);
          }}
          aria-label={saved ? "Remove from saved" : "Save product"}
          className={`absolute right-9 top-2.5 inline-flex h-8 w-8 items-center justify-center border backdrop-blur transition-colors ${
            saved
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-background/80 text-foreground hover:border-foreground/40"
          }`}
        >
          <Star className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="absolute right-2 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </Link>

      <div className="flex flex-1 flex-col pt-3 text-center">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.5rem] font-sans text-sm font-600 leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {product.sku}
        </p>

        <div className="mt-2.5 flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-0.5 text-amber-500">
            <Star className="h-3 w-3" fill="currentColor" />
            <span className="font-600 text-foreground">
              {product.rating.toFixed(1)}
            </span>
          </span>
          <span className="text-muted-foreground">({product.reviews})</span>
          <span className={`ml-auto font-600 ${toneClasses[stock.tone]}`}>
            {stock.label}
          </span>
        </div>

        <div className="mt-auto pt-2">
          <div className="text-center">
            <div className="font-display text-xl font-700 text-foreground">
              {formatPrice(user ? product.memberPrice : product.listPrice)}
            </div>
            {user && product.memberPrice < product.listPrice ? (
              <div className="text-[11px] text-muted-foreground line-through">
                List {formatPrice(product.listPrice)}
              </div>
            ) : !user ? (
              <p className="text-[10px] text-accent-deep font-600">
                Sign in for member pricing
              </p>
            ) : null}
          </div>
          <Button
            asChild
            size="sm"
            className="mt-2.5 w-full bg-primary font-600 text-primary-foreground hover:bg-primary/90"
          >
            <Link to={locked ? "/signup" : `/product/${product.id}`}>
              {locked ? "Unlock Pricing" : "View Product"}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-border bg-card">
      <div className="aspect-[4/3] w-full bg-muted" />
      <div className="space-y-2 p-3.5">
        <div className="h-3 w-1/3 bg-muted" />
        <div className="h-4 w-3/4 bg-muted" />
        <div className="h-3 w-full bg-muted" />
        <div className="h-8 w-full bg-muted" />
      </div>
    </div>
  );
}

