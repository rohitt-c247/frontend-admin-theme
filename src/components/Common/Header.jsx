"use client";

import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <AppShell.Header height={60} p="xs">
      <Group position="apart" align="center" style={{ height: "100%" }}>
        <Title order={3}>Dashboard</Title>
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </Group>
    </AppShell.Header>
  );
}
