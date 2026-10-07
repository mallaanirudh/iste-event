import { Compass } from "lucide-react";

export function SectionHeading({
  kicker,
  title,
  id,
}: {
  kicker: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-crimson">
        {kicker}
      </p>
      <h2
        id={id}
        className="mt-2 text-balance font-serif text-3xl font-bold uppercase text-ink md:text-4xl"
      >
        {title}
      </h2>
      <div aria-hidden="true" className="mt-3 flex items-center gap-3 text-ink">
        <span className="h-px w-16 bg-ink md:w-24" />
        <Compass className="size-5" strokeWidth={1.5} />
        <span className="h-px w-16 bg-ink md:w-24" />
      </div>
    </div>
  );
}

export function WaxSealButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="wax-seal group inline-flex max-w-full items-center justify-center gap-3 rounded-full px-4 py-4 text-center font-serif text-xs font-bold uppercase tracking-widest text-parchment transition-transform hover:-translate-y-0.5 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean sm:px-7 sm:text-sm md:text-base"
    >
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-dashed border-parchment/60 font-serif text-xs"
      >
        {"W"}
      </span>
      <span className="min-w-0">{children}</span>
    </a>
  );
}
