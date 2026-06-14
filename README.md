# Ymmo App (Corgimmobilier)

Frontend for **Corgimmobilier**, a real estate management platform. Built with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS**.

## Features

- **Authentication** — login, registration, forgot/reset password, JWT-based session with automatic token refresh
- **Role-based access** — dedicated dashboards and routes for `Admin`, `Agent` and `Client`
- **Property catalogue** — searchable/filterable property listings with an interactive map (Leaflet) and detail pages
- **Agencies** — list and detail pages with agency info and attached agents
- **Dashboards** — KPIs and charts (Recharts) tailored per role (global admin, agency admin, agent, client)
- **Visits & Transactions** — view scheduled visits and ongoing sales transactions
- **Favorites** — clients can save properties for later
- **Real-time messaging** — chat between users via SignalR, with unread badges and toast notifications

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router (lazy-loaded routes, role-based `PrivateRoute`) |
| Data fetching | TanStack React Query |
| State management | Zustand |
| Forms & validation | React Hook Form + Zod |
| HTTP client | Axios (with JWT interceptors and auto-refresh) |
| Maps | Leaflet / React Leaflet |
| Charts | Recharts |
| Real-time | SignalR (`@microsoft/signalr`) |
| Notifications | react-hot-toast |

## Project Structure

```
src/
  assets/      Static assets
  components/  Reusable UI components (Layout, PrivateRoute, forms, dashboard widgets, ...)
  hooks/       React Query hooks (useAgencies, useProperties, useSignalR, ...)
  lib/         Axios client and shared utilities
  pages/       Route-level pages (auth, dashboard, properties, agencies, messages, ...)
  schemas/     Zod validation schemas
  services/    API service layers (one per resource)
  stores/      Zustand stores (auth, UI)
  types/       Shared TypeScript types
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- The [Ymmo API](../corgimmobilier-API) backend running (locally or via Docker)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the API URL in `.env.local`:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Docker

The app is also built and served as part of the full stack via [`corgimmobilier-API/docker-compose.yml`](../corgimmobilier-API/docker-compose.yml):

```bash
cd ../corgimmobilier-API
docker compose --env-file .env.docker up -d --build
```

The frontend will be available at http://localhost:3000.

## Contributors

Project made by Elisabeth ROBL and Alexandre RIVIERE