"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import "../assets/scss/common.scss";
import Sidebar from "@/components/Common/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login", "/signup"];
    const pathIsPublic = publicPaths.includes(pathname);

    if (!token && !pathIsPublic) {
      router.push("/login");
    }
  }, [router, pathname]);

  const publicPaths = ["/login", "/signup"];
  const pathIsPublic = publicPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            defaultRadius: "md",
            colors: { primary: ["#1D4ED8", "#1E40AF"] },
          }}
        >
          {pathIsPublic ? (
            children
          ) : (
            <AppShell
              padding="md"
              aside={{ width: 300, render: () => <Sidebar /> }}
            >
              {children}
            </AppShell>
          )}
        </MantineProvider>
      </body>
    </html>
  );
}
