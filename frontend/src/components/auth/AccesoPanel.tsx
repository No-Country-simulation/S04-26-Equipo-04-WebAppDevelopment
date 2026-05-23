"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AccountTypePicker } from "@/components/auth/AccountTypePicker";
import { CompanyRegisterForm } from "@/components/auth/CompanyRegisterForm";
import { DemoModeBanner } from "@/components/auth/DemoModeBanner";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/Card";
import type { AuthTab } from "@/lib/auth-types";
import type { UserAccountType } from "@/lib/auth-types";
import { getPostAuthPath } from "@/lib/auth-session";
import { usesDemoByDefault } from "@/lib/auth-demo";

function parseTab(value: string | null): AuthTab {
  return value === "register" ? "register" : "login";
}

function parseTipo(value: string | null): UserAccountType {
  return value === "empresa" ? "empresa" : "profesional";
}

export function AccesoPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = parseTab(searchParams.get("tab"));
  const accountType = parseTipo(searchParams.get("tipo"));

  const setParams = useCallback(
    (updates: { tab?: AuthTab; tipo?: UserAccountType }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.tab) params.set("tab", updates.tab);
      if (updates.tipo) params.set("tipo", updates.tipo);
      router.replace(`/login?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const goAfterAuth = useCallback(() => {
    router.push(getPostAuthPath(accountType));
  }, [router, accountType]);

  const registerGoAfterAuth = useCallback(() => {
    if (accountType === "profesional") {
      router.push("/diagnostic");
      return;
    }
    router.push(getPostAuthPath("empresa"));
  }, [router, accountType]);

  const tabButtonClass = (active: boolean) =>
    `flex-1 py-2.5 text-[14px] font-medium rounded-lg transition-colors ${
      active
        ? "bg-amber-accent text-dark-base"
        : "text-text-secondary-light hover:text-primary-navy"
    }`;

  const headline = useMemo(() => {
    if (tab === "login") {
      return {
        title: "Iniciar sesión",
        subtitle: "Elige si entras como profesional o como empresa y accede a tu espacio.",
      };
    }
    if (accountType === "empresa") {
      return {
        title: "Crear cuenta empresa",
        subtitle: "Publica vacantes y encuentra talento senior con habilidades verificadas.",
      };
    }
    return {
      title: "Crear cuenta profesional",
      subtitle: "Empieza gratis: diagnóstico, perfil y oportunidades en pocos pasos.",
    };
  }, [tab, accountType]);

  return (
    <Card className="w-full max-w-lg">
      <DemoModeBanner />

      <div className="flex gap-2 p-1 bg-light-bg rounded-lg mb-6">
        <button
          type="button"
          className={tabButtonClass(tab === "login")}
          onClick={() => setParams({ tab: "login" })}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          className={tabButtonClass(tab === "register")}
          onClick={() => setParams({ tab: "register", tipo: accountType })}
        >
          Crear cuenta
        </button>
      </div>

      <h1 className="text-primary-navy mb-2 font-medium text-[22px]">{headline.title}</h1>
      <p className="text-text-secondary-light text-[13px] mb-6">{headline.subtitle}</p>

      <p className="text-[13px] text-text-secondary-light mb-2 font-medium">¿Cómo quieres usar TalentRenew?</p>
      <AccountTypePicker
        value={accountType}
        onChange={(tipo) => setParams({ tab, tipo })}
      />

      {usesDemoByDefault(accountType) && tab === "login" ? (
        <p className="text-[12px] text-amber-accent mb-4 -mt-2">
          El acceso de empresa está en modo demo hasta que el backend esté listo.
        </p>
      ) : null}

      {tab === "login" ? (
        <LoginForm
          accountType={accountType}
          onSuccess={goAfterAuth}
          onSwitchToRegister={() => setParams({ tab: "register", tipo: accountType })}
        />
      ) : accountType === "empresa" ? (
        <CompanyRegisterForm
          onSuccess={registerGoAfterAuth}
          onSwitchToLogin={() => setParams({ tab: "login", tipo: "empresa" })}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-accent" />
              <span className="text-[13px] text-text-secondary-light">Paso 1 de 3</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
          <RegisterForm
            onSuccess={registerGoAfterAuth}
            onSwitchToLogin={() => setParams({ tab: "login", tipo: "profesional" })}
          />
        </>
      )}
    </Card>
  );
}
