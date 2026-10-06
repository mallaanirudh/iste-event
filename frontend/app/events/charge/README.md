# Power the Beacon (ISTE Charge at Square One)

The event page at `/events/square1_charge`. Copy lives in `_data/content.ts`; rounds and
leaderboards come from the backend.

## Environment

| Variable | Where it is read | Notes |
| --- | --- | --- |
| `API_BASE_URL` | Server only | Backend origin, e.g. `https://api.example.org`. The client adds `/api/v1`. Unset or unreachable means the page shows its fallback rounds and an "offline" scoreboard. |
| `CHARGE_EVENT_ID` | Server only, optional | Backend event UUID. Use it if the name lookup below ever picks the wrong event. |
| `NEXT_PUBLIC_TALLY_FORM_ID` | Inlined at build time | Tally form ID for the registration ticket. Rebuild after changing it. Without it the ticket shows a "form will appear here shortly" panel. |
| `SITE_URL` | Build/server, optional | Public origin of the deployed site, e.g. `https://squareone.example.org`. Makes link-preview (`og:image`) URLs absolute. Vercel detects it automatically. |

All four are listed in `frontend/.env.example`.

## How the page finds the event

`page.tsx` calls `findEvent()` in `lib/api/events.ts`. With a valid `CHARGE_EVENT_ID` it loads
`GET /api/v1/events/:id`. Otherwise it lists `GET /api/v1/events` and picks the event whose SIG
name is `Charge` and whose name is `Power the Beacon` (case-insensitive). If several events share
the SIG and none has that exact name, it takes the first `Charge` event.

## Updating scores during the event

Scores are written through the backend admin API (admin session cookie required):

- Round leaderboard: `PUT /api/v1/admin/rounds/:roundId/leaderboard`
- Overall Square One leaderboard: `PUT /api/v1/admin/mega-events/:megaEventId/leaderboard`

Both take `{ "entries": [{ "teamId": "<uuid>", "points": 42, "rank": 1 }] }` (`rank` optional) and
replace the whole board. The page reads them back from `GET /api/v1/rounds/:roundId/leaderboard`
and `GET /api/v1/events/:eventId/leaderboard`.

## How "live" works

The backend has no CORS, so every fetch happens on the server.

- The leaderboard fetches use `next.revalidate = 15`, and the route exports `revalidate = 15`,
  so the cached page is regenerated at most every 15 seconds (stale-while-revalidate: the first
  request after 15 seconds triggers the rebuild).
- `_components/LiveRefresh.tsx` calls `router.refresh()` every 30 seconds while the tab is
  visible, pauses when it is hidden, and refreshes straight away when it comes back. It shows
  "Live, updated hh:mm:ss" (IST) for the last refresh.

A score saved by an admin normally appears on open pages within 30 to 45 seconds. Because both
the page and the fetch are stale-while-revalidate, a change that lands just after a rebuild can
take one more refresh cycle, about a minute in the worst case. A full reload behaves the same way.

## Local development

```
cp .env.example .env.local   # set API_BASE_URL
npm run dev
```

For work without the real backend, a small Node mock that serves the public routes above
(events, rounds, round and overall leaderboards, the mega event) on port 4100 is enough; point
`API_BASE_URL` at `http://localhost:4100`. One exists locally as `frontend/.mock-api.mjs`, but it
is git-excluded, so it will not be in a fresh clone.
