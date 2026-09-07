import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/catalog";

export default function Categories() {
  return (
    <div>
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground">Categories</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Parts Categories
          </h1>
          <p className="mt-2 max-w-xl text-primary-foreground/75">
            Browse heavy-duty truck components organized by system. Built to
            scale across thousands of parts.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-display text-xl font-700">{c.name}</h2>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {c.description}
              </p>
              <p className="mt-4 text-xs font-600 uppercase tracking-wider text-accent">
                {c.count.toLocaleString()} parts →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
