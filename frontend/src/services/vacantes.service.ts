import { api } from "@/lib/api";
import { UpdateVacantePayload, Vacante, VacantePayload } from "../../types";

export const getMisVacantes = async () => {
  const { data } = await api.get("/Vacantes/mis-vacantes");
  return data;
};

export const getVacanteById = async (id: number) => {
  const { data } = await api.get(`/Vacantes/${id}`);
  return data;
};

export const crearVacante = async (payload: VacantePayload): Promise<Vacante> => {
  const { data } = await api.post("/Vacantes", payload);
  return data;
};

export const actualizarVacante = async (id: number, payload: UpdateVacantePayload): Promise<Vacante> => {
  const { data } = await api.put(`/Vacantes/${id}`, payload);
  return data;
};

export const eliminarVacante = async (id: number) => {
  await api.delete(`/Vacantes/${id}`);
};