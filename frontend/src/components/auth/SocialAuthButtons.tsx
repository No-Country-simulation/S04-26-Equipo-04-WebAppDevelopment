"use client";

import { Button } from "@/components/Button";
import { GoogleIcon, LinkedInIcon } from "@/components/auth/auth-icons";
import { demoSocialAuth } from "@/lib/auth-actions";
import { saveAuthSession } from "@/lib/auth-session";
import type { UserAccountType } from "@/lib/auth-types";

type SocialProvider = "google" | "linkedin";

type SocialAuthButtonsProps = {
  /** En registro define el rol demo; en login el JWT real mandará al cerrar OAuth. */
  accountType?: UserAccountType;
  /** LinkedIn tiene sentido sobre todo para talento profesional. */
  showLinkedIn?: boolean;
  dividerLabel?: string;
  onSuccess?: () => void;
};

export function SocialAuthButtons({
  accountType = "profesional",
  showLinkedIn = accountType === "profesional",
  dividerLabel = "o continuá con",
  onSuccess,
}: SocialAuthButtonsProps) {
  const handleSocial = (provider: SocialProvider) => {
    const { response, demoMode } = demoSocialAuth(provider, accountType);
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
        onClick={() => handleSocial("google")}
      >
        <GoogleIcon />
        Continuar con Google
      </Button>

      {showLinkedIn ? (
        <Button
          type="button"
          variant="ghost"
          className="w-full mb-3"
          onClick={() => handleSocial("linkedin")}
        >
          <LinkedInIcon />
          Continuar con LinkedIn
        </Button>
      ) : null}

      <p className="text-[12px] text-text-secondary-light text-center mb-6 leading-snug">
        Acceso de prueba: simula el inicio hasta que el backend active OAuth real.
        {showLinkedIn ? " LinkedIn es clave para perfiles profesionales." : null}
      </p>
    </>
  );
}
