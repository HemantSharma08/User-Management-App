<!-- .github/copilot-instructions.md -->
# Copilot / AI Agent Instructions for this repository

Purpose: help an AI coding assistant be immediately productive in this React + Vite single-page app.

- **Project type:** React (JSX) app bootstrapped with Vite. Entry: `src/main.jsx` -> `src/App.jsx`.
- **Routing:** `react-router-dom` (v7). Routes are declared in `src/App.jsx` using `<Routes>` and `element` props. Default redirect from `/` goes to `/login`.
- **Auth & data flow:** `src/context/AuthContext.jsx` is the single source of truth for authentication and user data. It stores users in `localStorage` under the key `users` and the active session under `currentUser`.

What to know when editing or adding features
- **Stateless UI vs local state:** Pages (e.g., `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/Account.jsx`) rely on `useAuth()` for auth actions. Do not duplicate auth logic across pages — extend `AuthContext.jsx` instead.
- **Protected routes:** Use `src/components/ProtectedRoute.jsx` to gate UI. Wrap the `element` prop with `<ProtectedRoute>...</ProtectedRoute>` for any route that needs authentication (see `/account`).
- **Navbar behavior:** `src/components/MyNavbar.jsx` reads `user` from `useAuth()` and conditionally shows links and logout. Update this file if you change session shape.
- **LocalStorage 'database':** Registration, login, updateProfile are synchronous and operate on arrays in `localStorage`. Example patterns:
  - Register saves a new object into `users` (prevent duplicate by `email`).
  - Login searches `users` for email+password and sets `currentUser`.
  - updateProfile maps over `users` to replace the user by `email`, then updates `currentUser`.

Practical guidelines for the AI
- **Keep changes minimal & consistent:** Follow the existing JS/JSX style (functional components, default exports). Avoid migrating to TypeScript or altering folder layout without explicit user approval.
- **If adding backend integration:** Replace localStorage usage inside `src/context/AuthContext.jsx` only. Keep the public API of the context stable: `{ user, login, register, logout, updateProfile }` unless requested otherwise. When introducing async APIs, update callers (pages) to handle Promise returns and loading/error states.
- **Security caution (explicit):** This app stores passwords in plain text in `localStorage` for demo purposes. Do not add real credentials, or push code that assumes secure storage without a migration plan. Document any security improvements in the PR.

Developer workflows & commands
- Install and run dev server:

```powershell
npm install
npm run dev
```

- Build / preview / lint (from `package.json`):

```powershell
npm run build
npm run preview
npm run lint
```

Manual test flow (smoke test after changes)
- Register a new user via `/register`.
- Login via `/login` and confirm navigation to `/account`.
- Edit profile in `/account` and confirm `localStorage` keys `users` and `currentUser` are updated.
- Use the Navbar logout and confirm redirect to `/login` and `currentUser` removal.

Key files to inspect when changing behavior
- `src/context/AuthContext.jsx` — core auth and user persistence.
- `src/components/ProtectedRoute.jsx` — gating component.
- `src/components/MyNavbar.jsx` — conditional UI based on session.
- `src/pages/*` — page-level forms use `useAuth()` and `useNavigate()`.
- `package.json` — dev scripts and dependencies.

Additional notes for AI code changes
- Prefer localized edits: modify `AuthContext.jsx` to change auth persistence or session logic, and update any components that consume the context.
- When adding asynchronous behavior (e.g., HTTP calls), convert context methods to async and update usages to handle loading and errors; add minimal loading UI in pages.
- Do not change user-visible routes without updating `MyNavbar.jsx` and `src/App.jsx` route declarations.

If anything here is unclear or you'd like me to expand examples (e.g., how to migrate `AuthContext` to an API-backed implementation), tell me which part to expand.
