"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { LeaderboardEntry } from "@/lib/api/types";
import { START_ISO } from "../_data/content";
import { Flip, gsap, prefersReducedMotion } from "../_lib/gsap";
import { LiveRefresh } from "./LiveRefresh";
import c from "../charge.module.css";
import s from "./leaderboard.module.css";

export type Board = {
  key: string;
  label: string;
  title: string;
  /** `null` means the backend had no answer for this board on the last render. */
  entries: LeaderboardEntry[] | null;
};

const START = new Date(START_ISO).getTime();

function BoardTable({ board, titleId }: { board: Board; titleId: string }) {
  if (board.entries === null) {
    return (
      <p className={s.empty}>Scores are updating.</p>
    );
  }
  if (board.entries.length === 0) {
    return <p className={s.empty}>No scores yet. They show up here once the round is judged.</p>;
  }
  return (
    <table className={s.table} aria-labelledby={titleId}>
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Team</th>
          <th scope="col" className={s.pointsHead}>
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {board.entries.map((e, i) => {
          const rank = e.rank ?? i + 1;
          return (
            <tr key={e.id} className={`${s.row} ${rank === 1 ? s.first : ""}`} data-row="">
              <td className={s.rank}>
                <span className={`${s.led} ${rank <= 3 ? s.ledOn : ""}`} aria-hidden="true" />
                {rank}
              </td>
              <td className={s.team}>{e.teamCode}</td>
              <td className={s.points}>
                {e.points}
                <span className={c.vh}> points</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function Leaderboard({ boards, preEvent }: { boards: Board[]; preEvent: boolean }) {
  const [active, setActive] = useState(0);
  // Server decides first (no hydration mismatch); the client then flips to live at doors open.
  const [live, setLive] = useState(!preEvent);
  const baseId = useId();
  const indicator = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const changed = useRef(false);
  const router = useRouter();

  function select(i: number) {
    if (i === active) return;
    if (indicator.current) flipState.current = Flip.getState(indicator.current);
    changed.current = true;
    setActive(i);
  }

  useEffect(() => {
    if (live) return;
    const wait = START - Date.now();
    // setTimeout caps at about 24.8 days; a page left open longer than that just reloads into live.
    if (wait > 2_000_000_000) return;
    // At doors open: show the live board and ask the server for a fresh render with scores.
    const t = window.setTimeout(() => {
      setLive(true);
      router.refresh();
    }, Math.max(0, wait));
    return () => window.clearTimeout(t);
  }, [live, router]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = {
      ArrowRight: (active + 1) % boards.length,
      ArrowLeft: (active + boards.length - 1) % boards.length,
      Home: 0,
      End: boards.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = keys[e.key];
    select(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  // After React moves the indicator into the new tab, Flip animates it from where it was.
  useLayoutEffect(() => {
    if (!changed.current) return;
    changed.current = false;
    const reduce = prefersReducedMotion();
    if (flipState.current && !reduce) {
      Flip.from(flipState.current, { targets: indicator.current, duration: 0.45, ease: "power3.inOut" });
    }
    flipState.current = null;
    const rows = panel.current?.querySelectorAll("[data-row]");
    if (rows?.length && !reduce) {
      gsap.fromTo(rows, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" });
    }
  }, [active]);

  const board = boards[active];

  // Before doors open there is nothing to rank: the title and one line, no empty tabs.
  if (!live) {
    return (
      <div id="leaderboard" className={`${s.board} ${s.boardPre}`} aria-labelledby="leaderboard-title" role="region">
        <div className={`${s.boardHead} ${s.headPre}`}>
          <h2 id="leaderboard-title" className={`${s.title} ${s.titlePre}`} data-title="">
            Leaderboard
          </h2>
          <p className={s.pre}>Scores appear here during the event on 14 October.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="leaderboard" className={s.board} aria-labelledby="leaderboard-title" role="region">
      <div className={s.boardHead}>
        <h2 id="leaderboard-title" className={s.title} data-title="">
          Leaderboard
        </h2>
        <LiveRefresh className={s.live} />
        <p className={s.lede}>Scores go up after each round is judged and refresh on their own during the event.</p>
      </div>
      <div className={s.scoreboard}>
        <div role="tablist" aria-label="Choose a leaderboard" className={s.tabs}>
          {boards.map((b, i) => (
            <button
              key={b.key}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={s.tab}
              onClick={() => select(i)}
              onKeyDown={onKey}
            >
              {b.label}
              {i === active ? (
                <span ref={indicator} className={s.indicator} data-flip-id="tab-indicator" aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </div>
        <div
          ref={panel}
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          className={s.panel}
        >
          <div className={s.sidebar}>
            <p id={`${baseId}-title`} className={s.boardTitle}>
              {board.title}
            </p>
            <BoardTable board={board} titleId={`${baseId}-title`} />
          </div>
        </div>
      </div>
    </div>
  );
}
