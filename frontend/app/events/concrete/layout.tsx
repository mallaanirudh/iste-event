import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Special_Elite } from "next/font/google";
import localFont from "next/font/local";
import "./voyage.css";

// Cinzel is not exported by the installed Next Google font module.
const cinzel = localFont({
  src: "./fonts/Cinzel-Variable.ttf",
  weight: "400 900",
  display: "swap",
  variable: "--font-cinzel",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-elite",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Titanic: Float It for Jack | ISTE Concrete · FeISTEval",
  description:
    "Earn virtual cash, buy materials, and build a floating structure that carries the maximum coin load. A civil engineering challenge by ISTE Concrete.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5efe0",
};

export default function ConcreteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${cinzel.variable} ${specialElite.variable} ${jakarta.variable} concrete-voyage relative isolate min-h-screen overflow-x-clip antialiased`}
    >
      {children}
      {process.env.NODE_ENV === "production" && <Analytics />}
    </div>
  );
}
