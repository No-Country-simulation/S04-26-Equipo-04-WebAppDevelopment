import type { AuthResponse } from "@/lib/auth-client";
import type { UserAccountType } from "@/lib/auth-types";

/** Forzar demo siempre (útil cuando no hay backend disponible). */
export function isAuthDemoForced(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_DEMO_MODE === "true";
}

/** Solo demo explícito por env; empresa ya puede registrarse con tipoUsuario en la API. */
export function usesDemoByDefault(_accountType: UserAccountType): boolean {
  return isAuthDemoForced();
}

export function createDemoAuthResponse(
  email: string,
  displayName: string,
  accountType: UserAccountType,
): AuthResponse {
  return {
    id: accountType === "empresa" ? 9001 : 9000,
    nombre: displayName,
    email,
    token: `demo-${accountType}-${Date.now()}`,
  };
}

export function isDemoToken(token: string | null): boolean {
  return Boolean(token?.startsWith("demo-"));
}
