# TerminalDojo

An interactive, gamified platform to learn shell and CLI skills through real practice.

## Mission
Help learners go from beginner to advanced CLI fluency using structured lessons, sandboxed terminal challenges, and AI-powered guidance.

## Target Users
- Complete beginners
- Junior developers
- DevOps and SysAdmin learners
- Developers switching to Linux/macOS workflows
- Interview prep candidates

## Project Status
Planning and specification phase.

Core planning docs are in the `terminaldojo` folder.

## Documentation Index
- Project overview: [terminaldojo/project-overview.md](terminaldojo/project-overview.md)
- Learning engine: [terminaldojo/learning-engine.md](terminaldojo/learning-engine.md)
- Architecture overview: [terminaldojo/architecture-overview.md](terminaldojo/architecture-overview.md)
- Database schema: [terminaldojo/database-schema.md](terminaldojo/database-schema.md)
- Pages and routes: [terminaldojo/pages-and-routes.md](terminaldojo/pages-and-routes.md)
- Project rules and conventions: [terminaldojo/terminaldojo.md](terminaldojo/terminaldojo.md)

## Planned Stack
- Frontend: Next.js App Router, TypeScript, Tailwind, shadcn/ui
- Backend: Next.js Route Handlers and Server Actions, Drizzle ORM, PostgreSQL
- Sandbox: Isolated container-based terminal execution
- AI: Command explainer, assistant, quiz generation, command translation
- Platform services: Auth, analytics, monitoring, and optional billing

## Immediate Next Steps
1. Scaffold the Next.js application structure from the rules document.
2. Define Drizzle schemas and initial migrations from the database schema doc.
3. Build MVP pages: landing, dashboard, explore, command detail, challenge workspace.
4. Implement authentication, progress tracking, and basic gamification.
5. Add sandbox execution pipeline for interactive command practice.
