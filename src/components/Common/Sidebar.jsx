"use client";

import { Navbar, ScrollArea, Stack } from "@mantine/core";
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import styles from "../../assets/scss/sidebar.module.scss";

const CustomNavLink = ({ href, label, icon }) => (
  <Link href={href} passHref>
    <a className={styles.navLink}>
      {icon}
      <span>{label}</span>
    </a>
  </Link>
);

export default function Sidebar() {
  return (
    <Navbar width={{ base: 300 }} p="xs" className={styles.sidebar}>
      <ScrollArea>
        <Stack>
          <CustomNavLink
            href="/dashboard"
            label="Dashboard"
            icon={<IconHome size={16} />}
          />
          <CustomNavLink
            href="/users"
            label="Users"
            icon={<IconUser size={16} />}
          />
          <CustomNavLink
            href="/settings"
            label="Settings"
            icon={<IconSettings size={16} />}
          />
        </Stack>
      </ScrollArea>
    </Navbar>
  );
}
