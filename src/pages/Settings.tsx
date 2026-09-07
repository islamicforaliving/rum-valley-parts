import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Building2,
  Phone,
  Lock,
  Bell,
  Truck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Settings() {
  const { user, updateProfile, trucks } = useAuth();
  const [savedFlag, setSavedFlag] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    company: user?.company ?? "",
    fleetSize: "",
    billing: "",
    shipping: "",
    primaryContact: user?.name ?? "",
  });
  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    deals: true,
    quotes: true,
  });

  if (!user) return <Navigate to="/login" replace />;
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
    });
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 2500);
  };

  return (
    <div className="container py-10">
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <SettingsIcon className="h-7 w-7 text-accent" />
        <div>
          <h1 className="font-display text-3xl font-700 md:text-4xl">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal, company, and security information.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Personal */}
        <Section icon={User} title="Personal Information">
          <form onSubmit={save} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  value={form.name}
                  onChange={(e) => set({ name: e.target.value })}
                  className="form-input"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set({ email: e.target.value })}
                  className="form-input"
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set({ phone: e.target.value })}
                  className="form-input"
                />
              </Field>
              <Field label="Primary contact">
                <input
                  value={form.primaryContact}
                  onChange={(e) => set({ primaryContact: e.target.value })}
                  className="form-input"
                />
              </Field>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" className="font-600">
                Save changes
              </Button>
              {savedFlag && (
                <span className="inline-flex items-center gap-1.5 text-sm font-600 text-emerald-600">
                  <Check className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </Section>

        {/* Company */}
        <Section icon={Building2} title="Company / Fleet Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company name">
              <input
                value={form.company}
                onChange={(e) => set({ company: e.target.value })}
                className="form-input"
              />
            </Field>
            <Field label="Company type">
              <input
                defaultValue={user.accountType.replace("-", " ")}
                className="form-input"
              />
            </Field>
            <Field label="Fleet size">
              <input
                value={form.fleetSize}
                onChange={(e) => set({ fleetSize: e.target.value })}
                className="form-input"
                placeholder="e.g. 24 trucks"
              />
            </Field>
            <Field label="Primary contact">
              <input
                value={form.primaryContact}
                onChange={(e) => set({ primaryContact: e.target.value })}
                className="form-input"
              />
            </Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Billing address">
              <textarea
                value={form.billing}
                onChange={(e) => set({ billing: e.target.value })}
                rows={2}
                className="form-input resize-none"
                placeholder="Street, city, state, ZIP"
              />
            </Field>
            <Field label="Shipping address">
              <textarea
                value={form.shipping}
                onChange={(e) => set({ shipping: e.target.value })}
                rows={2}
                className="form-input resize-none"
                placeholder="Street, city, state, ZIP"
              />
            </Field>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Company information prepares your account for future fleet billing
            and B2B purchasing features.
          </p>
        </Section>

        {/* Saved trucks summary */}
        <Section icon={Truck} title="Saved Trucks">
          <p className="text-sm text-muted-foreground">
            {trucks.length} truck{trucks.length === 1 ? "" : "s"} saved.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-3 font-600">
            <Link to="/trucks">Manage trucks</Link>
          </Button>
        </Section>

        {/* Password & security */}
        <Section icon={Lock} title="Password & Security">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="New password">
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
              />
            </Field>
            <Field label="Confirm new password">
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
              />
            </Field>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 font-600"
            onClick={() =>
              alert(
                "Password change is not yet connected. Contact Rum Valley at (734) 744-4091 to update your credentials.",
              )
            }
          >
            Update password
          </Button>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notification Preferences">
          <div className="space-y-3">
            {(
              [
                ["orderUpdates", "Order & shipping updates"],
                ["quotes", "Quote responses"],
                ["deals", "Exclusive deals & promotions"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-between border border-border p-3"
              >
                <span className="text-sm font-600">{label}</span>
                <input
                  type="checkbox"
                  checked={prefs[key]}
                  onChange={(e) =>
                    setPrefs({ ...prefs, [key]: e.target.checked })
                  }
                  className="h-4 w-4 accent-amber-500"
                />
              </label>
            ))}
          </div>
        </Section>

        {/* Contact info */}
        <Section icon={Phone} title="Contact Information">
          <p className="text-sm text-muted-foreground">
            Need help with your account? Call{" "}
            <a
              href="tel:7347444091"
              className="font-600 text-accent hover:underline"
            >
              (734) 744-4091
            </a>{" "}
            or email{" "}
            <a
              href="mailto:parts@rumvalley.com"
              className="font-600 text-accent hover:underline"
            >
              parts@rumvalley.com
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2.5 border-b border-border pb-3">
        <Icon className="h-5 w-5 text-accent" />
        <h2 className="font-display text-lg font-700">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
