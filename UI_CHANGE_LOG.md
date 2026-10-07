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

## Validation

Production build including TypeScript, scoped festival/homepage lint, six page-route HTTP/document/anchor checks, 42 linked asset checks, original chamber/order/theme/description and sample-score comparisons passed. The single-number rollback check passed. The preview browser is unavailable in this session, so visual appearance, interaction timing and measured scroll performance remain unverified. The temporary implementation plan was removed. These checks describe local validation before staging publication.
