export interface FitmentSelection {
  year: string;
  make: string;
  model: string;
  engine: string;
}

export const fitmentYears: string[] = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
];

export const fitmentMakes: string[] = [
  "Freightliner",
  "Peterbilt",
  "Kenworth",
  "Volvo",
  "Mack",
  "International",
  "Western Star",
];

export const fitmentModels: Record<string, string[]> = {
  Freightliner: ["Cascadia", "Coronado", "M2 106", "122SD"],
  Peterbilt: ["389", "579", "567", "365"],
  Kenworth: ["T680", "W990", "T880", "W900"],
  Volvo: ["VNL 860", "VNL 760", "VNR"],
  Mack: ["Anthem", "Pinnacle", "Granite"],
  International: ["LT Series", "LT8600", "HX Series"],
  "Western Star": ["5700XE", "4900", "49X"],
};

export const fitmentEngines: string[] = [
  "Detroit DD15",
  "Detroit DD13",
  "Cummins X15",
  "Cummins ISX",
  "Mack MP8",
  "Volvo D13",
  "PACCAR MX-13",
];

export type FitmentResult =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "unconfirmed"; selection: FitmentSelection }
  | { state: "confirmed"; selection: FitmentSelection };

export function checkFitment(selection: FitmentSelection): FitmentResult {
  if (
    !selection.year ||
    !selection.make ||
    !selection.model ||
    !selection.engine
  ) {
    return { state: "idle" };
  }
  return { state: "unconfirmed", selection };
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  demo: boolean;
}

export const demoReviews: Review[] = [
  {
    id: "r-demo-1",
    author: "Demo Reviewer",
    date: "2026-07-18",
    rating: 5,
    title: "Demo review — placeholder",
    body: "This is a placeholder review used for prototype layout only. Real customer reviews will replace this once verified purchase data is connected.",
    verified: false,
    demo: true,
  },
  {
    id: "r-demo-2",
    author: "Demo Reviewer",
    date: "2026-06-30",
    rating: 4,
    title: "Demo review — placeholder",
    body: "Placeholder review for layout purposes. Verified-purchase badges will only appear when real verification exists.",
    verified: false,
    demo: true,
  },
];

export function ratingBreakdown(
  reviews: Review[],
): { stars: number; pct: number }[] {
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    counts[r.rating - 1] += 1;
  });
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: Math.round((counts[stars - 1] / total) * 100),
  }));
}
