"use client";

import type { AuthResponse } from "@/lib/auth-client";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export type StoredAuthUser = {
  id: number;
  nombre: string;
  email: string;
};

export function saveAuthSession(response: AuthResponse): void {
  localStorage.setItem(TOKEN_KEY, response.token);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      id: response.id,
      nombre: response.nombre,
      email: response.email,
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
    return JSON.parse(raw) as StoredAuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}
