"use client";

import { type FormEvent, useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { registerCompanyWithFallback } from "@/lib/auth-actions";
import { saveAuthSession, saveCompanyProfileLocal } from "@/lib/auth-session";
import type { UserAccountType } from "@/lib/auth-types";
import { isAuthDemoForced } from "@/lib/auth-demo";

type CompanyRegisterFormProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  showLoginLink?: boolean;
};

const SECTORS = ["Tecnología", "Finanzas", "Salud", "Educación", "RRHH", "Otro"];
const SIZES = ["1-10 empleados", "10-50 empleados", "50-200 empleados", "200+ empleados"];

export function CompanyRegisterForm({
  onSuccess,
  onSwitchToLogin,
  showLoginLink = true,
}: CompanyRegisterFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const accountType: UserAccountType = "empresa";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const profile = {
        companyName: companyName.trim(),
        sector,
        companySize,
        contactName: contactName.trim(),
        email: email.trim(),
        password,
      };
      const { response, demoMode } = await registerCompanyWithFallback(profile);
      saveCompanyProfileLocal(profile);
      saveAuthSession(response, { tipoUsuario: accountType, demoMode });
      onSuccess?.();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No se pudo crear la cuenta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClass =
    "w-full px-3.5 py-2.5 rounded-lg border-[0.5px] border-black/10 bg-white text-[14px] outline-none text-primary-navy";

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

      <p className="text-amber-accent text-[11px] uppercase tracking-wide mb-4 font-medium">
        Acceso para empresas
        {isAuthDemoForced() ? " · modo demo forzado" : ""}
      </p>

      <SocialAuthButtons
        accountType={accountType}
        showLinkedIn={false}
        dividerLabel="o registrate con"
        onSuccess={onSuccess}
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="h-[0.5px] bg-black/10 flex-1" />
        <span className="text-[12px] text-text-secondary-light">o con tu correo corporativo</span>
        <div className="h-[0.5px] bg-black/10 flex-1" />
      </div>

      <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
        <Input
          label="Nombre de la empresa"
          name="companyName"
          placeholder="Tu empresa"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <div>
          <label className="text-[14px] font-medium text-text-primary-light mb-2 block">
            Sector / Industria
          </label>
          <select
            className={selectClass}
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            required
          >
            <option value="">Selecciona un sector</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[14px] font-medium text-text-primary-light mb-2 block">
            Tamaño de la empresa
          </label>
          <select
            className={selectClass}
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            required
          >
            <option value="">Selecciona un rango</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Nombre del contacto"
          name="contactName"
          placeholder="Tu nombre"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        />
        <Input
          label="Correo corporativo"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="tu@empresa.com"
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

        <Button type="submit" variant="dark" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta empresa →"}
        </Button>
      </form>

      {showLoginLink ? (
        <p className="text-center text-[13px] text-text-secondary-light mb-4">
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

      <div className="bg-light-bg rounded-lg p-3 flex items-start gap-2">
        <Shield className="text-text-secondary-light shrink-0 mt-0.5 size-3.5" />
        <p className="text-text-secondary-light text-[12px]">
          Tus datos están protegidos. Solo contactamos talento verificado.
        </p>
      </div>
    </>
  );
}
