import type { Metadata } from "next";
import MegaEventsView from "./MegaEventsView";

export const metadata: Metadata = { title: "Mega Events" };

export default function Page() {
  return <MegaEventsView />;
}
