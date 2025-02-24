"use client";

import Sidebar from "@/components/Common/Sidebar";
import Dashboard from "@/components/Dashboard/Dashboard";
import { AppShell } from "@mantine/core";
// import Sidebar from "@/components/Sidebar";
// import Dashboard from "@/components/Dashboard";

export default function Page() {
  return (
    <AppShell
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: true } }}
    >
      <Sidebar />
      <Dashboard />
    </AppShell>
  );
}
