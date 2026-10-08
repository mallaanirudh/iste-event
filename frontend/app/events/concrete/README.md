# Concrete — Titanic: Float It for Jack

The route `/events/concrete` integrates the root archive
`titanic-event-dashboard-design.zip` into the existing frontend application.
Its nautical components already matched `ConcretClutchComponents/titanic/`,
and its ship illustration matches `public/images/titanic-sketch.png`.
Those files are reused instead of importing a second Next application.

`voyage.css` restores the archive's parchment palette, ink borders, wood grain,
paper texture, and wax seals. Its tokens and typography are scoped to
`.concrete-voyage`. The layout uses Cinzel, Special Elite, and Plus Jakarta Sans;
it remains a nested layout under the application's single HTML document.
The obsolete Concrete racing stylesheet was removed. Clutch retains its own page.

Cinzel's variable font is self-hosted with `next/font/local` because the installed
Next Google font module does not export that family. The font and its adjacent
SIL Open Font License come from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/cinzel).
Special Elite and Plus Jakarta Sans use `next/font/google`.

Event content and organizer-managed standings remain in `data/event-data.ts`.
Registration is explicitly pending until `REGISTRATION_URL` is configured;
the ZIP contains no live form URL or backend connection. The existing countdown
fix, reduced-motion behavior, and FeISTEval return navigation are retained.
The archive's package manifest, lockfile, generic icons, and configuration that
suppresses TypeScript errors are not needed by this integration.
