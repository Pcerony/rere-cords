# RERE-CORDS Participant Pathways Design

## Decision

Keep one public homepage and introduce one shared, interactive pathway selector near the start of the page. A separate digital-work page would duplicate deadlines, exhibition details, advisors, and submission infrastructure while making digital participation look secondary. The selector instead makes all three routes equally valid while preserving one activity identity.

## Participation Routes

1. **Physical work**: obtain or independently source a discarded record, transform it into a physical work, and deliver the work to the campus collection box. Images and video are optional supplements.
2. **Record-based digital outcome**: obtain or independently source a discarded record and use it in an experiment, performance, process, or temporary construction, but submit the final outcome as digital documentation. Process evidence, at least one image, and a short explanatory video are required.
3. **Fully digital work**: do not obtain or physically process a record. Create a digital work that has a clear relationship to discarded records, analog-media culture, material circulation, or sustainable design. The work, at least one representative image, a short explanatory video, and display or playback instructions are required.

All routes count as formal participation only when submitted, share the November 10 deadline, and are eligible for the onsite exhibition. Fully digital work is not a general-purpose digital-art category; its relationship to the project theme must be explained in the participation form.

## Page Behavior

- Add `#pathways` after the project concept and before record pickup instructions.
- Use an accessible three-option tab selector with physical work selected initially.
- Store the chosen route locally and synchronize contextual notes and submission details without sending any participant data.
- Keep all important route information in the HTML so the page remains understandable without JavaScript.
- Record pickup and PVC safety information remain available to everyone, but contextual notes explain whether they apply to the selected route.
- Replace the current two-route submission explanation with three route-specific panels. Only the selected panel is expanded; the three pathway choices remain visible and can be changed at any time.

## Content Updates

- Revise hero and concept copy so providing 100 records is an opportunity, not a universal requirement.
- Rename the record section to clarify that it is only needed by routes using physical records.
- Generalize the timeline to begin with choosing a route; record collection is conditional.
- Clarify that digital works can be included in the onsite exhibition and must provide display, playback, or execution requirements.
- Scope PVC-processing safety rules to routes that physically handle records without weakening the existing warnings.

## Accessibility And Resilience

- Implement tabs with `role="tablist"`, `role="tab"`, `aria-selected`, roving `tabindex`, and keyboard support for arrow, Home, and End keys.
- Use `hidden` for inactive panels and preserve a no-JavaScript fallback that exposes all panels.
- Do not make the selector a form or imply that choosing a route registers the participant.
- Respect reduced-motion settings and avoid layout movement when switching routes.

## Verification

- Static tests enforce the three route definitions, eligibility boundary, conditional record collection, synchronized controls, and multilingual completeness.
- Browser checks cover keyboard operation, language changes, local persistence, desktop and mobile layout, no horizontal overflow, and console errors.
