# Practical 10 – Asynchronous Processing with Event-Driven Architecture

Background notifications for the Task API using Node's built-in `events` module (no message queue).

```
POST /tasks -> save task -> log "[API] Response sent" -> res.status(201).json(task)
            -> taskEvents.emit('task-created', { task, user })
                    listener: logs "started", then finishes the slow work 2 s later (setTimeout)
```

- `src/events/taskEvents.js` – one shared `TaskEvents extends EventEmitter` instance.
- `src/events/listeners.js` – registered once when `app.js` loads:
  - `task-created` – logs the task title, the user and timestamps; the slow part (a stand-in for sending an email) runs in a `setTimeout` of `NOTIFY_DELAY_MS` (default 2000).
  - `task-deleted` – supplementary second event, logs an audit line.
  - `error` – supplementary; errors thrown inside the `task-created` handler are passed here instead of crashing the server. (Lab demo: a title containing `fail-notify` makes the handler throw.)

Important detail: `emit()` itself calls the listeners synchronously. The API stays fast because the event is emitted after the response is sent and the slow work is scheduled with `setTimeout`. If the 2-second work were awaited inside the route, every POST would take 2 seconds.

## Result (from `output/`)

```
[API] Response sent at           11:01:47.660Z   (client received 201 in 11 ms)
[Notification] listener started  11:01:47.662Z
[Notification] ... finished at   11:01:49.664Z   (2 s later)
```

## Run

```bash
cd server && npm install && cp .env.example .env
npm start
```
