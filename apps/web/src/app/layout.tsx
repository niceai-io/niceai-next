import { isProd, isVercel } from "@niceai/core";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Viewport } from "next";

import { cn } from "@niceai/ui";
import { ThemeProvider, ThemeToggle } from "@niceai/ui/theme";
import { Toaster } from "@niceai/ui/toast";

import "../styles/globals.css";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  themeColor: [
    { color: "#f8f8f8", media: "(prefers-color-scheme: light)" },
    { color: "#000", media: "(prefers-color-scheme: dark)" },
  ],
  userScalable: false,
  viewportFit: "cover",
  width: "device-width",
};

export { default as metadata } from "./metadata";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <TRPCReactProvider> */}
          {props.children}
          {/* </TRPCReactProvider> */}
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
        {isProd && isVercel && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
