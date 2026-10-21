# Practical 9 – In-Memory Caching and Query Optimization

The Practical 7 API with server-side caching of the task list using `node-cache`.

## How it works

```
GET /tasks  -> cache.get('tasks:<userId>')  HIT  -> send cached JSON
                                            MISS -> Task.find().lean() -> cache JSON (TTL 60 s) -> send
POST / PUT / DELETE /tasks -> write to MongoDB -> cache.del(affected keys)
```

- `src/cache.js` – one `NodeCache` instance (`stdTTL` from `CACHE_TTL_SECONDS`, default 60). `CACHE_ENABLED=false` turns caching off for the "without cache" measurement.
- Keys include the user id (`tasks:<userId>`, `task:<userId>:<taskId>`) because every user has their own task list since Practical 7. The handout's single `all_tasks` key would show one user's tasks to another.
- Every write route deletes the affected keys after a successful write, so stale data is never served.
- Responses carry an `X-Cache: HIT` or `X-Cache: MISS` header.
- Supplementary: `GET /tasks/:id` has its own key; `GET /debug/cache-stats` shows hits, misses and keys.

## Measurements (5000 tasks, local MongoDB)

| Run | Without cache | With cache |
| --- | --- | --- |
| 1 | 90.5 ms | 88.4 ms (MISS) |
| 2 | 74.0 ms | 36.1 ms (HIT) |
| 3 | 65.3 ms | 5.5 ms (HIT) |
| 4 | 66.5 ms | 26.1 ms (HIT) |
| 5 | 84.1 ms | 5.5 ms (HIT) |
| Average | 76.1 ms | 18.3 ms (hits only) |

Lesson from the first attempt: storing the array of documents made cache hits *slower* (about 110–130 ms), because `node-cache` deep-clones values on every `get` and `set` by default. Storing the response as a JSON string with `useClones: false` fixed it.

Known limitation: the cache lives in this process's memory. It is empty after a restart, and a second server instance would have its own separate cache.

## Run

```bash
cd server && npm install && cp .env.example .env
npm start
node scripts/seed-tasks.js <email> 5000   # optional: sample data for measuring
```

Full measurement output is in `output/`.
