import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Building2,
  ArrowRight,
  Check,
  Truck,
  Phone,
  Lock,
  BadgeDollarSign,
  Tag,
  Boxes,
  Heart,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth, type AccountUser, type CustomerGroup } from "@/lib/auth";

const customerTypes: {
  value: AccountUser["accountType"];
  group: CustomerGroup;
  label: string;
}[] = [
  { value: "fleet", group: "fleet", label: "Trucking Company / Fleet" },
  { value: "shop", group: "repair-shop", label: "Repair Shop" },
  { value: "owner-operator", group: "registered", label: "Independent Driver" },
  { value: "shop", group: "registered", label: "Parts Buyer" },
  { value: "owner-operator", group: "registered", label: "Other" },
];

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Customer Pricing",
    body: "See pricing available to your account.",
  },
  {
    icon: Tag,
    title: "Exclusive Deals",
    body: "Access offers not shown to regular visitors.",
  },
  {
    icon: Boxes,
    title: "Additional Products",
    body: "See products and availability reserved for registered customers.",
  },
  {
    icon: Heart,
    title: "Saved Parts",
    body: "Keep frequently purchased parts one click away.",
  },
  {
    icon: Truck,
    title: "Saved Trucks",
    body: "Store your truck information for faster fitment checking.",
  },
  {
    icon: FileText,
    title: "Order & Quote History",
    body: "Keep purchasing information organized in one place.",
  },
];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    company: "",
    typeIdx: 0,
    agree: false,
  });

  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = customerTypes[form.typeIdx];
    signup({
      name: `${form.firstName} ${form.lastName}`.trim() || "New Customer",
      company: form.company || "Independent",
      email: form.email || "new@rumvalley.com",
      phone: form.phone || undefined,
      accountType: t.value,
      group: t.group,
      joined: new Date().toISOString().slice(0, 10),
    });
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Form */}
      <div className="flex items-center justify-center p-6 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-700">
            Create Your Rum Valley Account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get access to customer pricing, exclusive deals, additional
            products, saved parts, and faster ordering.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" icon={User}>
                <input
                  value={form.firstName}
                  onChange={(e) => set({ firstName: e.target.value })}
                  placeholder="Marcus"
                  className="auth-input"
                />
              </Field>
              <Field label="Last Name" icon={User}>
                <input
                  value={form.lastName}
                  onChange={(e) => set({ lastName: e.target.value })}
                  placeholder="Hale"
                  className="auth-input"
                />
              </Field>
            </div>
            <Field label="Email" icon={Mail}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set({ email: e.target.value })}
                placeholder="you@company.com"
                className="auth-input"
              />
            </Field>
            <Field label="Phone" icon={Phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set({ phone: e.target.value })}
                placeholder="(734) 000-0000"
                className="auth-input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" icon={Lock}>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => set({ password: e.target.value })}
                  placeholder="••••••••"
                  className="auth-input"
                />
              </Field>
              <Field label="Confirm Password" icon={Lock}>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => set({ confirm: e.target.value })}
                  placeholder="••••••••"
                  className="auth-input"
                />
              </Field>
            </div>
            <Field label="Company Name" icon={Building2}>
              <input
                value={form.company}
                onChange={(e) => set({ company: e.target.value })}
                placeholder="Hale Freight Lines"
                className="auth-input"
              />
            </Field>

            <div>
              <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
                Customer Type
              </span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {customerTypes.map((t, i) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => set({ typeIdx: i })}
                    className={`border p-2.5 text-left text-sm transition-colors ${form.typeIdx === i ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30"}`}
                  >
                    <span className="block font-600">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => set({ agree: e.target.checked })}
                required
                className="mt-0.5 h-4 w-4 accent-amber-500"
              />
              <span>
                I acknowledge the Rum Valley terms of service and privacy
                policy. Account pricing activates once approved.
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full font-700"
              disabled={!form.agree}
            >
              Create Account <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-600 text-accent">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Benefits panel */}
      <div className="relative hidden bg-primary lg:block order-1 lg:order-2">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="flex justify-end">
            <Logo light />
          </div>
          <div>
            <Truck className="h-10 w-10 text-accent" />
            <h2 className="mt-4 max-w-md font-display text-3xl font-700 leading-tight">
              Your Rum Valley account unlocks more.
            </h2>
            <ul className="mt-6 space-y-4">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/5">
                    <b.icon className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="font-600">{b.title}</p>
                    <p className="text-sm text-primary-foreground/70">
                      {b.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-primary-foreground/50">
            No obligation. Pricing activates once approved.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
    </label>
  );
}
