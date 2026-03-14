# CC Design System

A monorepo design system built with [Stencil](https://stenciljs.com/) web components, [Style Dictionary](https://amzn.github.io/style-dictionary/) design tokens, and [Storybook](https://storybook.js.org/).

## Packages

| Package               | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `packages/tokens`     | Design tokens (color, spacing, typography) → compiled to CSS variables |
| `packages/components` | Stencil web components                                                 |
| `apps/storybook`      | Storybook component explorer                                           |

## Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8 — `npm install -g pnpm`

## Getting started

```sh
# Install dependencies
pnpm install

# Build everything (tokens → components → storybook)
pnpm build

# Start all packages in watch/dev mode
pnpm dev

# Launch Storybook (runs on http://localhost:6006)
pnpm storybook
```

## Common commands

```sh
# Run all tests
pnpm test

# Lint all packages
pnpm lint

# Format all files
pnpm format

# Generate a new component (inside packages/components)
cd packages/components && pnpm generate

# Add a changeset before publishing
pnpm changeset
```

## Repo structure

```
cc-design-system/
├── apps/
│   └── storybook/          # Storybook app
├── packages/
│   ├── tokens/             # Style Dictionary token sources + build
│   └── components/         # Stencil web components
├── .changeset/             # Changesets for versioning & release
├── turbo.json              # Turborepo pipeline config
└── pnpm-workspace.yaml     # pnpm workspace config
```
