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
