import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildTrackingPayload, postTrackingEvent } from "@/lib/tracking";

// Custom field id for "Part Requested" (registered in CRM).
const FIELD_PART_REQUESTED = "U7mx2BFn3ynXVc6efSuJ";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    part: "",
    calendar_notes: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = buildTrackingPayload(
      "contact-part-request",
      "Contact / Part Request",
    );
    payload.formData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      calendar_notes: form.calendar_notes,
    };
    payload.formLabels = {
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      phone: "Phone",
      calendar_notes: "Message",
    };
    postTrackingEvent(payload, {
      customFields: {
        [FIELD_PART_REQUESTED]: { value: form.part, label: "Part Requested" },
      },
    });
    setSent(true);
  };

  return (
    <div>
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground">Contact</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Request a part or get in touch
          </h1>
          <p className="mt-2 max-w-xl text-primary-foreground/75">
            Can't find what you need? Tell us the part and our team will source
            it across our supplier network.
          </p>
        </div>
      </div>

      <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Info */}
        <div className="space-y-6">
          <div className="border border-border bg-card p-6">
            <h2 className="font-display text-lg font-700">Rum Valley</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Truck Parts Supplier · Livonia, Michigan
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  11902 Farmington Rd, Suite A<br />
                  Livonia, MI 48150
                </span>
              </li>
              <li>
                <a
                  href="tel:7347444091"
                  className="flex gap-3 hover:text-accent"
                >
                  <Phone className="h-5 w-5 shrink-0 text-accent" />
                  <span>(734) 744-4091</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:parts@rumvalley.com"
                  className="flex gap-3 hover:text-accent"
                >
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  <span>parts@rumvalley.com</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  Mon–Fri: 8:00 AM – 6:00 PM
                  <br />
                  Sat: 9:00 AM – 2:00 PM
                </span>
              </li>
            </ul>
          </div>
          <div className="border-l-2 border-accent bg-surface p-5">
            <p className="text-sm">
              <span className="font-700">Already a customer?</span> Sign in for
              faster service and your account pricing.
            </p>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="mt-3 font-600"
            >
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="border border-border bg-card p-6 md:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center bg-accent text-accent-foreground">
                <Check className="h-7 w-7" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-700">
                Request received
              </h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Thanks, {form.first_name || "there"}. Our team will reach out
                shortly about your part request.
              </p>
              <Button asChild className="mt-5 font-600">
                <Link to="/catalog">Back to catalog</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="First name">
                  <input
                    required
                    value={form.first_name}
                    onChange={(e) =>
                      setForm({ ...form, first_name: e.target.value })
                    }
                    className="form-input"
                    placeholder="Marcus"
                  />
                </FormField>
                <FormField label="Last name">
                  <input
                    required
                    value={form.last_name}
                    onChange={(e) =>
                      setForm({ ...form, last_name: e.target.value })
                    }
                    className="form-input"
                    placeholder="Hale"
                  />
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Email">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="form-input"
                    placeholder="you@company.com"
                  />
                </FormField>
                <FormField label="Phone">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="form-input"
                    placeholder="(734) 000-0000"
                  />
                </FormField>
              </div>
              <FormField label="Part requested (SKU / part number / description)">
                <input
                  value={form.part}
                  onChange={(e) => setForm({ ...form, part: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Bendix air compressor, P/N TU4330"
                />
              </FormField>
              <FormField label="Message">
                <textarea
                  value={form.calendar_notes}
                  onChange={(e) =>
                    setForm({ ...form, calendar_notes: e.target.value })
                  }
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Tell us about your truck, application, or question…"
                />
              </FormField>
              <Button type="submit" size="lg" className="w-full font-700">
                Send request <Send className="ml-1.5 h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We'll respond within one business day.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({
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
