# Desplegar el frontend (gratis)

## Recomendado: Vercel

- Plan **Hobby** gratuito para proyectos personales/equipo.
- Integración nativa con Next.js (build, preview por PR, HTTPS).
- El backend del equipo ya está en **Render**; el front solo necesita `NEXT_PUBLIC_API_URL`.

### Pasos

1. Sube la rama `feat/team-landing-deploy` (o `main` tras merge) a GitHub.
2. Entra en [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Configura:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Environment variable:** `NEXT_PUBLIC_API_URL` = URL de tu API en Render
4. Deploy.

### Alternativas gratuitas

| Plataforma | Notas |
|------------|--------|
| **Netlify** | Buena para Next; a veces requiere plugin para App Router. |
| **Cloudflare Pages** | Generoso en free tier; revisar compatibilidad con Next 16. |
| **Render** (Static Site) | Mismo proveedor que el backend; menos optimizado para Next que Vercel. |

## Rama sugerida

Usa **`feat/team-landing-deploy`**: diseño del equipo (`develop`) + auth/CV de `main`.

Tras revisión del equipo, merge a `main` y conecta Vercel a `main`.

## Comprobar antes de desplegar

```bash
cd frontend
cp .env.example .env.local   # opcional en local
npm ci
npm run typecheck
npm run build
npm run test
```
