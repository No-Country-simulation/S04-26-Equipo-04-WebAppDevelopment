import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "profesional" | "empresa";

export type User = {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  role: UserRole;
  hizoDiagnostico?: boolean;
};

type AuthState = {
  user: User | null;
  token: string | null;

  setAuth: (data: {
    user: User;
    token: string;
  }) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // 👈 clave en localStorage
    }
  )
);