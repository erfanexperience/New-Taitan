# New-Taitan

TAITAN – AI Mission Command landing page. React (Vite) app with hero, services, partnership, team, reviews, and contact sections.

## Setup

```bash
npm install
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

**Option A – Automatic (recommended)**  
On every push to `main`, the GitHub Action (`.github/workflows/deploy.yml`) builds the app and deploys it. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**. The site will be at `https://erfanexperience.github.io/New-Taitan/`.

**Option B – Manual**  
Run `npm run deploy`, then in **Settings → Pages** set source to the **gh-pages** branch.
