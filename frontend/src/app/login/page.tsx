"use client";

import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/Card";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthShell>
      <Card className="w-full max-w-md">
        <h3 className="text-primary-navy mb-2 font-medium">Iniciar sesión</h3>
        <p className="text-text-secondary-light text-[13px] mb-6">
          Accede a tu perfil, diagnóstico y oportunidades.
        </p>
        <LoginForm onSuccess={() => router.push("/dashboard")} />
      </Card>
    </AuthShell>
  );
}
