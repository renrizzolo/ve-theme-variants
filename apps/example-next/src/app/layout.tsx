"use client";
import clsx from "clsx";
import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { useMemo } from "react";
import {
  TMode,
  TTheme,
  ThemeProvider,
  getThemeClass,
} from "../theme/ThemeProvider";
import "./globals.css";

const font = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultTheme, defaultMode] = useMemo(() => {
    if (typeof window !== "undefined") {
      return [
        localStorage.getItem("theme") ?? "light",
        localStorage.getItem("mode") ?? "system",
      ] as [TTheme, TMode];
    }
    return ["light", "user"] as [TTheme, TMode];
  }, []);

  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      defaultMode={defaultMode}
      onChangeMode={(theme, mode) => {
        {
          /* ideally you would get/set theme via cookies for correct SSR */
        }
        localStorage.setItem("theme", theme);
        localStorage.setItem("mode", mode);
      }}
    >
      <html lang="en">
        <body className={clsx(font.className, getThemeClass(defaultTheme))}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
