"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import {
  EmptyState,
  HeaderEmpresa,
  LoadingCards,
  MatchCandidateCard,
} from "@/components/empresa";

import { useMarketplaceStore } from "@/store/marketplace.store";

export default function VacanteMatchPage() {
  const params = useParams();

  const vacanteId = Number(params.id);

  const {
    matches,
    loadingMatches,
    error,
    getMatches,
    clearMatches,
  } = useMarketplaceStore();

  useEffect(() => {
    if (vacanteId) {
      getMatches(vacanteId);
    }

    return () => clearMatches();
  }, [vacanteId, getMatches, clearMatches]);

  return (
    <div>
      <HeaderEmpresa
        title="Match Inteligente"
        description="Compatibilidad automática entre candidatos y la vacante seleccionada."
      />

      {loadingMatches && <LoadingCards />}

      {!loadingMatches && error && (
        <EmptyState
          title="No fue posible cargar los matches"
          description={error}
        />
      )}

      {!loadingMatches && !error && matches.length === 0 && (
        <EmptyState
          title="No se encontraron candidatos"
          description="Todavía no existen candidatos compatibles para esta vacante."
        />
      )}

      {!loadingMatches && !error && matches.length > 0 && (
        <div className="space-y-5 mt-6">
          {matches.map((candidate) => (
            <MatchCandidateCard
              key={candidate.perfilId}
              candidate={candidate}
            />
          ))}
        </div>
      )}
    </div>
  );
}