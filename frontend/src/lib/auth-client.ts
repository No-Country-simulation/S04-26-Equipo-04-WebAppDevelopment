"use client";

import type { UserAccountType } from "@/lib/auth-types";

export type AuthMode = "login" | "register";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  accountType?: UserAccountType;
};

type GoogleAuthPayload = {
  mode: AuthMode;
};

export type GoogleAuthResponse = {
  authUrl?: string;
};

export type AuthResponse = {
  id: number;
  nombre: string;
  email: string;
  token: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://s04-26-equipo-04-webappdevelopment.onrender.com";

async function postAuth<TPayload, TResponse = unknown>(path: string, payload: TPayload): Promise<TResponse | null> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type") ?? "";
  let data: unknown = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text ? { message: text } : null;
  }

  if (!response.ok) {
    if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
      throw new Error(data.message);
    }
    throw new Error("Error de autenticación");
  }

  return data as TResponse;
}

/** Contrato API: docs/contrato_API-Guia_Front/01-Guia-Autenticacion.md (camelCase) */
export async function loginRequest(payload: LoginPayload) {
  const backendPayload = {
    email: payload.email,
    password: payload.password,
  };
  return postAuth<typeof backendPayload, AuthResponse>("/api/Auth/login", backendPayload);
}

export async function registerRequest(payload: RegisterPayload) {
  const backendPayload = {
    nombre: payload.name,
    apellido: payload.lastName,
    email: payload.email,
    password: payload.password,
    tipoUsuario: payload.accountType ?? "profesional",
  };
  return postAuth<typeof backendPayload, AuthResponse>("/api/Auth/register", backendPayload);
}

export async function googleAuthRequest(payload: GoogleAuthPayload) {
  return postAuth<GoogleAuthPayload, GoogleAuthResponse>("/api/auth/google", payload);
}
