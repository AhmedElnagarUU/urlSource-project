## Project Architecture & Data Flow

### 1. High-Level Overview
- **Stack**: Next.js 16 (App Router), TypeScript, Prisma 7 with the PostgreSQL adapter, Tailwind CSS 4, and Google’s Gemini SDK (`@google/genai`) for AI-assisted scraping.
- **Persistence**: PostgreSQL (via `DATABASE_URL` / `DIRECT_URL`).
- **AI Processing**: `src/aiAgent/giminai.ts` orchestrates Gemini calls using `GOOGLE_API_KEY`.
- **Primary Modules**:
  - `src/app/api/...`: Server routes for CRUD, refreshing news, and URL scraping helpers.
  - `src/modules/news` & `src/modules/sources`: React components and types.
  - `src/modules/scraping`: Shared scraping utilities.

### 2. End-to-End Data Flow
```mermaid
flowchart TD
    A[User adds source via UI] --> B(/api/sources POST)
    B -->|Prisma| C[(Postgres: newsSource)]
    D[User clicks Refresh] --> E(/api/news/refresh POST)
    E -->|Query all sources| C
    E --> F{processInBatches}
    F --> G[scrapeNewsFromUrl]
    G -->|raw HTML| H[giminai (Gemini)]
    H -->|normalized articles| I[buildNewsBySource]
    I --> J[API response payload]
    J --> K[News modules render grid/cards]
```

### 3. Key Server Routes & Operations
| Route | File | Purpose | Important Calls |
| --- | --- | --- | --- |
| `POST /api/sources` | `src/app/api/sources/route.ts` | Create a news source (`url`, optional `name`). | `prisma.newsSource.create` |
| `GET /api/sources` | same file | List all sources (ordered by `createdAt`). | `prisma.newsSource.findMany` |
| `DELETE /api/sources/[id]` | `src/app/api/sources/[id]/route.ts` | Remove a source by `id`. Uses Next.js 16 promise-based params. | `await params` → `prisma.newsSource.delete` |
| `POST /api/news/refresh` | `src/app/api/news/refresh/route.ts` | Scrape every saved source, bundle results, report failures. | `prisma.newsSource.findMany`, `processInBatches`, `scrapeNewsFromUrl`, `buildNewsBySource` |
| `POST /api/url` | `src/app/api/url/route.ts` | Scrape a single URL from user input (useful for testing). | `scrapeNewsFromUrl`, `giminai` |

### 4. `POST /api/news/refresh` Sequence
1. **Fetch Sources**: Prisma pulls all `newsSource` rows ordered by `createdAt`.
2. **Short-Circuit**: If no sources, returns a friendly message.
3. **Batch Control**: Determines concurrency via `NEWS_REFRESH_CONCURRENCY` (defaults to 3). Helper `processInBatches` slices the array and executes batches sequentially, keeping per-batch work parallel via `Promise.all`.
4. **Per-Source Handler**:
   - Calls `scrapeNewsFromUrl(source.url)` which orchestrates fetching HTML, parsing via Cheerio, and optionally calling AI.
   - On success, `buildNewsBySource` wraps metadata `{ id, url, name }` with the article list.
   - On failure, logs the error, pushes an entry to `failedSources`, and returns an empty article list so the UI still displays the source.
5. **Response**: `{ success, newsBySource[], meta: { totalSources, failedSources[], concurrencyLimit } }`.

### 5. Scraping & AI Helper Details
#### `scrapeNewsFromUrl` (`src/modules/scraping/utils/scrapeUrl.ts`)
- Fetches the raw HTML using Axios.
- Parses obvious article structures (cards, lists). If extraction confidence is low, forwards the HTML to `giminai`.
- Normalizes article shapes to the shared `NewsArticle` type (`title`, `image`, `link`, `description`).

#### `giminai` (`src/aiAgent/giminai.ts`)
1. Initializes `GoogleGenAI` once with `process.env.GOOGLE_API_KEY`.
2. Builds a detailed prompt that:
   - Constrains output to a JSON array.
   - Provides the site’s base URL for absolute link resolution.
   - Includes up to 50k characters of HTML.
3. Calls `ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt })`.
4. Uses `response.text` to read the combined candidate text, then `sanitizeToJsonArray` to ensure valid JSON before `JSON.parse`.
5. Runs `resolveUrl` to convert relative URLs to absolute paths and trims result to 12 articles max.

### 6. Frontend Consumption
- `src/modules/news/components/*` consume the API payloads.
  - `NewsHeader` shows metadata (refresh state, failures).
  - `NewsGrid` iterates `newsBySource`.
  - `NewsCard` renders each article with title, description, and normalized link/image.
  - `RefreshButton` calls `POST /api/news/refresh`.
- `src/modules/sources/components` manage source CRUD:
  - `AddSourceForm` posts to `/api/sources`.
  - `SourceList` pulls `/api/sources` and invokes DELETE endpoints.

### 7. Environment & Configuration
- `.env` expectations:
  - `DATABASE_URL` – required at build & runtime. Must include schema query param if using Prisma adapter (`?schema=public`).
  - `DIRECT_URL` – optional but recommended for migrations / shadow DB.
  - `GOOGLE_API_KEY` – required for Gemini.
  - `NEWS_REFRESH_CONCURRENCY` – optional integer override (>=1).
- `src/lib/prisma.ts` uses `@prisma/adapter-pg` with a shared PG pool and caches the client on `globalThis` outside production to avoid hot-reload leaks.

### 8. Error Handling & Telemetry
- Every API route wraps logic in `try/catch` and returns structured JSON with `success` + `error/message`.
- Scraping errors are logged with the URL to make debugging easier and reported back in the `failedSources` array.
- Gemini failures fall back to returning `[]` so the UI can still render a source card with a warning state.

### 9. Testing / Simulation Notes
- `npm run build` exercises TypeScript and Next.js’s production pipeline. Requires valid env vars (or placeholders) for Prisma.
- `npm run dev` / `next dev` still needs `DATABASE_URL` to instantiate Prisma during route execution.
- Use `npm run lint` to enforce ESLint + Next.js rules once major changes are made.

### 10. Quick Reference
- **Primary Types**:
  - `NewsArticle` – `src/modules/scraping/types.ts`
  - `NewsBySource` – `src/modules/news/types.ts`
  - `FailedSource` – defined in `refresh/route.ts`
- **Reusable Helpers**:
  - `processInBatches` – simple slice-based batching without external deps.
  - `resolveUrl` – converts relative `href` / `src` strings to absolute values.
  - `sanitizeToJsonArray` – strips Markdown fences and isolates the first JSON array in Gemini responses.

Use this document as the starting point for onboarding or debugging; it links every major operation to its implementation and clarifies how data moves from user actions to rendered news cards.
