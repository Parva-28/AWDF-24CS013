# Practical 13 – AI API Integration into a Web Application

The Task Manager can suggest a task description from the task title using the OpenAI API (the handout's `gpt-4o-mini` by default).

```
React "Suggest description (AI)"  ->  POST /api/ai/generate-description  (our Express API, JWT required)
                                        -> OpenAI chat completion (key read from .env on the server)
                                        <- { description }  or, on any failure,  { fallback: true, message }
```

## Server (`server/`)

- `src/services/aiService.js` – calls OpenAI with a 10-second timeout and no retries. Only the task title is sent: no email, ids or other user data.
- `src/controllers/aiController.js` – graceful degradation: a bad key, timeout, quota error or network error all return `200 { description: '', fallback: true, message }`. The reason is logged on the server only.
- `src/middleware/aiRateLimit.js` – supplementary: one request per task title, per user, per minute (`429` with a `Retry-After` header).
- `OPENAI_API_KEY` and `OPENAI_MODEL` live in `.env`, which is git-ignored. The key never appears in frontend code or in any response.

## Client (`client/`)

- The task form has a **Suggest description (AI)** button with a loading state (supplementary).
- The suggestion fills the normal, editable description field, with the note "AI-generated suggestion. Review and edit it before saving." (supplementary disclaimer). Nothing is saved until the user presses Add task.
- If the server reports a fallback, a short message appears and the form keeps working.

## Responsible use

Task titles are sent to a third-party service, so users should not put personal data, passwords or confidential information in them. Suggestions can be wrong; the user always reviews them before saving.

## Verification status

No working API key was available while preparing this. The failure path was tested live against the real OpenAI API with an invalid key (OpenAI answered 401, the app showed the fallback and kept working). The success screenshot (`output/13.5`) uses a **simulated** response injected in the browser to show how a suggestion is displayed. Put a real key in `server/.env` and take a fresh screenshot for the submission.

## Run

```bash
cd server && npm install && cp .env.example .env   # set MONGO_URI, JWT_SECRET, OPENAI_API_KEY
npm start
npm test                                            # 12 tests, including the AI fallback and rate limit
cd ../client && npm install && npm run dev
```
