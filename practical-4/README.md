# Practical 4 – Building a RESTful API with Node.js and Express

Task Management API with an in-memory store and a clear middleware pipeline.

```
express.json() -> requestLogger -> /tasks router -> notFound (JSON 404) -> errorHandler (last)
```

| Method | Path | Success | Errors |
| --- | --- | --- | --- |
| GET | `/tasks` | 200 | |
| POST | `/tasks` | 201 | 400 missing title, 415 not JSON |
| PUT | `/tasks/:id` | 200 | 400 bad id, 404, 415 |
| DELETE | `/tasks/:id` | 200 | 400 bad id, 404 |

- `requireJson` – supplementary: rejects POST/PUT without `Content-Type: application/json`.
- `validateId` – supplementary, route-specific: the id must be a positive integer.
- `errorHandler` – logs the stack on the server and sends only `{ "error": "Something went wrong" }` for 500s. `GET /debug/error` throws on purpose to show it (disabled when `NODE_ENV=production`).

## Run

```bash
cd server && npm install && npm start    # http://localhost:5000
```

The curl test run and the server console are in `output/`.
