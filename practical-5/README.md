# Practical 5 – MongoDB Integration and Schema Design with Mongoose

The Task API from Practical 4, now stored in MongoDB through a validated Mongoose schema.

## What is in `server/`

- `src/models/Task.js` – schema: `title` (String, required, trimmed), `description`, `completed` (default `false`), `createdAt` (default `Date.now`), `priority` (enum `low`/`medium`/`high`, default `medium`), plus a `pre('save')` hook that trims the title.
- `src/db.js` – connects with `MONGO_URI` from `.env`.
- `src/controllers/taskController.js` – `Task.find`, `Task.findById`, `Task.create`, `Task.findByIdAndUpdate` (with `runValidators`), `Task.findByIdAndDelete`, each in `try/catch` with `next(err)`.
- `src/middleware/errorHandler.js` – turns a Mongoose `ValidationError` into `400 { error, details }` instead of sending the raw error.
- `src/middleware/validateId.js` – rejects ids that are not 24-character ObjectIds.

## Run it

```bash
cd server
npm install
cp .env.example .env     # set MONGO_URI (local MongoDB or Atlas)
npm start                # http://localhost:5000
```

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| GET | `/tasks` | 200, all tasks |
| GET | `/tasks/:id` | 200, or 404 if the id does not exist |
| POST | `/tasks` | 201, or 400 with validation details |
| PUT | `/tasks/:id` | 200, 400 or 404 |
| DELETE | `/tasks/:id` | 200 or 404 |

`.env` is git-ignored; only `.env.example` is committed.

Evidence of the test run is in `output/`.
