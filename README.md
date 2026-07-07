# DanRecords — Experiencia digital

Experiencia continua de una sola página (Intro → Artists → News → History → Ecosystem → Footer)
+ landings individuales por artista.

## Stack
Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons

## Correr en local
```bash
npm install
npm run dev
```

## Estructura
- `app/page.tsx` — la experiencia completa (capítulos)
- `app/artists/[slug]/page.tsx` — landing de cada artista (SSG)
- `components/CinematicIntro.tsx` — vinilo 3s + apertura de puertas
- `components/home/*` — Hero editorial, Catálogo (2 columnas, A–Z), News, History, Ecosystem
- `lib/artists.ts` — catálogo (agregar artistas aquí; escala solo)
- `lib/instagram.ts` — sincronización News ↔ Instagram Graph API (requiere IG_USER_ID e IG_ACCESS_TOKEN en .env.local)
- `app/api/leads/route.ts` — recibe formularios (conectar al panel admin)

## Fotos reales
Colocar imágenes en:
- `public/artists/{slug}.jpg` (ej. `public/artists/aria-noir.jpg`)
- `public/founder.jpg`
Mientras no existan, se muestran gradientes propios de cada artista.

## Notas
- La intro corre una vez por sesión (sessionStorage) y respeta `prefers-reduced-motion`.
- GSAP no fue necesario todavía; Framer Motion cubre todas las transiciones actuales.

## Despliegue

### Vercel (recomendado)
1. Sube el repo a GitHub y conéctalo en vercel.com (detecta Next.js solo).
2. Variables de entorno: `IG_USER_ID`, `IG_ACCESS_TOKEN` (ver `.env.example`).
3. Cada push a `main` redeploya automático.

### Railway
1. Nuevo servicio desde el repo. Build: `npm run build` · Start: `npm start`.
2. Mismas variables de entorno.

### Pendientes antes de producción
- [ ] Dominio final en `app/layout.tsx` (metadataBase), `app/robots.ts` y `app/sitemap.ts`.
- [ ] Token de Instagram (expira cada 60 días — considerar cron de refresh).
- [x] Formularios → reporte por correo a Dan vía Resend (`app/api/leads/route.ts`).
      Configurar `RESEND_API_KEY` y `LEAD_TO_EMAIL`; sin dominio verificado, Resend
      solo entrega al correo dueño de la cuenta (verificar dominio para producción).
- [ ] Completar con Dan: géneros, bios y links de Spotify/Apple/YouTube en `lib/artists.ts`; texto real de la carta del fundador; fotos del equipo.
