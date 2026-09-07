import { Lock } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { customerPrice, type AccountUser } from "@/lib/auth";

interface Props {
  product: Product;
  user: AccountUser | null;
  size?: "md" | "lg";
}

export function PriceBlock({ product, user, size = "md" }: Props) {
  const locked = product.membersOnly && !user;
  const { price, list, save, isMember } = customerPrice(product, user);

  if (locked) {
    return (
      <div className="flex items-center gap-3">
        <Lock className="h-6 w-6 text-accent" />
        <div>
          <p className="font-display text-2xl font-700">Member pricing</p>
          <p className="text-sm text-muted-foreground">
            Sign in or create an account to view your price.
          </p>
        </div>
      </div>
    );
  }

  const big = size === "lg" ? "text-4xl" : "text-3xl";

  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {isMember ? "Your price" : "List price"}
      </p>
      <p className={`font-display ${big} font-700`}>{formatPrice(price)}</p>
      {isMember && save > 0 && (
        <div className="mt-1 flex items-center gap-3 text-sm">
          <span className="text-muted-foreground line-through">
            {formatPrice(list)}
          </span>
          <span className="font-600 text-emerald-600">
            You save {formatPrice(save)}
          </span>
        </div>
      )}
      {!isMember && (
        <p className="mt-1 text-xs text-muted-foreground">
          Sign in for customer pricing
        </p>
      )}
    </div>
  );
}
