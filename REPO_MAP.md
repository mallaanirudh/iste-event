# Repository map

Reviewed and updated on 8 October 2026. These notes describe the current implementation and local checks; they do not imply that live backend data has been connected.

## Applications and setup

- `frontend/` is the actual Next.js App Router app: Next 16.3.8, React 19.2.8, TypeScript, Tailwind 4, GSAP, Framer Motion, and Lenis. Its `@/*` alias resolves inside `frontend/`.
- `backend/` is a Fastify 5 TypeScript ESM API using PostgreSQL through Drizzle ORM. `index.ts` registers the route plugins. Imports use `.js` extensions for compiled Node output.
- The root also has a separate package manifest, two Next configs, lockfiles, and public assets, but no root `app/` directory. Run the actual applications from their respective directories.
- `frontend/AGENTS.md` requires consulting the installed Next documentation at `frontend/node_modules/next/dist/docs/` before frontend code changes.
- User workflow requirement: implementation-plan files are temporary and must all be deleted after changes and before any push. The plan for this homepage was removed after validation. Push only when the user requests it.
- Dependencies were installed in both application directories. The frontend now declares its previously missing shared UI dependencies and uses the matching Next 16 ESLint configuration.

```powershell
cd frontend
npm run dev -- --port 3001

# In a second terminal, after configuring backend/.env:
cd backend
npm run build
npm start
```

The backend listens on port 3000 unconditionally in `index.ts`; the validated `PORT` variable is currently unused. The frontend's default port is also 3000, so use 3001 for the frontend when running both.

## Frontend routes and ownership

| Actual route | Main implementation | Current data and behavior |
| --- | --- | --- |
| `/` | `app/page.tsx`, `components/festival/` | FeISTEval carnival homepage; general ISTE event copy, original six connected chambers, Scotland Yard preview, Charge schedule, labeled original sample standings, searchable leaderboard, Golden Ticket registration link |
| `/events/charge` | `app/events/charge/` | Power the Beacon; server-side backend reads with static fallback, Tally ticket and dialog |
| `/events/catalyst` | `app/events/catalyst/` | LABLOCK; interactive intro, generated maze, code fragments and locker leading to Tally registration |
| `/events/scotland-yard` | `app/events/scotland-yard/` | Illustrated mystery building, hidden clues, Caesar cipher wheel, torch mode, static agenda |
| `/events/clutch` | `app/events/clutch/`, `ConcretClutchComponents/` | Magnetic Grand Prix racing page |
| `/events/concrete` | `app/events/concrete/`, `ConcretClutchComponents/titanic/` | Titanic: Float It for Jack; existing nautical kit, three rounds, mini-game wheel, registration-pending state, manifest leaderboard, original sketch asset |

### Homepage components

The active homepage is in `components/festival/`:

- `festival-home.tsx`: featured/upcoming-event cards, countdown, two-row leaderboard, social footer, native dialogs, and team/chamber search. `festival-hero.tsx` supplies the centered, minimal festival entrance and a short desktop gate-opening timeline adapted from the original homepage, retaining native flow on touch/small screens and for reduced motion. `festival-navbar.tsx` supplies fixed responsive navigation adapted from the local AeroNITK header: compact-on-scroll animation, collapsing brand and centered desktop links, active-section highlighting, and a full-screen native mobile-menu dialog.
- `chamber-data.ts`: preserves the original six chamber titles, descriptions, themes, and ordering, plus the original sample leaderboard. Reuses Charge's existing event name, tagline, and start time. The data does not constitute live backend integration.
- `chamber-journey.tsx`: original alternating chamber layout with a measured SVG connector and GSAP scroll progression. A shared SVG mask hides the strokes and moving spark inside chamber footprints; the curves remain visible between cards, with a masked left rail on mobile. Attachment dots were removed. Crypt opens a preview because its event page is missing.
- `chamber-art.tsx`: distinct SVG illustrations for mystery, 8-bit, escape-room, glitch, Formula 1, and nautical themes. `festival-motion.tsx` handles viewport reveals and motion preferences.
- `carnival-art.tsx`: code-native SVG ferris wheel, circus tent, booths, moon/stars, bunting, and footer silhouettes.
- `festival.css`: scoped entry/hover/dialog transitions, reduced-motion handling, cartoon typography, and festival-light path styling.
- `app/layout.tsx`: the single root document, Bangers and Nunito font variables, and FeISTEval metadata. `app/globals.css` owns the Tailwind import and base tokens.
- `components/festival/README.md`: content, registration configuration, and interaction details. `NEXT_PUBLIC_FEISTEVAL_TALLY_FORM_ID` controls the homepage registration link; it is separate from individual event forms.

`HomePageComponents/` contains the previous, currently unused factory homepage:

- `GsapInitializer.tsx`: ScrollTrigger registration and document smooth scrolling.
- `Navbar.tsx`: fixed brass navigation, Framer Motion mobile overlay, body scroll lock.
- `HeroSection.tsx`: pinned GSAP timeline opens the two gates while revealing hero content.
- `EventIntroSection.tsx`: pointer-driven spring tilt/glare on a golden ticket, event manifesto, decorative SVG and animated gears.
- `InventingRoomsSection.tsx`: six hardcoded chamber cards; measures their positions to build a responsive SVG pipe and animates its stroke with scrolling. The Inspect Chamber buttons have no navigation handler.
- `EnrollmentSection.tsx`: registration machine and a Tally iframe still pointing at `YOUR_FORM_ID`.
- `LeaderboardSection.tsx`: delayed fetch to `/api/leaderboard`, falling back to five mock teams. There is no corresponding frontend API route.
- `FactoryFooter.tsx`: event links, placeholder social/contact links, scroll-to-top action.

### Charge

- `page.tsx`: finds the event by `CHARGE_EVENT_ID` or SIG/name; fetches rounds, overall scores, mega-event registration dates, and each round's leaderboard. Converts them to view models before handing them to client components.
- `_data/content.ts`: event facts, dates, rules, contacts, crafting copy, fallback round descriptions and times.
- `_components/ChargeRoot.tsx`: desktop Lenis instance synchronized with the GSAP ticker, scoped anchor scrolling/focus, floor-dependent navigation colors, title reveals, custom cursor.
- `Nav`, `Roof`, `BeaconScene`, `Tower`, `Briefing`, `Ground`, `Footer`: navigation, pixel beacon hero, illustrated building and scroll-powered pipe, crafting-grid tooltips/countdown, rules/contacts/scores/registration, footer.
- `Leaderboard.tsx`: keyboard-accessible round/overall tabs, empty/unavailable states, GSAP Flip indicator, pre-event transition. `LiveRefresh.tsx` calls `router.refresh()` every 30 seconds while visible.
- `Ticket.tsx` and `RegisterDialog.tsx`: inline and modal registration; native dialog, focus management, scroll lock, lazy form mounting.
- `_lib/gsap.ts`, `lenis.tsx`, `titleReveal.ts`, `useMagnet.ts`: animation helpers. `tokens.ts` owns floor themes; `sprite.tsx` and `gold.ts` own SVG pixel assets/palettes. `og.tsx` generates social images and icons with `next/og` and the local Tanker font.
- Component CSS modules own their layouts; `charge.module.css` owns shared scoped styles. Main responsive thresholds include 640, 768, 900, and 1024 pixels.

### Catalyst

- `Maze.tsx`: browser-generated world and lock code, intro/maze/plain-page phases, pointer movement, wall collisions, camera tracking, follower, proximity checks, bulletin dialogs, fragment tray, audio, unlock state, registration. Much of the ordinary event copy is also embedded in this component.
- `Intro.tsx`: find wrench, break glowing tank, catch liquid in flask, timed success/failure/restart; keyboard-accessible buttons and a skip-intro control.
- `Pour.tsx`: canvas droplet physics, flask catch detection, floor splashes and puddles.
- `Board.tsx`: briefing overlay. `Locker.tsx`: digit dials, keyboard input, combination check and sound feedback. Local `TallyEmbed.tsx` loads the widget and uses the public form environment variable.
- `_lib/maze.ts`: seeded maze carving, extra passages, shortest-path search, farthest-cell locker, wall segments, dead ends and steam vents.
- `_lib/audio.ts`: procedural Web Audio ambience and effects, mute/suspend/update/victory/cleanup behavior.
- `_data/content.ts`: bulletin text, code-fragment order, taunts, contacts. `cata.module.css` owns maze, intro, dialogs and plain-page styling. `layout.tsx` provides event-specific font variables.

### Scotland Yard

- `Masthead`, `Roof`, `Floors`, `Thames`, `Pipes`, `Dock`, `BackgroundScene`, `SvgDefs`: static illustrated building and shared SVG symbols.
- `CaseFile.tsx` renders facts and agenda from `content.ts`; `fonts.ts` defines the four event fonts.
- `ClueProvider.tsx` tracks the eight clues and toast messages; each `Clue.tsx` guards against repeat counting. `CipherWheel.tsx` implements pointer/keyboard Caesar decoding and logs the final clue.
- `TorchToggle.tsx`: lights-out overlay following the pointer. `SceneEffects.tsx`: room illumination, heading scramble, reveals, parallax fallback and a live tower clock.
- `scotland-yard.module.css` scopes the illustrated design and includes responsive/reduced-motion handling; the page also supplies a no-JavaScript visibility fallback.

### Shared racing and unused component groups

- `ConcretClutchComponents/` root files provide the current Clutch racing hero, countdown, briefing, rounds, registration, leaderboard, navigation, organizer contacts, speed canvas and track decoration.
- `data/event.ts` supplies racing dates, organizers, placeholder Tally URL and pending team slots. Scores are manually authored; the two tabs do not fetch backend data.
- `ConcretClutchComponents/titanic/` renders Concrete: hero/plank sign, waves/ship background, story, three rounds, practice fortune wheel, registration, manifest leaderboard and captain contacts. The supplied `titanic-event-dashboard-design.zip` contained matching components and artwork; the integration reused them and restored the archive's fonts, palette, ink borders, parchment, wood, and wax textures in scoped `app/events/concrete/voyage.css`. The archive was deleted at the user's request after integration. Cinzel is self-hosted with its license; Special Elite and Plus Jakarta Sans use Next's Google font loader. `data/event-data.ts` retains the archive's event facts with repaired punctuation. The ship image is served from `frontend/public/images/`. See `app/events/concrete/README.md` for ownership and provenance; the obsolete Concrete racing stylesheet was removed.
- `ConcretClutchComponents/race/` contains an unused multi-event dashboard with SIG selector, event grid, strategy sheet, countdown, telemetry UI and round/overall boards. `data/race-data.ts` generates deterministic sample scores and calculates rankings locally.
- `data/utils.ts` combines `clsx` and `tailwind-merge`; `ConcretClutchComponents/ui/button.tsx` uses Base UI and class-variance-authority. These packages are now also declared in the frontend manifest.
- `components/TallyEmbed.tsx` is the reusable validated Tally embed used by Charge, with fallback content and direct iframe loading if the widget script fails.
- Assets served by this app must live in `frontend/public/`. Some icon and Titanic assets exist only in root `public/` and are not automatically served by the frontend app.

## Frontend/backend contract

`frontend/lib/api/client.ts` reads server-only `API_BASE_URL`, adds `/api/v1`, applies a four-second timeout, and returns `null` on missing settings, failed HTTP responses or exceptions. The backend has no CORS registration, so the existing integration performs reads in server components.

`lib/api/types.ts` defines runtime response guards for events, rounds, leaderboard entries and mega events. `lib/api/events.ts` supplies guarded endpoint functions and UUID checks. General event data caches for 30 seconds; leaderboard data and the Charge route revalidate every 15 seconds.

To use a local backend, create `frontend/.env.local` with `API_BASE_URL=http://localhost:3000`. Optional settings are `CHARGE_EVENT_ID`, `NEXT_PUBLIC_TALLY_FORM_ID`, and `SITE_URL`, as documented in `.env.example`. Backend startup requires `DATABASE_URL`, `TALLY_API_KEY`, and `TALLY_FORM_ID` in `backend/.env` or the process environment. None were present during this review.

## Backend route groups

| Prefix | Operations |
| --- | --- |
| `/health` | GET health response; does not query PostgreSQL |
| `/api/v1/auth` | POST register/login/logout; GET me |
| `/api/v1` | GET mega-events, mega-events/:id, events, events/:id, events/:id/rounds, rounds/:id |
| `/api/v1` | GET rounds/:id/leaderboard and events/:id/leaderboard |
| `/api/v1/admin/mega-events` | GET list; POST create; PATCH/DELETE :id |
| `/api/v1/admin/sigs` | GET list; POST create; PATCH/DELETE :id |
| `/api/v1/admin/events` | GET list; POST create; PATCH/DELETE :id |
| `/api/v1/admin` | GET/POST events/:id/rounds; PATCH/DELETE rounds/:id |
| `/api/v1/admin` | GET/POST teams; PATCH/DELETE teams/:id; GET/POST teams/:id/members; DELETE teams/:id/members/:participantId |
| `/api/v1/admin` | PUT rounds/:id/leaderboard and mega-events/:id/leaderboard |
| `/api/v1/admin/tally` | GET registrations, with page/limit, proxies Tally submissions |
| `/api/v1/admin/audit-logs` | GET paginated audit records with filters |

Routes delegate to `src/controllers/`, with Fastify JSON schemas in `src/schemas/`. Admin plugins install authentication and role checks as pre-handler hooks. `Routes.md` is partly aspirational: its webhook, attendance, participant and some registration routes are not implemented.

Authentication uses scrypt password hashes, random cookie tokens, SHA-256 token hashes in the database, and seven-day sessions. The actual cookie name is `session`; configured session name/duration variables are currently unused. `src/db/seed-admin.ts` contains a fixed local admin seed; it was not executed.

Leaderboards are replaced transactionally by admins. Teams must belong to the correct mega event; duplicate team IDs are rejected. Overall standings are stored independently from round standings. GET `events/:id/leaderboard` returns the parent mega event's overall standings, not an event-specific sum.

Tally registration currently means iframe submissions stored at Tally plus an admin submissions proxy. There is no implemented webhook or automatic synchronization into participant/team tables. Audit entries are currently written only for event creation and updates. An extra empty `admin-audit-log.controller.ts` exists alongside the actual `admin.audit-log.controller.ts`.

## Database

`src/db/client.ts` creates the pg pool and Drizzle client; `schema/index.ts` exports all tables. `drizzle.config.ts` describes PostgreSQL migrations. One initial SQL migration and its metadata are checked in.

Core relationships: mega event -> events -> rounds; events also reference SIGs; mega event -> teams -> team members -> participants -> users. Sessions reference users. Round and overall leaderboard entries, attendance and audit logs reference the relevant teams/rounds/mega events/users. UUIDs identify records; timestamps use time zones. Round numbers are unique within events, team codes are globally unique, and team/participant membership pairs are unique.

## Current verification and remaining issues

- Backend `npm run build`: passed. Backend `npm start`: failed environment validation for the three required database/Tally variables; database connectivity and live API data remain unverified.
- Frontend `npm run build`: passed after fixing the duplicate homepage metadata, Clutch stylesheet import, missing shared UI dependencies, and Charge social-image font path.
- Frontend `npx tsc --noEmit`: passed. Lint of the new homepage and changed layouts passed.
- Production HTTP checks passed for all six page routes and Charge's Open Graph image; each page returns a single root document. All 13 linked homepage styles/scripts/fonts were served successfully.
- Repository-wide lint exposed 10 errors and 7 warnings in legacy factory/racing/Catalyst components during the initial implementation. The nautical countdown's effect update was corrected when activating Concrete. Lint passes for the festival components and the complete nautical component group; other legacy diagnostics remain outside these changes.
- The browser connector exposes no browsers in this session, so visual/mobile and interactive browser checks remain unverified. HTTP/build checks do not establish visual correctness.
- Clutch and Concrete use nested wrapper divs under the single root document. Their page variables and base visual styles are now scoped to their event wrappers; Clutch no longer overrides the site's body fonts and document variables.
- The new homepage links to the actual event routes and uses a leaderboard dialog. Old unused factory components retain their placeholder links.
- Charge README and security-header configuration still reference `/events/square1_charge`; the actual page is `/events/charge`. Its image assets deliberately live under the former name, but header matching and documentation are stale.
- Frontend lacks an admin dashboard/login UI despite the backend admin API and the note in `docs.md`.

The next frontend task should target the actual route/component owner above and retain the distinction between static display content, public backend reads, and authenticated admin writes.

## Comparison previews

- Current working tree: `http://localhost:3001`.
- Original pulled commit `7b793b2`: separate detached worktree at `../iste-event-original`, preview `http://localhost:3003`. Its tracked source remains unchanged.
- Chamber reference checks confirmed all six descriptions/themes/order and the original example scores. Current event-route HTTP checks passed, including the restored Concrete content and its image asset. Interactive/visual browser testing remains unavailable in this session.

## Responsive pass

The homepage and all five event pages were reviewed for narrow phones, tablet widths, desktop, short landscape screens, touch input, and text reflow. Changes include smaller mobile headings, flexible button text, dialogs constrained to the available viewport, safe-area spacing for fixed controls, and table overflow contained within focusable score panels. Browser zoom is allowed on every route.

- Homepage: mobile title sizing, navigation brand shrinking, readable search-input text, corrected dialog width, and wrapping chamber-footer copy. The existing chamber masks still hide the connector and spark behind the cards.
- Charge: the hero illustration can no longer calculate a negative width on short screens; mobile headings, score tabs, table cells, navigation sheets, and registration dialog sizing now adapt to smaller viewports.
- Scotland Yard: facts stack on phones, agenda stamps and decoded stamps enter the normal flow, timeline columns shrink, cipher controls wrap, clue targets enlarge on touch screens, and fixed controls leave space above the footer.
- Clutch: a section menu replaces the desktop navigation below 1024px, with Escape/outside-click dismissal and resize cleanup. The hero date/venue badge wraps, headings/countdown scale down, score tables scroll locally, and quick contacts account for safe areas and short screens.
- Concrete: the practice wheel now fits its card instead of forcing a fixed 240px width; buttons, icons, tabs, navigation, headings, and manifest tables reflow inside the nautical design.
- Catalyst: touch users can hold and drag the flask, release to stop, and scroll the briefing and game dialogs. Narrow-screen HUD controls, fragment tray, hints, locker dials, close controls, and the ordinary event page adapt to the viewport. Intro coordinates are clamped after resizing. Three existing React lint errors in these game components were also corrected.

Validation: production compilation and TypeScript passed; lint passed for the festival components, affected Clutch components, the complete nautical component group, and the modified Catalyst game components. HTTP checks confirmed all six routes, one document per route, device-width viewports without zoom restrictions, valid rendered section anchors, and 42 linked styles/scripts/font assets. The original preview and six-chamber content comparison still passed. Visual layout and touch-interaction checks in a browser remain unverified because the browser connector exposes no enabled browser.

## Original-site UI adaptation

The subsequent ten UI refinements are documented in root `UI_CHANGE_LOG.md`, with stable numbered controls in `components/festival/design-refinements.ts`. Each CSS group is scoped to its own enabled number; original artwork, ranking and footer markup remains available for single-number rollbacks. Current styling uses Fredoka/Nunito, muted-gold frames, sparse entrance stars, thinner gates, richer chamber scenes, more readable cards, a compact scoreboard, consistent button feedback and a concise footer. Existing data/routes, masks and spacing fixes remain. The pre-change baseline is outside the repository at `C:/Windows/Temp/iste-ui-before-ten-2026-10-08`. Build/lint/content/route checks and a single-number rollback check passed; all ten are enabled for user review.

The current homepage now uses the original site's centered entrance, scroll-opened gate motif, framed noticeboard and alternating chamber nameplates with the current twilight carnival colors and current data. Gate motion animates transforms only, pins for at most 320px of extra desktop scroll, and is excluded on touch, short/small screens and reduced motion. The concise hero, yellow ISTE lettering, dashboard placement, Aero-inspired navigation, six chamber order/routes, and connector masks are retained. No event-page data or backend behavior changed during this pass.

Production build/TypeScript, scoped festival lint, original chamber and sample-score comparisons, six-route HTTP/anchor/document checks, and 42 linked assets passed. Both comparison servers remain available. The browser connector is unavailable, so visual and measured scroll-performance review remains outstanding; source and HTTP checks cannot certify either.

## PDF audit notes (source removed)

The source Mega Event PDF was deleted on 8 October 2026 at the user's request, along with any remaining implementation-plan files, before preparing the staging branch. The audit notes below are retained as a record of unresolved content differences; the PDF is not included in the branch.

All three pages of the user-supplied root `The Mega Event.pdf` were extracted and reviewed before the navbar work. The document adds shared registration, exactly three initial team members, organizer assignment of solo participants, fixed team membership and team IDs, absence/late-arrival rules, misconduct penalties, POC/SIG Head/Events Coordinator escalation, periodic published leaderboards, tie-breaking, and organizer record-keeping. These additions have not yet been applied to the website or backend.

Resolve the source differences before publishing conflicting details: the PDF's scoring caps (20 Scotland Yard + 60 Square One + 10 bonus) sum to 90, while its stated total is 100. It lists Scotland Yard on 11 October, Square One on 12–16 October, tentative 6:30–8:30 PM timings, and a two-round limit for SIG events; Concrete currently has three rounds on 24 October. Charge and Catalyst allow smaller initial teams in their copy. The PDF also contains conflicting one-day versus one-SIG-per-day format statements. The user's clarification request is pending; no score cap, round count, or individual event schedule has been guessed or overwritten.
