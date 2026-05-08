# Frontend - TalentRenew

Aplicacion frontend construida con Next.js (App Router), React y Tailwind CSS.

## Requisitos

- Node.js 20+
- npm 10+

## Ejecucion local

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

Abrir en navegador:

- [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `npm run dev`: inicia entorno de desarrollo.
- `npm run build`: compila para produccion.
- `npm run start`: ejecuta build de produccion.
- `npm run lint`: valida reglas de ESLint.
- `npm run typecheck`: valida tipos TypeScript.
- `npm run test`: corre pruebas unitarias con cobertura.
- `npm run test:watch`: corre pruebas unitarias en modo watch.
- `npm run test:e2e`: corre pruebas E2E smoke con Playwright.
- `npm run test:e2e:ui`: abre Playwright UI.

## Calidad y pruebas

Este frontend tiene tres capas de validacion:

1. Linting con ESLint (`eslint-config-next`).
2. Type checking con TypeScript (`tsc --noEmit`).
3. Testing:
   - Unitario: Vitest + Testing Library.
   - E2E smoke: Playwright.

### Flujo recomendado antes de commit

```bash
npm run lint
npm run typecheck
npm run test
```

## Estructura principal

```text
frontend/
  src/
    app/
    components/
      auth/
      landing/
      layout/
    lib/
  e2e/
  playwright.config.ts
  vitest.config.ts
  vitest.setup.ts
```

## Auth frontend (masticado para backend)

Flujo actual:

- Modal unificado de acceso en `src/components/auth/LoginModal.tsx`.
- Modo `login` y `register` en mismo componente.
- Boton Google en ambos modos.
- No hay dependencia directa de backend framework; solo `fetch`.

Contrato que consume frontend:

- `POST /api/Auth/login`
  - body enviado por frontend hacia backend: `{ "Email": "string", "Contrase?a": "string" }`
- `POST /api/Auth/register`
  - body enviado por frontend hacia backend: `{ "Nombre": "string", "Apellido": "string", "Email": "string", "Contrase?a": "string" }`
- `Google`:
  - boton visible en UI, pero endpoint backend aun pendiente.
  - frontend muestra mensaje de disponibilidad.

Base URL API:

- `NEXT_PUBLIC_API_URL` (ejemplo: `http://localhost:5187`)
- fallback local: `http://localhost:5187`

Punto de integracion:

- `src/lib/auth-client.ts`
  - `loginRequest(payload)`
  - `registerRequest(payload)`
  - `googleAuthRequest(payload)`

Buenas practicas aplicadas:

- Logica de red aislada en `lib/`.
- UI desacoplada de contrato HTTP.
- Estados UX basicos (`loading`, `error`, `disabled` por terminos).
- Cierre modal por `Escape`, click fuera, restauracion de scroll del `body`.

## CI

Se ejecuta en GitHub Actions con el workflow:

- `.github/workflows/frontend-ci.yml`

Validaciones automaticas:

- lint
- typecheck
- pruebas unitarias
- pruebas E2E smoke
