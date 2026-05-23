# Frontend — trabajo en equipo

## Fuente de verdad del diseño

El diseño de landing que el equipo acordó está en la rama **`develop`** (merge PR #8: shadcn + Hero, Navbar, Footer, secciones en `components/sections/`).

En **`main`** mantenemos eso y solo añadimos lo que el backend necesita:

- Modal de login/registro (`auth-client` → API en Render)
- Página pública de CV (`/cv/[slug]`)
- Tests y CI (`npm ci`, lint, typecheck, Playwright)

## Reglas para no pisar el trabajo del equipo

1. **No volver a meter** la landing antigua (`LandingMain` / `sections.tsx` propios) sin acuerdo del grupo.
2. **No cambiar colores ni layout** por cuenta propia; si hay diseño nuevo (p. ej. otra paleta), que llegue en un PR de quien diseñó.
3. **Actualizar UI** trayendo cambios desde `develop`:

   ```bash
   git fetch origin
   git checkout main
   git merge origin/develop
   # Resolver conflictos priorizando los archivos de diseño del equipo
   ```

4. Archivos que suelen ser solo del equipo (tocar con cuidado):  
   `globals.css`, `components/sections/*`, `components/ui/*`, `layout/Navbar.tsx`, `layout/Footer.tsx`, `HeroSection.tsx`, `public/mujer.png`

5. Archivos de integración (pueden evolucionar en `main`):  
   `components/auth/*`, `lib/auth-client.ts`, `app/cv/*`

## Referencias viejas (no usar como diseño actual)

- `public/prototipo/prototipo.html` — prototipo HTML anterior; no es la landing React del equipo.
- Documentación suelta en la raíz puede quedar desactualizada; priorizar lo que está en `develop`.

## Cuando el equipo suba cambios nuevos

Hagan merge o PR desde su rama → `develop` → `main`. Después se revisa en conjunto (colores, secciones completas, etc.).
