# Project Rules - ShellSensei

Project: ShellSensei (Shell Command Learning Platform)

Description: An interactive platform where users learn CLI commands (Linux, Bash, Git, Docker, curl, brew, kubectl, cloud CLIs) through structured lessons, real terminal practice, and AI-powered features.

## 1. Project Overview

### Project Name
ShellSensei - Interactive Shell Command Learning Platform

### Mission
Build a modern, gamified, interactive platform where developers can learn, practice, and master CLI commands across all major tools and environments, from Linux basics to cloud CLIs.

### Target Users
- Complete beginners who never opened a terminal
- Junior developers leveling up
- DevOps and SysAdmin learners
- Developers switching from Windows to Linux or macOS
- Interview prep candidates

### Core Value Propositions
- Interactive browser-based terminal sandbox
- AI-powered command explainer
- Gamified progression (XP, streaks, badges)
- Structured learning paths
- Coverage across major CLIs, not only Linux

## 2. Tech Stack (Mandatory)

### Frontend
- Framework: Next.js 14+ (App Router only, no Pages Router)
- Language: TypeScript (strict mode, no any types)
- Styling: Tailwind CSS v4
- UI components: shadcn/ui (add components via CLI)
- Icons: Lucide React (primary), React Icons (fallback)
- Terminal emulator: xterm.js + xterm-addon-fit
- Code highlighting: Shiki
- Markdown rendering: MDX with next-mdx-remote
- Animations: Framer Motion (subtle and purposeful)
- Charts: Recharts (progress visualization)
- State: Zustand (global) + React hooks (local)
- Forms: React Hook Form + Zod validation
- Toasts and notifications: Sonner

### Backend
- Runtime: Node.js (via Next.js API routes)
- API: Next.js Route Handlers in app/api + Server Actions
- Database: PostgreSQL (Neon or Supabase)
- ORM: Drizzle ORM (not Prisma)
- Cache: Redis (Upstash)
- Auth: NextAuth.js v5 (Auth.js) with GitHub + Google + Email
- File storage: Cloudflare R2 or AWS S3
- WebSocket: Socket.io (terminal sessions)
- Background jobs: Inngest or BullMQ
- Rate limiting: Upstash Ratelimit

### AI Layer
- Primary model API: OpenAI GPT-4o
- Fallback model API: Anthropic Claude
- Embeddings: OpenAI text-embedding-3-small
- Vector DB: pgvector (PostgreSQL extension)
- AI SDK: Vercel AI SDK (@ai-sdk/openai)

### Infrastructure
- Hosting: Vercel (frontend and API)
- Database host: Neon (serverless Postgres)
- Terminal sandbox: Docker containers on Fly.io or Railway
- CDN: Cloudflare
- Monitoring: Sentry (errors) + PostHog (analytics)
- CI/CD: GitHub Actions
- Payments: Stripe (when monetization is added)

### Development Tools
- Package manager: pnpm (not npm or yarn)
- Linter: ESLint (with Next.js config)
- Formatter: Prettier (via ESLint plugin)
- Git hooks: Husky + lint-staged
- Testing: Vitest (unit) + Playwright (e2e)
- Type checking: tsc --noEmit in CI

## 3. Project Structure

The following directory layout must be followed exactly.

```text
shellsensei/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   ├── images/
│   │   ├── badges/
│   │   ├── categories/
│   │   └── og/
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (platform)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── explore/
│   │   │   │   └── page.tsx
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── command/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── learn/
│   │   │   │   └── [pathSlug]/
│   │   │   │       └── page.tsx
│   │   │   ├── challenges/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── playground/
│   │   │   │   └── page.tsx
│   │   │   ├── ai-explain/
│   │   │   │   └── page.tsx
│   │   │   ├── cheatsheets/
│   │   │   │   └── page.tsx
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── [username]/
│   │   │   │       └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── commands/
│   │   │   │   └── route.ts
│   │   │   ├── challenges/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── validate/
│   │   │   │           └── route.ts
│   │   │   ├── ai/
│   │   │   │   ├── explain/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── chat/
│   │   │   │   │   └── route.ts
│   │   │   │   └── translate/
│   │   │   │       └── route.ts
│   │   │   ├── progress/
│   │   │   │   └── route.ts
│   │   │   ├── terminal/
│   │   │   │   └── route.ts
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (auto-generated by shadcn CLI)
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── breadcrumbs.tsx
│   │   ├── command/
│   │   │   ├── command-card.tsx
│   │   │   ├── command-detail.tsx
│   │   │   ├── command-syntax.tsx
│   │   │   ├── command-flags-table.tsx
│   │   │   ├── command-examples.tsx
│   │   │   └── command-search.tsx
│   │   ├── terminal/
│   │   │   ├── terminal-emulator.tsx
│   │   │   ├── terminal-toolbar.tsx
│   │   │   └── terminal-output.tsx
│   │   ├── challenge/
│   │   │   ├── challenge-card.tsx
│   │   │   ├── challenge-workspace.tsx
│   │   │   ├── challenge-instructions.tsx
│   │   │   ├── challenge-hints.tsx
│   │   │   └── challenge-result.tsx
│   │   ├── learning-path/
│   │   │   ├── path-card.tsx
│   │   │   ├── path-progress.tsx
│   │   │   └── path-lesson.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-overview.tsx
│   │   │   ├── streak-counter.tsx
│   │   │   ├── activity-heatmap.tsx
│   │   │   ├── skill-radar.tsx
│   │   │   └── continue-learning.tsx
│   │   ├── ai/
│   │   │   ├── command-explainer.tsx
│   │   │   ├── ai-chat.tsx
│   │   │   └── command-translator.tsx
│   │   ├── gamification/
│   │   │   ├── xp-bar.tsx
│   │   │   ├── badge-card.tsx
│   │   │   ├── level-indicator.tsx
│   │   │   └── leaderboard-table.tsx
│   │   └── shared/
│   │       ├── code-block.tsx
│   │       ├── mdx-components.tsx
│   │       ├── search-dialog.tsx
│   │       ├── loading-skeleton.tsx
│   │       ├── empty-state.tsx
│   │       └── error-boundary.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── users.ts
│   │   │   │   ├── commands.ts
│   │   │   │   ├── categories.ts
│   │   │   │   ├── lessons.ts
│   │   │   │   ├── challenges.ts
│   │   │   │   ├── learning-paths.ts
│   │   │   │   ├── progress.ts
│   │   │   │   ├── badges.ts
│   │   │   │   └── index.ts
│   │   │   ├── migrations/
│   │   │   └── seed/
│   │   │       ├── index.ts
│   │   │       ├── commands.seed.ts
│   │   │       └── categories.seed.ts
│   │   ├── auth/
│   │   │   ├── config.ts
│   │   │   └── helpers.ts
│   │   ├── ai/
│   │   │   ├── openai.ts
│   │   │   ├── prompts.ts
│   │   │   └── embeddings.ts
│   │   ├── terminal/
│   │   │   ├── sandbox.ts
│   │   │   └── validator.ts
│   │   ├── stripe/
│   │   │   └── config.ts
│   │   ├── redis.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validations/
│   │       ├── auth.ts
│   │       ├── command.ts
│   │       └── challenge.ts
│   ├── hooks/
│   │   ├── use-terminal.ts
│   │   ├── use-progress.ts
│   │   ├── use-search.ts
│   │   ├── use-streak.ts
│   │   ├── use-debounce.ts
│   │   └── use-media-query.ts
│   ├── stores/
│   │   ├── terminal-store.ts
│   │   ├── ui-store.ts
│   │   └── progress-store.ts
│   ├── types/
│   │   ├── command.ts
│   │   ├── challenge.ts
│   │   ├── user.ts
│   │   ├── progress.ts
│   │   └── index.ts
│   ├── config/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   └── categories.ts
│   └── content/
│       ├── commands/
│       │   ├── linux/
│       │   │   ├── grep.mdx
│       │   │   ├── find.mdx
│       │   │   └── ...
│       │   ├── git/
│       │   ├── docker/
│       │   └── ...
│       └── learning-paths/
│           ├── linux-beginner.mdx
│           └── ...
├── drizzle.config.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

## 4. Coding Standards and Conventions

### General Rules
- ALWAYS use TypeScript. Never use plain JavaScript.
- NEVER use any type. Use unknown plus type guards if needed.
- ALWAYS add proper return types to functions.
- Use const by default. Use let only when reassignment is needed. NEVER use var.
- Prefer interface over type for object shapes. Use type for unions, intersections, and utility types.
- Use named exports. Avoid default exports (exception: Next.js pages).
- Keep files under 200 lines. If longer, split into smaller modules.
- Maximum function length: 50 lines. Extract helpers if longer.
- No commented-out code in commits.
- All strings use single quotes. JSX attributes use double quotes.
- Use template literals for string interpolation, never concatenation.
- Use optional chaining and nullish coalescing over manual checks.
- Prefer early returns over deep nesting.

### Naming Conventions
- Files and folders: kebab-case (for example: command-card.tsx, use-terminal.ts)
- React components: PascalCase (for example: CommandCard, TerminalEmulator)
- Functions and variables: camelCase (for example: getUserProgress, isLoading)
- Constants: UPPER_SNAKE_CASE (for example: MAX_RETRY_COUNT, API_BASE_URL)
- Types and interfaces: PascalCase with descriptive names (for example: CommandWithFlags, UserProgress)
- Database tables: snake_case (for example: user_progress, command_flags)
- API routes: kebab-case (for example: /api/ai/explain, /api/commands)
- CSS classes: use Tailwind. No custom CSS unless absolutely necessary.
- Boolean variables: prefix with is, has, should, can (for example: isLoading, hasAccess)
- Event handlers: prefix with handle (for example: handleSubmit, handleClick)
- Callback props: prefix with on (for example: onSuccess, onChange)

### React and Next.js Rules
- Use Server Components by default. Only add use client when needed.
- Prefer Server Actions for mutations over API routes.
- Use loading.tsx and error.tsx for each route segment.
- Use Suspense boundaries with meaningful fallbacks.
- Keep components small and focused with single responsibility.
- Co-locate component-specific types in the same file.
- Use React.FC sparingly. Prefer explicit prop typing.
- Memoize expensive computations with useMemo.
- Memoize callbacks passed to children with useCallback.
- NEVER use useEffect for data fetching. Use Server Components or React Query.
- Use next/image for all images. Never use raw img.
- Use next/link for all internal navigation. Never use raw a for internal links.
- Use next/font for font loading.
- Metadata: use generateMetadata for dynamic pages.

### Component Pattern

```tsx
// CORRECT component pattern
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CommandCardProps {
	command: Command
	isBookmarked?: boolean
	onBookmark: (id: string) => void
	className?: string
}

export function CommandCard({
	command,
	isBookmarked = false,
	onBookmark,
	className,
}: CommandCardProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleBookmarkClick = (): void => {
		onBookmark(command.id)
	}

	return (
		<div className={cn('rounded-lg border p-4', className)}>
			<Button onClick={handleBookmarkClick} variant="outline">
				{isBookmarked ? 'Bookmarked' : 'Bookmark'}
			</Button>
		</div>
	)
}
```

### Server Action Pattern

```ts
// CORRECT Server Action pattern
'use server'

import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db'
import { userProgress } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
	commandId: z.string().uuid(),
	status: z.enum(['learning', 'practiced', 'mastered']),
})

export async function updateCommandProgress(formData: FormData) {
	const session = await auth()
	if (!session?.user?.id) {
		throw new Error('Unauthorized')
	}

	const parsed = schema.parse({
		commandId: formData.get('commandId'),
		status: formData.get('status'),
	})

	await db
		.insert(userProgress)
		.values({
			userId: session.user.id,
			commandId: parsed.commandId,
			status: parsed.status,
		})
		.onConflictDoUpdate({
			target: [userProgress.userId, userProgress.commandId],
			set: { status: parsed.status },
		})

	revalidatePath('/dashboard')
}
```

### Drizzle Schema Pattern

```ts
// CORRECT Drizzle schema pattern
import { pgTable, uuid, varchar, text, timestamp, integer, boolean, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced'])
export const dangerLevelEnum = pgEnum('danger_level', ['safe', 'caution', 'dangerous'])

export const commands = pgTable('commands', {
	id: uuid('id').primaryKey().defaultRandom(),
	categoryId: uuid('category_id').notNull().references(() => categories.id),
	name: varchar('name', { length: 100 }).notNull().unique(),
	slug: varchar('slug', { length: 100 }).notNull().unique(),
	shortDescription: varchar('short_description', { length: 255 }).notNull(),
	fullDescription: text('full_description'),
	syntaxTemplate: varchar('syntax_template', { length: 500 }),
	difficulty: difficultyEnum('difficulty').notNull().default('beginner'),
	dangerLevel: dangerLevelEnum('danger_level').notNull().default('safe'),
	isPublished: boolean('is_published').notNull().default(true),
	sortOrder: integer('sort_order').notNull().default(0),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const commandsRelations = relations(commands, ({ one, many }) => ({
	category: one(categories, {
		fields: [commands.categoryId],
		references: [categories.id],
	}),
	flags: many(commandFlags),
	examples: many(commandExamples),
}))
```

### API Route Pattern

```ts
// CORRECT API route pattern
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { commands } from '@/lib/db/schema'
import { auth } from '@/lib/auth/config'

const querySchema = z.object({
	category: z.string().optional(),
	difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
	limit: z.coerce.number().min(1).max(100).default(20),
	offset: z.coerce.number().min(0).default(0),
})

export async function GET(request: NextRequest) {
	try {
		const session = await auth()
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { searchParams } = new URL(request.url)
		const params = querySchema.parse(Object.fromEntries(searchParams))

		const results = await db
			.select()
			.from(commands)
			.limit(params.limit)
			.offset(params.offset)

		return NextResponse.json({ data: results })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: 'Invalid parameters', details: error.errors },
				{ status: 400 }
			)
		}
		console.error('[COMMANDS_GET]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
```

## 5. Styling Rules

### Theme
- Primary theme: dark mode, terminal-inspired
- Support dark/light/system toggle
- Color palette background: near-black (#0a0a0a)
- Color palette primary accent: emerald green (#10b981)
- Color palette secondary accent: blue (#3b82f6)
- Color palette danger: red (#ef4444)
- Color palette warning: amber (#f59e0b)
- Color palette text: Tailwind zinc grayscale

### Font
- UI: Inter (next/font/google)
- Code and terminal: JetBrains Mono (next/font/google)

### Tailwind Rules
- Use Tailwind utility classes only
- No custom CSS files
- Use cn() helper for conditional classes
- Use CSS variables for theme colors (shadcn pattern)
- Responsive: mobile-first with sm, md, lg breakpoints
- Spacing: use Tailwind spacing scale
- Border radius: rounded-lg by default, rounded-xl for cards
- Shadows: use sparingly (shadow-sm, shadow-md)
- Transitions: transition-colors or transition-all with duration-200
- Never use inline styles
- Never use !important
- Group classes in this order: layout, sizing, spacing, typography, colors, effects

### Component Styling
- All interactive elements must have visible focus states
- All buttons must have hover and active states
- Loading states should use skeleton loaders, except inline actions
- Empty states must include a helpful message and an action
- Error states must include a user-friendly message and retry option
- Page transitions should be subtle fade transitions

## 6. UI and UX Rules

### Design Principles
- Terminal-inspired aesthetic with modern polish
- Clean and uncluttered layouts
- Put highest-priority information first
- Use progressive disclosure for beginners
- Keep spacing and alignment consistent
- Every page must be fully responsive

### Accessibility
- All images must have alt text
- All interactive elements must be keyboard accessible
- Use semantic HTML: nav, main, section, article, aside
- Minimum color contrast WCAG AA (4.5:1)
- Form inputs require labels (visible or sr-only)
- Icon-only buttons require aria-label
- Focus must be visible and follow logical tab order
- Dynamic content should announce changes for screen readers

### Navigation
- Sidebar navigation for authenticated pages
- Top breadcrumbs on inner pages
- Mobile navigation via bottom bar or hamburger menu
- Command palette with Cmd+K for quick search/navigation
- Active state must be shown for current navigation item

### Terminal UI
- Terminal must feel authentic with dark background and monospace font
- Show blinking cursor
- Prompt should show username and current directory
- Syntax highlighting for terminal output when appropriate
- Copy button on all code blocks and terminal outputs
- Terminal should be resizable

## 7. Data and Content Rules

### Command Content Standards
Every command must include:
- Name and slug
- One-line description (20 words or fewer)
- Category assignment
- Difficulty level
- Danger level indicator
- Syntax template
- Plain-English explanation
- At least 5 common flags with descriptions
- At least 5 practical examples with output
- At least 3 common mistakes or gotchas
- Related commands list
- Tags for searchability

### Example Quality Rules
- No placeholder foo/bar/baz examples
- Use realistic filenames, paths, and data
- Show expected output where applicable
- Include at least one piped or combined command example
- Mark destructive commands with warning labels
- Include short and long flags when relevant

### Content Categories (Supported)
- Linux/Unix Core Commands
- Bash Scripting
- Networking Commands
- curl (Deep Dive)
- Homebrew (macOS/Linux)
- Git CLI
- Docker CLI
- Kubernetes (kubectl)
- Node/NPM/Yarn CLI
- Python CLI Tools
- Cloud CLIs (AWS, GCloud, Azure)
- Power Tools (tmux, vim, jq, cron, make)
- Security Commands
- Meta Skills (piping, redirection, env vars, aliases)

## 8. AI Integration Rules

### AI Command Explainer
- Use Vercel AI SDK for streaming responses
- System prompt requirement: break down each part of the command
- System prompt requirement: explain each flag in plain English
- System prompt requirement: rate danger level from 1 to 5
- System prompt requirement: suggest safer alternatives when applicable
- System prompt requirement: format output consistently in Markdown
- Rate limit: free plan 3/day, pro unlimited
- Cache identical command explanations in Redis with 24-hour TTL
- Never execute user-pasted commands

### AI Chat Assistant
- Must be context-aware for current page or command
- Answer how-do-I questions with command plus explanation
- Warn about destructive operations
- Support follow-up conversation history
- Max conversation length: 20 messages per session

### AI Content Generation
- Use structured prompts for command content generation
- Validate AI-generated commands before publishing
- Require human review before publication
- AI can generate quiz questions and challenge scenarios

## 9. Security Rules

### Authentication and Authorization
- All non-public API routes must validate auth session
- Use middleware matcher patterns for route protection
- Never expose user IDs in URLs; use usernames for profiles
- Session cookies must be HTTP-only, Secure, SameSite=Lax
- State-changing operations require CSRF protection

### Terminal Sandbox Security (Critical)
- Never execute user commands on the host system
- Each session must run in an isolated Docker container
- Container constraint: no network access or heavily restricted networking
- Container constraint: read-only root filesystem; writable home directory only
- Container constraint: CPU limit of 0.5 cores
- Container constraint: memory limit of 256MB
- Container constraint: storage limit of 100MB
- Container constraint: auto-destroy after 30 minutes of inactivity
- Container constraint: maximum lifetime of 2 hours
- Block dangerous commands and abuse patterns
- No sudo or root access in sandbox
- Log all commands for abuse detection

### Input Validation
- Validate all user inputs on client and server
- Use Zod schemas for all API inputs
- Sanitize user content before rendering (XSS prevention)
- Use Drizzle parameterized queries to prevent SQL injection
- For file uploads validate type, max size 5MB, and malware scan

### Environment Variables
- Never commit .env files
- Keep secrets in environment variables only
- Required variables:

```text
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENAI_API_KEY=
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SENTRY_DSN=
```

## 10. Performance Rules

### Core Web Vitals Targets
- LCP under 2.5s
- FID under 100ms
- CLS under 0.1
- Lighthouse score target: 90+

### Optimization Rules
- Use Server Components for data-fetching pages
- Lazy load below-the-fold UI with dynamic()
- Use next/image with width, height, sizes
- Paginate or infinite scroll lists (20 items/page)
- Cache DB queries with unstable_cache or Redis
- Use React.memo for expensive list items
- Monitor bundle size with @next/bundle-analyzer
- Avoid libraries over 50KB unless justified
- Prefetch links where useful
- Use Suspense streaming for slow data

### Database Performance
- Add indexes for frequently queried columns
- Prefer selecting specific columns over select all
- Paginate all list queries
- Use connection pooling
- Avoid N+1 queries with joins or batching

## 11. Error Handling Rules

### Server-Side
- Wrap API handlers in try-catch
- Log errors with route context, for example: console.error('[ROUTE_NAME]', error)
- Return status code 200 for success
- Return status code 201 for created resources
- Return status code 400 for bad requests and validation errors
- Return status code 401 for unauthorized requests
- Return status code 403 for forbidden requests
- Return status code 404 for not found
- Return status code 429 for rate-limited requests
- Return status code 500 for internal server errors
- Never expose stack traces to clients
- Use Sentry in production

### Client-Side
- Every page should include an error.tsx boundary
- Show user-friendly error messages
- Provide retry actions for failed operations
- Use optimistic UI with rollback on failure
- Show inline form validation errors
- Show clear network failure messaging
- Use toasts for async success and failure feedback

## 12. Testing Rules

### Unit Tests (Vitest)
- Test all utility functions in lib/
- Test all Zod schemas
- Test challenge validation logic
- Test XP and leveling calculations
- Minimum coverage target: 70% for lib/

### Integration Tests
- Test API routes with mocked database
- Test auth flows: login/register/protected routes
- Test Server Actions

### E2E Tests (Playwright)
- Test critical flow: sign up to first lesson to first challenge
- Test critical flow: search command to view details
- Test critical flow: AI explainer command paste to breakdown response
- Test critical flow: complete challenge to earn XP to level up
- Test Chrome, Firefox, Safari
- Test mobile viewport

### Testing Commands

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm test:e2e
```

## 13. Git and Version Control Rules

### Branch Strategy
- main: production, protected, deploy on merge
- develop: integration branch
- feature/xxx: feature development
- fix/xxx: bug fixes
- chore/xxx: maintenance or config updates

### Commit Messages (Conventional Commits)

```text
feat: add command search with fuzzy matching
fix: resolve terminal resize on mobile
docs: update API documentation
style: format command-card component
refactor: extract validation logic into shared utils
test: add unit tests for XP calculation
chore: update dependencies
perf: optimize command list query with index
```

### PR Rules
- Every PR must include a description
- CI checks must pass (lint, type-check, tests)
- Use squash merge into develop
- Delete branch after merge

## 14. Gamification Rules

### XP System
- Lesson completion: 10-30 XP based on difficulty
- Challenge completion: 15-50 XP based on difficulty
- First attempt bonus: +10 XP
- Speed bonus: +5 XP under time limit
- Daily login: +5 XP
- Streak bonus: +2 XP/day capped at +20

### Level Thresholds

```text
Level 1:  Script Kiddie      - 0 XP
Level 2:  Terminal Newbie    - 100 XP
Level 3:  Command Liner      - 300 XP
Level 4:  Shell User         - 600 XP
Level 5:  Bash Enthusiast    - 1000 XP
Level 6:  Power User         - 1500 XP
Level 7:  CLI Ninja          - 2500 XP
Level 8:  Shell Wizard       - 4000 XP
Level 9:  Terminal Sage      - 6000 XP
Level 10: Root Master        - 10000 XP
```

### Streak Rules
- One qualifying activity per day maintains streak
- Qualifying activity includes lesson/challenge/command practice
- Streak resets at midnight UTC
- One streak freeze per week
- Milestones at 7, 30, 60, 100, 365 days

## 15. Deployment and DevOps Rules

### Environments
- Local: http://localhost:3000
- Preview: auto-deployed on PR (Vercel)
- Production: https://shellsensei.com (Vercel)

### Deploy Process
- Push to feature branch, open PR, review
- Merge to develop triggers preview deploy
- Merge develop to main triggers production deploy
- Database migrations run via CI

### Environment Variable Management
- Local values in .env.local (never committed)
- Preview and production values in Vercel dashboard
- Use @t3-oss/env-nextjs for type-safe env access

### Monitoring
- Sentry for errors and performance
- PostHog for analytics and feature flags
- BetterStack or equivalent for uptime
- Neon dashboard for database metrics
- Vercel logs with structured logging

## 16. Content Generation Prompts (for AI Assistance)

Use this prompt to generate command content:

```text
Generate a complete command lesson for {COMMAND} in the
{CATEGORY} category. Follow the JSON structure below exactly.
All examples must use realistic filenames and data. Include
expected output. Mark dangerous operations. Provide at least
5 flags, 5 examples, and 3 common mistakes.

[Insert JSON template from project docs]
```

Use this prompt to generate challenges:

```text
Create 5 progressive challenges for the {COMMAND} command.
Each challenge must include: title, scenario, initial filesystem
state (JSON), instructions, solution, validation rules, and
3 progressive hints. Challenges should go from basic usage to
combining with pipes and other commands.
```

Use this prompt to build features:

```text
Build the {FEATURE_NAME} feature following the project rules:
- Next.js 14 App Router with TypeScript
- Server Components by default
- shadcn/ui for UI components
- Drizzle ORM for database
- Tailwind CSS for styling
- Follow the file structure in RULES.md
- Include error handling and loading states
- Add proper TypeScript types
- Validate inputs with Zod
```

## 17. Do's and Don'ts Summary

### DO
- Use Server Components by default
- Use TypeScript strict mode everywhere
- Validate all inputs with Zod on client and server
- Handle loading, error, and empty states on every page
- Use shadcn/ui components when available
- Write meaningful commit messages
- Add proper SEO metadata to pages
- Use cn() for conditional Tailwind classes
- Implement robust error boundaries
- Cache expensive queries
- Ensure fully responsive mobile-first layouts
- Use semantic HTML
- Follow the required file structure
- Use Drizzle ORM for database operations
- Prefer Server Actions for mutations

### DONT
- Do not use any type
- Do not use the Pages Router
- Do not use CSS modules or styled-components
- Do not use Prisma
- Do not use npm or yarn
- Do not use default exports except page.tsx
- Do not use useEffect for data fetching
- Do not write inline styles
- Do not skip error handling
- Do not commit .env files
- Do not write raw SQL when Drizzle covers the query
- Do not hardcode strings when constants should be used
- Do not skip form validation
- Do not ignore TypeScript errors
- Do not use !important in styles
- Do not install unnecessary dependencies
- Do not build custom UI if shadcn already provides it
- Do not expose internal error messages to users
- Do not skip loading and skeleton states

---

End of Rules.
