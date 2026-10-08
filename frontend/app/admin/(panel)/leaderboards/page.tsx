import type { Metadata } from "next";
import { Suspense } from "react";
import LeaderboardsView from "./LeaderboardsView";

export const metadata: Metadata = { title: "Leaderboards" };

export default function LeaderboardsPage() {
  return (
    <Suspense>
      <LeaderboardsView />
    </Suspense>
  );
}
