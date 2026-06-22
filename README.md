# Ehsan Ullah (Ahsan Khan) — Cloud & Platform Engineering Platform

A modern, fast, content-driven personal platform built with **[Astro](https://astro.build)** and deployed **free** on **GitHub Pages**. It is a portfolio, technical blog, case-study library, resource/learning hub and recruiter destination in one.

**Live:** https://ahsankhan420.github.io

---

## Tech stack & why

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Astro 6 (static output) | Ships near-zero JS, top Core Web Vitals, content collections for scalable blogging |
| Content | Markdown collections (`src/content`) | Add an article/case study by dropping a `.md` file — typed & validated at build |
| Styling | Hand-built design system (`src/styles/global.css`) | No CSS framework bloat; custom premium look |
| Interactivity | Vanilla JS islands | Hero canvas, typewriter, filters — all tiny, all respect `prefers-reduced-motion` |
| SEO | `@astrojs/sitemap` + central `SEO.astro` | Auto sitemap, Open Graph, Twitter cards, JSON-LD (Person / BlogPosting / CreativeWork) |
| Feed | `@astrojs/rss` → `/rss.xml` | Auto-generated from blog posts |
| Hosting / CI | GitHub Pages + GitHub Actions | $0 hosting, auto build & deploy on every push to `main` |
| Forms | Formspree (free) + mailto fallback | No backend to maintain |

---

## Project structure

```
site.config.mjs        ← single source of truth (name, URLs, socials, CV path)
astro.config.mjs       ← build config (site URL, sitemap)
src/
  consts.ts            ← nav, footer, JSON-LD Person schema
  content.config.ts    ← collection schemas (blog / projects / resources)
  styles/global.css    ← the design system (colors, type, components)
  components/           ← Hero, Navbar, Footer, SEO, cards…
  layouts/BaseLayout.astro
  content/
    blog/*.md           ← articles
    projects/*.md        ← case studies
    resources/*.md       ← learning-hub entries
  pages/                ← routes (index, about, projects, blog, resources, uses, contact, 404, rss)
public/                 ← static assets served as-is (profile, /cv, /Credentials, robots, manifest)
_legacy/                ← your previous hand-built site, archived for reference (not built)
```

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## ✍️ Add content (no code required)

**New article:** create `src/content/blog/my-post.md`

```md
---
title: "My Post Title"
description: "One-line summary for SEO and cards."
date: 2026-07-01
category: "Tutorial"   # Tutorial | Deep Dive | Guide | Notes | Opinion
tags: ["kubernetes", "ci-cd"]
readingTime: "6 min"
featured: false
---

Write Markdown here…
```

**New case study:** `src/content/projects/my-project.md` (fields: `title, summary, date, role, stack[], domains[], impact[{value,label}], links{repo,live}, featured, order`).

**New resource:** `src/content/resources/my-resource.md` (fields: `title, description, category, type, level, url, date`).

Push to `main` and it deploys automatically. Set `draft: true` to hide a file from the build.

---

## 🚀 First-time deploy (one-time setup)

1. Commit & push these files to `main`.
2. On GitHub: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**
   *(this replaces the old "Deploy from branch" setting — required for the Astro build).*
3. The `Build & Deploy` workflow runs and publishes to https://ahsankhan420.github.io.

---

## 🔧 Optional power-ups

- **Contact form:** create a free form at [formspree.io](https://formspree.io), then set `FORMSPREE_ID` in `src/pages/contact.astro`. Until then the form opens the visitor's email client (works fine).
- **Analytics:** add a privacy-friendly snippet (e.g. [Plausible](https://plausible.io), [Umami](https://umami.is), or GA4) into `<head>` in `src/layouts/BaseLayout.astro`.
- **GitHub stats** on the homepage pull live from public widgets — they reflect `@ahsankhan420` automatically.
- **Custom domain (off by default):** in `site.config.mjs` set `USE_CUSTOM_DOMAIN = true` + `CUSTOM_DOMAIN`, add `public/CNAME` containing your domain, and point DNS at GitHub Pages. *(You opted to keep the free github.io domain — nothing to do.)*

---

## Notes on content

The example case studies, articles and resources are written to be realistic and immediately useful, but some metrics are illustrative — swap in your own real figures, screenshots and links as you publish. Everything is plain Markdown.

---

*Built as a long-term career asset — designed to grow with you and stay nearly free to run.*
