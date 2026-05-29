import { create } from "zustand";
import * as marketplaceService from "@/services/marketplace.service";
import { MatchCandidate, TalentProfile } from "../../types";

interface MarketplaceStore {
  talentos: TalentProfile[];
  matches: MatchCandidate[];

  loadingTalentos: boolean;
  loadingMatches: boolean;

  error: string | null;

  getTalentos: () => Promise<void>;
  getMatches: (vacanteId: number) => Promise<void>;

  clearMatches: () => void;
}

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
  talentos: [],
  matches: [],

  loadingTalentos: false,
  loadingMatches: false,

  error: null,

  getTalentos: async () => {
    set({ loadingTalentos: true, error: null });

    try {
      const talentos = await marketplaceService.getTalentosMarketplace();

      set({ talentos });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error cargando talentos",
      });
    } finally {
      set({ loadingTalentos: false });
    }
  },
  getMatches: async (vacanteId: number) => {
    set({ loadingMatches: true, error: null });

    try {
      const matches = await marketplaceService.getMatchesParaVacante(
        vacanteId
      );

      set({ matches });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error obteniendo matches",
      });
    } finally {
      set({ loadingMatches: false });
    }
  },

  clearMatches: () => set({ matches: [] }),
}));