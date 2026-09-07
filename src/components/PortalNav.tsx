import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Heart,
  Truck,
  BadgePercent,
  Settings,
  Wrench,
} from "lucide-react";

const links = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", to: "/orders", icon: Package },
  { label: "Quotes", to: "/quotes", icon: FileText },
  { label: "Saved Parts", to: "/saved", icon: Heart },
  { label: "My Trucks", to: "/trucks", icon: Truck },
  { label: "Deals", to: "/deals", icon: BadgePercent },
  { label: "Request a Part", to: "/request-part", icon: Wrench },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function PortalNav() {
  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:block">
        <p className="mb-2 px-2 text-xs font-700 uppercase tracking-[0.2em] text-muted-foreground">
          My Rum Valley
        </p>
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 border-l-2 px-3 py-2.5 text-sm font-600 transition-colors ${
                    isActive
                      ? "border-accent bg-surface text-accent"
                      : "border-transparent text-foreground hover:bg-surface hover:text-accent"
                  }`
                }
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile grid — large tappable sections */}
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.5 border p-3 text-center transition-colors ${
                isActive
                  ? "border-accent bg-surface text-accent"
                  : "border-border bg-card hover:border-foreground/30"
              }`
            }
          >
            <l.icon className="h-5 w-5" />
            <span className="text-xs font-600">{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
