# Practical 8 – Performance Optimization and Lazy Loading in React

The React client from Practical 7 with route-based code splitting. Run it against the Practical 7 server (`../practical-7/server`).

## Changes

- `src/App.jsx` – `TaskBoard`, `Login` and `Contact` are loaded with `React.lazy(() => import(...))`. One `<Suspense>` wraps only the `<Routes>` block.
- `src/components/PageLoader.jsx` – the fallback stays hidden for 300 ms, so fast connections do not flash a loader (supplementary).
- `src/components/TaskStats.jsx` – a recharts donut chart (heavy third-party library, ~323 kB) that is lazy-loaded only when the Tasks page has tasks (supplementary).

## Before / after (same code, static imports vs `React.lazy`)

Measured on the home page with Edge DevTools network throttling set to **Slow 3G** and the cache disabled.

| | Before (static imports) | After (lazy) |
| --- | --- | --- |
| JS files on first load | 1 | 1 |
| JS transferred on first load | 170.0 kB | 76.8 kB |
| Largest JS file (build output) | 579.04 kB (175.34 kB gzip) | 248.80 kB (79.00 kB gzip) |
| Load event | 7634 ms | 5721 ms |

Separate chunks after the change: `Contact` 1.05 kB, `Login` 1.51 kB, `TaskBoard` 5.76 kB, `TaskStats` 323.31 kB. The total amount of code is the same; it is just downloaded later, when a route needs it.

Not done: the React DevTools Profiler re-render task needs the interactive DevTools panel and was not recorded here.

## Run

```bash
cd client && npm install
npm run build && npm run preview
```

Evidence (build output, Slow 3G measurements, fallback screenshots) is in `output/`.
