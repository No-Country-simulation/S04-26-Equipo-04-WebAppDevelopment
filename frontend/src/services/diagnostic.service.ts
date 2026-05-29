import { api } from "@/lib/api";
import { authRequestConfig } from "@/lib/auth-request-config";

export const DiagnosticService = {
  getQuestions: async (token: string | null = null) => {
    const { data } = await api.get("/Diagnostico/preguntas", authRequestConfig(token));
    return data;
  },

  start: async (token: string | null = null) => {
    const { data } = await api.post("/Diagnostico/iniciar", undefined, authRequestConfig(token));
    return data;
  },

  sendAnswers: async (
    payload: {
      diagnosticoId: number;
      respuestas: { preguntaId: number; opcionId: number }[];
    },
    token: string | null = null
  ) => {
    const { data } = await api.post("/Diagnostico/responder", payload, authRequestConfig(token));
    return data;
  },

  getMyRoute: async (token: string | null = null) => {
    const { data } = await api.get("/Rutas/mi-ruta", authRequestConfig(token));
    return data;
  },

  getResult: async (id: number, token: string | null = null) => {
    const { data } = await api.get(`/Diagnostico/resultado/${id}`, authRequestConfig(token));
    return data;
  },
};
