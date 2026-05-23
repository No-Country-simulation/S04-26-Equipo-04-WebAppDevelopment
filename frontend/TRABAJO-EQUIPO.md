# Frontend — trabajo en equipo

## Fuente de verdad del diseño (actual)

La landing y el flujo UI actual de Scarlet están en **`origin/main`** (mayo 2026):

- Landing ámbar: `src/app/(marketing)/page.tsx` (`--amber-accent: #C98A2A`)
- Login / registro: `src/app/login`, `src/app/register`
- Diagnóstico, dashboard, empresa: rutas bajo `src/app/dashboard`, etc.
- Componentes: `src/components/Button.tsx`, `Badge`, `Card`, `Navbar`, `Footer`

La rama `develop` y `6-setup-shadcn-ui-and-build-landing-page` son **anteriores** (shadcn + Hero verde, 6 mayo).

## Mantener `main` al día

```bash
git fetch origin
git pull origin main
cd frontend && npm ci && npm run dev
```

## Integraciones locales que pueden convivir

- `src/lib/auth-client.ts` y API en Render (si el contrato coincide con el backend)
- `src/app/cv/[slug]` — CV público (ruta aparte del marketing)

Priorizar los archivos de Scarlet en conflictos de diseño (`globals.css`, `(marketing)/*`, `layout/Navbar`, etc.).

## No reintroducir sin acuerdo

- Landing vieja (`LandingMain`, `components/sections` de shadcn del 6 mayo)
- Colores del `prototipo.html` verde (`#156967`) como diseño activo
