# Practical 12 – CI/CD Pipeline with GitHub Actions

![CI Pipeline](https://github.com/<your-username>/AWDF-24CS013/actions/workflows/ci.yml/badge.svg)

Replace `<your-username>` above after pushing; the badge then shows the status of the latest run (supplementary).

The workflow is at **`.github/workflows/ci.yml` in the repository root**. GitHub only reads workflows from there, so it points at `practical-12/` with `working-directory`.

```
git push origin main
  -> job lint            npm ci, npm run lint (API), npm run lint + build (React)
  -> job build-and-test  (needs: lint) MongoDB service container, npm install, npm test
  -> green check or red X on GitHub
```

## Tests (`server/test/api.test.js`)

Run with `npm test` (Node's built-in test runner plus `supertest`):

- `GET /health` returns 200
- `GET /tasks` without a token returns 401
- register, then log in, returns a JWT
- `GET /tasks` with the token returns 200 and an array
- `POST /tasks` without a title returns 400
- `POST /tasks` creates a task that `GET /tasks` then lists
- an unknown route returns a JSON 404

Why not Jest: Jest was installed first, but inside Jest's sandbox the MongoDB 7 driver's handshake fails ("Missing required sub-document 'driver' in the client metadata document"). The same code connects normally under plain Node, so the tests use `node:test`, which the handout allows as "a similar Node.js testing library".

## Failing, then fixed

Local evidence is in `output/`. The expected status was changed from 200 to 201 on purpose, and the test failed (`actual: 200, expected: 201`, exit code 1). Restoring it made all 7 tests pass. To see the red X and green check on GitHub, push one commit with the broken assertion and then one with the fix, and screenshot both runs from the Actions tab.

## Run locally

```bash
cd server && npm install
npm run lint
npm test          # needs MongoDB at MONGO_URI_TEST or mongodb://127.0.0.1:27017
```
