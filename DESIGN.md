# Design System: RERE-CORDS (Retro-Humanist Edition)

## 1. Overview

**Creative North Star: "The Gallery Archive"**

"The Gallery Archive" frames the RERE-CORDS exhibition as a premium, quiet, and minimalist art event. It avoids all developer terminal window styling, code blocks, or CLI prompt mockups. Instead, it utilizes clean grids, large classic serif typography, generous white space, and letterpress-inspired borders.

The page uses a rich, earthy color palette: deep dark charcoal/obsidian background, warm paper-white lettering, and muted sage/terracotta highlights. The cover image (`素材/主视觉.png`) is utilized exclusively as a dramatic visual background for the Hero/opening section, smoothly dissolving into the solid obsidian color as the user scrolls.

**Key Characteristics:**
- **Hero Visual Dissolve**: A full-bleed visual header with a smooth bottom gradient fade transitioning the main visual cover into the solid page color.
- **Asymmetric Typographic Layout**: Clean minimalist cards with large Roman numerals (I, II, III) showing principles, and letterpress debossed statistic boxes.
- **Sponsor & Partner Logos**: Elegant logos displayed in the header, Hero section, and footer with grayscale-to-color hover transitions.
- **Header Scroll Behavior**: The navigation bar automatically slides out of view on scroll down and slides back in on scroll up to maximize visual focus on content.

---

## 2. Colors

Earthy, premium, and organic dark palette to invoke texture and humanism.

### Primary Accent
- **Sustainable Sage** (`#7a8c6c`): Muted green used for checkmarks, badges, dates, and progress.

### Secondary Accent
- **Terracotta Orange** (`#d97757`): Warm orange/clay tone used for main call-to-action buttons, key titles, and numeric labels.

### Neutral Colors
- **Obsidian Dark** (`#141413`): Solid background base.
- **Charcoal Surface** (`#1c1c1b`): Container/card backgrounds.
- **Warm Ivory** (`#f5f4f0`): Primary text color.
- **Muted Stone** (`#94928b`): Descriptive secondary subtext.
- **Warm Charcoal Border** (`#2e2d2a`): Muted separator lines and borders.

---

## 3. Typography

Pairing classic editorial serif display fonts with clean humanist sans-serif body copy for CJK and Western text.

### Font Families
- **Display Headings**: `Playfair Display`, `Cinzel`, `Noto Serif SC`, `Noto Serif JP`, serif
- **Body Prose**: `Alegreya Sans`, `Noto Sans SC`, `Noto Sans JP`, sans-serif
- **Monospace details**: `JetBrains Mono`, monospace

### Scale
- **Hero Title**: `clamp(3.5rem, 8vw, 5.5rem)` (font-weight: 700)
- **Section Heading**: `2.5rem` (font-weight: 600)
- **Body Text**: `1rem` (font-weight: 400, line-height: 1.65)
- **Mono Label**: `0.75rem-0.80rem` (font-weight: 400, letter-spacing: 0.02em-0.05em)

---

## 4. Components

### Cards (`.concept-item`)
- **Style**: Soft charcoal background (`#1c1c1b`), thin warm border (`#2e2d2a`), padded at `2.5rem`.
- **Details**: Large Roman numerals (I, II, III) in terracotta orange, left-aligned titles, and stone-colored paragraphs.
- **Transition**: Soft translateY and border color highlight on hover.

### Gallery Frame (`.poster-frame`)
- **Style**: Styled like a matted artwork in a physical gallery. Features a thick off-white mat board border and a sliding caption overlay appearing on hover.

### Progress Timeline (`.timeline-wrapper`)
- **Style**: A single vertical line with circles enclosing steps (1, 2, 3, 4) in monospace. Cards offset to the right with step details.

---

## 5. Partner Logos

To ensure the logos blend natively into the visual design:
- **Default state**: Styled with a CSS filter: `filter: grayscale(1) brightness(1.2) contrast(0.8); opacity: 0.6;`. This converts the logos into neutral, elegant white-gray elements that blend with the dark editorial background.
- **Hover state**: Transitioned smoothly to `filter: none; opacity: 1;` using `transition: all 0.2s;`, revealing their authentic corporate colors on cursor hover.

---

## 6. Copywriting & Communication Tone

To maintain a premium, quiet, and serious gallery-like experience:
- **Tone**: Pragmatic, minimalist, and elegant (务实、极简、娟秀).
- **Prohibited Patterns**: Avoid any overly poetic, dramatic, or tech CLI-related jargon (e.g., "温热的重构", "在旧痕里，塑造可以触摸的未来", "音乐塑料").
- **Core Principles**: Deliver direct, factual information about PVC plastics, resource reuse under SDGs Goal 12, and clean event details.

