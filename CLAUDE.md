@AGENTS.md

## Project Overview

This is **agent-research**, a Next.js 16 web application built with React 19, TypeScript, and Tailwind CSS 4. It serves as a research/starter project scaffolded via `create-next-app`.

## Purpose

A baseline Next.js application used for agent and AI-assisted development research. The project explores how AI coding agents interact with a modern Next.js codebase.

## Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19, Tailwind CSS 4
- **Linting**: ESLint 9 with `eslint-config-next`

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
app/
  layout.tsx     # Root layout
  page.tsx       # Home page
  globals.css    # Global styles
public/          # Static assets
```

## Key Notes

- Uses the App Router (not Pages Router)
- Before modifying any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/` — this version may have breaking changes from earlier releases
