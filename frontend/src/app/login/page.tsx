import Link from "next/link";
import { Suspense } from "react";

import { AccesoPanel } from "@/components/auth/AccesoPanel";
import { AuthShell } from "@/components/auth/AuthShell";
import { Card } from "@/components/Card";

function AccesoFallback() {
  return (
    <Card className="w-full max-w-lg animate-pulse">
      <div className="h-10 bg-light-bg rounded-lg mb-6" />
      <div className="h-6 bg-light-bg rounded w-2/3 mb-2" />
      <div className="h-4 bg-light-bg rounded w-full mb-6" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-24 bg-light-bg rounded-xl" />
        <div className="h-24 bg-light-bg rounded-xl" />
      </div>
      <div className="h-40 bg-light-bg rounded-lg" />
    </Card>
  );
}

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<AccesoFallback />}>
        <AccesoPanel />
      </Suspense>
      <p className="text-center text-[12px] text-text-secondary-light mt-6 max-w-lg">
        ¿Solo quieres explorar?{" "}
        <Link href="/diagnostic" className="text-amber-accent hover:underline">
          Ver el diagnóstico en demo
        </Link>
      </p>
    </AuthShell>
  );
}
