import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, JetBrains_Mono } from "next/font/google";
import "./clutch.css";

const dela = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Magnetic Grand Prix | SIG: Clutch",
  description:
    "Build a magnet-powered F1 car and race it in the knockout Grand Prix. Tuesday, 13th October at LHC A. Exclusively for B.Tech 1st years.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0E14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${dela.variable} ${jetbrains.variable} clutch-event relative isolate min-h-screen bg-asphalt antialiased`}
    >
      {children}
      {process.env.NODE_ENV === "production" && <Analytics />}
    </div>
  );
}
