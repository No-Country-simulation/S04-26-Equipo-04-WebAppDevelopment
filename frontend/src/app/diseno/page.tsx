import Link from "next/link";

/**
 * Enlace al prototipo HTML completo maquetado por el equipo de diseño.
 */
export default function DisenoPrototipoPage() {
  return (
    <div className="mx-auto max-w-container-max px-8 py-24">
      <h1 className="font-heading text-3xl font-bold text-primary">Prototipo de diseño (equipo)</h1>
      <p className="mt-4 max-w-2xl text-on-surface-variant">
        La landing completa con todas las secciones y colores finales está en el HTML que entregó
        diseño. La home en Next.js va incorporando sección por sección desde ese prototipo.
      </p>
      <Link
        href="/prototipo/prototipo.html"
        className="mt-8 inline-flex h-12 items-center rounded-lg bg-primary px-8 font-semibold text-on-primary hover:opacity-90"
      >
        Abrir prototipo completo
      </Link>
      <p className="mt-6">
        <Link href="/" className="font-semibold text-secondary hover:underline">
          ← Volver a la home en Next.js
        </Link>
      </p>
    </div>
  );
}
