import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fitmentYears,
  fitmentMakes,
  fitmentModels,
  fitmentEngines,
} from "@/lib/catalog";

export function HeroFitmentWidget() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");

  const models = make ? (fitmentModels[make] ?? []) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [year, make, model, engine].filter(Boolean).join(" ");
    if (parts) {
      navigate(`/catalog?q=${encodeURIComponent(parts)}`);
    } else {
      navigate("/catalog");
    }
  };

  return (
    <div className="rounded-lg border-2 border-white/20 bg-background/95 p-5 text-foreground shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
          <Truck className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-display text-base font-800 uppercase tracking-tight text-foreground">
            Truck Fitment Checker
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Select your vehicle to find matching heavy-duty parts
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mt-4 space-y-3">
        <div>
          <label className="block text-[11px] font-700 uppercase tracking-wider text-muted-foreground mb-1">
            1. Select Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full h-10 rounded border border-border bg-white px-3 text-xs font-600 text-foreground outline-none focus:border-primary"
          >
            <option value="">All Years (2006 - 2025)</option>
            {fitmentYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-700 uppercase tracking-wider text-muted-foreground mb-1">
              2. Select Make
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
              }}
              className="w-full h-10 rounded border border-border bg-white px-3 text-xs font-600 text-foreground outline-none focus:border-primary"
            >
              <option value="">Select Make</option>
              {fitmentMakes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-700 uppercase tracking-wider text-muted-foreground mb-1">
              3. Select Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
              className="w-full h-10 rounded border border-border bg-white px-3 text-xs font-600 text-foreground outline-none focus:border-primary disabled:opacity-50"
            >
              <option value="">
                {make ? "Select Model" : "Choose make first"}
              </option>
              {models.map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-700 uppercase tracking-wider text-muted-foreground mb-1">
            4. Engine Platform
          </label>
          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className="w-full h-10 rounded border border-border bg-white px-3 text-xs font-600 text-foreground outline-none focus:border-primary"
          >
            <option value="">All Engines (DD15, Cummins, Volvo D13...)</option>
            {fitmentEngines.map((eng) => (
              <option key={eng} value={eng}>
                {eng}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-accent text-accent-foreground font-800 uppercase tracking-wider hover:bg-accent/90 mt-2"
        >
          Find My Truck Parts →
        </Button>

        <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Guaranteed OEM Fit
          </span>
          <Link to="/trucks" className="font-700 text-primary hover:underline">
            Manage Saved Fleet →
          </Link>
        </div>
      </form>
    </div>
  );
}
