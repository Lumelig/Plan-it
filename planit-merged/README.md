# Plan-it Merged Workspace

This folder aggregates the existing Web (Vite/React) and Mobile (Expo/React Native) apps into one place to work on both side-by-side.

Contents
- campus-swipe-dark (web app) – existing project kept in place one level up
- campus-swipe-mobile (mobile app) – existing project kept in place one level up

Why this folder exists
- Provide one entry point to run both apps quickly
- Track shared assets/conventions
- Prepare for possible future monorepo migration (shared utils, themes)

Run apps from here

- Web (Vite):
  npm run web

- Mobile (Expo):
  npm run mobile

Notes
- These scripts call into the existing sibling folders. No code was moved yet.
- If you want a real monorepo (pnpm/yarn workspaces) or to unify code (React Native Web), tell me and I’ll migrate.
- Shared assets can go under ./shared for both apps to consume (manual wiring required).
