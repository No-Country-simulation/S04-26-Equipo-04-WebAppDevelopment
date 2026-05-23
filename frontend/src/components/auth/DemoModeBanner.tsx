"use client";

import { FlaskConical } from "lucide-react";

import { isDemoSession } from "@/lib/auth-session";

export function DemoModeBanner() {
  if (!isDemoSession()) return null;

  return (
    <div
      role="status"
      className="mb-4 flex items-start gap-2 rounded-lg border border-amber-accent/40 bg-amber-accent/10 px-3 py-2.5"
    >
      <FlaskConical className="text-amber-accent shrink-0 mt-0.5 size-4" aria-hidden />
      <p className="text-[13px] text-primary-navy leading-snug">
        <span className="font-medium">Modo demostración.</span> Google y LinkedIn simulan el acceso;
        correo y contraseña usan la API cuando está disponible.
      </p>
    </div>
  );
}
