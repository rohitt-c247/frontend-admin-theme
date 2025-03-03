"use client";

import { useRouter } from "next/navigation";
import { MantineProvider, Grid } from "@mantine/core";
import "@mantine/core/styles.css";
import "../globals.css";

import "../../assets/scss/common.scss";
import useAuth from "@/hooks/useAuth";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <MantineProvider>
    <Grid>
      <Grid.Col span={6}>{children}</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
    </MantineProvider>
  );
}
