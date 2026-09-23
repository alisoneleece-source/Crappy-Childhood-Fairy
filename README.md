# Crappy Childhood Fairy — Portfolio Concept

`index.html` is the single canonical homepage. This independent concept is not the official website.

## Preview

Serve this directory with `python3 -m http.server 8000`, then open `http://localhost:8000/`. No build step is required.

## Homepage foundation

- The exact uploaded `CrappyChildhoodFairy.png` is used unchanged, scaled proportionally with CSS.
- `assets/anna-hero.png` is the supplied real portrait.
- Three evergreen “Pick your path” cards lead to Daily Practice, Quizzes, and Courses.
- Three separate “Latest & Featured” slots are configured in `homepageFeatures` in `script.js`. Edit each item's `title`, `href`, and `cta`; optionally add `description` and `image: { src, alt }`. The current examples contain no event dates or availability claims. Keep the noscript fallback in `index.html` synchronized when changing the examples.
- Books, Write to Anna, and the footer have restrained reserved areas for later content.

## Shared files and existing pages

- `styles.css`: shared baseline and scoped homepage foundation.
- `inner-pages.css`: retained destination-page styles and shared responsive navigation.
- `script.js`: disclosure navigation, feature rendering, and the retained letter prototype.
- Existing destination pages remain in place; no alternate homepage has been created. Their shared headers use the same menu. A code comment reserves the future Retreats navigation item.
- Existing book covers and Anna portraits remain available, unchanged.

## Navigation

Use Tab to reach links and disclosure buttons. Enter or Space toggles a submenu; Arrow Down opens it and focuses its first link. Escape closes a submenu and restores focus to its trigger. A second Escape closes the mobile menu. Clicking outside, following a link, or crossing the desktop breakpoint closes open menus.

The Write to Anna form remains a local prototype; it does not send or store submissions. Updating this repository does not deploy the official website.
