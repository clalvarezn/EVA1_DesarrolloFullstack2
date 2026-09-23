# Copilot instructions for LevelUp Gaming

## Project context
This repository contains a static storefront and admin panel for a gaming hardware shop called LevelUp Gaming. The main app lives in the `LevelUp-Gaming/` folder and uses plain HTML, CSS, and JavaScript.

## Structure
- `LevelUp-Gaming/index.html`: home page
- `LevelUp-Gaming/productos.html`: product catalog
- `LevelUp-Gaming/carrito.html`: shopping cart
- `LevelUp-Gaming/admin/`: admin views
- `LevelUp-Gaming/css/style.css`: shared styling
- `LevelUp-Gaming/js/`: validation and cart logic

## Coding standards
- Prefer simple, readable HTML/CSS/JS; avoid introducing frameworks or build tooling unless explicitly requested.
- Keep the design consistent with the existing gaming/e-commerce style.
- Maintain semantic structure: headings, sections, forms, buttons, lists, and accessibility labels.
- Reuse existing CSS classes and naming patterns when adding new UI.
- Keep scripts modular and compatible with the browser environment already used by the project.

## Business rules
- The stock critical warning is important: products with stock less than or equal to 3 should be visually flagged in admin views.
- Admin areas should clearly support inventory and user management tasks.
- Shopping cart behavior should be consistent across product detail and catalog views.

## Editing guidance
- Before modifying existing pages, inspect the relevant HTML, CSS, and JS files together to preserve consistency.
- Prefer small, targeted edits over broad rewrites.
- Validate that links, forms, and scripts still work after changes.
- If visual changes are needed, match the current palette, spacing, and typography rather than introducing radically different styles.

## Typical tasks
- Add or update sections in the storefront.
- Fix product/admin validation details.
- Improve responsiveness and styling for desktop/mobile layouts.
- Add or refine JS behavior for cart, forms, or admin stock warnings.
