"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import "../assets/scss/common.scss";
import Sidebar from "@/components/Common/Sidebar";
import Header from "@/components/Common/Header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login", "/signup"];
    if (!token && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [router, pathname]);

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

  const publicPaths = ["/login", "/signup"];
  const isPublicPage = publicPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        > */}
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          {isPublicPage ? (
            children
          ) : (
            <AppShell padding="md">
              <AppShell.Header>
                <Header />
              </AppShell.Header>
              <AppShell.Navbar width={250}>
                <Sidebar />
              </AppShell.Navbar>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          )}
        </MantineProvider>
        {/* </ColorSchemeProvider> */}
      </body>
    </html>
  );
}
