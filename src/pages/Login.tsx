import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "fleet@rumvalley.com");
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden bg-primary lg:block">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Logo light />
          <div>
            <Truck className="h-10 w-10 text-accent" />
            <h2 className="mt-4 max-w-md font-display text-3xl font-700 leading-tight">
              Welcome back. Your pricing, your parts, ready to reorder.
            </h2>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/75">
              <li>· Customer-specific pricing on the full catalog</li>
              <li>· Saved products and one-click reordering</li>
              <li>· Order and quote history in one place</li>
              <li>· Saved trucks for faster fitment checking</li>
            </ul>
          </div>
          <p className="text-xs text-primary-foreground/50">
            Rum Valley · Livonia, Michigan
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-700">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to access your Rum Valley account, customer pricing, saved
            parts, deals, and order information.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Email" icon={Mail}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="auth-input"
              />
            </Field>
            <Field label="Password" icon={Lock}>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••••"
                className="auth-input"
              />
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-amber-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="font-600 text-accent hover:underline"
                onClick={() =>
                  alert(
                    "Password reset is not yet connected. Contact Rum Valley at (734) 744-4091.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" size="lg" className="w-full font-700">
              Sign in <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-600 text-accent">
              Create your free Rum Valley account
            </Link>
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
