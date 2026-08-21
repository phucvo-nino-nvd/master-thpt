"use client";

import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";
import { KnowledgeMapClient } from "./knowledge-map-client";

export default function KnowledgeMapPage() {
  return (
    <main className="dashboard-shell">
      <DashboardTopbar />
      <KnowledgeMapClient />
    </main>
  );
}
