import { useState } from "react";
import { Star, PenLine, CheckCircle2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { demoReviews, ratingBreakdown, type Review } from "@/lib/catalog";

interface Props {
  productName: string;
  rating: number;
  reviewCount: number;
}

export function Reviews({ productName, rating, reviewCount }: Props) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(demoReviews);
  const [writing, setWriting] = useState(false);
  const [draft, setDraft] = useState({ rating: 5, title: "", body: "" });

  const breakdown = ratingBreakdown(reviews);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title || !draft.body || !user) return;
    const r: Review = {
      id: `r-${Date.now()}`,
      author: user.name,
      date: new Date().toISOString().slice(0, 10),
      rating: draft.rating,
      title: draft.title,
      body: draft.body,
      verified: false,
      demo: false,
    };
    setReviews([r, ...reviews]);
    setDraft({ rating: 5, title: "", body: "" });
    setWriting(false);
  };

  return (
    <section className="border border-border bg-card">
      <div className="border-b border-border bg-surface p-5">
        <h2 className="font-display text-xl font-700">Customer reviews</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reviews for {productName}.
        </p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[260px_1fr]">
        {/* Summary */}
        <div>
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl font-700">
              {rating.toFixed(1)}
            </span>
            <div className="pb-1">
              <Stars value={rating} />
              <p className="mt-1 text-xs text-muted-foreground">
                {reviewCount} review{reviewCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-muted-foreground">{b.stars}</span>
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <div className="h-1.5 flex-1 overflow-hidden bg-muted">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-muted-foreground">
                  {b.pct}%
                </span>
              </div>
            ))}
          </div>
          {user ? (
            !writing && (
              <Button
                onClick={() => setWriting(true)}
                variant="outline"
                className="mt-5 w-full font-600"
              >
                <PenLine className="mr-1.5 h-4 w-4" /> Write a review
              </Button>
            )
          ) : (
            <p className="mt-5 text-xs text-muted-foreground">
              Sign in to write a review.
            </p>
          )}
        </div>

        {/* List / write form */}
        <div>
          {writing && user && (
            <form
              onSubmit={submit}
              className="mb-5 border border-border bg-surface p-4"
            >
              <p className="mb-3 text-sm font-700">Write a review</p>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs font-600 uppercase tracking-wider text-muted-foreground">
                  Rating
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setDraft({ ...draft, rating: n })}
                      aria-label={`${n} stars`}
                    >
                      <Star
                        className="h-5 w-5"
                        fill={n <= draft.rating ? "currentColor" : "none"}
                        style={{
                          color:
                            n <= draft.rating
                              ? "hsl(var(--accent))"
                              : undefined,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Review title"
                className="form-input mb-3"
              />
              <textarea
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                rows={4}
                placeholder="Share your experience with this part…"
                className="form-input mb-3 resize-none"
              />
              <div className="flex gap-2">
                <Button type="submit" className="font-600">
                  Submit review
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setWriting(false)}
                  className="font-600"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {reviews.map((r) => (
              <article key={r.id} className="border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center bg-surface font-600 text-sm">
                      {r.author.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-600">{r.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Stars value={r.rating} small />
                </div>
                <h3 className="mt-3 text-sm font-700">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {r.verified ? (
                    <span className="inline-flex items-center gap-1 text-xs font-600 text-emerald-600">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified purchase
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 opacity-40" /> Not
                      verified
                    </span>
                  )}
                  {r.demo && (
                    <span className="border border-border px-2 py-0.5 text-[10px] font-600 uppercase tracking-wider text-muted-foreground">
                      Demo
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ value, small }: { value: number; small?: boolean }) {
  const size = small ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={size}
          fill={n <= Math.round(value) ? "currentColor" : "none"}
          style={{
            color:
              n <= Math.round(value)
                ? "hsl(var(--accent))"
                : "hsl(var(--muted-foreground))",
          }}
        />
      ))}
    </div>
  );
}
