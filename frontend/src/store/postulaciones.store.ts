import { create } from "zustand";

import * as postulacionesService from "@/services/postulaciones.service";

import {
  EstadoPostulacion,
  Postulacion,
} from "@/types/postulaciones.types";

interface PostulacionesStore {
  postulaciones: Postulacion[];

  loading: boolean;

  error: string | null;

  getPostulaciones: (
    vacanteId: number
  ) => Promise<void>;

  updateEstado: (
    postulacionId: number,
    estado: EstadoPostulacion,
    feedback: string | null
  ) => Promise<void>;
}

export const usePostulacionesStore =
  create<PostulacionesStore>((set) => ({
    postulaciones: [],

    loading: false,

    error: null,

    getPostulaciones: async (vacanteId) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const postulaciones =
          await postulacionesService.getPostuladosPorVacante(
            vacanteId
          );

        set({
          postulaciones,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error cargando postulaciones",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    updateEstado: async (
      postulacionId,
      estado,
      feedback
    ) => {
      const updated =
        await postulacionesService.cambiarEstadoPostulacion(
          postulacionId,
          estado,
          feedback
        );

      set((state) => ({
        postulaciones:
          state.postulaciones.map((p) =>
            p.id === postulacionId
              ? updated
              : p
          ),
      }));
    },
  }));