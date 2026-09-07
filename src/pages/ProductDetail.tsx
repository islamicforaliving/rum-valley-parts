import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  Lock,
  ArrowLeft,
  Check,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct, getCategory, formatPrice, stockMeta } from "@/lib/catalog";
import { useAuth } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";
import { visibleProducts } from "@/lib/auth";
import { FitmentChecker } from "@/components/FitmentChecker";
import { Reviews } from "@/components/Reviews";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id ?? "");
  const navigate = useNavigate();
  const { user, toggleSaved, isSaved, addRecentlyViewed } = useAuth();

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-display text-3xl font-700">Part not found</h1>
        <Button asChild className="mt-4 font-600">
          <Link to="/catalog">Back to catalog</Link>
        </Button>
      </div>
    );
  }

  const category = getCategory(product.category);
  const stock = stockMeta[product.stock];
  const locked = product.membersOnly && !user;
  const price = user ? product.memberPrice : product.listPrice;
  const related = visibleProducts(user)
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const saved = isSaved(product.id);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/catalog" className="hover:text-accent">
            Catalog
          </Link>
          <ChevronRight className="h-3 w-3" />
          {category && (
            <>
              <Link
                to={`/category/${category.slug}`}
                className="hover:text-accent"
              >
                {category.short}
              </Link>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="truncate text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container grid gap-10 py-10 lg:grid-cols-[1fr_1fr]">
        {/* Image */}
        <div className="relative">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-1 text-sm font-600 text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="relative aspect-square overflow-hidden border border-border bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.membersOnly && (
              <span className="absolute left-4 top-4 bg-accent px-3 py-1 text-xs font-700 uppercase tracking-wider text-accent-foreground">
                Member only
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="font-600 text-foreground">{product.brand}</span>
            <span>·</span>
            <span className="font-mono">SKU {product.sku}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-700 leading-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4" fill="currentColor" />
              <span className="font-600 text-foreground">
                {product.rating.toFixed(1)}
              </span>
            </span>
            <span className="text-muted-foreground">
              {product.reviews} reviews
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-xs">P/N {product.partNumber}</span>
          </div>

          <p className="mt-4 text-base text-muted-foreground">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-end gap-4 border-y border-border py-5">
            {locked ? (
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-accent" />
                <div>
                  <p className="font-display text-2xl font-700">
                    Member pricing
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sign in or create an account to view price.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {user ? "Your price" : "List price"}
                  </p>
                  <p className="font-display text-4xl font-700">
                    {formatPrice(price)}
                  </p>
                  {user && product.memberPrice < product.listPrice && (
                    <p className="text-sm text-muted-foreground">
                      <span className="line-through">
                        {formatPrice(product.listPrice)}
                      </span>
                      <span className="ml-2 font-600 text-emerald-600">
                        Save{" "}
                        {formatPrice(product.listPrice - product.memberPrice)}
                      </span>
                    </p>
                  )}
                </div>
                <div className="ml-auto">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-600 ${stock.tone === "green" ? "text-emerald-600" : stock.tone === "amber" ? "text-amber-600" : "text-red-600"}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />{" "}
                    {stock.label}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-3">
            {locked ? (
              <>
                <Button asChild size="lg" className="font-700">
                  <Link to="/signup">Unlock member pricing</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-600"
                >
                  <Link to="/login">Sign in</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="font-700">
                  Request quote
                </Button>
                <Button
                  onClick={() => user && toggleSaved(product.id)}
                  variant={saved ? "default" : "outline"}
                  size="lg"
                  className="font-600"
                >
                  <Star
                    className="mr-1.5 h-4 w-4"
                    fill={saved ? "currentColor" : "none"}
                  />
                  {saved ? "Saved" : "Save"}
                </Button>
                {!user && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="font-600"
                  >
                    <Link to="/signup">Create account for better pricing</Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Trust strip */}
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-border bg-border text-sm">
            {[
              { icon: ShieldCheck, label: "OEM-grade" },
              { icon: Truck, label: "Fast dispatch" },
              { icon: Check, label: "Quality sourced" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center justify-center gap-2 bg-card py-3 text-center text-muted-foreground"
              >
                <t.icon className="h-4 w-4 text-accent" /> {t.label}
              </div>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-8">
            <h2 className="font-display text-lg font-700">Specifications</h2>
            <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
              {product.specs.map((s) => (
                <div key={s.label} className="bg-card p-3">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-0.5 font-600">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Fitment */}
          <div className="mt-6 border-l-2 border-accent bg-surface p-4">
            <p className="flex items-center gap-2 text-xs font-700 uppercase tracking-wider text-accent">
              <Package className="h-4 w-4" /> Fitment
            </p>
            <p className="mt-1 text-sm">{product.fits}</p>
          </div>

          {/* Fitment checker */}
          <div className="mt-6">
            <FitmentChecker productName={product.name} />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="border-t border-border">
        <div className="container py-12">
          <Reviews
            productName={product.name}
            rating={product.rating}
            reviewCount={product.reviews}
          />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface">
          <div className="container py-12">
            <h2 className="font-display text-2xl font-700">
              Related parts in {category?.short}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
