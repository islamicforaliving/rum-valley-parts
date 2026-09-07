import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { TruckCard } from "@/components/TruckCard";
import {
  fitmentYears,
  fitmentMakes,
  fitmentModels,
  fitmentEngines,
} from "@/lib/catalog";

const blank = {
  year: "",
  make: "",
  model: "",
  engine: "",
  configuration: "",
  notes: "",
};

export default function Trucks() {
  const { user, trucks, addTruck } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blank);
  const models = form.make ? (fitmentModels[form.make] ?? []) : [];

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.year || !form.make || !form.model || !form.engine) return;
    addTruck({
      year: form.year,
      make: form.make,
      model: form.model,
      engine: form.engine,
      configuration: form.configuration.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setForm(blank);
    setAdding(false);
  };

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Truck className="h-7 w-7 text-accent" />
          <div>
            <h1 className="font-display text-3xl font-700 md:text-4xl">
              My Trucks
            </h1>
            <p className="text-sm text-muted-foreground">
              {trucks.length} saved · {user.name}
            </p>
          </div>
        </div>
        {!adding && (
          <Button onClick={() => setAdding(true)} className="font-700">
            <Plus className="mr-1.5 h-4 w-4" /> Add truck
          </Button>
        )}
      </div>

      {adding && (
        <form onSubmit={save} className="mt-6 border border-accent bg-card p-5">
          <p className="mb-4 text-xs font-700 uppercase tracking-wider text-accent">
            Add a truck
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Sel
              label="Year"
              value={form.year}
              onChange={(v) => setForm({ ...form, year: v })}
              options={fitmentYears}
            />
            <Sel
              label="Make"
              value={form.make}
              onChange={(v) => setForm({ ...form, make: v, model: "" })}
              options={fitmentMakes}
            />
            <Sel
              label="Model"
              value={form.model}
              onChange={(v) => setForm({ ...form, model: v })}
              options={models}
              disabled={!form.make}
            />
            <Sel
              label="Engine"
              value={form.engine}
              onChange={(v) => setForm({ ...form, engine: v })}
              options={fitmentEngines}
            />
            <label className="block">
              <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
                Configuration
              </span>
              <input
                value={form.configuration}
                onChange={(e) =>
                  setForm({ ...form, configuration: e.target.value })
                }
                className="form-input"
                placeholder="e.g. 6x4, day cab"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
                Nickname
              </span>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="form-input"
                placeholder="Truck #1"
              />
            </label>
          </div>
          <label className="mt-3 block">
            <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
              Notes
            </span>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="form-input resize-none"
              placeholder="VIN, axle ratio, anything useful…"
            />
          </label>
          <div className="mt-4 flex gap-2">
            <Button type="submit" className="font-600">
              <Plus className="mr-1.5 h-4 w-4" /> Save truck
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setForm(blank);
                setAdding(false);
              }}
              className="font-600"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {trucks.length === 0 && !adding ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center">
          <Truck className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-display text-xl font-600">No trucks saved</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Save your trucks to check fitment faster on any product page.
          </p>
          <Button onClick={() => setAdding(true)} className="mt-4 font-700">
            <Plus className="mr-1.5 h-4 w-4" /> Add your first truck
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trucks.map((t) => (
            <TruckCard key={t.id} truck={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function Sel({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="form-input disabled:opacity-50"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
