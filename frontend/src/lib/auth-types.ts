export type UserAccountType = "profesional" | "empresa";

export type AuthTab = "login" | "register";

export const ACCOUNT_TYPE_LABELS: Record<UserAccountType, string> = {
  profesional: "Persona / Profesional",
  empresa: "Empresa",
};

/** Campos extra del formulario empresa; el backend solo guarda usuario con tipoUsuario. */
export type CompanyRegisterPayload = {
  companyName: string;
  sector: string;
  companySize: string;
  contactName: string;
  email: string;
  password: string;
};
