# Practical 12 – CI/CD Pipeline with GitHub Actions

![CI Pipeline](https://github.com/Parva-28/AWDF-24CS013/actions/workflows/ci.yml/badge.svg)

The badge shows the status of the latest run (supplementary). The workflow is at **`.github/workflows/ci.yml` in the repository root**. GitHub only reads workflows from there, so it points at `practical-12/` with `working-directory`.

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

## Failing, then fixed (on GitHub)

1. Commit "deliberately break a test" changed the expected status of `GET /tasks` from 200 to 201. Run #2 failed (`expected: 201, actual: 200`, 6 passed / 1 failed, exit code 1).
2. Commit "fix the test" restored 200. Run #3 passed.

Screenshots of both runs and the failure log are in `output/` (`12.5`–`12.8`). The same experiment run locally is in `12.2` and `12.3`.

## Run locally

```bash
cd server && npm install
npm run lint
npm test          # needs MongoDB at MONGO_URI_TEST or mongodb://127.0.0.1:27017
```
