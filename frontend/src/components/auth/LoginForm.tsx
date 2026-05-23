"use client";

import { type FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { loginWithFallback } from "@/lib/auth-actions";
import type { LoginPayload } from "@/lib/auth-client";
import { saveAuthSession } from "@/lib/auth-session";

type LoginFormProps = {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  showRegisterLink?: boolean;
};

export function LoginForm({
  onSuccess,
  onSwitchToRegister,
  showRegisterLink = true,
}: LoginFormProps) {
  const [data, setData] = useState<LoginPayload>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const completeAuth = () => {
    onSuccess?.();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { response, demoMode } = await loginWithFallback(data);
      saveAuthSession(response, { tipoUsuario: "profesional", demoMode });
      completeAuth();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {errorMessage ? (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700"
        >
          {errorMessage}
        </p>
      ) : null}

      <form className="space-y-3 mb-2" onSubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="tu@email.com"
          value={data.email}
          onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Tu contraseña"
            value={data.password}
            onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-text-secondary-light hover:text-primary-navy"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Iniciar sesión"}
        </Button>
      </form>

      <SocialAuthButtons onSuccess={completeAuth} />

      {showRegisterLink ? (
        <p className="text-center text-[13px] text-text-secondary-light">
          ¿No tienes cuenta?{" "}
          {onSwitchToRegister ? (
            <button
              type="button"
              className="text-amber-accent hover:underline font-medium"
              onClick={onSwitchToRegister}
            >
              Crear cuenta
            </button>
          ) : (
            <Link href="/login?tab=register" className="text-amber-accent hover:underline font-medium">
              Crear cuenta
            </Link>
          )}
        </p>
      ) : null}
    </>
  );
}
