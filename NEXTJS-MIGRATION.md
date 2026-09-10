# Ovejite Next.js + Existing Backend

This version uses **Next.js (Node.js)** as the web runtime/build system.

The existing application source, admin pages, authentication logic, CMS entity API, Supabase connection, and database structure are preserved under `src/`.

## Important architecture

- Next.js App Router provides the Node.js web runtime and Vercel build.
- `app/[[...slug]]/page.jsx` mounts the existing React application so the existing `/`, `/about`, `/services`, `/admin`, `/admin/leads`, etc. routes continue to work.
- The existing client-side router remains in place, so existing admin/CMS screens are not discarded.
- Supabase remains the database/auth backend.
- Environment variables use `NEXT_PUBLIC_*` names because this is now a Next.js project.

## Vercel environment variables

Use:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Do not use `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in this Next.js version.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

This is the safer migration path because it changes the build/runtime to Next.js without throwing away the existing CMS/admin/backend implementation.


## Clean Next.js entry-point fix
- Added `app/page.jsx` as the Next.js route entry.
- Removed the old Vite `/index.html` Vercel rewrite so Vercel serves the Next.js app normally.
