import type { ReactNode } from "react";
import { PortalNav } from "./PortalNav";

interface Props {
  children: ReactNode;
}

export function PortalLayout({ children }: Props) {
  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <PortalNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
