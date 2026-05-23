import {
  createDemoAuthResponse,
  isAuthDemoForced,
  usesDemoByDefault,
} from "@/lib/auth-demo";
import {
  loginRequest,
  registerRequest,
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from "@/lib/auth-client";
import type { CompanyRegisterPayload, UserAccountType } from "@/lib/auth-types";

export type { CompanyRegisterPayload };

export type AuthActionResult = {
  response: AuthResponse;
  demoMode: boolean;
};

async function tryRealLogin(payload: LoginPayload): Promise<AuthResponse> {
  const result = await loginRequest(payload);
  if (!result) throw new Error("No se recibió respuesta del servidor.");
  return result;
}

async function tryRealRegister(
  payload: RegisterPayload,
  accountType: UserAccountType,
): Promise<AuthResponse> {
  const result = await registerRequest({ ...payload, accountType });
  if (!result) throw new Error("No se recibió respuesta del servidor.");
  return result;
}

function demoLogin(payload: LoginPayload, accountType: UserAccountType): AuthActionResult {
  const name =
    accountType === "empresa"
      ? payload.email.split("@")[0] || "Empresa demo"
      : "Usuario demo";
  return {
    response: createDemoAuthResponse(payload.email, name, accountType),
    demoMode: true,
  };
}

function demoRegister(
  payload: RegisterPayload | CompanyRegisterPayload,
  accountType: UserAccountType,
  displayName: string,
): AuthActionResult {
  const email = payload.email.trim();
  return {
    response: createDemoAuthResponse(email, displayName, accountType),
    demoMode: true,
  };
}

/** Login: el tipo de cuenta viene del JWT; no hace falta elegirlo en el formulario. */
export async function loginWithFallback(payload: LoginPayload): Promise<AuthActionResult> {
  try {
    const response = await tryRealLogin(payload);
    return { response, demoMode: false };
  } catch (error) {
    if (isAuthDemoForced()) {
      return demoLogin(payload, "profesional");
    }
    throw error;
  }
}

export async function registerProfessionalWithFallback(
  payload: RegisterPayload,
): Promise<AuthActionResult> {
  const accountType: UserAccountType = "profesional";

  if (usesDemoByDefault(accountType)) {
    return demoRegister(payload, accountType, `${payload.name} ${payload.lastName}`.trim());
  }

  try {
    const response = await tryRealRegister(payload, accountType);
    return { response, demoMode: false };
  } catch (error) {
    if (isAuthDemoForced()) {
      return demoRegister(payload, accountType, `${payload.name} ${payload.lastName}`.trim());
    }
    throw error;
  }
}

export async function registerCompanyWithFallback(
  payload: CompanyRegisterPayload,
): Promise<AuthActionResult> {
  const accountType: UserAccountType = "empresa";
  const displayName = payload.companyName.trim() || payload.contactName.trim();

  if (usesDemoByDefault(accountType)) {
    return demoRegister(payload, accountType, displayName);
  }

  try {
    const [firstName, ...rest] = payload.contactName.trim().split(/\s+/);
    const response = await tryRealRegister(
      {
        name: firstName || payload.companyName,
        lastName: rest.join(" ") || "Empresa",
        email: payload.email,
        password: payload.password,
        accountType,
      },
      accountType,
    );
    return { response, demoMode: false };
  } catch (error) {
    if (isAuthDemoForced()) {
      return demoRegister(payload, accountType, displayName);
    }
    throw error;
  }
}

export function demoSocialAuth(
  provider: "google" | "linkedin",
  accountType: UserAccountType = "profesional",
): AuthActionResult {
  const email = `demo.${provider}@${accountType === "empresa" ? "empresa" : "profesional"}.local`;
  const name = provider === "google" ? "Usuario Google (demo)" : "Usuario LinkedIn (demo)";
  return {
    response: createDemoAuthResponse(email, name, accountType),
    demoMode: true,
  };
}
