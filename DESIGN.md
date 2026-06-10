---
name: RERE-CORDS
description: Natural Retro Humanistic Design System for RERE-CORDS Sustainable Exhibition
colors:
  primary: "#425848"
  secondary: "#BE745B"
  secondary-dark: "#9C523B"
  neutral-bg: "#F5F7F4"
  neutral-surface: "#FAFBF9"
  neutral-ink: "#2C312D"
  border: "#D5D8D3"
typography:
  display:
    fontFamily: "EB Garamond, Noto Serif SC, Noto Serif JP, serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Alegreya Sans, Noto Sans SC, Noto Sans JP, sans-serif"
    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
rounded:
  sm: "2px"
  md: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.neutral-ink}"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "32px"
---

# Design System: RERE-CORDS

## 1. Overview

**Creative North Star: "The Seed Paper Chronicle"**

"The Seed Paper Chronicle" encapsulates a design philosophy that is organic, textured, and deeply human. Rather than presenting a clean, sterile, or corporate face, this system acts like hand-pressed recycled paper containing embedded seeds: raw, slightly imperfect, and carrying the potential for new growth. It is quiet, warm, and natural.

This system explicitly rejects the neon cyberpunk gradients, heavy dark modes, cold technical grid-systems, and generic AI templates of the modern web. Spacing is comfortable, allowing elements to breathe. Line drawings and typography carry the burden of the visual weight, anchored by authentic physical visual media (the event main visual and poster).

**Key Characteristics:**
- **Organic Hue-Tinting**: The background is not plain white or generic warm beige; it is tinted gently toward the brand's own sustainable sage-green hue.
- **Classic Typography Weight**: Serif display typography (EB Garamond) communicates voice, while humanist sans-serif (Alegreya Sans) provides organic readability.
- **Textured Borders & Frames**: Thin double-ruled borders and offsets replace heavy boxes and shadows.
- **Content Restraint**: Clean layouts with no unnecessary decoration; whitespace is a design element.

## 2. Colors

The color palette is derived directly from natural elements (textured paper, sage plants, and baked terracotta clay). All colors are specified in OKLCH for canonical representation and mapped to hex codes for general tooling.

### Primary
- **Sustainable Sage** (`#425848` / `oklch(0.45 0.08 145)`): Represents sustainability, SDGs, and the organic nature of the project. Used for primary branding elements, highlights, and primary CTAs.

### Secondary
- **Terracotta Rust** (`#BE745B` / `oklch(0.60 0.13 45)`): Represents the physical material warmth, music analog culture, and clay. Used for secondary borders, visual highlights, and buttons.
- **Baked Soil** (`#9C523B` / `oklch(0.48 0.11 45)`): A darkened version of Terracotta Rust with contrast ≥4.5:1 against the light background. Used for secondary text links or small titles.

### Neutral
- **Sage-Gray Off-White** (`#F5F7F4` / `oklch(0.97 0.008 145)`): The background canvas. A soft, off-white background tinted toward sage to avoid standard AI warm beige templates.
- **Ivory Paper** (`#FAFBF9` / `oklch(0.99 0.004 145)`): The card background. Slightly brighter than the canvas to create clear hierarchy without heavy separation.
- **Charcoal Ink** (`#2C312D` / `oklch(0.24 0.01 145)`): The primary body copy color. A soft black tinted with green to ensure high contrast without harshness.
- **Pressed Border** (`#D5D8D3` / `oklch(0.88 0.01 145)`): Subtle border and line color.

### Named Rules
**The Sage-Tint Rule.** The background of any page or element must be tinted toward the sage hue (145 degrees) rather than default orange-yellow warmth (40-90 degrees) to ensure a bespoke, brand-specific canvas.
**The High Contrast Rule.** All readable text must maintain a contrast ratio of ≥4.5:1 against the background surface. Neutral charcoal on Sage-Gray off-white has a contrast ratio of 12.65:1.

## 3. Typography

**Display Font:** EB Garamond, Noto Serif SC, Noto Serif JP (Serif)
**Body Font:** Alegreya Sans, Noto Sans SC, Noto Sans JP (Humanist Sans-serif)

The typographic pairing represents a letterpress book print: an elegant, slightly classic serif display heading that sings with authority, paired with a warm, friendly humanist sans-serif body that flows naturally.

### Hierarchy
- **Display** (SemiBold (600), `clamp(2rem, 5vw, 4rem)`, `1.15`): Used for the brand name and main hero title.
- **Headline** (Regular/Medium (500), `clamp(1.5rem, 3.5vw, 2.5rem)`, `1.2`): Used for main section headers.
- **Title** (SemiBold (600), `1.25rem`, `1.3`): Used for card headings and timeline steps.
- **Body** (Regular (400), `clamp(0.95rem, 1.5vw, 1.1rem)`, `1.7`): Used for all descriptive paragraphs and body copy. Cap line length at `65-75ch`.
- **Label** (Medium (500), `0.8rem`, `0.15em` letter-spacing, uppercase): Used for tags, dates, and navigation links.

### Named Rules
**The Single-Shout Rule.** No heading or display title may exceed `clamp()` max of `6rem`. The typeface must command attention through classic serif elegance, not massive viewport-overflowing size.
**The Balanced Line Rule.** All headers (h1-h3) must use `text-wrap: balance` to prevent orphaned words, and all body copy must use `text-wrap: pretty`.

## 4. Elevation

Depth in this design system is flat by default, referencing real ink-on-paper publications. Shadow effects are not decorative or default; they are used sparingly to represent physical paper edges or to respond to interactive states (hover).

### Shadow Vocabulary
- **Paper Lift** (`box-shadow: 0 4px 16px rgba(44, 49, 45, 0.04)`): Subtle lift to represent paper sheets.
- **Pressed In** (`box-shadow: inset 0 1px 3px rgba(44, 49, 45, 0.03)`): Representing debossed elements.

### Named Rules
**The Flat-Rest Rule.** All surfaces must lie flat at rest, using borders (`#D5D8D3`) for structure. Subtle shadows appear only as a hover reaction or on authentic visual frames.

## 5. Components

### Buttons
- **Shape:** Soft edges (2px radius).
- **Primary:** Background Sustainable Sage (`#425848`), text Sage-Gray Off-White (`#F5F7F4`), padding `12px 32px`, font-family Display.
- **Hover/Focus:** Transitions smoothly (`background-color 0.25s ease`). Background becomes Charcoal Ink (`#2C312D`) with a slight upward translation (`translateY(-1px)`).
- **Secondary / Bordered:** Background transparent, text Charcoal Ink (`#2C312D`), border 1px solid (`#D5D8D3`).

### Cards / Containers
- **Corner Style:** Soft edges (4px radius).
- **Background:** Ivory Paper (`#FAFBF9`).
- **Border:** 1px solid Pressed Border (`#D5D8D3`).
- **Internal Padding:** Large (`32px` on desktop, `20px` on mobile).
- **Asymmetric Offsets**: The frame border uses double lines or subtle offsets to look hand-crafted.

### Navigation
- **Style:** Sticky header with solid Sage-Gray Off-White (`#F5F7F4`) background and a fine 1px bottom border. No heavy blurs or translucent overlays.
- **Links:** Upper-case, tracked `0.1em`, using Alegreya Sans. Hover state transitions to Sage Green (`#425848`).

## 6. Do's and Don'ts

### Do:
- **Do** use `oklch` syntax in stylesheets for color adjustments.
- **Do** ensure line length for readable copy is constrained to `65-75ch`.
- **Do** frame the custom main visual (`素材/主视觉.png`) in a vintage-style double border with a solid background offset.
- **Do** implement a responsive two-column grid using `flex` or `grid` that stacks cleanly on mobile.

### Don't:
- **Don't** use side-stripe borders (like a thick left border on a card).
- **Don't** use tiny uppercase tracked eyebrows (e.g. `CONCEPT`, `TIMELINE`) above every single section. Use typographic rhythm instead.
- **Don't** use gradient text or neon/cyberpunk colors.
- **Don't** use standard sans-serif fonts like Inter or Roboto for display headings.
- **Don't** use cards for everything; use clean asymmetric grid layouts instead.
