"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LEADERBOARD,
  PLACEHOLDER_BERTHS,
  type TeamEntry,
  type VoyageStatus,
} from "@/data/event-data";
import { cn } from "@/data/utils";
import { SectionHeading } from "./section-heading";

const TABS = [
  {
    id: "r1",
    label: "Round 1 · Cash Earned",
    sort: (a: TeamEntry, b: TeamEntry) => (b.cash ?? -1) - (a.cash ?? -1),
  },
  {
    id: "r2",
    label: "Round 2 · Market Entry",
    sort: (a: TeamEntry, b: TeamEntry) =>
      (a.marketEntry ?? 999) - (b.marketEntry ?? 999),
  },
  {
    id: "r3",
    label: "Round 3 · Max Coin Load",
    sort: (a: TeamEntry, b: TeamEntry) => (b.maxLoad ?? -1) - (a.maxLoad ?? -1),
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const STATUS_STYLES: Record<VoyageStatus, string> = {
  FLOATING: "bg-ocean text-parchment",
  SUNK: "bg-crimson text-parchment",
  "ON DECK": "bg-parchment-deep text-ink",
};

function fmt(value: number | null, prefix = "") {
  return value === null ? "—" : `${prefix}${value.toLocaleString("en-IN")}`;
}

export function Leaderboard() {
  const [active, setActive] = useState<TabId>("r1");
  const tab = TABS.find((t) => t.id === active)!;
  const rows = [...LEADERBOARD].sort(tab.sort);
  const hasScores = LEADERBOARD.some(
    (t) => t.cash !== null || t.maxLoad !== null || t.marketEntry !== null,
  );

  return (
    <section
      aria-labelledby="manifest"
      className="mx-auto max-w-5xl px-4 py-16"
    >
      <SectionHeading
        kicker="White Star Line"
        title="Passenger Manifest"
        id="manifest"
      />

      <div className="ink-border parchment-card overflow-hidden">
        <div
          role="tablist"
          aria-label="Leaderboard rounds"
          className="flex flex-col border-b-2 border-ink sm:flex-row"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls="manifest-panel"
              onClick={() => setActive(t.id)}
              className={cn(
                "relative flex-1 px-4 py-3 font-serif text-xs font-bold uppercase tracking-widest transition-colors sm:text-sm",
                "border-ink not-last:border-b-2 sm:not-last:border-b-0 sm:not-last:border-r-2",
                active === t.id
                  ? "text-parchment"
                  : "text-ink hover:bg-parchment-deep",
              )}
            >
              {active === t.id && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {!hasScores && (
          <p className="hatch border-b-2 border-dashed border-ink/40 px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.25em] text-crimson sm:text-sm">
            Scores pending organizer evaluation
          </p>
        )}

        <p className="px-4 py-2 text-xs text-sepia sm:hidden">
          Swipe or scroll sideways to view every column.
        </p>
        <div
          id="manifest-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${active}`}
          className="min-w-0 overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink font-serif text-xs uppercase tracking-widest text-ink">
                <th scope="col" className="px-4 py-3">
                  Rank
                </th>
                <th scope="col" className="px-4 py-3">
                  Team Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Captain
                </th>
                <th
                  scope="col"
                  className={cn("px-4 py-3", active === "r1" && "text-crimson")}
                >
                  Cash ($)
                </th>
                <th
                  scope="col"
                  className={cn("px-4 py-3", active === "r3" && "text-crimson")}
                >
                  Max Load (Coins)
                </th>
                <th scope="col" className="px-4 py-3">
                  Voyage Status
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-sm text-sepia"
              >
                {rows.length > 0
                  ? rows.map((team, i) => (
                      <tr
                        key={team.teamName}
                        className="border-b border-dashed border-ink/30"
                      >
                        <td className="px-4 py-3 font-serif font-bold text-ink">
                          {active === "r2" && team.marketEntry
                            ? team.marketEntry
                            : i + 1}
                        </td>
                        <td className="px-4 py-3 text-ink">{team.teamName}</td>
                        <td className="px-4 py-3">{team.captain}</td>
                        <td className="px-4 py-3 tabular-nums">
                          {fmt(team.cash, "$")}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          {fmt(team.maxLoad)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "ink-border-soft px-2 py-0.5 text-xs",
                              STATUS_STYLES[team.status],
                            )}
                          >
                            {team.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  : Array.from({ length: PLACEHOLDER_BERTHS }, (_, i) => (
                      <tr
                        key={i}
                        className="border-b border-dashed border-ink/30 text-muted-foreground"
                      >
                        <td className="px-4 py-3 font-serif font-bold text-ink">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3 italic">Awaiting crew…</td>
                        <td className="px-4 py-3">—</td>
                        <td className="px-4 py-3">—</td>
                        <td className="px-4 py-3">—</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "ink-border-soft px-2 py-0.5 text-xs",
                              STATUS_STYLES["ON DECK"],
                            )}
                          >
                            ON DECK
                          </span>
                        </td>
                      </tr>
                    ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </section>
  );
}
