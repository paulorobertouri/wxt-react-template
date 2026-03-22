# wxt-react-template

Browser extension template using WXT + React + TypeScript with a clear separation between domain and UI logic.

## Stack

- WXT + React + TypeScript
- Vitest + Testing Library
- ESLint + Prettier
- VS Code debug profiles

## Commands

- `make install` — install dependencies
- `make install-dev` — install dev dependencies
- `make dev` — start dev server (Chromium)
- `make dev-firefox` — start dev server (Firefox)
- `make build` — build for Chromium
- `make build-firefox` — build for Firefox
- `make zip` — package extension for Chromium
- `make zip-firefox` — package extension for Firefox
- `make test` — run tests
- `make format` — format code

## Project Structure

```text
.
├── entrypoints/
│   └── popup/
│       ├── domain/          # pure business rules
│       ├── App.tsx          # root component
│       ├── App.css
│       ├── index.html
│       └── main.tsx
├── tests/
├── assets/
├── public/
├── scripts/
│   ├── ubuntu/
│   └── windows/
└── Makefile
```

## Architecture

- `entrypoints/popup/domain`: pure business rules, framework-agnostic
- `entrypoints/popup`: rendering and interactions
- `tests`: domain tests and UI tests

Follows Fowler-style separation of concerns; side effects stay at the boundaries.

## Functional Contract

- Task Board: add, toggle, and remove tasks.
- Business rules live in the domain module.
- UI concerns stay in framework-specific components.

## Quality Gates

- Lint must pass.
- Typecheck must pass.
- Unit tests must pass.
- Component behavior tests must pass.
