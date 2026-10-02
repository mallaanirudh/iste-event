auth.routes.ts
--------------
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
-------------

events.routes.ts
--------------
GET    /api/v1/events
GET    /api/v1/events/:eventId

---------------

rounds.routes.ts
---------------
GET    /api/v1/events/:eventId/rounds
GET    /api/v1/rounds/:roundId

--------------


teams.routes.ts
--------------
GET    /api/v1/teams/:teamId
GET    /api/v1/teams/:teamId/members
GET    /api/v1/me/team

registrations.routes.ts
---------------
POST   /api/v1/registrations
GET    /api/v1/registrations/me
PATCH  /api/v1/registrations/me
DELETE /api/v1/registrations/me

---------------

leaderboards.routes.ts
---------------
GET /api/v1/rounds/:roundId/leaderboard
GET /api/v1/events/:eventId/leaderboard
GET /api/v1/mega-events/:megaEventId/leaderboard

---------------


admin.routes.ts
--------------
POST   /api/v1/admin/events
PATCH  /api/v1/admin/events/:eventId
DELETE /api/v1/admin/events/:eventId

POST   /api/v1/admin/events/:eventId/rounds
PATCH  /api/v1/admin/rounds/:roundId
DELETE /api/v1/admin/rounds/:roundId

POST   /api/v1/admin/teams
PATCH  /api/v1/admin/teams/:teamId
POST   /api/v1/admin/teams/:teamId/members
DELETE /api/v1/admin/teams/:teamId/members/:participantId

PUT /api/v1/admin/rounds/:roundId/leaderboard

-----------
Admin View

----------
GET /api/v1/admin/participants
GET /api/v1/admin/teams
GET /api/v1/admin/events
GET /api/v1/admin/audit-logs

----------

Attendance
---------
PUT /api/v1/admin/rounds/:roundId/attendance