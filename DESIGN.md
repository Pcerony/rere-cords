# Design System: RERE-CORDS (Retro-Humanist Edition)

## 1. Overview

**Creative North Star: "The Gallery Archive"**

"The Gallery Archive" frames the RERE-CORDS exhibition as a premium, quiet, and minimalist art event. It avoids all developer terminal window styling, code blocks, or CLI prompt mockups. Instead, it utilizes clean grids, large classic serif typography, generous white space, and letterpress-inspired borders.

The page uses a high-contrast, clean light editorial color palette: warm paper-white base, solid white card blocks, and charcoal black text. The main visual image (`素材/主视觉.png`) is framed as a structured rectangular block inside the Hero section, creating a clear visual anchor without using gradient masks or overlays.

**Key Characteristics:**
- **Hero Split Layout**: A 2-column asymmetric layout pairing structured typography with the framed visual banner image.
- **Flat Color Block Panels**: Alternating light-gray and pure-white section blocks separated by solid 2px borders, with flat offset solid drop shadows (`box-shadow: 6px 6px 0px var(--color-border)`).
- **Sponsor & Partner Logos**: Elegant logos displayed in the header and footer with grayscale-to-color hover transitions (adapted for high contrast on light backgrounds).
- **Header Scroll Behavior**: The navigation bar automatically slides out of view on scroll down and slides back in on scroll up to maximize visual focus on content.

---

## 2. Colors

High-contrast, clean, and warm light color palette to mimic high-end printed art catalogs.

### Primary Accent
- **Sustainable Sage** (`#526647`): Darker green used for checkmarks, badges, dates, and progress.

### Secondary Accent
- **Terracotta Orange** (`#c15535`): Deep terracotta clay tone used for main CTA buttons, labels, and numeric tags.

### Neutral Colors
- **Warm Paper White** (`#f5f4f0`): Solid page base background.
- **Pure White** (`#ffffff`): Container and card block surfaces.
- **Charcoal Ink** (`#141413`): High-contrast text and solid borders.
- **Muted Stone** (`#5c5a54`): Descriptive secondary subtext.

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
- **Style**: Pure white background (`#ffffff`), 2px solid border (`#141413`), and solid flat offset box shadow (`box-shadow: 6px 6px 0px #141413`), padded at `2.5rem`.
- **Details**: Large Roman numerals (I, II, III) in terracotta orange, left-aligned titles, and stone-colored paragraphs.
- **Transition**: Flat offset shift (`translate(-2px, -2px)`) and shadow lift on hover.

### Gallery Frame (`.poster-frame`)
- **Style**: Styled like a matted artwork in a physical gallery. Features a thick off-white mat board border and a sliding caption overlay appearing on hover.

### Progress Timeline (`.timeline-wrapper`)
- **Style**: A single vertical line with circles enclosing steps (1, 2, 3, 4) in monospace. Cards offset to the right with step details.

---

## 5. Partner Logos

To ensure the logos blend natively into the visual design:
- **Default state**: Styled with a CSS filter: `filter: grayscale(1) brightness(0.2) contrast(1.2); opacity: 0.7;`. This converts the logos into dark, elegant high-contrast elements that blend with the light editorial background.
- **Hover state**: Transitioned smoothly to `filter: none; opacity: 1;` using `transition: all 0.2s;`, revealing their authentic corporate colors on cursor hover.

---

## 6. Copywriting & Communication Tone

To maintain a premium, quiet, and serious gallery-like experience:
- **Tone**: Pragmatic, minimalist, and elegant (务实、极简、娟秀).
- **Prohibited Patterns**: Avoid any overly poetic, dramatic, or tech CLI-related jargon (e.g., "温热的重构", "在旧痕里，塑造可以触摸的未来", "音乐塑料").
- **Core Principles**: Deliver direct, factual information about PVC plastics, resource reuse under SDGs Goal 12, and clean event details.

