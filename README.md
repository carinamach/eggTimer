# Egg Timer

 A simple, responsive egg timer built with React + TypeScript + Vite. Choose egg type (soft/medium/hard), start the timer, and get an audible alert when time is up.

## Live Demo
- Deployed at: [egg-timer-pink.vercel.app](https://egg-timer-pink.vercel.app/)

## Features
- Responsive layout for mobile, tablet, and desktop
- Preset times for soft/medium/hard (6/8/10 minutes — editable in code)
- Alert sound loops until you press Stop or Reset
- PWA-ready (manifest, favicon, service worker in production)

## Getting Started
Requirements:npm

Install dependencies:
```bash
npm install
```

Start the development server (Vite):
```bash
npm run dev
```
Open the printed URL (e.g., http://localhost:5173).

Build for production and preview the build:
```bash
npm run build
npm run preview
```

## Change the alert sound
The project uses a local file `src/assets/notification-bell.mp3`.

To change the sound, either:
1) Replace `src/assets/notification-bell.mp3` with your own file (same name), or
2) Update the source in `src/components/EggTimer.tsx` to point to your file.

The sound starts looping when the timer completes and stops when you press Stop/Reset or change egg type.

## Change times
Times are defined in `EGG_TIMES` in `src/components/EggTimer.tsx`:
```ts
const EGG_TIMES = { soft: 6 * 60, medium: 8 * 60, hard: 10 * 60 };
```

## Favicon & manifest
- Favicon is `public/favicon.svg` and referenced in `index.html`.
- Manifest is in `public/manifest.json`. It's recommended to register the service worker only in production.

## Troubleshooting
- Always run via Vite (`npm run dev`) — not Live Server — so transpilation and MIME types are correct.
- Hard refresh the page if favicon/sound/styles don’t update.

## License
MIT


