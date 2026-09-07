import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { categories, getCategory } from "@/lib/catalog";
import { useAuth, visibleProducts } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";

export default function Category() {
  const { slug } = useParams();
  const { user } = useAuth();
  const category = getCategory(slug ?? "");

  if (!category) return <Navigate to="/catalog" replace />;

  const items = visibleProducts(user).filter(
    (p) => p.category === category.slug,
  );

  return (
    <div>
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/categories" className="hover:text-accent">
              Categories
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground">{category.name}</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-700 tracking-tight md:text-5xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-primary-foreground/75">
            {category.description}
          </p>
          <p className="mt-3 text-sm text-primary-foreground/60">
            {category.count.toLocaleString()} parts available
          </p>
        </div>
      </div>

      <div className="container py-10">
        {items.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center">
            <p className="font-display text-xl font-600">
              No sample parts in this category yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              This category is ready for live catalog data. Request a part and
              our team will source it.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1 text-sm font-600 text-accent"
            >
              Request a part <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}

        {/* Other categories */}
        <div className="mt-14">
          <h2 className="font-display text-xl font-700">Other categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="border border-border bg-card px-3 py-1.5 text-sm font-600 hover:border-accent hover:text-accent"
                >
                  {c.short}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
