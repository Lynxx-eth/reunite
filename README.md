# Reunite — Global Missing Persons Network

A beautiful, fully-working website that helps find **missing children and adults** worldwide.
It pulls **real, live missing-person cases** from the free public **FBI Missing Persons API**, and
features an interactive **3D globe** built with Three.js.

## ✨ Features

- **Interactive 3D globe** (React Three Fiber + drei) — a rotating dotted Earth with glowing
  location markers, connection arcs, floating motion, and a starfield.
- **Live, real data** — active cases from the FBI, proxied through a server route so it's fast and
  CORS-safe. No API key required.
- **Search & filter** — search by name (debounced), filter by sex, load more results.
- **Detail view** — full profile modal with photo, physical description, case details, an
  official-case link, and a one-tap **Share** button (Web Share API).
- **Polished design** — dark glassmorphism theme, gradient type, smooth animations, fully
  responsive, custom scrollbar.

## 🧱 Tech stack

| Purpose   | Choice                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router) + TypeScript              |
| Styling   | Tailwind CSS v4                                   |
| 3D        | three.js · @react-three/fiber · @react-three/drei |
| Data      | FBI Wanted/Missing API (`api.fbi.gov`)            |

## 🚀 Run it

```bash
npm install     # first time only
npm run dev     # start dev server -> http://localhost:3000
```

Build for production / deploy (e.g. Vercel):

```bash
npm run build
npm run start
```

## 📁 Structure

```
app/
  layout.tsx            # fonts + metadata
  page.tsx              # composes all sections
  globals.css           # design system (colors, glass, animations)
  api/missing/route.ts  # server proxy -> FBI API (normalises data)
components/
  Hero.tsx              # hero + 3D scene overlay
  GlobeScene.tsx        # the Three.js 3D globe (client-only)
  Navbar.tsx  Stats.tsx  HowItWorks.tsx  GetInvolved.tsx  Footer.tsx
  SearchBrowse.tsx      # search + filters + grid + data fetching
  PersonCard.tsx  PersonModal.tsx
lib/types.ts            # shared types
```

## Notes

- This is an independent **awareness project** — it is not affiliated with any government agency.
  Case data is courtesy of the public FBI database.
- Want a different data source (e.g. a country-specific one)? Swap the URL in
  `app/api/missing/route.ts` and adjust the `normalize()` mapping.
