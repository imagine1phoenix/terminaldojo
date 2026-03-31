# Architecture Overview

## System Diagram (Conceptual)

```text
┌───────────────┐    ┌──────────────────┐    ┌────────────────────┐
│   Next.js     │◄──►│    REST/tRPC     │◄──►│     PostgreSQL     │
│   Frontend    │    │    API Layer     │    │    (Drizzle ORM)   │
│ (React +      │    │ (Next.js Routes) │    └────────────────────┘
│ Tailwind +    │    └────────┬─────────┘    ┌────────────────────┐
│ shadcn/ui)    │             │              │       Redis        │
└──────┬────────┘             │              │   Sessions/Cache   │
       │                      │              └────────────────────┘
       │                ┌─────▼──────┐       ┌────────────────────┐
┌──────▼────────┐       │            │◄─────►│   Docker Sandbox   │
│   xterm.js    │◄─────►│  Terminal  │       │  per-user runtime  │
│ browser term  │       │  Backend   │       └────────────────────┘
└───────────────┘       │ (WebSocket)│
                        └─────┬──────┘
                              │
                      ┌───────▼────────┐    ┌────────────────────┐
                      │   AI Service    │◄──►│  OpenAI / Claude   │
                      │ Command tooling │    │       APIs         │
                      └────────────────┘    └────────────────────┘
```

## Platform Services
- Auth: NextAuth.js or Clerk
- Payments: Stripe (premium plans)
- Analytics: PostHog or Plausible
- Hosting: Vercel + Railway/Fly.io (containers)
- CDN: Cloudflare
- Monitoring: Sentry

## Frontend
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Terminal: xterm.js (browser terminal emulator)
- State: Zustand or Jotai
- Code highlighting: Prism.js or Shiki
- Animations: Framer Motion
- Content: Markdown/MDX for lessons
- Charts: Recharts (progress visualization)

## Backend
- Runtime: Node.js
- API: Next.js API Routes or tRPC
- Database: PostgreSQL (Neon or Supabase)
- ORM: Drizzle ORM or Prisma
- Cache: Redis (Upstash)
- WebSockets: Socket.io (terminal sessions)
- Auth: NextAuth.js v5 or Clerk
- File storage: S3 or Cloudflare R2
- Queue: BullMQ (sandbox jobs)

## Terminal Sandbox (Critical Component)
- Option A: Docker containers (per session)
- Option B: WebContainers (StackBlitz technology)
- Option C: Firecracker microVMs (most secure)
- Option D: Wasmer/WASI (WebAssembly, lightweight)

## AI Layer
- OpenAI API for command explanation and assistance
- Claude API as alternative or fallback
- Embeddings for semantic command search
- Vector database: Pinecone or pgvector

## Data Model
See [database-schema.md](database-schema.md) for the full database schema.

## App Routes
See [pages-and-routes.md](pages-and-routes.md) for the full pages and routes map.

## Project Rules
See [terminaldojo.md](terminaldojo.md) for mandatory stack constraints and required directory structure.
