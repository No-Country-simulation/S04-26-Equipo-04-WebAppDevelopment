"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md space-y-6">
        {/* 404 */}
        <h1 className="text-7xl font-bold text-primary-navy">404</h1>

        {/* mensaje */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-primary-navy">
            Página no encontrada
          </h2>

          <p className="text-sm text-text-secondary-light">
            La página que estás buscando no existe, fue movida o eliminada.
          </p>
        </div>

        {/* acciones */}
        <div className="flex flex-col gap-3 items-center">
          <Button
            onClick={() => router.push("/")}
            variant="dark"
            className="w-full"
          >
            Ir al inicio
          </Button>

          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="w-full"
          >
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
}