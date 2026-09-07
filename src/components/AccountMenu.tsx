import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Heart,
  Truck,
  BadgePercent,
  Settings,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const items = [
  { label: "My Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", to: "/orders", icon: Package },
  { label: "My Quotes", to: "/quotes", icon: FileText },
  { label: "Saved Parts", to: "/saved", icon: Heart },
  { label: "My Trucks", to: "/trucks", icon: Truck },
  { label: "Exclusive Deals", to: "/deals", icon: BadgePercent },
  { label: "Account Settings", to: "/settings", icon: Settings },
];

export function AccountMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 border border-border bg-card px-2.5 text-sm font-600 transition-colors hover:border-foreground/30"
      >
        <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-700 text-primary-foreground">
          {user.name.charAt(0)}
        </span>
        <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 border border-border bg-card shadow-industrial">
          <div className="border-b border-border p-3">
            <p className="text-sm font-700">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <nav className="py-1">
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-600 text-foreground hover:bg-surface hover:text-accent"
              >
                <it.icon className="h-4 w-4 text-muted-foreground" />
                {it.label}
              </Link>
            ))}
            <button
              onClick={() => {
                logout();
                setOpen(false);
                navigate("/");
              }}
              className="flex w-full items-center gap-2.5 border-t border-border px-3 py-2 text-left text-sm font-600 text-muted-foreground hover:bg-surface hover:text-destructive"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export { User };
