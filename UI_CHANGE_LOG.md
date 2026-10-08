# Numbered homepage refinements

Implemented on 8 October 2026. All ten are enabled for review at http://localhost:3001.

| Number | Change | Result |
| --- | --- | --- |
| 1 | Navbar | Cleaner link spacing, a smaller ticket button with a 44px hit target, and a subtle active-link underline. Existing scroll and mobile-menu behavior is retained. |
| 2 | Typography | Fredoka headings and Nunito body text throughout the homepage, with calmer heading sizes. Yellow ISTE lettering is retained. |
| 3 | Borders and accents | Softer muted-gold frames, quieter rivets, smaller solid shadows, and yellow primary buttons. Purple remains the base; pink/cyan are occasional accents. |
| 4 | Background stars | Fewer, fainter static stars concentrated around the entrance; reading sections have clear backgrounds. |
| 5 | Gates | Slimmer frames, thinner bars, and smaller circular/star ornaments, preserving SVG proportions and the gate-opening animation. |
| 6 | Chamber artwork | Six consistent SVG scenes: evidence board, pixel beacon, maze/flask, secured terminal, racing car/checkered flag, and ship/construction scale. |
| 7 | Card typography | Larger descriptions with shorter lines, more readable metadata, title-case labels and fewer duplicate badges. Event descriptions and discipline information are retained. |
| 8 | Leaderboard | Compact scoreboard rows, aligned points, restrained gold/silver/bronze stars, explicit rank numbers, and unchanged searchable sample data. |
| 9 | Buttons | Consistent small hover lift, press feedback, and arrow movement. Touch and reduced-motion preferences remain supported. |
| 10 | Footer | One closing sentence, one ticket action, a tidy social row, and a quiet skyline. Registration, directory, copyright and back-to-top behavior remain available. |

## Reverting one number

Change only the corresponding `true` to `false` in `frontend/components/festival/design-refinements.ts`. The root `data-ui-refinements` attribute enables independent CSS blocks in `festival-refinements.css`; numbers 5, 6, 7, 8 and 10 also select their corresponding markup. Original illustration, ranking and footer markup is retained for these fallbacks. Do not restore entire shared files to revert an individual number.

For example, setting `8: false` restores the earlier ranking rows while retaining the other nine refinements. This was checked against the running preview; all ten were restored afterward. The same numbers match the list agreed in chat.

An exact pre-change working-tree baseline is stored outside the repository at `C:/Windows/Temp/iste-ui-before-ten-2026-10-08`. It includes the festival components, homepage font setup and repository notes. This is a local recovery copy, not a repository artifact; the numbered switches are the primary way to revert individual refinements. Future source edits should retain their scope and update this record.

## Artwork and event navigation follow-up

The carnival tent sign now uses an explicit text length with padding inside a wider plate. Hero and chamber illustrations are contained within their SVG boxes. The ten numbered homepage refinements remain independently reversible.

Charge, Clutch, Concrete, Scotland Yard and Catalyst use `components/navigation/event-navbar.tsx`: a consistent fixed header, centered desktop links, compact scroll state, theme-specific colors, active section links, a primary action and a native mobile-menu dialog. Charge retains its registration dialog, contacts, floor colors and Lenis controls. Scotland Yard links to existing case facts. Catalyst retains its intro, maze controls and ordinary registration page; navigation pauses gameplay, and pointer/canvas coordinates account for the header height. Anchored sections leave room below the fixed header.

## Shared registration website

The organizer-provided `https://feisteval-2026.vercel.app` is stored in `frontend/data/registration.ts`. Homepage desktop/mobile registration and Golden Tickets, all five event headers, event hero registration buttons, and Charge/Catalyst/Clutch/Concrete registration panels now link there in a new tab. Active Tally embeds, placeholder links and registration-pending panels are replaced. Event rules, artwork, backend reads and Catalyst game controls remain in place. Build/TypeScript, scoped lint, six-route document/anchor checks and registration link checks passed; 19 external registration links were verified in rendered HTML. Registration submission on the external website was not tested.

## Larger central hero

The FeISTEval heading and central carnival illustration are enlarged to fill the entrance. Desktop title sizing now responds to both width and viewport height and caps at 11rem; artwork caps at 460px. Phone/tablet sizes grow within the available content width. Introductory text is slightly larger on desktop. Yellow ISTE lettering, gate motion, registration links and programme-strip flow remain in place.

## Published dates and automatic event cards

Added the complete 11–16 October 2026 programme from the latest supplied text. All chamber cards, event pages and the calendar use a shared IST schedule. The homepage current card is live only inside a published session; the upcoming card selects the next session, including later rounds of the same event. Breaks, overnight gaps and festival completion have explicit states. Concrete moves to 12 October at 6:30 PM; Clutch's countdown starts at 6:30 PM rather than midnight. Charge uses its detailed 6–8 PM / 9–11 PM slots instead of the conflicting shared 6:30–8:30 PM slot, pending organizer clarification. Gameplay, registration URLs, chamber ordering and connector masks remain in place.

Validation: seven schedule-boundary tests, production build/TypeScript, lint for all schedule changes, six-route/document/anchor checks, 43 linked assets, rendered date/timing checks on all five event pages, registration-link checks and original chamber/sample-score comparisons passed. The temporary plan was removed. Browser visual checks remain unavailable in this session.

## Validation

For the artwork/navigation follow-up, production build and TypeScript passed, lint passed for every modified component, all six routes and 43 linked assets passed HTTP/document/anchor checks, and all five shared event headers/menu actions were confirmed in server-rendered HTML. The six original chambers and example scores remain unchanged. The temporary plan was removed. Browser visual and interaction checks remain unavailable.

Production build including TypeScript, scoped festival/homepage lint, six page-route HTTP/document/anchor checks, 42 linked asset checks, original chamber/order/theme/description and sample-score comparisons passed. The single-number rollback check passed. The preview browser is unavailable in this session, so visual appearance, interaction timing and measured scroll performance remain unverified. The temporary implementation plan was removed. These checks describe local validation before staging publication.

## Staging verification follow-up

Added the shared registration button above the journey-start marker reached by Enter Carnival. Full frontend lint now passes with zero errors and warnings after correcting the remaining legacy countdown, ref prop types, unused declarations and locker sound calculation. Root npm scripts now delegate to the real frontend and backend rather than the unused root Next scaffold.

Validation: root `npm run build` compiles both applications including TypeScript; `npm run lint` and all seven `npm test` schedule tests pass. All six page routes, 43 linked assets, published dates/timings, 20 registration links and the new journey CTA passed rendered HTTP checks. Live database operations and external registration submissions were not tested. Browser visual checks remain unavailable. Temporary implementation plans and excluded attachments are removed before publication.
