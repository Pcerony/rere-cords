# Language Menu and Advisor Profiles Design

## Scope

Polish the existing multilingual header and expand the faculty advisor section without changing the site's static hosting model.

## Language Menu

- Replace the visible native select with a compact custom menu that matches the editorial visual system.
- Keep all 13 existing languages and display one representative flag before each native language name.
- Preserve English as the first-time default and the stored language preference for returning visitors.
- Support pointer use, outside-click dismissal, Escape, Arrow Up/Down, Home, End, and focus return to the trigger.
- Keep a hidden native select as a compatibility and synchronization hook, while exposing the custom trigger and listbox as the accessible interactive control.
- Use a light, scrollable menu surface over both the transparent hero header and the solid scrolled header. Constrain it on narrow screens so it never overflows the viewport.

## Advisor Profiles

- Keep ZHANG Yanfang before Melanie Sarantou.
- Download both portraits from their official Kyushu University Strategic Design profile pages and serve them locally.
- Present each advisor as a flat editorial profile row with a stable portrait area, name, current title/research fields, concise biography, and an external link to the official profile.
- Add the new biography and link labels to every currently supported language.
- Use the official faculty listing and profile pages as the source of truth; summaries must not add unverified claims.

## Quality and Verification

- Add static tests for menu semantics, all flag options, advisor portrait assets, ordering, biographies, and official links before implementation.
- Verify the complete test suite, JavaScript syntax, local resource loading, keyboard interaction, and desktop/mobile layouts.
- Avoid new dependencies and preserve the existing RTL and reduced-motion behavior.
