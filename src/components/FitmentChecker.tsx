import { useState } from "react";
import { Wrench, Check, X, AlertTriangle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fitmentYears,
  fitmentMakes,
  fitmentModels,
  fitmentEngines,
  checkFitment,
  type FitmentResult,
  type FitmentSelection,
} from "@/lib/catalog";
import { useAuth, type SavedTruck } from "@/lib/auth";

interface Props {
  productName: string;
}

const empty: FitmentSelection = {
  year: "",
  make: "",
  model: "",
  engine: "",
};

export function FitmentChecker({ productName }: Props) {
  const { user, trucks } = useAuth();
  const [sel, setSel] = useState<FitmentSelection>(empty);
  const [result, setResult] = useState<FitmentResult>({ state: "idle" });
  const [showTrucks, setShowTrucks] = useState(false);
  const [truckResults, setTruckResults] = useState<
    { truck: SavedTruck; result: FitmentResult }[]
  >([]);

  const models = sel.make ? (fitmentModels[sel.make] ?? []) : [];

  const run = (selection: FitmentSelection) => {
    setResult({ state: "checking" });
    // no async here; resolve next tick for UX feedback only
    setTimeout(() => setResult(checkFitment(selection)), 250);
  };

  const checkAgainstTrucks = () => {
    setShowTrucks(true);
    setTruckResults(
      trucks.map((truck) => {
        const selection: FitmentSelection = {
          year: truck.year,
          make: truck.make,
          model: truck.model,
          engine: truck.engine,
        };
        return { truck, result: checkFitment(selection) };
      }),
    );
  };

  return (
    <section className="border border-border bg-card">
      <div className="border-b border-border bg-surface p-5">
        <p className="flex items-center gap-2 text-xs font-700 uppercase tracking-wider text-accent">
          <Wrench className="h-4 w-4" /> Will this fit my truck?
        </p>
        <h2 className="mt-2 font-display text-xl font-700">Fitment checker</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select your truck to check fitment for{" "}
          <span className="font-600 text-foreground">{productName}</span>.
        </p>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Select
            label="Year"
            value={sel.year}
            onChange={(v) => setSel({ ...sel, year: v })}
            options={fitmentYears}
          />
          <Select
            label="Make"
            value={sel.make}
            onChange={(v) => setSel({ ...sel, make: v, model: "" })}
            options={fitmentMakes}
          />
          <Select
            label="Model"
            value={sel.model}
            onChange={(v) => setSel({ ...sel, model: v })}
            options={models}
            disabled={!sel.make}
          />
          <Select
            label="Engine"
            value={sel.engine}
            onChange={(v) => setSel({ ...sel, engine: v })}
            options={fitmentEngines}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={() => run(sel)}
            className="font-700"
            disabled={!sel.year || !sel.make || !sel.model || !sel.engine}
          >
            Check fitment
          </Button>
          {user && trucks.length > 0 && (
            <Button
              onClick={checkAgainstTrucks}
              variant="outline"
              className="font-600"
            >
              <Truck className="mr-1.5 h-4 w-4" /> Check against my trucks
            </Button>
          )}
        </div>

        {/* Result */}
        {result.state === "checking" && (
          <div className="mt-4 border border-border bg-surface p-4 text-sm text-muted-foreground">
            Checking fitment…
          </div>
        )}
        {result.state === "unconfirmed" && (
          <div className="mt-4 flex items-start gap-3 border border-amber-500/30 bg-amber-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="text-sm">
              <p className="font-700 text-foreground">Fitment not confirmed</p>
              <p className="mt-1 text-muted-foreground">
                We can't automatically confirm fitment for this{" "}
                {result.selection.year} {result.selection.make}{" "}
                {result.selection.model} ({result.selection.engine}) yet. Our
                team can verify compatibility — request a part or call us for a
                confirmed answer.
              </p>
            </div>
          </div>
        )}

        {/* Saved-truck results */}
        {showTrucks && user && (
          <div className="mt-5 border-t border-border pt-5">
            <p className="mb-3 text-xs font-700 uppercase tracking-wider text-muted-foreground">
              Your trucks
            </p>
            {trucks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No saved trucks yet. Add trucks in My Trucks to check fitment
                faster.
              </p>
            ) : (
              <div className="space-y-3">
                {truckResults.map(({ truck, result: r }) => (
                  <div
                    key={truck.id}
                    className="flex items-center justify-between gap-3 border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-600">
                          {truck.year} {truck.make} {truck.model}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {truck.engine}
                          {truck.configuration
                            ? ` · ${truck.configuration}`
                            : ""}
                        </p>
                      </div>
                    </div>
                    {r.state === "unconfirmed" ? (
                      <span className="inline-flex items-center gap-1.5 border border-amber-500/40 px-2.5 py-1 text-xs font-600 text-amber-600">
                        <X className="h-3.5 w-3.5" /> Not confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-xs font-600 text-muted-foreground">
                        <Check className="h-3.5 w-3.5" /> Check
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          Fitment results are driven by compatibility data. We do not claim a
          part fits unless the data confirms it.
        </p>
      </div>
    </section>
  );
}

function Select({
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
