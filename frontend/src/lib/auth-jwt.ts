import type { UserAccountType } from "@/lib/auth-types";

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

/** Tokens demo locales: demo-{empresa|profesional}-… */
function parseAccountTypeFromDemoToken(token: string): UserAccountType | null {
  if (token.startsWith("demo-empresa-")) return "empresa";
  if (token.startsWith("demo-profesional-")) return "profesional";
  return null;
}

/** Lee tipoUsuario del JWT del backend o del token demo. */
export function parseAccountTypeFromToken(token: string): UserAccountType | null {
  const demoTipo = parseAccountTypeFromDemoToken(token);
  if (demoTipo) return demoTipo;

  try {
    const segment = token.split(".")[1];
    if (!segment) return null;

    const payload = JSON.parse(atob(segment.replace(/-/g, "+").replace(/_/g, "/"))) as Record<
      string,
      unknown
    >;

    const role = payload[ROLE_CLAIM] ?? payload.role;
    if (role === "empresa" || role === "profesional") {
      return role;
    }
  } catch {
    return null;
  }
  return null;
}
