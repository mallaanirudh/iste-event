"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { HUNT, PARTS, WORKBENCH, type PartId } from "../_data/content";
import { SFX, type SfxName } from "./sfx";
import { ItemIcon } from "./sprite";
import s from "./game.module.css";

type Toast = { id: number; title: string; body: string; icon: PartId | "beacon" };

type Game = {
  found: PartId[];
  collect: (id: PartId) => void;
  /** The workbench circuit has been closed at least once: the roof beacon is at full power. */
  charged: boolean;
  charge: () => void;
  sound: boolean;
  toggleSound: () => void;
  sfx: (name: SfxName) => void;
};

const GameContext = createContext<Game | null>(null);

export function useGame() {
  const g = useContext(GameContext);
  if (!g) throw new Error("useGame must be used inside <GameProvider>");
  return g;
}

const SOUND_KEY = "ptb-sound";

/** Shared layout id, so a part flies from where it was hidden into its hotbar slot. */
export const partLayoutId = (id: PartId) => `ptb-part-${id}`;

export function GameProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<PartId[]>([]);
  const [charged, setCharged] = useState(false);
  const [sound, setSound] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const soundRef = useRef(false);
  const seq = useRef(0);

  useEffect(() => {
    try {
      const on = window.localStorage.getItem(SOUND_KEY) === "on";
      soundRef.current = on;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the preference only exists on the client
      setSound(on);
    } catch {
      /* storage blocked: sound stays off */
    }
  }, []);

  const sfx = useCallback((name: SfxName) => {
    if (soundRef.current) SFX[name]();
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundRef.current;
    soundRef.current = next;
    setSound(next);
    try {
      window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (next) SFX.tick();
  }, []);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++seq.current;
    setToasts((cur) => [...cur.slice(-1), { ...t, id }]);
    window.setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== id)), 5200);
  }, []);

  // Side effects stay out of state updaters (StrictMode runs those twice), so refs hold the truth.
  const foundRef = useRef<PartId[]>([]);
  const chargedRef = useRef(false);

  const collect = useCallback(
    (id: PartId) => {
      if (foundRef.current.includes(id)) return;
      const next = [...foundRef.current, id];
      foundRef.current = next;
      setFound(next);
      const part = PARTS.find((p) => p.id === id)!;
      if (next.length === PARTS.length) {
        sfx("fanfare");
        toast({ title: HUNT.done, body: HUNT.doneFact, icon: "beacon" });
      } else {
        sfx("pickup");
        toast({ title: `Part found: ${part.name}`, body: part.fact, icon: id });
      }
    },
    [sfx, toast],
  );

  const charge = useCallback(() => {
    if (chargedRef.current) return;
    chargedRef.current = true;
    setCharged(true);
    toast({ title: "Beacon at full power", body: WORKBENCH.solved, icon: "beacon" });
  }, [toast]);

  const value = useMemo(
    () => ({ found, collect, charged, charge, sound, toggleSound, sfx }),
    [found, collect, charged, charge, sound, toggleSound, sfx],
  );

  return (
    <GameContext.Provider value={value}>
      {children}
      <Hotbar found={found} />
      <Toasts toasts={toasts} />
    </GameContext.Provider>
  );
}

/** The Minecraft hotbar: five slots for the hidden parts, with an XP bar above. */
function Hotbar({ found }: { found: PartId[] }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const all = found.length === PARTS.length;

  // Stays out of the hero: it rises once the roof is half scrolled away, or with the first find.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.45) setShown(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const visible = shown || found.length > 0;

  // The label pops up when the hotbar arrives and after each find, then tucks away so it never
  // sits over the copy for long. Once every part is found it stays.
  const [hint, setHint] = useState(false);
  useEffect(() => {
    if (!visible) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- timed reveal driven by scroll and finds
    setHint(true);
    if (all) return;
    const t = window.setTimeout(() => setHint(false), found.length === 0 ? 5000 : 3500);
    return () => window.clearTimeout(t);
  }, [visible, found.length, all]);

  return (
    <motion.div
      className={s.hud}
      data-all={all ? "" : undefined}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 24 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      aria-label="Hidden parts"
      role="group"
    >
      <p className={s.hint} data-on={hint ? "" : undefined} aria-live="polite">
        {all ? HUNT.done : found.length === 0 ? HUNT.hint : `${found.length} of ${PARTS.length} parts found`}
      </p>
      <div className={s.xp} aria-hidden="true">
        <motion.span
          className={s.xpFill}
          initial={false}
          animate={{ scaleX: found.length / PARTS.length }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        />
        <AnimatePresence mode="popLayout">
          {found.length > 0 ? (
            <motion.span
              key={found.length}
              className={s.level}
              initial={reduce ? false : { scale: 1.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              {found.length}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
      <ul className={s.slots}>
        {PARTS.map((p) => {
          const has = found.includes(p.id);
          return (
            <li key={p.id} className={s.slot} data-has={has ? "" : undefined}>
              {has ? (
                <motion.span
                  layoutId={partLayoutId(p.id)}
                  className={s.slotItem}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                >
                  <ItemIcon name={p.id} className={s.slotArt} />
                  <span className={s.vh}>{p.name}</span>
                </motion.span>
              ) : (
                <span className={s.vh}>Empty slot</span>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/** Advancement-style toasts, top right like the game. */
function Toasts({ toasts }: { toasts: Toast[] }) {
  const reduce = useReducedMotion();
  return (
    <div className={s.toasts} role="status" aria-live="polite">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout={!reduce}
            className={s.toast}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 80, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <span className={s.toastIcon} aria-hidden="true">
              <ItemIcon name={t.icon} className={s.toastArt} />
            </span>
            <span className={s.toastText}>
              <span className={s.toastTitle}>{t.title}</span>
              <span className={s.toastBody}>{t.body}</span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
