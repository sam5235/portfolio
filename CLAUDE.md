# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — start the Vite dev server with HMR
- `yarn build` — type-check (`tsc -b`) then produce a production build (`vite build`); both must pass
- `yarn lint` — run Oxlint
- `yarn preview` — serve the production build locally

There is no test runner configured.

## What this is

A developer-portfolio single-page app (React 19 + TypeScript + Vite 8, styled with Tailwind CSS v4) with client-side routing. Pages: Home (landing), Projects, Experience, Contact, Blog + post detail, and a 404.

## Architecture

- **Routing** is defined in [src/main.tsx](src/main.tsx) via `createBrowserRouter`. [src/App.tsx](src/App.tsx) is the shared layout (Navbar + `<Outlet />` + Footer + scroll-reset). Pages live in [src/pages/](src/pages/).
- **Content is data-driven and localized via JSON.** Personal content lives in per-locale JSON at `src/content/{lng}/` (e.g. [src/content/en/](src/content/en/)) — `profile.json` (name, links, CV/Calendly/Formspree URLs, stats, socials, whyMe), `projects.json`, `experience.json`, `services.json`, `tech.json`, `testimonials.json`, `blog.json`. Components read it through the `useContent()` hook in [src/content/index.ts](src/content/index.ts), which returns the bundle for the active language (typed by [src/content/types.ts](src/content/types.ts)). To change site content, edit the JSON, not the components. Replace placeholders (`your-handle`, `your-form-id`, the sample email, blog posts).
- **i18n has two layers** (see [src/i18n/config.ts](src/i18n/config.ts)). UI chrome strings (nav, buttons, section titles, form labels) are i18next resource bundles in `src/i18n/locales/{lng}/ui.json` (e.g. [en](src/i18n/locales/en/ui.json)), used via `useTranslation()`'s `t('nav.home')`. Structured personal content uses the per-locale `src/content/` JSON above. Both are driven by the same active language (i18next), switched by [LanguageSwitcher](src/components/ui/LanguageSwitcher.tsx) in the navbar. **To add a language:** create `src/content/{lng}/*.json` + `src/i18n/locales/{lng}/ui.json`, then register the code in `languages` (config) and the bundle in `src/content/index.ts` — no component changes.
- **Tech icons** are resolved from `simple-icons` by slug in [src/content/techIcons.ts](src/content/techIcons.ts) (`tech.json` stores `{ name, slug }`); only imported icons are bundled.
- **Components** split into [src/components/ui/](src/components/ui/) (reusable primitives), [src/components/layout/](src/components/layout/) (Navbar, Footer, ScrollToTop), [src/components/sections/](src/components/sections/) (landing-page sections), and [src/components/illustrations/](src/components/illustrations/) (inline SVG art).

## Conventions that aren't obvious

- **React Compiler is enabled** ([vite.config.ts](vite.config.ts) wires `@rolldown/plugin-babel` + `reactCompilerPreset()`). Do not hand-add `useMemo`/`useCallback`/`React.memo` to chase the compiler.
- **Linting is Oxlint, not ESLint** ([.oxlintrc.json](.oxlintrc.json)). `react/rules-of-hooks` is an error.
- **Design tokens live in CSS, not a JS config.** Tailwind v4 has no `tailwind.config.js`; the theme is declared with `@theme` in [src/index.css](src/index.css). The brand is a **deep blue-black** (main) with an **orange** accent, but for historical reasons the token names are aliases: `violet-*` = the blue-black navy scale (100–300 light, 500–900 dark), `lime-accent`/`lime-accent-dark` = orange, `ink` = blue-black text/outlines. Reuse these tokens (plus the `.grid-dots`/`.heading-display` utilities) rather than inventing arbitrary colors. To re-skin the whole site, change the values in `@theme` — don't rename the classes across components.
- **Dark mode is class-based.** [src/context/ThemeContext.tsx](src/context/ThemeContext.tsx) toggles `.dark` on `<html>` and persists to `localStorage`; the `dark` Tailwind variant is wired via `@custom-variant` in `index.css`. Always pair light styles with `dark:` variants.
- **SEO uses React 19 native metadata**, not a helmet library — [src/components/ui/Seo.tsx](src/components/ui/Seo.tsx) renders `<title>`/`<meta>` directly inside each page and React hoists them to `<head>`.
- **Animations** use `motion` (Framer Motion). Wrap on-scroll reveals in [`<Reveal>`](src/components/ui/Reveal.tsx); reduced motion is honored globally via `<MotionConfig reducedMotion="user">` in `main.tsx`. The experience page uses a scroll-linked progress line ([Timeline](src/components/sections/Timeline.tsx), `useScroll`+`useSpring`).
- **Project media** lives in `projects.json` (`media: MediaItem[]`, images + video) and opens in the portal-based [Lightbox](src/components/ui/Lightbox.tsx) (Esc/arrows, click-outside, scroll-lock). Card cover art is a `kind`-driven SVG mock ([ProjectIllustration](src/components/illustrations/ProjectIllustration.tsx): `web|dashboard|mobile|ai`). Placeholder screenshots live in [public/projects/](public/projects/).
- **Scrolling:** custom themed scrollbar + `scroll-behavior: smooth` in `index.css`; a floating [BackToTop](src/components/ui/BackToTop.tsx) is rendered from the Footer and appears past 500px.
- **Buttons** are centralized in [src/components/ui/Button.tsx](src/components/ui/Button.tsx) as three variants — `Button` (native), `ButtonLink` (router `<Link>`), `ButtonAnchor` (external `<a>`). Use these instead of styling raw elements.
- **Glass surfaces:** use the `.glass` / `.glass-strong` utility classes from `index.css` (frosted `backdrop-filter`), not ad-hoc `bg-white/x backdrop-blur`. They have built-in dark variants.
- **Mouse-tilt** is the reusable [`<Tilt>`](src/components/ui/Tilt.tsx) (spring-damped 3D, auto-disabled under reduced motion). Wrap a card to add it.
- **tsparticles gotcha:** `<ParticlesProvider>` renders its children **only after** the engine loads, so it must wrap *only* the canvas — never app/route trees (it'd blank the page until load). It lives inside [ParticlesBackground.tsx](src/components/ui/ParticlesBackground.tsx) with a module-scoped `init` (the provider requires a stable init identity). Hover-repulse uses `interactivity.detectsOn: 'window'` so the canvas can stay `pointer-events-none`.
- **Tech icons** come from `simple-icons` (rendered monochrome, brand color on hover) in the looping [TechMarquee](src/components/sections/TechMarquee.tsx); icon resolver is [src/content/techIcons.ts](src/content/techIcons.ts) and the list is `tech.json`. The marquee duplicates its row and translates `-50%` for a seamless loop (see `.animate-marquee`/`.marquee-mask` in `index.css`).

## Integration points to configure for production

- Drop a real `public/cv.pdf` (the Download CV button links to `site.cvUrl`).
- Set a real Formspree form id and Calendly URL in [src/content/en/profile.json](src/content/en/profile.json) for the contact form / "Book a call".
- SPA fallback for deep links is pre-configured for Netlify ([public/_redirects](public/_redirects)) and Vercel ([vercel.json](vercel.json)).
