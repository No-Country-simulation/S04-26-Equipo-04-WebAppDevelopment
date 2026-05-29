import { api } from "@/lib/api";

import {
  EstadoPostulacion,
  Postulacion,
} from "@/types/postulaciones.types";

export const getPostuladosPorVacante = async (
  vacanteId: number
): Promise<Postulacion[]> => {
  const { data } = await api.get<Postulacion[]>(
    `/Postulaciones/vacante/${vacanteId}`
  );

  return data;
};

export const cambiarEstadoPostulacion =
  async (
    postulacionId: number,
    estadoSeleccion: EstadoPostulacion,
    feedbackEmpresa: string | null
  ): Promise<Postulacion> => {
    const { data } = await api.put<Postulacion>(
      `/Postulaciones/${postulacionId}/estado`,
      {
        estadoSeleccion,
        feedbackEmpresa,
      }
    );

    return data;
  };