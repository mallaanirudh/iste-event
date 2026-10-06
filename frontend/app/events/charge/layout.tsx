import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";

const tanker = localFont({
  src: "./_fonts/Tanker-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-tanker",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
  adjustFontFallback: "Arial",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-sans",
});

// Only for the crafting-table GUI labels and tooltips on the briefing floor.
const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-pixel",
  preload: false,
});

/** Public site origin, so link-preview image URLs are absolute when the club hosts the page. */
function siteUrl(): URL | undefined {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: "Power the Beacon | ISTE Charge at Square One",
  description:
    "A hardware auction and circuit build-off for the B.Tech batch of 2029, in teams of up to 3. Bid for parts, build a working circuit and light the beacon. Wednesday 14 October 2026, 6 to 11 PM, LHC A Seminar Hall, NITK Surathkal.",
  openGraph: {
    title: "Power the Beacon",
    description: "Bid for parts. Build the circuit. Light the beacon. ISTE Charge at Square One.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power the Beacon",
    description: "Bid for parts. Build the circuit. Light the beacon. ISTE Charge at Square One.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F1338",
};

export default function ChargeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${tanker.variable} ${instrument.variable} ${pixel.variable}`} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
