# C//QUEST — project conventions

A self-contained browser game built with TanStack Start (React 19, plain JavaScript — no
TypeScript). All state is local: `src/lib/game/GameProvider.jsx` wraps `localStorage` and no page
talks to a backend.

## Structure

- `src/routes/*.jsx`: one page per file (`index.jsx` → `/`, `mission.$missionId.jsx` →
  `/mission/$missionId`). `src/routeTree.gen.ts` is generated on every dev/build run — never edit
  or commit it.
- `src/routes/__root.jsx`: the HTML document (`<html>`, `<head>` via `HeadContent`, `<Scripts />`)
  and the `GameProvider` + `Toaster` providers. There is no `index.html`.
- `src/lib/game/`: saves/storage, curriculum, achievements, tutor feedback, sound.
- `src/lib/c/`: the in-browser C engine (`runC`, `evaluateChecks`) and highlighter.
- `src/components/game/` and `src/components/arena/`: campaign and mission UI.
- `src/components/ui/`: the few shadcn/ui primitives the game uses (button, dialog, input, sonner).
  `src/index.css` + `tailwind.config.js`: design tokens.
- `src/server.js`: the Worker entry (`main` in `wrangler.jsonc`). Keep it.

## Rules

- Write JavaScript/JSX only — no `.ts`/`.tsx` files and no type annotations (the generated
  `src/routeTree.gen.ts` is the sole exception).
- Pages that read saved progress use `ssr: false` (all current pages do), because the save store
  only exists in the browser.
- Server and first client render must match: read `window`, `document` and browser storage only in
  effects and handlers, and format dates and numbers with an explicit locale and time zone.
- Keep `vite.config.js` plugins in order: `cloudflare()`, `tanstackStart()`, `react()`.
- Run `npm run lint` before finishing code changes.
- Never commit `dist`, `.wrangler`, `.tanstack` or `src/routeTree.gen.ts`.
