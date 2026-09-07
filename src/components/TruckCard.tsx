import { useState } from "react";
import { Truck, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, type SavedTruck } from "@/lib/auth";

interface Props {
  truck: SavedTruck;
  onUse?: (truck: SavedTruck) => void;
}

const blank = (t: SavedTruck) => ({
  nickname: t.nickname ?? "",
  year: t.year,
  make: t.make,
  model: t.model,
  engine: t.engine,
  configuration: t.configuration ?? "",
  notes: t.notes ?? "",
});

export function TruckCard({ truck, onUse }: Props) {
  const { updateTruck, removeTruck } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(blank(truck));

  const save = () => {
    updateTruck(truck.id, {
      nickname: form.nickname.trim() || undefined,
      year: form.year,
      make: form.make,
      model: form.model,
      engine: form.engine,
      configuration: form.configuration.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="border border-accent bg-card p-4">
        <p className="mb-3 text-xs font-700 uppercase tracking-wider text-accent">
          Edit truck
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Labeled label="Year">
            <input
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="form-input"
            />
          </Labeled>
          <Labeled label="Make">
            <input
              value={form.make}
              onChange={(e) => setForm({ ...form, make: e.target.value })}
              className="form-input"
            />
          </Labeled>
          <Labeled label="Model">
            <input
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="form-input"
            />
          </Labeled>
          <Labeled label="Engine">
            <input
              value={form.engine}
              onChange={(e) => setForm({ ...form, engine: e.target.value })}
              className="form-input"
            />
          </Labeled>
          <Labeled label="Configuration">
            <input
              value={form.configuration}
              onChange={(e) =>
                setForm({ ...form, configuration: e.target.value })
              }
              className="form-input"
              placeholder="e.g. 6x4, day cab"
            />
          </Labeled>
          <Labeled label="Nickname">
            <input
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              className="form-input"
              placeholder="Truck #1"
            />
          </Labeled>
        </div>
        <Labeled label="Notes">
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="form-input mt-3 resize-none"
          />
        </Labeled>
        <div className="mt-3 flex gap-2">
          <Button onClick={save} className="font-600">
            <Check className="mr-1.5 h-4 w-4" /> Save
          </Button>
          <Button
            onClick={() => {
              setForm(blank(truck));
              setEditing(false);
            }}
            variant="outline"
            className="font-600"
          >
            <X className="mr-1.5 h-4 w-4" /> Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group border border-border bg-card p-4 transition-colors hover:border-foreground/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-surface text-accent">
            <Truck className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-lg font-700 leading-tight">
              {truck.year} {truck.make} {truck.model}
            </p>
            <p className="text-sm text-muted-foreground">{truck.engine}</p>
            {truck.configuration && (
              <p className="text-xs text-muted-foreground">
                {truck.configuration}
              </p>
            )}
            {truck.nickname && (
              <p className="mt-1 inline-block border border-border px-2 py-0.5 text-[11px] font-600 uppercase tracking-wider text-muted-foreground">
                {truck.nickname}
              </p>
            )}
          </div>
        </div>
      </div>

      {truck.notes && (
        <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
          {truck.notes}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {onUse && (
          <Button size="sm" onClick={() => onUse(truck)} className="font-600">
            Use truck
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setEditing(true)}
          className="font-600"
        >
          <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => removeTruck(truck.id)}
          className="font-600 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Remove
        </Button>
      </div>
    </div>
  );
}

function Labeled({
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
