"use client";

import React from "react";
import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth"; // Import useAuth hook

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { logout } = useAuth(); // Destructure logout from useAuth

  return (
    <AppShell.Header height={60} p="xs">
      <Group position="apart" align="center" style={{ height: "100%" }}>
        <Title order={3}>Admin Theme</Title>
        <div style={{ marginLeft: "auto" }}>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
          <Button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </Button>
        </div>
      </Group>
    </AppShell.Header>
  );
}
