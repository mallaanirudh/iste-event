"use client";
import styles from "../cata.module.css";
import { EventScheduleDetails } from "@/components/schedule/event-schedule-details";

export default function Board({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {open && (
        <div className={styles.scrim} onClick={onToggle} aria-hidden="true" />
      )}
      <section
        className={`${styles.board} ${open ? styles.boardOpen : ""}`}
        aria-label="Briefing board"
      >
        <div className={styles.boardBody}>
          <p className={styles.bPre}>ISTE Catalyst presents</p>
          <h1 className={styles.bTitle}>LABLOCK</h1>
          <EventScheduleDetails
            eventId="catalyst"
            className="mb-4 text-sm font-semibold leading-relaxed"
          />
          <p>
            Chemical Plant 7 lost power in the middle of a shift. The doors are
            sealed, the corridors have rearranged themselves into a maze, and
            something is walking its halls.
          </p>
          <p>
            The only thing still glowing is the ISTE reagent tank. Its liquid is
            the one light that shows the safe route.
          </p>
          <h2>Your mission</h2>
          <ul>
            <li>Break the tank and fill the flask. Its glow is how you see.</li>
            <li>
              Follow the faint drops to the EXIT LOCKER at the far end of the
              maze.
            </li>
            <li>
              Read the bulletins on the way. They hold the event details and the
              code fragments.
            </li>
            <li>Do not stand still. Something is following you.</li>
          </ul>
          {open && (
            <button type="button" className={styles.btn} onClick={onToggle}>
              Got it
            </button>
          )}
        </div>
        <button
          type="button"
          className={styles.pull}
          onClick={onToggle}
          aria-expanded={open}
        >
          LABLOCK · briefing {open ? "▴" : "▾"}
        </button>
      </section>
    </>
  );
}
