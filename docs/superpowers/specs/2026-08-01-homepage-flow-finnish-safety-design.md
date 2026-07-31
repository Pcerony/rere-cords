# Homepage Flow, Finnish, Submission, and Safety Design

## Objective

Revise the RERE-CORDS homepage so participants can understand the required path at a glance, switch the entire visible interface to Finnish, distinguish physical and data-work submission requirements, identify the faculty advisors, and make informed decisions about PVC record processing hazards.

## Participant Flow

The primary path contains only two numbered stages:

1. Material distribution, production, and rolling submission, August 10 through November 10, 2026.
2. Offline results exhibition, November 20 through November 25, 2026.

An optional exchange salon appears visually between those stages, around November 15. It is not numbered and carries an explicit optional label. It supports discussion and sharing only; there is no online judging, award selection, ceremony, or prize language. The 2027 community-extension stage is removed from the participant-facing schedule.

## Submission Rules

The existing reserved submission entry remains a configuration-driven external link. No non-functional upload form will be shown.

- Physical work is delivered offline. Participants may submit only the physical work or add images, video, and other supplementary material.
- Image, data, or other digital work is submitted online and must include at least one work image, one short explanatory video, and any supplementary material needed to understand or run the work.
- The application section remains distinct from final work submission and points participants to the reserved portal for final materials.

## Safety Communication

The processing card no longer describes methods as completely unrestricted. A dedicated safety section follows the requirements and groups the main foreseeable hazards into cutting and edge hazards, heat and fumes, tools and dust, and adhesives or mixed materials.

Mandatory rules include using an authorized workspace, following equipment training and local instructions, wearing task-appropriate eye and other protection, securing work before cutting, controlling dust, reading adhesive safety information, and stopping immediately if smoke, a strong irritating odor, or physical discomfort occurs. Open flames, burning, laser cutting, and uncontrolled or unventilated heating of PVC records are prohibited.

This wording reflects HSE guidance that PVC processing fumes may contain hydrogen chloride and that fume generation should be minimized through temperature and process control, along with university makerspace rules that reject PVC in laser cutters.

## Faculty Advisors

Add a quiet, full-width advisor band rather than nested cards. Display the official names and positions in this order:

1. ZHANG Yanfang, Associate Professor
2. Melanie Sarantou, Professor

Both are identified with Kyushu University's Department of Strategic Design, Faculty of Design. Japanese and Chinese use the official Japanese name `張 彦芳`; the English and Finnish versions use `ZHANG Yanfang`.

## Finnish Localization

Add an `FI` language control and a `fi` value to every translation key used by the homepage. Switching languages updates the root document language to `fi`. Finnish covers navigation, section headings, body text, timeline, advisor information, submission rules, safety notices, venue information, status labels, and calls to action.

The default static HTML remains Japanese-compatible for search engines and no-JavaScript rendering. Runtime language selection remains stored in local storage, following the existing architecture.

## Visual Direction

Keep the current restrained editorial visual language. The required timeline uses solid numbered markers, while the optional salon uses a smaller offset panel and an outlined marker with an optional badge. Safety is a high-contrast full-width band with compact hazard groups, not a decorative card wall. Advisor information is typographically led and secondary to the participant workflow.

## Technical Boundaries

- Modify `index.html`, `app.js`, and `styles.css` only for production behavior.
- Keep `submission-config.js` backward compatible.
- Extend `tests/static-site.test.mjs` to enforce Finnish completeness, the revised schedule, removed judging and awards, submission requirements, safety structure, and advisor ordering.
- Preserve the user's untracked `提交文件/` directory.

## Verification

Run the Node static-site tests, parse-check JavaScript, and inspect the rendered page in a browser at desktop and mobile widths. Verify all four language buttons, timeline hierarchy, long Finnish text wrapping, no overlap, the disabled submission state, and reduced-motion behavior.

