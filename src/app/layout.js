"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../assets/scss/common.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
