"use client";

import { APP_ROUTES } from "@/constants/routes";
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
      <NavLink
        component={Link}
        href="/student"
        active={APP_ROUTES.STUDENT.includes(pathname)}
        label="Student"
        leftSection={<IconUsers size={16} />}
      />
      <NavLink
        component={Link}
        href="/category"
        active={APP_ROUTES.CATEGORY.includes(pathname)}
        label="Category"
        leftSection={<IconUsers size={16} />}
      />
    </AppShell.Navbar>
  );
}
