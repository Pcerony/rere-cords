---
name: RERE-CORDS
description: Claude Code Style Design System for RERE-CORDS Sustainable Exhibition
colors:
  primary: "#788c5d"
  secondary: "#d97757"
  neutral-bg: "#141413"
  neutral-surface: "#1e1e1d"
  neutral-ink: "#faf9f5"
  border: "#3a3935"
  dark-gray: "#8e8d85"
typography:
  display:
    fontFamily: "EB Garamond, Noto Serif SC, Noto Serif JP, serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Work Sans, Noto Sans SC, Noto Sans JP, sans-serif"
    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "3px"
  md: "6px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.neutral-ink}"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "32px"
---

# Design System: RERE-CORDS (Claude Code Style)

## 1. Overview

**Creative North Star: "The Terminal Canvas"**

"The Terminal Canvas" blends the physical texturing of our RERE-CORDS main visual with the clean, structured, and developer-forward console layout of Claude Code. It treats the website as a developer utility interface, featuring command prompts, monospaced details, high-contrast typography, and partner logos.

Rather than plain or glowing neon colors, it utilizes Anthropic's muted, earthy color palette: deep dark charcoal backgrounds, warm off-white lettering, and muted sage/terracotta highlights. The visual background consists of the main visual (`素材/主视觉.png`) covered with a dark, high-contrast overlay, creating a textured backdrop.

**Key Characteristics:**
- **Panoramic Texture**: A fixed full-screen background image covered by a dark protective overlay.
- **Terminal Consoles**: Structured CLI frames showing commands, code, and structured timeline files.
- **Typographic Hierarchy**: JetBrains Mono for code logs and tags, Work Sans for prose, and EB Garamond for display titles.
- **Partner Branding**: Logos integrated directly into the header and footer, matching the developer-focused theme.

## 2. Colors

Earthy, neutral, and high-contrast dark palette, adhering to Anthropic's design language.

### Primary
- **Sustainable Sage** (`#788c5d` / `oklch(0.58 0.08 115)`): Used for success states, active shell parameters, and minor badge highlights.

### Secondary
- **Terracotta Orange** (`#d97757` / `oklch(0.62 0.15 45)`): Used for primary action buttons, terminal cursor highlights, and key links.

### Neutral
- **Console Dark** (`#141413` / `oklch(0.18 0.002 90)`): The dark base color for terminal windows.
- **Workspace Surface** (`#1e1e1d` / `oklch(0.22 0.002 90)`): The container background.
- **Warm White** (`#faf9f5` / `oklch(0.98 0.002 90)`): Primary text color.
- **Charcoal Border** (`#3a3935` / `oklch(0.32 0.003 90)`): Border color.
- **Muted Stone** (`#8e8d85` / `oklch(0.63 0.005 90)`): Muted subtext and secondary indicators.

### Named Rules
**The Panoramic Overlay Rule.** The full-bleed background image must be covered by a dark linear gradient overlay (`rgba(20, 20, 19, 0.82)`) to ensure all text retains a contrast ratio of ≥4.5:1.
**The High-Contrast Console Rule.** Inside terminal windows, text must be bright Warm White or highlighted in orange/green to maintain high readability.

## 3. Typography

**Display Font:** EB Garamond, Noto Serif SC, Noto Serif JP (Serif)
**Body Font:** Work Sans, Noto Sans SC, Noto Sans JP (Sans-serif)
**Monospace Font:** JetBrains Mono, monospace

### Hierarchy
- **Display** (SemiBold (600), `clamp(2rem, 5vw, 4rem)`, `1.15`): Hero titles.
- **Headline** (SemiBold (600), `clamp(1.4rem, 3vw, 2.2rem)`, `1.25`): Section headers.
- **Body** (Regular (400), `clamp(0.9rem, 1.2vw, 1.05rem)`, `1.65`): Descriptive copy.
- **Mono Label** (Regular (400), `0.85rem`, `1.5`): Commands, dates, tags, and navigation items.

### Named Rules
**The Mono Tagging Rule.** All metadata, dates, buttons, and short kickers must use JetBrains Mono, styled in lowercase or uppercase with spacing, mimicking terminal parameters.

## 4. Elevation

The design is flat and structured like a command-line interface. Depth is established through container overlays and thin borders (`1px solid var(--color-border)`), not shadows.

### Shadow Vocabulary
- **None**: Flat borders only.

## 5. Components

### Terminal Windows
- **Style:** Background Console Dark (`#141413`), border 1px solid (`#3a3935`), rounded corner (6px).
- **Header:** Features three dots (red `#ff5f56`, yellow `#ffbd2e`, green `#27c93f`) on the top-left, and a centered filename in monospace.
- **Content:** Monospaced prompts (`$`), blinking cursors, and structured code listings.

### Buttons
- **Primary:** Background Terracotta Orange (`#d97757`), text Console Dark (`#141413`), font-family JetBrains Mono, padding `10px 24px`.
- **Hover:** Background Warm White (`#faf9f5`), text Console Dark (`#141413`).

### Partner Logos
- **Style:** Scaled elegantly (height `24-28px` in header, `20px` in footer), styled with a white/cream filter to match the dark theme canvas.

## 6. Do's and Don'ts

### Do:
- **Do** write commands and prompt indicators (`$`) in JetBrains Mono.
- **Do** use thin solid borders (`#3a3935`) to define section content.
- **Do** display partner logos in both the navigation bar and the footer.

### Don't:
- **Don't** use standard shadows or card gradients.
- **Don't** use large rounded corners (keep radii between 3px and 6px).
- **Don't** overlay bright text directly on the visual background without the dark overlay screen.
