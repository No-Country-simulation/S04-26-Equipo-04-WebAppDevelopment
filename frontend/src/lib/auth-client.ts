"use client";

export type AuthMode = "login" | "register";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type GoogleAuthPayload = {
  mode: AuthMode;
};

export type GoogleAuthResponse = {
  authUrl?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function postAuth<TPayload, TResponse = unknown>(path: string, payload: TPayload): Promise<TResponse | null> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error de autenticación");
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return null;
}

export async function loginRequest(payload: LoginPayload) {
  return postAuth<LoginPayload>("/api/auth/login", payload);
}

export async function registerRequest(payload: RegisterPayload) {
  return postAuth<RegisterPayload>("/api/auth/register", payload);
}

export async function googleAuthRequest(payload: GoogleAuthPayload) {
  return postAuth<GoogleAuthPayload, GoogleAuthResponse>("/api/auth/google", payload);
}
