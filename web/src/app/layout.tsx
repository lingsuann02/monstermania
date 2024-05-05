import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Mono as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryProvider } from "@/components/ui/query-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "MonsterMania",
  description: "The most epic monster tournament",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "w-full bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="w-full flex flex-col items-center justify-between p-5">
              <div className="max-w-[1100px] w-full p-8 lg:p-12 bg-amber-100 h-full">
                <Suspense>{children}</Suspense>
              </div>
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
