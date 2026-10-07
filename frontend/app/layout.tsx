import type { Metadata } from "next";
import { Bangers, Nunito } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FeISTEval | ISTE NITK",
  description:
    "Explore mysteries, experiments, and engineering challenges at FeISTEval, the ISTE NITK technical carnival.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${nunito.variable} min-h-full antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
