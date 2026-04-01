# ShellSensei Ryuha Figma Component Library

## 1. File Structure

Figma file name:
- ShellSensei - Ryuha Schools - UI Kit

Pages:
1. Foundations
2. Components
3. Patterns
4. Screens
5. Prototypes
6. Handoff

## 2. Foundations Page

Frames and sections:
- Color Tokens
- Type Tokens
- Elevation and Glow
- Spacing and Grid
- Motion Specs

### 2.1 Color Tokens

Create color styles:
- ink/950 #06070A
- ink/900 #0B0D12
- ink/800 #11141C
- fog/300 #8E96AA
- fog/100 #D5DBE8
- ember/500 #FF6A3D
- cyan/500 #15D1FF
- indigo/500 #4C5CFF
- gold/500 #E5B94E

School palette tokens:
- school/docker/primary
- school/docker/secondary
- school/docker/glow
- school/git/primary
- school/git/secondary
- school/git/glow
- Repeat for aws, gcloud, azure, terraform, kubernetes, bash, curl, homebrew, node, python, cloud

### 2.2 Typography Tokens

Text styles:
- display/hero: Inter 700 56/60
- heading/h1: Inter 700 36/42
- heading/h2: Inter 700 28/34
- body/default: Inter 400 16/24
- body/small: Inter 400 14/20
- mono/command: JetBrains Mono 500 13/18
- accent/kanji: Noto Serif JP 700 40/44

### 2.3 Spacing and Layout Grid

Spacing scale:
- 4, 8, 12, 16, 20, 24, 32, 40, 48

Grid styles:
- Desktop grid: 12 columns, 24 gutter, 120 margin
- Tablet grid: 8 columns, 20 gutter, 48 margin
- Mobile grid: 4 columns, 16 gutter, 20 margin

## 3. Components Page

## 3.1 Ryuha School Card (Main)

Component name:
- card/ryuha-school

Base dimensions:
- Desktop: 372 x 500
- Tablet: 320 x 470
- Mobile: 100% width x auto, min height 430

Variants:
- state: default, hover, pressed, focus
- density: comfortable, compact
- glow: off, low, high
- scene: docker, git, aws, gcloud, azure, terraform, kubernetes, bash, curl, homebrew, node, python, cloud

Subcomponents:
- badge/kanji
- label/english-school-name
- text/philosophy
- chip/tool
- cta/enter-path
- slot/3d-scene-preview

Hover behavior:
- Y offset: -8
- Scale: 1.01
- Border brightens to school secondary
- Shadow expands with school glow

## 3.2 Filter Chip

Component name:
- chip/filter

Variants:
- state: default, active, hover

## 3.3 Search Input

Component name:
- input/search

Variants:
- state: default, focus, filled

## 4. Patterns Page

Patterns:
- pattern/ryuha-grid-desktop
- pattern/ryuha-grid-tablet
- pattern/ryuha-grid-mobile
- pattern/empty-state
- pattern/sticky-search-filter

Responsive rules:
- Desktop: 3-column masonry-aligned card grid
- Tablet: 2 columns
- Mobile: single column with edge-to-edge visual cards

## 5. Screens Page

Create full screens:
1. Explore - Default
2. Explore - Hover showcase
3. Explore - Filtered by Cloud
4. Explore - Search result
5. Explore - Mobile

## 6. Prototypes Page

Prototype interactions:
- Hover school card -> glow + lift + scene speed x1.8 visual note
- Click school card -> navigate to learning path route
- Filter toggle -> animate grid reflow
- Search input -> instant results

Transition specs:
- Standard: 220ms ease out
- Card hover: smart animate 180ms
- Page enter: fade + rise 260ms

## 7. Handoff Page

Handoff panel should include:
- Component API mapping to React props
- Token mapping to CSS variables
- Animation mapping to Framer Motion variants
- 3D scene mapping to scene keys in app

Engineering mapping:
- scene key: docker | git | aws | gcloud | azure | terraform | kubernetes | bash | curl | homebrew | node | python | cloud
- route target: /app/command/[slug] or /app/explore?school=[id]

Accessibility checklist:
- Contrast AA for text and CTA
- Focus ring visible at 2px
- Keyboard tab order verified
- Reduced motion fallback state documented

## 8. School Lore Reference (For Content Team)

- Docker (容器派): Like water, adapt to any shape.
- Git (分枝派): Divide, then reunite.
- AWS (雲派): Power beyond boundaries.
- GCloud (星図派): Map the sky before you command it.
- Azure (蒼穹派): Calm skies, precise control.
- Terraform (礎派): Declare intent, then let structure emerge.
- Kubernetes (統制派): From order comes power.
- Bash (脚本派): From words come actions.
- curl (網派): All things are connected.
- Homebrew (職人派): The tool is extension of master.
- Node/npm (結合派): Many become one, one becomes many.
- Python (蛇派): Flexibility in constraint.
- Cloud CLIs (天路派): Move between worlds with one command language.

This file is the Figma build blueprint so design and engineering stay synchronized.
