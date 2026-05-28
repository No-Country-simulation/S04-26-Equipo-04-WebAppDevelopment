import { create } from "zustand";
import * as vacantesService from "@/services/vacantes.service";
import { VacanteFormData } from "@/schemas/vacante.schema";

interface VacantesStore {
  vacantes: Vacante[];
  loading: boolean;
  getVacantes: () => Promise<void>;
  createVacante: (data: VacanteFormData) => Promise<void>;
  updateVacante: (id: number, data: VacanteFormData, estado: "abierta" | "cerrada") => Promise<void>;
  deleteVacante: (id: number) => Promise<void>;
}

export const useVacantesStore = create<VacantesStore>((set, get) => ({
  vacantes: [],
  loading: false,

  getVacantes: async () => {
    set({ loading: true });
    try {
      const data = await vacantesService.getMisVacantes();
      set({ vacantes: data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
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
        ),
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


