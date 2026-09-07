import { Link, Navigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { getProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export default function Saved() {
  const { user, saved } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const items = saved.map(getProduct).filter(Boolean);

  return (
    <div className="container py-10">
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <Heart className="h-7 w-7 text-accent" />
        <div>
          <h1 className="font-display text-3xl font-700 md:text-4xl">
            Saved products
          </h1>
          <p className="text-sm text-muted-foreground">
            {items.length} saved · {user.name}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-display text-xl font-600">
            No saved products yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the star on any part to save it here for fast reordering.
          </p>
          <Button asChild className="mt-4 font-700">
            <Link to="/catalog">
              Browse catalog <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p!.id} product={p!} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
