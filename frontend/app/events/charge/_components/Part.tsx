"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { PARTS, type PartId } from "../_data/content";
import { partLayoutId, useGame } from "../_lib/game";
import { ItemIcon } from "../_lib/sprite";
import s from "./part.module.css";

/**
 * A hidden part, bobbing like a dropped item in the game. Picking it up flies it
 * into its hotbar slot (shared layout animation) and shows a fact about the event.
 * Place it inside a positioned floor with `style` (left/right/top/bottom).
 */
export function Part({ id, style, className }: { id: PartId; style?: CSSProperties; className?: string }) {
  const { found, collect } = useGame();
  const part = PARTS.find((p) => p.id === id)!;
  if (found.includes(id)) return null;

  return (
    <button
      type="button"
      className={`${s.part} ${className ?? ""}`}
      style={style}
      onClick={() => collect(id)}
      aria-label={`Hidden part: ${part.name}. Pick it up.`}
      data-cursor="Pick up"
    >
      <span className={s.bob}>
        <motion.span layoutId={partLayoutId(id)} className={s.item} transition={{ type: "spring", stiffness: 220, damping: 22 }}>
          <ItemIcon name={id} className={s.art} />
        </motion.span>
      </span>
      <span className={s.shadow} aria-hidden="true" />
    </button>
  );
}
