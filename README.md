# Course Tracker

A lightweight static web app for ticking off per-class course topics and tracking progress in browser `localStorage`, structured for zero-build deployment on Vercel.

## Project Structure

```text
.
├── public/                 # Static output directory deployed by Vercel
│   ├── index.html          # App entry point
│   ├── favicon.svg         # App icon
│   ├── styles/main.css     # Stylesheet
│   ├── js/
│   │   ├── app.js          # UI, clean URL routing, and localStorage state
│   │   └── courses.js      # Course catalog data
│   └── assets/             # Self-hosted Public Sans fonts and side banners
├── scripts/
│   ├── dev.mjs             # Zero-dependency local dev server (mirrors Vercel rewrites)
│   └── check.mjs           # Validates vercel.json, courses.js, and static asset links
├── vercel.json             # Vercel static config, rewrites, cache & security headers
├── .vercelignore           # Keeps local docs and design scratch files out of deploys
└── package.json            # Convenience scripts (no dependencies to install)
```

## Deploy to Vercel

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in the [Vercel Dashboard](https://vercel.com/new).
3. Click **Deploy** — `vercel.json` automatically configures `public/` as the output directory with no build step required.

### Option 2: Vercel CLI
Deploy a preview or production build directly from your terminal:

```bash
npx vercel          # Preview deployment
npx vercel --prod   # Production deployment
```

## Local Development

No `npm install` is required (uses Node's built-in modules):

```bash
node scripts/dev.mjs     # Starts local server at http://127.0.0.1:3000
node scripts/check.mjs   # Validates vercel.json, course data, and asset links
```

Or via npm scripts (`npm run dev`, `npm run check`, `npm run deploy`).

## Adding a Course

Edit `public/js/courses.js` and append a new entry to `COURSES` with a unique URL-safe `id` (for example `"cse1110"`). It will immediately be accessible at `/cse1110` (legacy `/#cse1110` links are also supported and automatically upgraded).
