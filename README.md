FeISTEval has a Next.js app in `frontend/` and a Fastify API in `backend/`.

Install each application's dependencies with `npm --prefix frontend ci` and `npm --prefix backend ci`. From the repository root:

- `npm run build` builds both applications, including TypeScript checks.
- `npm run lint` checks the entire frontend.
- `npm test` runs the festival schedule boundary tests.
- `npm run dev -- --port 3001` starts the frontend preview.
- `npm start -- --port 3001` serves the frontend production build.

Backend startup requires the environment configuration described in [REPO_MAP.md](REPO_MAP.md); building does not verify database connectivity. The root Next configuration and dependencies are legacy scaffolding without a root `app/` directory. Root scripts delegate to the actual applications.
