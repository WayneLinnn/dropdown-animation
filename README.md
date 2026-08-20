# Skyline Bay

A frontend study of a waterfront residential sales site. The first screen is not a video: it is a 16-frame still sequence that scrubs from day to night as you scroll. A dropdown can jump the same sequence to Daytime, Dusk, or Night. Below the hero, the page behaves like a conventional listing — stats, floor plans, neighbourhood, and a viewing request.

All copy is English. The theme is forced to light so the frames and the type stay readable.

This is not a live development. Form submissions never leave the browser.

## What you can do

- Scroll the hero to watch the city move from morning light to night
- Pick a time of day from the dropdown, or from the Light study section further down
- Browse three floor plans with facing, area, and availability
- Read amenities and walking / driving times to nearby places
- Submit a viewing request (local success state only)

## How the sequence works

Frame paths and scene times live in `lib/frames.ts`. GSAP `ScrollTrigger` maps scroll progress across the 16 PNGs in `public/frames`. The Light study buttons dispatch a `scene-select` custom event; the hero listens and uses `ScrollToPlugin` to move itself to that frame. Project copy (name, stats, units, surroundings) lives in `lib/project.ts`.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS v4, shadcn/ui
- GSAP ScrollTrigger and ScrollToPlugin

## Run

```bash
npm install
npm run dev
```

Dev server: [http://localhost:3003](http://localhost:3003)

```bash
npm run build
npm run start
```
