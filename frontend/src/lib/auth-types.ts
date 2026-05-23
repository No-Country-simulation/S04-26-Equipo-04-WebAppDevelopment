export type UserAccountType = "profesional" | "empresa";

export type AuthTab = "login" | "register";

export const ACCOUNT_TYPE_LABELS: Record<UserAccountType, string> = {
  profesional: "Persona / Profesional",
  empresa: "Empresa",
};
