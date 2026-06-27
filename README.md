# Organic Valley

Enterprise-grade React frontend boilerplate for an organic e-commerce platform selling vegetables, fruits, dairy, honey, grocery items, spices, rice, oil, and fresh farm products.

This is a **frontend-only** architecture with no backend, API client, or server integration.

---

## Features

- Feature-based scalable folder structure
- React Router v7 with nested routes
- Layout-based routing (Main, Dashboard, Auth)
- Protected, Public, and Admin route placeholders
- Reusable component architecture
- Tailwind CSS v4 integration
- ESLint + Prettier code quality tooling
- Absolute path aliases
- Error boundary and 404 handling
- Environment variable configuration

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool and dev server |
| JavaScript | Application language |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| ESLint | Linting |
| Prettier | Code formatting |

---

## Folder Structure

```
organic-valley/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   ├── layout/             # Header, Footer, Sidebar
│   │   ├── routing/            # Route guards
│   │   └── ErrorBoundary/
│   ├── config/
│   │   └── env.js
│   ├── constants/
│   │   ├── routes.js
│   │   ├── app.js
│   │   └── storage.js
│   ├── features/               # Feature modules (empty)
│   ├── hooks/
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/                  # Empty page folders (add pages later)
│   │   ├── Home/
│   │   ├── Products/
│   │   ├── Categories/
│   │   └── ...
│   ├── providers/
│   ├── routes/
│   │   └── router.jsx
│   ├── store/
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── prettier.config.js
├── jsconfig.json
├── vite.config.js
└── package.json
```

---

## Architecture Explanation

### Feature-Based Architecture

Each business domain (products, cart, orders, etc.) can own its module under `features/`. This keeps related code co-located and scales cleanly as the application grows.

### Separation of Concerns

| Layer | Responsibility |
|---|---|
| `pages/` | Route-level composition |
| `components/` | Reusable UI building blocks |
| `features/` | Feature modules per domain |
| `store/` | Reserved for future state management |
| `routes/` | Routing definitions |
| `layouts/` | Page shell structures |
| `hooks/` | Shared React logic |
| `utils/` | Pure helper functions |
| `config/` | Environment and app configuration |
| `constants/` | App-wide constants |

---

## Routing Architecture

- `createBrowserRouter()` with nested route trees
- **MainLayout**: App shell with header and footer
- **DashboardLayout**: Admin dashboard layout
- **AuthLayout**: Authentication pages layout
- **Error Boundary**: Catches render errors at app root

### Route Guards (Placeholders)

| Guard | Behavior |
|---|---|
| ProtectedRoute | Pass-through placeholder for future auth |
| PublicRoute | Pass-through placeholder for future auth |
| AdminRoute | Pass-through placeholder for future admin access |

---

## Installation Guide

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 9+

### Setup

```bash
# Clone or navigate to the project
cd organic-valley

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_APP_NAME` | Application display name | Organic Valley |
| `VITE_IMAGE_BASE_URL` | CDN/image server base URL | (empty) |
| `VITE_APP_VERSION` | Application version | 1.0.0 |

---

## Development Workflow

1. Create feature module in `src/features/` if needed
2. Create page in `src/pages/`
3. Register route in `src/routes/router.jsx`
4. Build UI using components from `src/components/common/`

### Absolute Imports

Configured aliases (see `vite.config.js` and `jsconfig.json`):

```
@/          → src/
@components/→ src/components/
@features/  → src/features/
@pages/     → src/pages/
@hooks/     → src/hooks/
@utils/     → src/utils/
@constants/ → src/constants/
```

---

## Coding Standards

- **Components**: PascalCase (`ProductCard.jsx`)
- **Functions/Variables**: camelCase (`getProducts`)
- **Constants**: UPPER_SNAKE_CASE (`PRODUCT_CATEGORIES`)
- **Folders**: kebab-case or lowercase feature names
- One component per folder with `index.js` barrel export
- No business logic in boilerplate — architecture only
- ESLint and Prettier enforce consistency

---

## Scalability Guide

### Adding a New Feature

1. Create `src/features/<feature>/`
2. Add page and route

### Adding a New Page

1. Create `src/pages/<PageName>/<PageName>Page.jsx`
2. Add lazy import in `src/routes/lazyPages.js`
3. Register in `src/routes/router.jsx`

### Team Scaling

- Features are isolated — multiple developers can work on different features simultaneously
- Route guards and layouts are centralized — consistent navigation patterns

---

## Future Improvements

- [ ] Implement actual page UI designs
- [ ] Add unit and integration tests (Vitest + React Testing Library)
- [ ] Add i18n support for multiple languages
- [ ] Add dark mode theme implementation
- [ ] Add PWA support
- [ ] Add Storybook for component documentation
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add error monitoring (Sentry)
- [ ] Add analytics integration

---

## Deployment Notes

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

Deploy the `dist/` folder to any static hosting provider:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx

Set environment variables in your hosting provider's dashboard. All `VITE_*` variables are embedded at build time.

---

## License

Private — Organic Valley E-Commerce Platform
