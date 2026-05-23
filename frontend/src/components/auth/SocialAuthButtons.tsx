"use client";

import { Button } from "@/components/Button";
import { GoogleIcon } from "@/components/auth/auth-icons";
import { demoSocialAuth } from "@/lib/auth-actions";
import { isAuthDemoForced } from "@/lib/auth-demo";
import { saveAuthSession } from "@/lib/auth-session";
import type { UserAccountType } from "@/lib/auth-types";

type SocialAuthButtonsProps = {
  /** Solo aplica en registro demo; en login el rol viene de la cuenta existente. */
  accountType?: UserAccountType;
  dividerLabel?: string;
  onSuccess?: () => void;
};

export function SocialAuthButtons({
  accountType = "profesional",
  dividerLabel = "o continuá con",
  onSuccess,
}: SocialAuthButtonsProps) {
  const oauthReady = isAuthDemoForced();

  const handleGoogle = () => {
    if (!oauthReady) {
      return;
    }
    const { response, demoMode } = demoSocialAuth("google", accountType);
    saveAuthSession(response, { tipoUsuario: accountType, demoMode });
    onSuccess?.();
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[0.5px] bg-black/10 flex-1" />
        <span className="text-[12px] text-text-secondary-light">{dividerLabel}</span>
        <div className="h-[0.5px] bg-black/10 flex-1" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full mb-3"
        disabled={!oauthReady}
        onClick={handleGoogle}
        title={oauthReady ? undefined : "Inicio con Google estará disponible cuando el backend lo active"}
      >
        <GoogleIcon />
        Continuar con Google
      </Button>

      {!oauthReady ? (
        <p className="text-[12px] text-text-secondary-light text-center mb-6 leading-snug">
          Inicio con Google llegará pronto. Por ahora usá correo y contraseña (profesional o empresa).
        </p>
      ) : (
        <p className="text-[12px] text-text-secondary-light text-center mb-6 leading-snug">
          Modo demo: Google simula el acceso sin cuenta real en el servidor.
        </p>
      )}
    </>
  );
}
