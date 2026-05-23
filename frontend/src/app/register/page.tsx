"use client";

import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/Card";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <AuthShell showSteps step={1} totalSteps={3}>
      <Card className="w-full max-w-md">
        <h3 className="text-primary-navy mb-2 font-medium">Crea tu cuenta</h3>
        <p className="text-text-secondary-light text-[13px] mb-6">
          Empieza gratis. En 3 pasos tienes tu perfil listo.
        </p>
        <RegisterForm onSuccess={() => router.push("/diagnostic")} />
      </Card>
    </AuthShell>
  );
}
