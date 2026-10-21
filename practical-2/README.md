# Practical 2 – State Management and Routing in React

The portfolio from Practical 1 with React Router v6 and `useState`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (About + Skills) |
| `/projects` | Projects |
| `/contact` | Contact: controlled input, live character count, help tooltip |
| `*` | 404 Not Found (supplementary) |

- `BrowserRouter` wraps `<App />` once, in `main.jsx`.
- The NavBar uses `NavLink`, never `<a href>`, so pages change without a full reload.
- State: `message` (controlled input), `showHelp` (tooltip), and `darkMode` in `App.jsx`, which toggles a `dark` class on `<html>` (supplementary).

## Run

```bash
cd app && npm install && npm run dev
```

Screenshots and the browser test log are in `output/`.
