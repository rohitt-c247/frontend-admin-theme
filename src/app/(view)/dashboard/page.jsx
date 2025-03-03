"use client";

import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/components/Dashboard/index.jsx"), {
  ssr: false,
});

export default function Dashboard() {
  return <DashboardPage />;
}
