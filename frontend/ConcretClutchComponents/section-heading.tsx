export function SectionHeading({
  id,
  kicker,
  title,
}: {
  id: string
  kicker: string
  title: string
}) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <p className="font-mono text-xs tracking-[0.35em] text-cyan">{kicker}</p>
      <div className="flex items-center gap-4">
        <h2 id={id} className="text-outline font-display text-3xl text-white sm:text-5xl">
          {title}
        </h2>
        <span aria-hidden="true" className="speed-stripes hidden h-6 flex-1 text-crimson/60 sm:block" />
      </div>
    </div>
  )
}
