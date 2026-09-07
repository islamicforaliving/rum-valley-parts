import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Wrench, Send, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import {
  fitmentYears,
  fitmentMakes,
  fitmentModels,
  fitmentEngines,
} from "@/lib/catalog";
import { buildTrackingPayload, postTrackingEvent } from "@/lib/tracking";

const FIELD_PART_REQUESTED = "U7mx2BFn3ynXVc6efSuJ";

export default function RequestPart() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    partNumber: "",
    description: "",
    make: "",
    model: "",
    year: "",
    engine: "",
    qty: "1",
    info: "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    company: user?.company ?? "",
  });
  const [photo, setPhoto] = useState<File | null>(null);

  if (!user) return <Navigate to="/login" replace />;

  const models = form.make ? (fitmentModels[form.make] ?? []) : [];
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = buildTrackingPayload(
      "portal-part-request",
      "Portal Part Request",
    );
    const summary = [
      form.partNumber,
      form.description,
      `${form.year} ${form.make} ${form.model} ${form.engine}`.trim(),
      `Qty ${form.qty}`,
      form.info,
    ]
      .filter(Boolean)
      .join(" · ");
    payload.formData = {
      email: form.email,
      phone: form.phone,
      calendar_notes: summary,
    };
    payload.formLabels = {
      email: "Email",
      phone: "Phone",
      calendar_notes: "Part request details",
    };
    postTrackingEvent(payload, {
      customFields: {
        [FIELD_PART_REQUESTED]: {
          value: form.partNumber || form.description || "Part request",
          label: "Part Requested",
        },
      },
      fileFields: photo
        ? { [FIELD_PART_REQUESTED]: { file: photo, label: "Part Photo" } }
        : undefined,
    });
    setSent(true);
  };

  return (
    <div className="container py-10">
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <Wrench className="h-7 w-7 text-accent" />
        <div>
          <h1 className="font-display text-3xl font-700 md:text-4xl">
            Request a Part
          </h1>
          <p className="text-sm text-muted-foreground">
            Need a part we don't have listed? Tell us and our team will source
            it.
          </p>
        </div>
      </div>

      <div className="mt-6 max-w-3xl border border-border bg-card p-6 md:p-8">
        {sent ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center bg-accent text-accent-foreground">
              <Check className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-700">
              Request received
            </h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Thanks, {user.name.split(" ")[0]}. Our team will source your part
              and reach out shortly.
            </p>
            <div className="mt-5 flex gap-3">
              <Button asChild className="font-600">
                <Link to="/catalog">Back to catalog</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => setSent(false)}
                className="font-600"
              >
                Request another
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Part number">
                <input
                  value={form.partNumber}
                  onChange={(e) => set({ partNumber: e.target.value })}
                  className="form-input"
                  placeholder="e.g. BENDIX-TU4330"
                />
              </Field>
              <Field label="Quantity">
                <input
                  type="number"
                  min="1"
                  value={form.qty}
                  onChange={(e) => set({ qty: e.target.value })}
                  className="form-input"
                />
              </Field>
            </div>
            <Field label="Part description">
              <input
                value={form.description}
                onChange={(e) => set({ description: e.target.value })}
                className="form-input"
                placeholder="e.g. Air compressor for DD15"
              />
            </Field>

            <div className="border-t border-border pt-5">
              <p className="mb-3 text-xs font-700 uppercase tracking-wider text-accent">
                Truck application
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Year">
                  <select
                    value={form.year}
                    onChange={(e) => set({ year: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Select</option>
                    {fitmentYears.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Make">
                  <select
                    value={form.make}
                    onChange={(e) => set({ make: e.target.value, model: "" })}
                    className="form-input"
                  >
                    <option value="">Select</option>
                    {fitmentMakes.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Model">
                  <select
                    value={form.model}
                    disabled={!form.make}
                    onChange={(e) => set({ model: e.target.value })}
                    className="form-input disabled:opacity-50"
                  >
                    <option value="">Select</option>
                    {models.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Engine">
                  <select
                    value={form.engine}
                    onChange={(e) => set({ engine: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Select</option>
                    {fitmentEngines.map((en) => (
                      <option key={en}>{en}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <Field label="Additional information">
              <textarea
                value={form.info}
                onChange={(e) => set({ info: e.target.value })}
                rows={3}
                className="form-input resize-none"
                placeholder="Symptoms, VIN, urgency, delivery deadline…"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set({ phone: e.target.value })}
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
              <Field label="Company">
                <input
                  value={form.company}
                  onChange={(e) => set({ company: e.target.value })}
                  className="form-input"
                />
              </Field>
            </div>

            <Field label="Upload photo (optional)">
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-border p-4 text-sm text-muted-foreground hover:border-accent">
                <Upload className="h-5 w-5 text-accent" />
                {photo ? photo.name : "Click to upload a photo of the part"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
              </label>
            </Field>

            <Button type="submit" size="lg" className="w-full font-700">
              Submit request <Send className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
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
