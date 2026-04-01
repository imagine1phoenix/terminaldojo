# ShellSensei UI/UX System Specification

## 1. Product Experience Vision

ShellSensei is a command-line dojo that fuses cyberpunk velocity with disciplined martial arts training.

This means:
- The interface feels calm, precise, and elite, not loud or gimmicky.
- Progress feels earned through mastery loops, not arbitrary points.
- Every interaction reinforces training metaphors: stance, kata, strike, discipline, rank.
- Function and readability always win over decoration.

Design statement:
"A dark, high-precision training cockpit where every command practiced feels like one clean strike toward black belt mastery."

## 2. Experience Pillars

### 2.1 Authenticity Over Stereotypes
- Avoid mascot samurai, cartoon kanji spam, and theatrical orientalism.
- Use understated cues: paper grain overlays, brushed-metal gradients, calligraphic accents only in headings and rank moments.
- Japanese references are conceptual: discipline, lineage, belt progression, clan schools.

### 2.2 Subtlety Over Heavy-Handedness
- Default surfaces are low-contrast dark glass.
- Neon appears as edge light and active state feedback, not full-surface fills.
- Animation prioritizes intention and clarity over spectacle.

### 2.3 Functionality Over Aesthetic
- Terminal legibility and keyboard flow are primary.
- Interactive controls meet accessibility contrast and focus standards.
- Every visual effect has a UX purpose: affordance, hierarchy, or feedback.

### 2.4 Dopamine Through Mastery
- Micro-rewards for correct command composition, challenge milestones, and streak continuity.
- Tight feedback loop under 250ms for confidence signals.
- Rank progression is visible everywhere but never intrusive.

## 3. Brand and Visual Language

### 3.1 Ink and Ember Palette

Use the following tokenized palette as the canonical color system.

Base neutrals:
- ink-950: #06070A
- ink-900: #0B0D12
- ink-800: #11141C
- ink-700: #181C28
- fog-300: #8E96AA
- fog-100: #D5DBE8

Neon action accents:
- ember-500: #FF6A3D
- ember-400: #FF845F
- cyan-500: #15D1FF
- cyan-400: #54E0FF
- indigo-500: #4C5CFF
- indigo-400: #7380FF

Rank and prestige:
- gold-500: #E5B94E
- gold-400: #F2CC73
- jade-500: #3CCB8B
- crimson-500: #EA445A

Semantic mappings:
- info: cyan-500
- success: jade-500
- warning: gold-500
- danger: crimson-500
- focus-ring: cyan-400 (2px, 70% opacity)

### 3.2 Typography

Primary stack:
- UI: Inter (weights 400, 500, 600, 700)
- Code: JetBrains Mono (weights 400, 500, 600)
- Accent Serif: Noto Serif JP (weights 500, 700)

Usage rules:
- Inter for all product UI and body copy.
- JetBrains Mono for command tokens, terminal prompts, and shortcut labels.
- Noto Serif JP only for:
  - Belt rank headers
  - Clan school names
  - Milestone ceremonies

Type scale:
- display-xl: 56/60, tracking -0.03em
- display-lg: 44/50, tracking -0.02em
- h1: 36/42
- h2: 28/34
- h3: 22/28
- body-lg: 18/28
- body: 16/24
- body-sm: 14/20
- mono-sm: 13/18

### 3.3 Surface Language

Surface hierarchy:
- S0 backdrop: deep matte ink with subtle radial haze.
- S1 panels: glass layer with blur 12-20px and 1px cool border.
- S2 active cards: edge glow + elevated shadow.
- S3 ceremonial overlays: rank promotion modals with particle veil.

Texture and depth:
- Grain overlay 2-3% opacity.
- Gradient vignette from top-left to bottom-right for directional focus.
- Neon edge strokes only on active/hover/focus states.

## 4. Information Architecture and Taxonomy

### 4.1 Existing Route Mapping

Platform routes map directly to training zones:
- /app/dashboard: Dojo Floor (daily training overview)
- /app/explore: Curriculum Hall (all schools and commands)
- /app/challenges: Sparring Board (drills and timed fights)
- /app/challenge/[id]: Live Sparring Arena
- /app/playground: Free Kata Sandbox (real Linux terminal)
- /app/command/[slug]: Technique Scroll
- /app/ai-explain: Sensei Breakdown Chamber
- /app/leaderboard: Tournament Wall
- /app/settings: Personal Dojo Setup

### 4.2 Japanese Clan School Taxonomy for 14 Categories

Each command category becomes a clan school with iconography and tone.

1. Kage Navigation School: filesystem movement and awareness
2. Kaji Filecraft School: creation, copy, move, deletion
3. Mizu Observation School: cat, head, tail, less and inspection
4. Tetsu Permissions School: chmod, chown, authority control
5. Inari Hunt School: find, grep, locate, discovery
6. Tsuru Textflow School: sed, awk, cut, sort pipelines
7. Raikou Process School: ps, top, kill, jobs, process combat
8. Hoshi Network School: ping, curl, ssh, traffic diagnostics
9. Ryu Version School: git workflow and history discipline
10. Oni Container School: docker build/run/orchestration basics
11. Kumo Cluster School: kubectl and distributed operations
12. Tora Script School: bash scripting and automation
13. Kintsugi Cloud School: AWS, GCP, Azure command interfaces
14. Ronin Power School: tmux, jq, cron, make and productivity tools

Each school has:
- A crest symbol
- Primary accent color
- Core competency meter
- Novice, Adept, Master challenge tracks

## 5. Design Tokens and Tailwind v4 System

### 5.1 Token Governance

Rules:
- No raw hex in components.
- All spacing from token scale.
- Animation durations from motion tokens.
- Terminal colors mapped through terminal token layer only.

### 5.2 Recommended Token Extension

Add or align tokens in global CSS:

```css
:root {
  --ink-950: #06070a;
  --ink-900: #0b0d12;
  --ink-800: #11141c;
  --fog-100: #d5dbe8;
  --fog-300: #8e96aa;

  --ember-500: #ff6a3d;
  --cyan-500: #15d1ff;
  --indigo-500: #4c5cff;
  --gold-500: #e5b94e;

  --surface-glass: rgba(17, 20, 28, 0.72);
  --surface-glass-strong: rgba(17, 20, 28, 0.86);
  --border-subtle: rgba(213, 219, 232, 0.12);
  --border-active: rgba(84, 224, 255, 0.5);

  --shadow-elev-1: 0 8px 28px rgba(0, 0, 0, 0.35);
  --shadow-elev-2: 0 18px 48px rgba(0, 0, 0, 0.45);
  --shadow-neon-cyan: 0 0 28px rgba(21, 209, 255, 0.28);
  --shadow-neon-ember: 0 0 24px rgba(255, 106, 61, 0.24);

  --motion-fast: 140ms;
  --motion-base: 220ms;
  --motion-slow: 420ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snap: cubic-bezier(0.2, 0.9, 0.2, 1.1);
}
```

### 5.3 Utility Primitives

Create reusable utility classes:
- .dojo-panel: base glass panel
- .dojo-panel-active: hovered or selected panel
- .dojo-neon-cyan: cyan edge glow state
- .dojo-neon-ember: ember glow state
- .dojo-focus: standardized keyboard focus treatment
- .dojo-kana-accent: serif treatment for Japanese accent labels

## 6. React Component Architecture

### 6.1 System Layers

Layer 1: Foundation
- Theme and token provider
- Motion config provider
- Audio and haptic simulation provider for strike feedback

Layer 2: Core primitives
- Button, Input, Tabs, Dialog, Tooltip, Badge, Progress
- GlassCard, NeonBorder, RankPill, StreakChip

Layer 3: Domain components
- CommandCard, SchoolCard, BeltProgressRing, StrikeComboMeter
- AIExplainPanel, ChallengeConsole, TerminalMissionPanel

Layer 4: Page compositions
- DashboardScene, ExploreScene, CommandTechniqueScene, etc.

### 6.2 Suggested Folder Additions

Use existing structure and extend:

```text
src/components/
  dojo/
    foundation/
      dojo-provider.tsx
      motion-provider.tsx
      strike-feedback-provider.tsx
    primitives/
      dojo-panel.tsx
      rank-pill.tsx
      school-chip.tsx
      progress-kata.tsx
    domain/
      school-card.tsx
      command-technique-card.tsx
      challenge-strike-meter.tsx
      ai-breakdown-pane.tsx
  scenes/
    dashboard-scene.tsx
    explore-scene.tsx
    command-scene.tsx
    challenge-scene.tsx
    leaderboard-scene.tsx
  three/
    dojo-canvas.tsx
    belt-rank-totem.tsx
    ember-particles.tsx
    clan-crest.tsx
```

## 7. Animation and Motion System

### 7.1 Motion Philosophy

- Fast response for low-latency confidence: 80-140ms feedback.
- Smooth context transitions: 180-260ms.
- Ceremony and milestone moments: 350-900ms.

### 7.2 Standard Motion Tokens

- tap: scale 0.98, 90ms
- hover-card: y -2, shadow brighten, 180ms
- page-enter: opacity 0->1 and y 10->0, 260ms
- panel-reveal-stagger: 40ms per child
- rank-promotion-burst: 700ms with particle burst and belt glow

### 7.3 Framer Motion Base Variants

```tsx
export const dojoMotion = {
  page: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    },
  },
  panel: {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    },
  },
  strike: {
    hit: {
      scale: [1, 1.03, 1],
      transition: { duration: 0.18, times: [0, 0.4, 1] },
    },
  },
}
```

## 8. Micro-Interaction Patterns: Strike Feedback Engine

### 8.1 Interaction Grammar

Every meaningful action maps to dojo metaphors:
- Correct command submitted: clean strike
- Perfect challenge completion: combo finisher
- Mistyped dangerous command: caution stance
- Streak maintained: heartbeat pulse
- Belt promotion: ceremony bloom

### 8.2 Feedback Stack (Per Event)

1. Visual response within 120ms
2. Motion pulse and edge glow
3. Optional subtle audio tick (user configurable)
4. XP increment chip rising animation
5. Progress bar reconciliation

### 8.3 Pattern Examples

- Strike Chip:
  - A small floating token +12 XP appears near terminal cursor, then travels to XP meter.
- Combo Meter:
  - Consecutive correct commands within 45 seconds raise combo tier.
  - Tier affects glow color from cyan to ember-gold.
- Guard Warning:
  - Unsafe command suggestion triggers amber outline and confirmation modal.

## 9. 3D Scene Implementations (Three.js / React Three Fiber)

Use 3D as ambient reinforcement, not core navigation.

Targets:
- Dashboard hero belt totem
- Rank promotion modal
- Leaderboard ceremonial top 3 podium scene

Performance budgets:
- Desktop: under 2.5ms GPU frame for ambient scene
- Mobile: fallback to static gradient if device memory is constrained

### 9.1 Belt Rank Totem Component

```tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function BeltCore({ rank = 4 }: { rank?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.05
  })

  const hue = [0.08, 0.1, 0.12, 0.55, 0.62, 0.66, 0.72][Math.min(rank, 6)]

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.22, 240, 24]} />
        <MeshTransmissionMaterial
          chromaticAberration={0.05}
          roughness={0.2}
          thickness={0.6}
          ior={1.18}
          color={new THREE.Color().setHSL(hue, 0.8, 0.55)}
        />
      </mesh>
    </Float>
  )
}

export function BeltRankTotem({ rank }: { rank: number }) {
  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 45 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={1.2} color="#54E0FF" />
        <pointLight position={[-2, -1, 1]} intensity={0.8} color="#FF6A3D" />
        <BeltCore rank={rank} />
      </Canvas>
    </div>
  )
}
```

### 9.2 Ember Particle Curtain

```tsx
import { Points, PointMaterial } from '@react-three/drei'
import { inSphere } from 'maath/random'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function EmberParticles() {
  const ref = useRef<any>(null)
  const positions = useMemo(() => inSphere(new Float32Array(1800), { radius: 1.8 }), [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#FF845F" size={0.012} sizeAttenuation depthWrite={false} />
    </Points>
  )
}
```

## 10. Page-Level Layout Specifications

### 10.1 Landing Page

Goal: immediate immersion and conversion.

Sections:
- Hero: animated terminal with mission statement and one primary CTA.
- Credibility strip: categories count, commands count, completion testimonials.
- School taxonomy grid: 14 clans displayed as badges with subtle hover glow.
- How training works: Learn, Practice, Spar, Rank Up.
- Final conversion panel with social proof.

### 10.2 Dashboard

Goal: establish daily momentum in under 10 seconds.

Top row:
- Rank summary and belt progress
- Streak status
- Daily objective

Core modules:
- Continue Training card
- Daily Sparring card
- School mastery bars
- Recent strike history timeline
- Weekly XP heatmap

### 10.3 Explore

Goal: discovery with clear competence pathways.

Layout:
- Sticky search and filters
- School cards grouped by progression stage
- Command cards with mastery indicator and estimated practice time

### 10.4 Command Detail

Goal: convert understanding into repeatable execution.

Columns:
- Left: overview, syntax anatomy, flags, pitfalls.
- Right: live terminal drill with guided tasks.

Bottom:
- Related techniques
- Mini quiz
- Mark as mastered CTA

### 10.5 Challenge Detail

Goal: tension and reward.

Layout:
- Challenge briefing card
- Main terminal arena
- Collapsible hint deck
- Strike meter and timer bar
- Submission result with replay path

### 10.6 Playground

Goal: free experimentation with safe rails.

Layout:
- Full-width terminal focus
- Left rail for environment presets
- Right rail for command history, AI hints, and snippets

### 10.7 AI Explain

Goal: frictionless command literacy.

Layout:
- Input composer with examples
- Output sections: intent, breakdown, flags, safety, alternatives
- Danger meter and confidence chip

### 10.8 Leaderboard

Goal: social motivation without discouragement.

Layout:
- Top 3 podium module (3D optional)
- Segmented rankings: global, friends, school-specific
- Personal delta indicator (up/down since last week)

### 10.9 Settings

Goal: personal control over training environment.

Sections:
- Profile and identity
- Notification and streak controls
- Terminal preferences
- Accessibility toggles
- Audio and animation intensity

## 11. Terminal UX Specification

Terminal is the product core and must feel elite.

Rules:
- Prompt remains visually stable.
- Output uses semantic colors for info/success/warn/error.
- AI hint banners never obstruct terminal input.
- Keep keyboard-first workflow complete (history, tab completion when available, shortcuts).

Command execution feedback:
- Running state indicator in header.
- Command result chip with correctness and XP.
- Optional inline explanation affordance after output.

Safety UX:
- Dangerous command pattern detector.
- Confirmation gate for destructive operations.
- Educational rationale, not fear messaging.

## 12. Responsive Design Strategy

Breakpoints:
- xs: 360-479
- sm: 480-767
- md: 768-1023
- lg: 1024-1439
- xl: 1440+

### 12.1 Mobile Principles

- Keep terminal at least 58vh in challenge and playground views.
- Convert side panels to bottom sheets.
- Preserve fast thumb reach for submit and hint actions.
- Collapse dense analytics into swipeable cards.

### 12.2 Tablet Principles

- Two-column hybrid for command detail pages.
- Persistent progress strip.
- Larger touch targets for terminal controls.

### 12.3 Desktop Principles

- Multi-pane productivity layout.
- Rich hover states and keyboard shortcuts.
- Optional ambient 3D canvas.

## 13. Accessibility and Inclusive Design

Non-negotiables:
- WCAG 2.2 AA minimum contrast across all text and controls.
- Full keyboard operability for every action.
- Visible focus rings on all interactive elements.
- Reduced motion mode for all animations.
- Screen reader labels for command output summaries and progress events.

Recommendations:
- Add live region for challenge validation messages.
- Provide color-independent rank indicators (text and icon).
- Offer dyslexia-friendly mode with increased spacing and lower animation intensity.
- Preserve user-selected preferences across devices.

## 14. Instrumentation and Dopamine Loop Metrics

Track these product signals:
- Time to first successful command in session
- Commands attempted vs commands mastered
- Hint usage rate
- Daily streak retention
- Challenge completion under target time
- AI explain conversion to terminal attempt

Use events to tune interactions:
- strike_success
- strike_miss
- combo_level_up
- belt_promotion
- challenge_retry
- hint_consumed

## 15. Developer Handoff Documentation

### 15.1 Build Order

Phase 1: Foundation
- Finalize tokens, typography, panel primitives, focus and motion standards.

Phase 2: Core Journeys
- Dashboard, Explore, Command Detail, Challenge Detail, Playground.

Phase 3: Progression Layer
- Belt system visuals, leaderboard enhancements, reward ceremonies.

Phase 4: 3D and polish
- Belt totem and particle scenes with progressive enhancement.

### 15.2 Definition of Done for UI

- Component has variant states documented.
- Keyboard navigation tested.
- Screen reader labels validated.
- Mobile and desktop snapshots approved.
- Performance budgets met.
- Telemetry events wired for critical actions.

### 15.3 QA Checklist

- Visual regressions checked across dark surfaces.
- Terminal interactions tested with keyboard only.
- Motion reduced mode tested.
- Rank progression updates reflected in all relevant views.
- Challenge feedback appears in under 250ms.

## 16. Example Implementation Snippets

### 16.1 Dojo Panel Primitive

```tsx
import { cn } from '@/lib/utils'

interface DojoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

export function DojoPanel({ active, className, ...props }: DojoPanelProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border backdrop-blur-xl',
        'bg-[var(--surface-glass)] border-[var(--border-subtle)] shadow-[var(--shadow-elev-1)]',
        active && 'border-[var(--border-active)] shadow-[var(--shadow-neon-cyan)]',
        className,
      )}
      {...props}
    />
  )
}
```

### 16.2 Strike Feedback Hook

```tsx
import { useCallback, useState } from 'react'

type StrikeType = 'success' | 'warning' | 'danger'

export function useStrikeFeedback() {
  const [pulse, setPulse] = useState<StrikeType | null>(null)

  const trigger = useCallback((type: StrikeType) => {
    setPulse(type)
    window.setTimeout(() => setPulse(null), 180)
  }, [])

  return { pulse, trigger }
}
```

## 17. Final UX Quality Bar

ShellSensei is successful when users report:
- "I always know what to do next."
- "Practicing one more command feels irresistible."
- "I trust the product while doing real terminal work."
- "The dojo atmosphere motivates me without distracting me."

This specification is intentionally implementation-ready for the existing Next.js and Tailwind architecture, and can be used as the source of truth for UI engineering, product design, and QA.