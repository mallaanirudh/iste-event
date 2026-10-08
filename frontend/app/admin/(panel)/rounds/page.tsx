import type { Metadata } from "next";
import { Suspense } from "react";
import RoundsView from "./RoundsView";

export const metadata: Metadata = { title: "Rounds" };

export default function RoundsPage() {
  return (
    <Suspense>
      <RoundsView />
    </Suspense>
  );
}
