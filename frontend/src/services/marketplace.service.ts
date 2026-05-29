import { api } from "@/lib/api";
import { AxiosError } from "axios";
import {
  MatchCandidate,
  TalentProfile,
} from "../../types";

interface BackendError {
  message?: string;
}

export const getTalentosMarketplace = async (): Promise<TalentProfile[]> => {
  try {
    const { data } = await api.get<TalentProfile[]>(
      "/Marketplace/talentos"
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<BackendError>;

    throw new Error(
      err.response?.data?.message ||
      "Error obteniendo talentos del marketplace"
    );
  }
};

export const getMatchesParaVacante = async (
  vacanteId: number
): Promise<MatchCandidate[]> => {
  try {
    const { data } = await api.get<MatchCandidate[]>(
      `/Marketplace/vacantes/${vacanteId}/match`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<BackendError>;

    throw new Error(
      err.response?.data?.message ||
      "Error obteniendo matches de candidatos"
    );
  }
};