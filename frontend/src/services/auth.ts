import { api } from "@/lib/api";
import { AxiosError } from "axios";

type BackendError = {
  message?: string;
};

export type UserRole = "profesional" | "empresa";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  tipoUsuario:  UserRole;
};

export type AuthResponse = {
  id: number;
  nombre: string;
  email: string;
  token: string;
  hizoDiagnostico?: boolean;
};

// LOGIN
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>("/Auth/login", payload);
    return data;
  } catch (error) {
    const err = error as AxiosError<BackendError>;

    throw new Error(
      err.response?.data?.message || "Error al iniciar sesión"
    );
  }
};

// REGISTER
export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>("/Auth/register", payload);
    return data;
  } catch (error) {
    const err = error as AxiosError<BackendError>;
    throw new Error(
      err.response?.data?.message || "Error al registrarse"
    );
  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};