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
import { getAccountType, getPostAuthPath } from "@/lib/auth-session";

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

      if (updates.tab) {
        params.set("tab", updates.tab);
        if (updates.tab === "login") {
          params.delete("tipo");
        }
      }

      if (updates.tipo && (updates.tab === "register" || tab === "register")) {
        params.set("tipo", updates.tipo);
      }

      router.replace(`/login?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, tab],
  );

  const goAfterAuth = useCallback(() => {
    router.push(getPostAuthPath(getAccountType()));
  }, [router]);

  const registerGoAfterAuth = useCallback(() => {
    if (getAccountType() === "profesional") {
      router.push("/diagnostic");
      return;
    }
    router.push(getPostAuthPath("empresa"));
  }, [router]);

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
        subtitle: "Entra con el correo y la contraseña de tu cuenta.",
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

      {tab === "register" ? (
        <>
          <p className="text-[13px] text-text-secondary-light mb-2 font-medium">
            ¿Cómo quieres usar TalentRenew?
          </p>
          <AccountTypePicker
            value={accountType}
            onChange={(tipo) => setParams({ tab: "register", tipo })}
          />
        </>
      ) : null}

      {tab === "register" && accountType === "empresa" ? (
        <p className="text-[12px] text-text-secondary-light mb-4 -mt-2 leading-snug">
          El servidor guarda tu cuenta como{" "}
          <span className="font-medium text-primary-navy">empresa</span>. Nombre de empresa, sector
          y tamaño se guardan en este navegador hasta el módulo de empresas en la API.
        </p>
      ) : null}

      {tab === "login" ? (
        <LoginForm
          onSuccess={goAfterAuth}
          onSwitchToRegister={() => setParams({ tab: "register", tipo: "profesional" })}
        />
      ) : accountType === "empresa" ? (
        <CompanyRegisterForm
          onSuccess={registerGoAfterAuth}
          onSwitchToLogin={() => setParams({ tab: "login" })}
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
            onSwitchToLogin={() => setParams({ tab: "login" })}
          />
        </>
      )}
    </Card>
  );
}
