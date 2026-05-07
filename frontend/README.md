# Frontend - TalentRenew

Aplicación frontend construida con Next.js (App Router), React y Tailwind CSS.

## Requisitos

- Node.js 20+
- npm 10+

## Ejecución local

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

Abrir en navegador:

- [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `npm run dev`: inicia entorno de desarrollo.
- `npm run build`: compila para producción.
- `npm run start`: ejecuta build de producción.
- `npm run lint`: valida reglas de ESLint.
- `npm run typecheck`: valida tipos TypeScript.
- `npm run test`: corre pruebas unitarias con cobertura.
- `npm run test:watch`: corre pruebas unitarias en modo watch.
- `npm run test:e2e`: corre pruebas E2E smoke con Playwright.
- `npm run test:e2e:ui`: abre Playwright UI.

## Calidad y pruebas

Este frontend tiene tres capas de validación:

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
  e2e/
  playwright.config.ts
  vitest.config.ts
  vitest.setup.ts
```

## CI

Se ejecuta en GitHub Actions con el workflow:

- `.github/workflows/frontend-ci.yml`

Validaciones automáticas:

- lint
- typecheck
- pruebas unitarias
- pruebas E2E smoke
