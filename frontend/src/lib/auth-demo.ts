import type { AuthResponse } from "@/lib/auth-client";
import type { UserAccountType } from "@/lib/auth-types";

/** Forzar demo siempre (útil en demos sin backend). */
export function isAuthDemoForced(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_DEMO_MODE === "true";
}

/** Registro/login de empresa aún sin API estable — usar demo hasta que el backend esté listo. */
export function usesDemoByDefault(accountType: UserAccountType): boolean {
  if (isAuthDemoForced()) return true;
  return accountType === "empresa";
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
