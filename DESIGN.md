# Design System: RERE-CORDS (Extreme Minimalist Art Edition)

## 1. Overview

**Creative North Star: "The Gallery Archive"**

"The Gallery Archive" frames the RERE-CORDS exhibition as a premium, quiet, and extremely minimalist art event. It avoids all decoration, terminal windows, double-border outlines, dashed lines, and drop shadows. Instead, it utilizes clean grids, large classic serif typography, generous white space, and thin, elegant borders.

**Key Characteristics:**
- **Full-Screen Hero**: A full-bleed panoramic cover layout utilizing the dark main visual image (`素材/主视觉.png`) with clean, light-colored typography, separated by a sharp horizontal border line.
- **Extreme Minimalism**: No box-shadows, no translation offsets on hover, no dashed outlines, and no double borders.
- **Flat Layout Blocks**: Simple sections alternate between warm-paper background and crisp-white background with a thin bottom boundary.
- **Sponsor & Partner Logos**: Elegant logos displayed in the header and footer with grayscale-to-color hover transitions.
- **Header Scroll Behavior**: The navigation bar automatically slides out of view on scroll down and slides back in on scroll up to maximize visual focus on content.

---

## 2. Colors

High-contrast, clean, and warm light color palette to mimic high-end printed art catalogs.

### Primary Accent
- **Sustainable Sage** (`#526647`): Green tone used for dates, badges, and progress.

### Secondary Accent
- **Terracotta Orange** (`#c15535`): Deep terracotta clay tone used for CTA highlights, labels, and numbers.

### Neutral Colors
- **Warm Paper White** (`#f5f4f0`): Solid page base background.
- **Pure White** (`#ffffff`): Page section surfaces.
- **Charcoal Ink** (`#141413`): High-contrast text, header borders, and dark elements.
- **Muted Stone** (`#6e6c64`): Descriptive secondary subtext.

---

## 3. Typography

Pairing classic display serif display fonts with clean humanist sans-serif body copy.

### Font Families
- **Display Headings**: `Playfair Display`, `Cinzel`, `Noto Serif SC`, `Noto Serif JP`, serif
- **Body Prose**: `Alegreya Sans`, `Noto Sans SC`, `Noto Sans JP`, sans-serif
- **Monospace details**: `JetBrains Mono`, monospace

### Scale
- **Hero Title**: `clamp(2.75rem, 7vw, 4.25rem)` (font-weight: 700)
- **Section Heading**: `2.2rem` (font-weight: 600)
- **Body Text**: `0.95rem` (font-weight: 400, line-height: 1.7)
- **Mono Label**: `0.7rem-0.75rem` (font-weight: 400, letter-spacing: 0.01em-0.05em)

---

## 4. Component Rules

### Concept Blocks (`.concept-item`)
- **Style**: Transparent background, no borders, no shadows, no hover translate animations. Simple vertical grid alignment with a numeric label.

### Stats Panel (`.about-details-box`)
- **Style**: Flat, borderless layout directly on the white section surface.
- **Stats**: Divided by a clean horizontal border separator line. Uses large serif numbers for a elegant, premium exhibition aesthetic.

### Gallery Frame (`.poster-frame`)
- **Style**: A single thin border frame around the poster. The description overlay is replaced by a static, clear caption block placed below the poster frame so the artwork is never covered.
- **Interaction**: The poster shifts slightly left while the vinyl record slides out to the right when hovered.

### Progress Timeline (`.timeline-wrapper`)
- **Style**: A single vertical line with thin-bordered circles. Cards are rendered as borderless, shadowless text blocks with high readability.

---

## 5. Copywriting & Communication Tone

To maintain a premium, quiet, and serious gallery-like experience:
- **Tone**: Pragmatic, minimalist, and elegant (务实、极简、娟秀).
- **Core Principles**: Deliver direct, factual information about PVC plastics, resource reuse under SDGs Goal 12, and clean event details. Avoid poetic or dramatic filler text.
