"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import "../assets/scss/common.scss";
import Sidebar from "@/components/Common/Sidebar";
import Header from "@/components/Common/Header";
import useAuth from "@/hooks/useAuth";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { isPublicPage } = useAuth();
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const savedColorScheme = localStorage.getItem("mantine-color-scheme");
    if (savedColorScheme) {
      setColorScheme(savedColorScheme);
    }
  }, []);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    localStorage.setItem("mantine-color-scheme", nextColorScheme);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          {isPublicPage ? (
            children
          ) : (
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
          )}
        </MantineProvider>
      </body>
    </html>
  );
}
