import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as catalogProducts, type Product } from "./catalog";

// Lightweight client-side auth + account state.
// Replaces easily with a real B2B backend later; the shape stays stable.

export type CustomerGroup =
  "public" | "registered" | "repair-shop" | "fleet" | "wholesale" | "preferred";

export interface AccountUser {
  name: string;
  company: string;
  email: string;
  phone?: string;
  accountType: "fleet" | "shop" | "owner-operator";
  group: CustomerGroup;
  joined: string;
}

export interface SavedTruck {
  id: string;
  nickname?: string;
  year: string;
  make: string;
  model: string;
  engine: string;
  configuration?: string;
  notes?: string;
}

export interface QuoteLine {
  productId: string;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Quote" | "Processing" | "Shipped" | "Delivered";
  total: number;
  lines: QuoteLine[];
}

export interface Quote {
  id: string;
  date: string;
  status: "Draft" | "Sent" | "Accepted" | "Expired";
  expires: string;
  lines: QuoteLine[];
  total: number;
}

export interface Deal {
  id: string;
  title: string;
  type:
    | "percentage"
    | "dollar"
    | "bulk"
    | "fleet"
    | "clearance"
    | "supplier"
    | "limited";
  summary: string;
  badge: string;
  productId?: string;
  expires?: string;
}

interface AuthState {
  user: AccountUser | null;
  saved: string[];
  orders: Order[];
  quotes: Quote[];
  deals: Deal[];
  trucks: SavedTruck[];
  recentlyViewed: string[];
  login: (email: string) => void;
  signup: (user: AccountUser) => void;
  updateProfile: (patch: Partial<AccountUser>) => void;
  logout: () => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  addTruck: (truck: Omit<SavedTruck, "id">) => void;
  updateTruck: (id: string, patch: Partial<SavedTruck>) => void;
  removeTruck: (id: string) => void;
}

const AuthContext = createContext<AuthState | null>(null);
const KEY = "rumvalley_account_v2";

interface Persisted {
  user: AccountUser | null;
  saved: string[];
  orders: Order[];
  quotes: Quote[];
  deals: Deal[];
  trucks: SavedTruck[];
  recentlyViewed: string[];
}

const demoOrders: Order[] = [
  {
    id: "RVQ-204881",
    date: "2026-08-12",
    status: "Delivered",
    total: 1_478,
    lines: [
      { productId: "p-1006", qty: 24 },
      { productId: "p-1002", qty: 8 },
    ],
  },
  {
    id: "RVQ-204902",
    date: "2026-08-21",
    status: "Processing",
    total: 2_560,
    lines: [
      { productId: "p-1005", qty: 4 },
      { productId: "p-1011", qty: 12 },
    ],
  },
];

// Clearly-marked demo quotes. Real quotes will be staff-created.
const demoQuotes: Quote[] = [
  {
    id: "RV-QUOTE-1182",
    date: "2026-08-23",
    status: "Sent",
    expires: "2026-09-06",
    total: 4_980,
    lines: [
      { productId: "p-1004", qty: 2 },
      { productId: "p-1003", qty: 6 },
    ],
  },
];

// Account-exclusive promotions. Marked as demo — no fabricated percentages
// presented as real Rum Valley offers.
const demoDeals: Deal[] = [
  {
    id: "deal-1",
    title: "Fleet maintenance bundle",
    type: "fleet",
    summary:
      "Demo offer: negotiated fleet pricing on filters and fluids when ordered as a maintenance bundle.",
    badge: "FLEET",
  },
  {
    id: "deal-2",
    title: "Bulk brake chamber pricing",
    type: "bulk",
    summary:
      "Demo offer: volume-based pricing available on Type 30 brake chambers for drive and trailer axles.",
    badge: "BULK",
    productId: "p-1002",
  },
  {
    id: "deal-3",
    title: "Limited-time alternator promotion",
    type: "limited",
    summary:
      "Demo offer: short-window promotional pricing on high-output alternators for your account.",
    badge: "LIMITED",
    productId: "p-1005",
    expires: "2026-09-15",
  },
];

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Persisted;
      // merge any new demo collections if absent
      return {
        user: parsed.user ?? null,
        saved: parsed.saved ?? [],
        orders: parsed.orders ?? [],
        quotes: parsed.quotes ?? [],
        deals: parsed.deals ?? demoDeals,
        trucks: parsed.trucks ?? [],
        recentlyViewed: parsed.recentlyViewed ?? [],
      };
    }
  } catch {
    /* ignore */
  }
  return {
    user: null,
    saved: [],
    orders: [],
    quotes: [],
    deals: demoDeals,
    trucks: [],
    recentlyViewed: [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => load());

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AuthState>(
    () => ({
      user: state.user,
      saved: state.saved,
      orders: state.orders,
      quotes: state.quotes,
      deals: state.deals,
      trucks: state.trucks,
      recentlyViewed: state.recentlyViewed,
      login: (email) =>
        setState((s) => ({
          ...s,
          user: s.user ?? {
            name: "Marcus Hale",
            company: "Hale Freight Lines",
            email,
            phone: "(734) 555-0142",
            accountType: "fleet",
            group: "fleet",
            joined: "2025-03-04",
          },
          orders: s.orders.length ? s.orders : demoOrders,
          quotes: s.quotes.length ? s.quotes : demoQuotes,
          deals: s.deals.length ? s.deals : demoDeals,
        })),
      signup: (user) =>
        setState((s) => ({
          ...s,
          user,
          orders: s.orders.length ? s.orders : demoOrders,
          quotes: s.quotes.length ? s.quotes : demoQuotes,
          deals: s.deals.length ? s.deals : demoDeals,
        })),
      updateProfile: (patch) =>
        setState((s) => (s.user ? { ...s, user: { ...s.user, ...patch } } : s)),
      logout: () => setState((s) => ({ ...s, user: null })),
      toggleSaved: (id) =>
        setState((s) => ({
          ...s,
          saved: s.saved.includes(id)
            ? s.saved.filter((x) => x !== id)
            : [...s.saved, id],
        })),
      isSaved: (id) => state.saved.includes(id),
      addRecentlyViewed: (id) =>
        setState((s) => ({
          ...s,
          recentlyViewed: [
            id,
            ...s.recentlyViewed.filter((x) => x !== id),
          ].slice(0, 8),
        })),
      addTruck: (truck) =>
        setState((s) => ({
          ...s,
          trucks: [...s.trucks, { ...truck, id: `truck-${Date.now()}` }],
        })),
      updateTruck: (id, patch) =>
        setState((s) => ({
          ...s,
          trucks: s.trucks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      removeTruck: (id) =>
        setState((s) => ({
          ...s,
          trucks: s.trucks.filter((t) => t.id !== id),
        })),
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Products visible to a given user. membersOnly products require an account.
export function visibleProducts(user: AccountUser | null): Product[] {
  return catalogProducts.filter((p) => (p.membersOnly ? !!user : true));
}

// Account-exclusive products (members-only) — shown only to logged-in customers.
export function exclusiveProducts(user: AccountUser | null): Product[] {
  return catalogProducts.filter((p) => p.membersOnly && !!user);
}

// Customer-specific price for a product. Architecture supports per-customer /
// per-group pricing rules; for now returns member price for logged-in users.
export function customerPrice(
  product: Product,
  user: AccountUser | null,
): { price: number; list: number; save: number; isMember: boolean } {
  const isMember = !!user;
  const price = isMember ? product.memberPrice : product.listPrice;
  return {
    price,
    list: product.listPrice,
    save: product.listPrice - product.memberPrice,
    isMember,
  };
}

export const accountTypeLabel: Record<AccountUser["accountType"], string> = {
  fleet: "Fleet operator",
  shop: "Repair shop",
  "owner-operator": "Owner-operator",
};

export const customerGroupLabel: Record<CustomerGroup, string> = {
  public: "Public",
  registered: "Registered customer",
  "repair-shop": "Repair shop",
  fleet: "Fleet",
  wholesale: "Wholesale",
  preferred: "Preferred customer",
};
