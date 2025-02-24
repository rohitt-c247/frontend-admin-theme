"use client";

import { AppShell, NavLink } from "@mantine/core";
import { IconHome, IconSettings, IconUsers } from "@tabler/icons-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <AppShell.Navbar width={250} p="xs">
      <NavLink
        component={Link}
        href="/"
        label="Dashboard"
        leftSection={<IconHome size={16} />}
      />
      <NavLink
        component={Link}
        href="/users"
        label="Users"
        leftSection={<IconUsers size={16} />}
      />
      <NavLink
        component={Link}
        href="/settings"
        label="Settings"
        leftSection={<IconSettings size={16} />}
      />
    </AppShell.Navbar>
  );
}
