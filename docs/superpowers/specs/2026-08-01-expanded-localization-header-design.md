# Expanded Localization and Persistent Header Design

## Objective

Expand the homepage from four languages to thirteen languages used by likely Kyushu University participants, make English the first-visit default, replace the row of language buttons with an accessible dropdown, and keep the header visible at all times.

## Languages

The selector contains English, Japanese, Simplified Chinese, Traditional Chinese, Korean, Indonesian, Vietnamese, Thai, Bengali, Arabic, French, Hindi, and Finnish. Each option is written in its own language. Every visible `data-i18n` key must have a non-empty value in all thirteen languages.

English is the fallback when no supported preference exists. A valid stored preference remains respected. Simplified and Traditional Chinese use distinct language codes (`zh-CN` and `zh-TW`). Arabic sets document direction to right-to-left; all other languages use left-to-right.

## Selector

Use a native `select` with an accessible label. This offers keyboard operation, mobile platform menus, and reliable behavior without a custom menu dependency. The control displays the current language name and preserves the existing local-storage preference.

## Header

The fixed header never hides. While the viewport is over the hero, it has no filled background or border, and the logo and language selector use light colors over the banner. Once the page moves beyond the hero, the header receives the existing paper background, dark logo, border, and blur.

JavaScript schedules the visual-state update with `requestAnimationFrame` and listens to scroll and resize events passively. The old scroll-direction and `header-hidden` behavior is removed.

## Verification

Static tests enforce the language list, complete translations, English fallback, RTL handling, selector markup, and removal of the hidden-header behavior. Browser checks cover desktop and mobile, all language options, Arabic direction, hero transparency, scrolled header styling, overflow, resources, and runtime errors.
