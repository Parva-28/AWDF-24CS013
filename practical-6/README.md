# Practical 6 – Full Stack Integration: React + Node + MongoDB

A monorepo with the React frontend (`client/`) and the Express + MongoDB API (`server/`).

```
React (localhost:5173 / 4173)  --fetch-->  Express (localhost:5000)  --Mongoose-->  MongoDB
```

## Run both parts locally (two terminals)

```bash
# Terminal 1 – API
cd server
npm install
cp .env.example .env      # set MONGO_URI
npm start                 # http://localhost:5000

# Terminal 2 – React
cd client
npm install
npm run dev               # http://localhost:5173, open the Tasks page
```

## What changed

- **server**: `cors` middleware added before the routes so the React dev server (a different origin) can call the API.
- **client**: `src/api/taskApi.js` holds the single `BASE_URL` and the CRUD calls. The Tasks page (`src/pages/TaskBoard.jsx`) replaces the GitHub data from Practical 3:
  - list from `GET /tasks` with loading and error (Retry) states
  - create (`POST`), toggle done (`PUT`), delete (`DELETE`); state is updated from the server's response, never assumed
  - supplementary: optimistic create (rolled back if the server rejects it), confirmation dialog before delete, toast notifications for success and failure

Evidence of the test run is in `output/`.
