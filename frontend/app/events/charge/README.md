# Power the Beacon (ISTE Charge at Square One)

The event page at `/events/charge`. It is information only: registration and the leaderboards
live on the Square One main page. Copy lives in `_data/content.ts`; rounds come from the backend.

## Motion

- **Stacked floors** (`_lib/layers.ts`, every screen size): each floor holds while the next one,
  led by its brick slab, slides up over it; the covered floor sinks back and dims (`--cover`).
- **Reveals**: titles rise out of a mask (`_lib/titleReveal.ts`); `data-reveal` blocks fade up;
  `data-slide` rows (the closing facts) slide in tied to the scroll.
- **Roof**: the beacon powers on after load; the sky layers drift with the mouse and the skyline
  sinks as the roof scrolls away. The copper pipe on the left fills as you scroll down the tower.

There is no countdown: the page went live a week before the event and a timer added nothing.

Round copy is deliberately short (a one-line teaser per round, `FALLBACK_ROUNDS[].teaser`), and the
teaser is shown even when the backend has a longer description. Times follow the event brief.

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
