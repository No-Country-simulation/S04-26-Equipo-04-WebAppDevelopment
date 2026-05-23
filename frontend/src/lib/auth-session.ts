"use client";

import type { AuthResponse } from "@/lib/auth-client";
import type { UserAccountType } from "@/lib/auth-types";
import { isDemoToken } from "@/lib/auth-demo";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const TYPE_KEY = "auth_tipo";
const DEMO_KEY = "auth_demo";

export type StoredAuthUser = {
  id: number;
  nombre: string;
  email: string;
  tipoUsuario: UserAccountType;
  demoMode: boolean;
};

export type AuthSessionMeta = {
  tipoUsuario: UserAccountType;
  demoMode?: boolean;
};

export function saveAuthSession(response: AuthResponse, meta: AuthSessionMeta): void {
  const demoMode = meta.demoMode ?? isDemoToken(response.token);

  localStorage.setItem(TOKEN_KEY, response.token);
  localStorage.setItem(TYPE_KEY, meta.tipoUsuario);
  localStorage.setItem(DEMO_KEY, demoMode ? "1" : "0");
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      id: response.id,
      nombre: response.nombre,
      email: response.email,
      tipoUsuario: meta.tipoUsuario,
      demoMode,
    } satisfies StoredAuthUser),
  );
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): StoredAuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredAuthUser;
    return {
      ...parsed,
      tipoUsuario: parsed.tipoUsuario ?? (localStorage.getItem(TYPE_KEY) as UserAccountType) ?? "profesional",
      demoMode: parsed.demoMode ?? localStorage.getItem(DEMO_KEY) === "1",
    };
  } catch {
    return null;
  }
}

export function getAccountType(): UserAccountType {
  const user = getAuthUser();
  if (user?.tipoUsuario) return user.tipoUsuario;
  const stored = typeof window !== "undefined" ? localStorage.getItem(TYPE_KEY) : null;
  return stored === "empresa" ? "empresa" : "profesional";
}

export function isDemoSession(): boolean {
  const user = getAuthUser();
  if (user?.demoMode) return true;
  return isDemoToken(getAuthToken());
}

export function clearAuthSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TYPE_KEY);
  localStorage.removeItem(DEMO_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export function getPostAuthPath(tipo: UserAccountType): string {
  return tipo === "empresa" ? "/dashboard/company/search" : "/dashboard";
}
