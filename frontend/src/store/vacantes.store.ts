import { create } from "zustand";
import * as vacantesService from "@/services/vacantes.service";
import { VacanteFormData } from "@/schemas/vacante.schema";
import { Vacante } from "../../types";

interface VacantesStore {
  vacantes: Vacante[];
  vacanteDetalle: Vacante | null;
  error: string | null;
  loading: boolean;
  loadingDetalle: boolean;
  getVacantes: () => Promise<void>;
  getVacanteById: (id: number) => Promise<void>;

  clearVacanteDetalle: () => void;
  createVacante: (data: VacanteFormData) => Promise<void>;
  updateVacante: (id: number, data: VacanteFormData, estado: "abierta" | "cerrada") => Promise<void>;
  deleteVacante: (id: number) => Promise<void>;
}

export const useVacantesStore = create<VacantesStore>((set, get) => ({
  vacantes: [],
  vacanteDetalle: null,

  loading: false,
  loadingDetalle: false,

  error: null,


  getVacantes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await vacantesService.getMisVacantes();
      set({ vacantes: data });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error obteniendo vacantes",
      });
    } finally {
      set({ loading: false });
    }
  },
  getVacanteById: async (id) => {
    set({
      loadingDetalle: true,
      error: null,
    });

    try {
      const data =
        await vacantesService.getVacanteById(id);

      set({
        vacanteDetalle: data,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error obteniendo vacante",
      });
    } finally {
      set({
        loadingDetalle: false,
      });
    }
  },

  clearVacanteDetalle: () =>
    set({
      vacanteDetalle: null,
    }),
  createVacante: async (data) => {
    try {
      const nueva = await vacantesService.crearVacante(data);
      set((state) => ({
        vacantes: [nueva, ...state.vacantes],
      }));
    } catch (error) {
      console.error("Error creando vacante", error);
    }
  },
  updateVacante: async (id, data) => {
    try {
      const updated = await vacantesService.actualizarVacante(id, data);

      set((state) => ({
        vacantes: state.vacantes.map((v) =>
          v.id === id ? updated : v
        ), vacanteDetalle: updated,
      }));


    } catch (error) {
      console.error("Error actualizando vacante", error);
    }
  },
  deleteVacante: async (id: number) => {
    try {
      await vacantesService.eliminarVacante(id);

      const updated = get().vacantes.filter((v) => v.id !== id);

      set({ vacantes: updated });
    } catch (error) {
      console.error("Error eliminando vacante", error);
    }
  },
}));


