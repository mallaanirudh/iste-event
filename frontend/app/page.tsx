import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import FestivalHome from "@/components/festival/festival-home";

const festivalTitle = Fredoka({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-festival-title",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "FeISTEval · ISTE NITK's Technical Carnival",
  description:
    "Explore FeISTEval, ISTE NITK's technical carnival: six connected chambers of mystery, circuits, process puzzles, computing, mechanical engineering, and nautical construction.",
};

export default function Home() {
  return (
    <div className={festivalTitle.variable}>
      <FestivalHome />
    </div>
  );
}
