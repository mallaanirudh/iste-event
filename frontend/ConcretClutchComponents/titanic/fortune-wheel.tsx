"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { MINI_GAMES } from "@/data/event-data";
import { cn } from "@/data/utils";

const SLICE = 360 / MINI_GAMES.length;

export function FortuneWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  function spin() {
    if (spinning) return;
    const index = Math.floor(Math.random() * MINI_GAMES.length);
    const target = 360 - (index * SLICE + SLICE / 2);
    const base = rotation - (rotation % 360);
    setSpinning(true);
    setSelected(null);
    setRotation(base + 360 * 5 + target);
    setTimeout(() => {
      setSelected(MINI_GAMES[index].id);
      setSpinning(false);
    }, 3200);
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
      <div className="flex flex-col items-center gap-4">
        <div className="relative aspect-square w-full max-w-60">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[-6px] z-10 size-0 -translate-x-1/2 border-x-[10px] border-t-[18px] border-x-transparent border-t-crimson"
          />

          <motion.svg
            viewBox="-100 -100 200 200"
            className="size-full drop-shadow-[3px_4px_0_var(--ink)]"
            animate={{ rotate: rotation }}
            transition={{
              duration: 3.1,
              ease: [0.15, 0.85, 0.25, 1],
            }}
            aria-hidden="true"
          >
            {MINI_GAMES.map((game, i) => {
              const start = (i * SLICE - 90) * (Math.PI / 180);
              const end = ((i + 1) * SLICE - 90) * (Math.PI / 180);
              const mid = (start + end) / 2;

              const x1 = 95 * Math.cos(start);
              const y1 = 95 * Math.sin(start);
              const x2 = 95 * Math.cos(end);
              const y2 = 95 * Math.sin(end);

              // Round SVG text coordinates to avoid server/client
              // floating-point differences during hydration.
              const textX = Number((62 * Math.cos(mid)).toFixed(6));
              const textY = Number((62 * Math.sin(mid)).toFixed(6));

              return (
                <g key={game.id}>
                  <path
                    d={`M0 0 L${x1} ${y1} A95 95 0 0 1 ${x2} ${y2} Z`}
                    fill={i % 2 === 0 ? "#f8f3e6" : "#e9dcc0"}
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                  />

                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-ink font-serif"
                    fontSize="18"
                    fontWeight="700"
                  >
                    {game.id}
                  </text>
                </g>
              );
            })}

            <circle
              r="95"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
            />

            <circle
              r="16"
              fill="var(--ocean)"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <circle r="5" fill="var(--parchment)" />
          </motion.svg>
        </div>

        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="ink-border inline-flex min-h-11 max-w-full items-center justify-center gap-2 bg-ocean px-3 py-2.5 text-center font-serif text-sm font-bold uppercase tracking-widest text-parchment transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:px-5"
        >
          <RotateCw
            className={cn(
              "size-4 shrink-0",
              spinning && "animate-spin"
            )}
            aria-hidden="true"
          />

          {spinning ? "Spinning…" : "Try a Practice Spin"}
        </button>

        <p className="sr-only" aria-live="polite">
          {selected
            ? `Landed on ${MINI_GAMES.find((g) => g.id === selected)?.name
            }`
            : ""}
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {MINI_GAMES.map((game) => {
          const active = selected === game.id;

          return (
            <motion.li
              key={game.id}
              animate={
                active
                  ? { scale: [1, 1.04, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5 }}
              className={cn(
                "ink-border-soft flex gap-3 p-4 transition-colors",
                active
                  ? "bg-crimson text-parchment"
                  : "bg-parchment text-sepia",
                game.id === 7 && "sm:col-span-2"
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border-2 font-serif text-sm font-bold",
                  active
                    ? "border-parchment"
                    : "border-ink text-ink"
                )}
              >
                {game.id}
              </span>

              <div>
                <h4
                  className={cn(
                    "font-serif text-base font-bold",
                    active ? "text-parchment" : "text-ink"
                  )}
                >
                  {game.name}
                </h4>

                <p className="mt-0.5 text-sm leading-relaxed">
                  {game.brief}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}