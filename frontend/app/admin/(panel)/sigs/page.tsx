import type { Metadata } from "next";
import SigsView from "./SigsView";

export const metadata: Metadata = { title: "SIGs" };

export default function Page() {
  return <SigsView />;
}
