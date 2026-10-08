import type { CSSProperties, ReactNode } from "react";

const DRIPS = [
  [4, 30], [11, 18], [19, 38], [27, 22], [36, 44], [44, 16], [52, 34], [61, 26], [69, 40], [78, 20], [86, 32], [94, 24],
];

/** Chocolate floor slab that drips into the room below. */
export function Slab() {
  return (
    <div className="slab" aria-hidden="true">
      <svg viewBox="0 0 100 44" preserveAspectRatio="none">
        {DRIPS.map(([x, h]) => (
          <path key={x} className="drip" d={`M${x - 2.2} 0 Q${x - 2} ${h * 0.6} ${x} ${h} Q${x + 2} ${h * 0.6} ${x + 2.2} 0Z`} />
        ))}
      </svg>
    </div>
  );
}

/** One storey of the factory: a full-height section with its floor plaque. */
export default function Floor({
  id, label, name, wall, className = "", children, labelledBy,
}: {
  id: string;
  label: string;
  name: string;
  wall: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} className={`floor ${className}`} data-floor={id} aria-labelledby={labelledBy}>
      <div className="room" style={{ "--wall": wall } as CSSProperties}>
        <div className="plaque">
          <span className="num" aria-hidden="true">{label}</span>
          <span className="name">{label === "G" ? "Ground" : `Floor ${label}`} · {name}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
