import { api } from "@/lib/api";

export const DiagnosticService = {
  getQuestions: async () => {
    const { data } = await api.get("/Diagnostico/preguntas");
    return data;
  },

  start: async () => {
    const { data } = await api.post("/Diagnostico/iniciar");
    return data;
  },

  sendAnswers: async (payload: {
    diagnosticoId: number;
    respuestas: { preguntaId: number; opcionId: number }[];
  }) => {
    const { data } = await api.post("/Diagnostico/responder", payload);
    return data;
  },

  getMyRoute: async () => {
    const { data } = await api.get("/Rutas/mi-ruta");
    return data;
  },

  getResult: async (id: number) => {
    const { data } = await api.get(`/Diagnostico/resultado/${id}`);
    return data;
  },
};