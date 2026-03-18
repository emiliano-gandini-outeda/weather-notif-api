# Weather Notif API

Fastify API that consumes Open‑Meteo and exposes daily or weekly weather snapshots for Montevideo.

## Quick start

```bash
npm install
npm run dev
```

The server listens on `http://localhost:3000`.

## Available scripts

- `npm run dev` – start Fastify with live reload via `tsx`
- `npm run build` – transpile TypeScript to `dist`
- `npm start` – run the compiled server from `dist`

## REST endpoints

| Method | Path             | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| GET    | `/weather-day`   | Returns today’s min/max temps and rain   |
| GET    | `/weather-week`  | Returns arrays for the next week metrics |

All responses are derived from the pre-fetched Open‑Meteo dataset defined in `src/services/openmeteo.ts`.

## Project layout

- `src/app.ts` – Fastify app configuration and plugin registration
- `src/weather/router.ts` – routes exposing the weather snapshots
- `src/services/openmeteo.ts` – Open‑Meteo client and data shaping

Feel free to extend the router with additional endpoints or plug in schedulers/notifications.
