# Belt Avatar Figma Spec

## File Setup

Figma file name:
- ShellSensei - Belt Avatar and Rank Ceremony

Pages:
1. Foundations
2. Components
3. Dashboard Composition
4. Ceremony Prototype
5. Handoff

## Foundations

Color styles:
- Belt white, yellow, orange, green, blue, purple, brown, red, black
- Dan glow cyan, violet, magenta, rose, gold
- Tatami dark wood palette
- Overlay vignette and celebration accents

Type styles:
- Heading: Inter 700
- Body: Inter 400/500
- Kanji display: Noto Serif JP 700
- Command labels: JetBrains Mono 500

Spacing:
- 4, 8, 12, 16, 24, 32, 40, 48

Effects:
- Glass panel blur
- Belt glow shadow
- Confetti motion blur
- Ceremony vignette overlay

## Components

## 1. Belt Avatar Card

Component:
- card/belt-avatar

Variants:
- state: default, interacting, ceremony, max-rank
- rank: white, yellow, orange, green, blue, purple, brown, red, black, shodan, nidan, sandan, yondan, shihan

Slots:
- 3D canvas frame
- Current rank label
- Ki progress bar
- Next rank text
- Action buttons

## 2. Rank Information Overlay

Component:
- overlay/rank-detail

Variants:
- visible: true/false

Content:
- Kanji
- Rank name
- Belt condition metric

## 3. Achievement Orbit Chips

Component:
- chip/achievement-orbit

Variants:
- type: combo, streak, ki, dojo
- state: default, highlighted

## 4. Rank-Up Ceremony Overlay

Component:
- overlay/rank-ceremony

Variants:
- phase: intro, kanji, transition, burst, completion

Elements:
- Screen dim layer
- Vignette radial
- Kanji center text
- Earned rank message
- Confetti layers

## Dashboard Composition

Desktop:
- Two-column layout
- Left: rank data and controls
- Right: 3D belt viewport with orbit chips

Tablet:
- Stacked layout with 3D viewport first

Mobile:
- Full-width 3D viewport
- Controls below in two-row stack

## Ceremony Prototype Flow

1. Tap Trigger Rank-Up Ceremony
2. Fade in dim overlay
3. Kanji scales in
4. Belt color transitions to next rank
5. Particle burst and shake
6. Message reveal
7. Confetti cascade
8. Return to dashboard with updated rank

Animation timings:
- Overlay fade: 300ms
- Kanji scale: 900ms
- Belt transition: 2900ms
- Confetti run: 1800-3600ms
- Completion hold: 900ms

## Handoff Mapping

React component:
- src/components/platform/belt-avatar-widget.tsx

Rank config:
- src/lib/constants/belt-ranks.ts

Dashboard integration:
- src/app/(platform)/dashboard/page.tsx

QA checklist:
- Mouse drag rotates belt
- Touch rotate and pinch zoom work
- Idle auto-rotate resumes after inactivity
- Clicking belt toggles rank detail overlay
- Ceremony updates belt rank and kanji
- Confetti and glow match target rank color
- Layout remains usable at mobile widths
