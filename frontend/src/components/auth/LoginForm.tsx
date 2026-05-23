"use client";

import { type FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { loginWithFallback, demoSocialAuth } from "@/lib/auth-actions";
import type { LoginPayload } from "@/lib/auth-client";
import { saveAuthSession } from "@/lib/auth-session";
import type { UserAccountType } from "@/lib/auth-types";
import { GoogleIcon, LinkedInIcon } from "@/components/auth/auth-icons";

type LoginFormProps = {
  accountType: UserAccountType;
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  showRegisterLink?: boolean;
};

export function LoginForm({
  accountType,
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
      const { response, demoMode } = await loginWithFallback(data, accountType);
      saveAuthSession(response, { tipoUsuario: accountType, demoMode });
      completeAuth();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialDemo = (provider: "google" | "linkedin") => {
    const { response, demoMode } = demoSocialAuth(accountType, provider);
    saveAuthSession(response, { tipoUsuario: accountType, demoMode });
    completeAuth();
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

      <form className="space-y-3 mb-6" onSubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          type="email"
          name="email"
          autoComplete="email"
          placeholder={accountType === "empresa" ? "tu@empresa.com" : "tu@email.com"}
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

      <div className="flex items-center gap-3 mb-4">
        <div className="h-[0.5px] bg-black/10 flex-1" />
        <span className="text-[12px] text-text-secondary-light">o continuá con</span>
        <div className="h-[0.5px] bg-black/10 flex-1" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full mb-3"
        onClick={() => handleSocialDemo("google")}
      >
        <GoogleIcon />
        Continuar con Google
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full mb-6"
        onClick={() => handleSocialDemo("linkedin")}
      >
        <LinkedInIcon />
        Continuar con LinkedIn
      </Button>

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
