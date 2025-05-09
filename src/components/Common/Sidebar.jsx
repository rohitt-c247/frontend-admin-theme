"use client";

import { AppShell, NavLink } from "@mantine/core";
import { IconHome, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <AppShell.Navbar width={250} p="xs">
      <NavLink
        component={Link}
        href="/"
        active={pathname === "/"}
        label="Dashboard"
        leftSection={<IconHome size={16} />}
      />
      <NavLink
        component={Link}
        href="/users"
        active={pathname === "/users"}
        label="Users"
        leftSection={<IconUsers size={16} />}
      />
      <NavLink
        component={Link}
        href="/profile"
        active={pathname === "/profile"}
        label="Profile"
        leftSection={<IconUsers size={16} />}
      />
    </AppShell.Navbar>
  );
}
