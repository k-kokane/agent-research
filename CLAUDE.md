@AGENTS.md

## Project Overview

This is **agent-research**, a Next.js 16 web application built with React 19, TypeScript, and Tailwind CSS 4. It is a research platform where an AI agent (Claude) investigates a given topic, implements the findings as code, and publishes the output as a deployed web application.

## Purpose

This repository exists as a research delivery system:

1. **Agent researches** — Claude is given a research topic and autonomously investigates it, gathering information and forming a structured report.
2. **Agent publishes** — The findings are implemented as code within this Next.js app (e.g. as a page, data visualization, or written report rendered in the UI).
3. **Admin reviews** — The admin accesses the live deployment to read and review the research report online, without needing to run the project locally.

The goal is to allow asynchronous, agent-driven research delivery via a web interface.

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

---

## Research Page Pattern

Every research task **must** follow this pattern exactly.

### 1. Create a route directory

```
app/<research-slug>/
  page.tsx      # The research page (UI)
  data.json     # All data needed by the page
```

The slug should be kebab-case and descriptive, e.g. `rcb-stats-2025`, `nifty-50-analysis`.

### 2. Register the research in `app/data.json`

Add an entry to the top-level `researches` array in `app/data.json`:

```jsonc
{
  "id": "<research-slug>",            // matches the route directory name
  "title": "Human-readable title",
  "description": "1–2 sentence summary of what was researched.",
  "date": "YYYY-MM-DD",               // date the research was completed
  "tags": ["Tag1", "Tag2"],           // relevant topic tags
  "trigger": "manual",                // "manual" | "automated"
  "route": "/<research-slug>",        // navigation link used by the home page
  "result": "Optional key finding"    // one-liner headline result (optional)
}
```

The home page (`app/page.tsx`) reads `app/data.json` and automatically renders a card for every entry — **no changes to `app/page.tsx` are ever needed**.

### 3. Build the research page

- Use **`@tremor/react`** components exclusively for all UI (Card, Title, Text, Metric, Badge, BarChart, DonutChart, BarList, Table, etc.)
- **No custom CSS** — only Tailwind utility classes and Tremor components
- Store all data (stats, chart series, tables) in `data.json`; import it into `page.tsx`
- Add `"use client"` at the top of `page.tsx` if charts or interactivity are needed

### 4. UI / component guidelines

- Reusable Tremor components live in `components/tremor/` — use them before creating new ones
- Charts: prefer `BarChart`, `DonutChart`, `AreaChart` from `@tremor/react`
- Tables: use `Table`, `TableHead`, `TableHeaderCell`, `TableBody`, `TableRow`, `TableCell` from `@tremor/react`
- Color palette for data: `emerald` = positive/win, `rose`/`red` = negative/loss, `blue` = neutral/info

### 5. Checklist before committing

- [ ] `app/data.json` updated with the new research entry
- [ ] `app/<slug>/data.json` contains all data (no hardcoded values in `page.tsx`)
- [ ] `npm run build` passes with zero errors
- [ ] Commit message describes what was researched and published
