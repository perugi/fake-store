# fake-store

A mock e-commerce storefront built with React, where users can browse products, filter by category, and manage a shopping cart.

## [Live Demo](https://fake-store-4nd.pages.dev/shop)

![screenshot](https://github.com/user-attachments/assets/e51a1feb-16c0-4bbc-b88b-1596c629ed4b)

## Features

- Browse products fetched from the [Fake Store API](https://fakestoreapi.com/).
- Filter products by category (electronics, jewelry, men's & women's clothing).
- Search products by name.
- Sort products by name, price, or rating.
- Add items to a shopping cart with adjustable quantities.
- Cart modal using the native `<dialog>` element.
- Toast notifications for cart actions.
- Detailed product page with description, rating, and add-to-cart.
- Responsive, mobile-first layout.

## Technologies, Tools, Design Approaches

- Vite + React
- React Router (client-side SPA routing)
- CSS Modules with native CSS nesting
- Vitest + React Testing Library
- Stylelint
- Immutable shopping cart data structure
