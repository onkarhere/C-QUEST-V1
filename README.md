# C//QUEST

A browser game that teaches C from first principles: six worlds, thirty quests, and a small C
parser/evaluator that runs entirely in the page. Progress lives in `localStorage` — no backend,
no accounts, no network calls.

Built with [TanStack Start](https://tanstack.com/start) (React 19, plain JavaScript), rendered on
the server by default and packaged as a Cloudflare Worker by the Cloudflare Vite plugin.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://localhost:3000).

## Build

```bash
npm run build   # -> dist/client (assets) + dist/server (the Worker)
npm run preview
```

There is no `index.html`: the HTML document is rendered from `src/routes/__root.jsx`. Dev and
build both execute server code in `workerd` through `@cloudflare/vite-plugin`, so the local run
matches the Worker output.

## Layout

| Path | What it is |
| --- | --- |
| `src/routes/index.jsx` | Title screen and save slots |
| `src/routes/map.jsx` | The campaign map |
| `src/routes/mission.$missionId.jsx` | A quest: briefing, code editor, run, memory view |
| `src/routes/profile.jsx` | Stats, achievements, export/import |
| `src/lib/game/` | Saves, curriculum, achievements, feedback, sound |
| `src/lib/c/` | The in-browser C engine and syntax highlighting |
| `src/components/game/` | Campaign chrome (HUD, world sections, save cards) |
| `src/components/arena/` | Mission chrome (editor, terminal, checks, tutor) |
| `src/components/ui/` | shadcn/ui primitives (button, dialog, input, sonner); tokens live in `src/index.css` and `tailwind.config.js` |

`src/router.jsx` builds the router and its QueryClient per request; `src/server.js` is the Worker
entry (`main` in `wrangler.jsonc`).
