# WitnessAI Backend

Check it out: https://witnessai.onrender.com/api

## Architecture & Implementation

This section documents the architectural decisions and implementation details of the backend API.

### Setup

```bash
npm install
# Create .env.local with API_BASE_URL and CORS_ORIGIN (see Environment Variables below)
npm run start:dev            # API at http://localhost:3000, Swagger at http://localhost:3000/api
```

### Tech Stack

- **Framework**: NestJS 11 (Node.js)
- **Language**: TypeScript 5.7
- **API Documentation**: OpenAPI/Swagger via `@nestjs/swagger`
- **Validation**: `class-validator` + `class-transformer`
- **HTTP Client**: `@nestjs/axios` (Axios) for upstream API calls
- **Configuration**: `@nestjs/config` with `.env.local`

### High-Level Architecture

The backend acts as a **BFF (Backend-for-Frontend) / API proxy**. The external Witness AI API blocks browser requests (via `Sec-Fetch-Site`, `Origin`, `Referer` checks). This backend:

1. Receives requests from the frontend (same-origin or allowed CORS origin)
2. Proxies them to `https://frontend-takehome.fly.dev/api`
3. Forwards query params, path params, and response data transparently

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────────┐
│   Frontend  │ ───► │  NestJS Backend  │ ───► │   Witness AI API    │
│ (e.g. 5173) │      │ (localhost:3000) │      │     (fly.dev)       │
└─────────────┘      └──────────────────┘      └─────────────────────┘
```

### Module Structure

Domain-driven modules mirror the API resources:

| Module        | Path                 | Responsibility                  |
| ------------- | -------------------- | ------------------------------- |
| Conversations | `src/conversations/` | List/get conversations          |
| Prompts       | `src/prompts/`       | List/get prompts, LLM responses |
| Users         | `src/users/`         | List/get users                  |
| Policies      | `src/policies/`      | List/get policies               |

Each module contains:

- **Controller** – HTTP routes, request/response handling
- **Module** – Imports `HttpModule`, registers controller
- **Entities** – Response shape (Swagger + validation)
- **DTOs** – Query params, filters, paginated response wrappers

Shared code lives in `src/dto/` and `src/entities/`.

### Key Architectural Decisions

#### 1. Thin Proxy Layer

Controllers are thin: they validate input, call the upstream API, and return the response. No business logic, caching, or transformation. This keeps the backend simple and ensures the frontend receives the same data shape as the upstream API.

#### 2. Entity + DTO Pattern

- **Entities** (`*Entity`): Define response shapes with `@ApiProperty` for Swagger and `class-validator` decorators for runtime validation when needed.
- **BaseEntity**: Shared fields (`id`, `created`, `updated`, `conversation_id`, `policy_id`, `risk_score`, `action`) for prompts and LLM responses.
- **Paginated DTOs** (`Paginated*ResponseDTO`): Wrap list endpoints as `{ [resource]: T[], total, page, limit, offset }` (e.g. `conversations`, `policies`) for accurate Swagger documentation.

#### 3. Shared Pagination DTO

`BasicRequestParamsDTO` in `src/dto/default-request-params.dto.ts` provides `page` and `limit` (with min/max) for all list endpoints. Resource-specific DTOs extend or compose with it via `BasicRequestParamsDTO & GetXDTO`.

#### 4. Filter DTOs

Filter params use a nested `filter` object (e.g. `filter[user_id]`, `filter[conversation_id]`) to match the upstream API. Each resource has a `*FilterDTO` + `Get*DTO` for optional filters.

#### 5. CORS & Configuration

- CORS origin is read from `ConfigService` (not `process.env`) so it's available after the app boots.
- Defaults to `http://localhost:5173` when `CORS_ORIGIN` is unset.
- Config loaded from `.env.local` via `ConfigModule.forRoot({ envFilePath: '.env.local' })`.

#### 6. Path Aliases

Imports use `src/` prefix (e.g. `from 'src/dto/default-request-params.dto'`). Jest `moduleNameMapper` resolves these for tests: `^src/(.*)$` → `<rootDir>/$1`.

### API Design

- **Global prefix**: `/api` (e.g. `/api/conversations`, `/api/prompts`)
- **Swagger UI**: `/api` (served by NestJS)
- **UUID validation**: `ParseUUIDPipe` on `:id` params
- **Validation**: Global `ValidationPipe` for DTOs

### Error Handling

Upstream errors are caught in controllers via `catchError` on the Axios observable. Errors are logged and rethrown as generic messages. No retries or circuit breakers; suitable for a thin proxy.

### Testing

- **Unit tests**: Jest + `@nestjs/testing`, `rootDir: "src"`
- **E2E**: `test/app.e2e-spec.ts` with `jest-e2e.json`
- Controllers are tested with mocked `HttpService`

### Environment Variables

| Variable       | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `API_BASE_URL` | Upstream API (e.g. `https://frontend-takehome.fly.dev/api`) |
| `CORS_ORIGIN`  | Allowed frontend origin (e.g. `http://localhost:5173`)      |
| `PORT`         | Server port (default: 3000)                                 |

---

## Submission Guidelines

1. **Share your repository** - GitHub/GitLab link with source code - OR a zip file of all files
2. **Include a README** - Setup instructions and any notes
3. **Deploy (optional but impressive)** - Vercel, Netlify, etc.
4. **Document your approach** - Brief explanation of your decisions
5. **Important**: If you do use AI let us know what tools you used

### What We'll Evaluate

- **Functionality** - Does it work? Does it solve the problem?
- **Code Quality** - Clean, readable, well-organized code
- **UX/UI Design** - Intuitive interface, good visual hierarchy
- **Data Handling** - Proper use of pagination, filtering, and relationships
- **Performance** - Efficient data fetching and rendering
- **Bonus Points** - Creative features, thoughtful error handling, accessibility

---

## Questions?

If you have any questions about the API or assignment, feel free to reach out! You can email me at mateo@witness.ai.

Good luck! 🚀
