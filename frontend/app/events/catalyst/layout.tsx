import { Special_Elite, VT323, Bebas_Neue, Nosifer } from "next/font/google";

const elite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--ff-elite", display: "swap" });
const vt = VT323({ subsets: ["latin"], weight: "400", variable: "--ff-vt", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--ff-bebas", display: "swap" });
const nosifer = Nosifer({ subsets: ["latin"], weight: "400", variable: "--ff-nosifer", display: "swap" });

export default function CataLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${elite.variable} ${vt.variable} ${bebas.variable} ${nosifer.variable}`}
      style={
        {
          display: "contents",
          "--f-body": 'var(--ff-elite), "Courier New", monospace',
          "--f-mono": 'var(--ff-vt), "Courier New", monospace',
          "--f-display": 'var(--ff-bebas), Impact, sans-serif',
          "--f-title": 'var(--ff-nosifer), Impact, sans-serif',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}