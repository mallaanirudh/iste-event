# Power the Beacon (ISTE Charge at Square One)

The event page at `/events/charge`. It is information only: registration and the leaderboards
live on the Square One main page. Copy lives in `_data/content.ts`; rounds come from the backend.

## Interactive pieces

- **Workbench** (`_components/Workbench.tsx`): a 5 x 4 board of redstone wire tiles. Tap a tile to
  turn it; current runs live from the power block, and closing the circuit lights the lamp and
  puts the roof beacon at full power (the beam cycles colour).
- **Parts hunt** (`_components/Part.tsx`, `_lib/game.tsx`): five parts are hidden across the
  floors. Each one picked up flies into the hotbar at the bottom of the screen and shows a fact
  about the event. Their positions are the `.part*` classes in each floor's CSS module.
- **Sound** (`_lib/sfx.ts`): synthesised Web Audio effects, off until the visitor turns them on
  with the speaker button in the nav. The choice is remembered in `localStorage`.
- **Sky parallax** (`_components/Roof.tsx`): on a mouse the stars, clouds and skyline drift at
  different depths; the skyline also sinks as the roof scrolls away.

All motion respects `prefers-reduced-motion`.

## Environment

| Variable | Where it is read | Notes |
| --- | --- | --- |
| `API_BASE_URL` | Server only | Backend origin, e.g. `https://api.example.org`. The client adds `/api/v1`. Unset or unreachable means the page shows its fallback rounds from `_data/content.ts`. |
| `CHARGE_EVENT_ID` | Server only, optional | Backend event UUID. Use it if the name lookup below ever picks the wrong event. |
| `SITE_URL` | Build/server, optional | Public origin of the deployed site, e.g. `https://squareone.example.org`. Makes link-preview (`og:image`) URLs absolute. Vercel detects it automatically. |

## How the page finds the event

`page.tsx` calls `findEvent()` in `lib/api/events.ts`. With a valid `CHARGE_EVENT_ID` it loads
`GET /api/v1/events/:id`. Otherwise it lists `GET /api/v1/events` and picks the event whose SIG
name is `Charge` and whose name is `Power the Beacon` (case-insensitive). If several events share
the SIG and none has that exact name, it takes the first `Charge` event. The backend has no CORS,
so the fetch happens on the server; the route regenerates at most once a minute (`revalidate = 60`).

## Local development

```
cp .env.example .env.local   # set API_BASE_URL
npm run dev
```
