"use client";

import { type FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { registerRequest } from "@/lib/auth-client";
import { saveAuthSession } from "@/lib/auth-session";
import { GoogleIcon, LinkedInIcon } from "@/components/auth/auth-icons";

type RegisterFormProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  showLoginLink?: boolean;
};

export function RegisterForm({
  onSuccess,
  onSwitchToLogin,
  showLoginLink = true,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!acceptedTerms) {
      setErrorMessage("Debes aceptar términos y condiciones.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerRequest({
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });
      if (response) {
        saveAuthSession(response);
      }
      onSuccess?.();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No se pudo crear la cuenta.");
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

      <div className="flex items-center gap-3 mb-4">
        <div className="h-[0.5px] bg-black/10 flex-1" />
        <span className="text-[12px] text-text-secondary-light">o registrate con</span>
        <div className="h-[0.5px] bg-black/10 flex-1" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full mb-3"
        onClick={() => setErrorMessage("Google login en backend todavía no disponible.")}
      >
        <GoogleIcon />
        Continuar con Google
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full mb-4"
        onClick={() => setErrorMessage("LinkedIn login en backend todavía no disponible.")}
      >
        <LinkedInIcon />
        Continuar con LinkedIn
      </Button>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-[0.5px] bg-black/10 flex-1" />
        <span className="text-[12px] text-text-secondary-light">o con tu correo</span>
        <div className="h-[0.5px] bg-black/10 flex-1" />
      </div>

      <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
        <Input
          label="Nombres"
          name="name"
          autoComplete="given-name"
          placeholder="Tus nombres"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Apellidos"
          name="lastName"
          autoComplete="family-name"
          placeholder="Tus apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <Input
          label="Correo electrónico"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
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

        <label className="flex items-start gap-3 rounded-lg border border-black/10 bg-light-bg p-3 text-[13px] text-text-primary-light cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 size-4 rounded border-black/20 accent-amber-accent"
          />
          <span>
            Acepto los{" "}
            <a href="#" className="text-amber-accent font-medium hover:underline">
              términos y condiciones
            </a>
            .
          </span>
        </label>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting || !acceptedTerms}
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta →"}
        </Button>
      </form>

      {showLoginLink ? (
        <p className="text-center text-[13px] text-text-secondary-light">
          ¿Ya tienes cuenta?{" "}
          {onSwitchToLogin ? (
            <button
              type="button"
              className="text-amber-accent hover:underline font-medium"
              onClick={onSwitchToLogin}
            >
              Inicia sesión
            </button>
          ) : (
            <Link href="/login" className="text-amber-accent hover:underline font-medium">
              Inicia sesión
            </Link>
          )}
        </p>
      ) : null}
    </>
  );
}
