import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISTE Crypt // Square 1 — TRUST NO LINK",
  description:
    "Classified briefing for Square 1 (Sq1) CTF by ISTE Crypt. The internet is lying. Do not believe what you click.",
  keywords: ["ISTE", "Crypt", "Square 1", "CTF", "Trust No Link", "Capture The Flag"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col scanlines crt-flicker font-mono">
        {children}
      </body>
    </html>
  );
}
