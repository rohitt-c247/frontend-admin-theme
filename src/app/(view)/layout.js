"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import "../globals.css";
import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import "../../assets/scss/common.scss";
import Sidebar from "@/components/Common/Sidebar";
import Header from "@/components/Common/Header";
import useAuth from "@/hooks/useAuth";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const savedColorScheme = localStorage.getItem("mantine-color-scheme");
    if (savedColorScheme) {
      setColorScheme(savedColorScheme);
    }
    // console.log(isAuthenticated, "isAuthenticated")
    // if (!isAuthenticated) {
    //   router.push("/login");
    // }
  }, []);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    localStorage.setItem("mantine-color-scheme", nextColorScheme);
  };

  return (
    
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AppShell
            navbar={{
              width: 250,
              breakpoint: "sm",
              collapsed: { mobile: true },
            }}
            header={{ height: 60 }}
            padding="md"
          >
            {/* Header Section */}
            <AppShell.Header>
              <Header />
            </AppShell.Header>

            {/* Sidebar Section */}
            <AppShell.Navbar p="md">
              <Sidebar />
            </AppShell.Navbar>

            {/* Main Content Section */}
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
  );
}
