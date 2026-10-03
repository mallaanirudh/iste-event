import type { Metadata } from "next";
import { Berkshire_Swash, Cinzel, Outfit } from "next/font/google";
import "./globals.css";

const berkshire = Berkshire_Swash({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-berkshire",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Grand Confectionery — Mega Event",
  description:
    "Step through the factory gates and claim your Golden Ticket to the most whimsical spectacle of the century.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${berkshire.variable} ${cinzel.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDF8EE] text-[#1D120C]">
        {children}
      </body>
    </html>
  );
}
