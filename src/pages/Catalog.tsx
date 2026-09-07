import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, searchProducts, stockMeta, allProducts } from "@/lib/catalog";
import { useAuth, visibleProducts } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
] as const;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const q = params.get("q") ?? "";
  const activeCat = params.get("category") ?? "";
  const [sort, setSort] =
    useState<(typeof sortOptions)[number]["value"]>("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const [query, setQuery] = useState(q);
  useEffect(() => setQuery(q), [q]);

  const results = useMemo(() => {
    let list = visibleProducts(user);
    if (q)
      list = searchProducts(q).filter((p) => list.some((v) => v.id === p.id));
    if (activeCat) list = list.filter((p) => p.category === activeCat);

    const priceFor = (p: (typeof list)[number]) =>
      user ? p.memberPrice : p.listPrice;
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => priceFor(a) - priceFor(b));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => priceFor(b) - priceFor(a));
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [q, activeCat, sort, user]);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    update("q", query);
  };

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <span>Home</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground">Catalog</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Parts Catalog
          </h1>
          <p className="mt-2 max-w-xl text-primary-foreground/75">
            Search thousands of heavy-duty truck components by name, SKU, or
            part number.
          </p>
          <form onSubmit={submit} className="mt-5 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search parts…"
                className="h-12 w-full border border-white/15 bg-background pl-11 pr-4 text-base text-foreground outline-none focus:border-accent"
              />
            </div>
            <Button type="submit" size="lg" className="font-700">
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="container grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-24 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-700 uppercase tracking-wider">
                  Filters
                </h2>
                <button
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <FilterGroup title="Category">
              <button
                onClick={() => update("category", "")}
                className={`block w-full text-left py-1.5 text-sm ${!activeCat ? "font-600 text-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                All categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => update("category", c.slug)}
                  className={`flex w-full items-center justify-between py-1.5 text-left text-sm ${activeCat === c.slug ? "font-600 text-accent" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {c.short}
                  <span className="text-xs text-muted-foreground/70">
                    {c.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Availability">
              {["in-stock", "limited", "backorder"].map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 py-1 text-sm text-muted-foreground"
                >
                  <input type="checkbox" className="h-4 w-4 accent-amber-500" />
                  {stockMeta[s as keyof typeof stockMeta].label}
                </label>
              ))}
            </FilterGroup>

            {!user && (
              <div className="border border-accent/30 bg-accent/5 p-4">
                <Lock className="h-5 w-5 text-accent" />
                <p className="mt-2 text-sm font-600">
                  Member-only products hidden
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Create an account to see the full catalog and member pricing.
                </p>
                <Button asChild size="sm" className="mt-3 w-full font-600">
                  <a href="/signup">Create account</a>
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-700 text-foreground">{results.length}</span>{" "}
              results
              {q && (
                <>
                  {" "}
                  for "<span className="text-foreground">{q}</span>"
                </>
              )}
              {activeCat && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-foreground">
                    {categories.find((c) => c.slug === activeCat)?.name}
                  </span>
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="font-600 lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Filters
              </Button>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="h-9 border border-border bg-background px-2 text-sm outline-none focus:border-accent"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="border border-dashed border-border p-16 text-center">
              <p className="font-display text-xl font-600">No parts found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or browse categories.
              </p>
              <Button asChild className="mt-4 font-600">
                <a href="/contact">Request this part</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-4">
      <h3 className="mb-1 font-display text-xs font-700 uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}
