"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useVacantesStore } from "@/store/vacantes.store";
import { HeaderEmpresa, VacanteForm } from "@/components/empresa";
import { getSkillsCatalogo, SkillCatalogo } from "@/services/skills.service";

export default function EditarVacantePage() {
  const params = useParams<{ id: string }>();
  const vacanteId = Number(params.id);

  const { vacantes } = useVacantesStore();
  const [skillsCatalogo, setSkillsCatalogo] = useState<SkillCatalogo[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  const vacante = vacantes.find((v) => v.id === vacanteId);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const skills = await getSkillsCatalogo();
        setSkillsCatalogo(skills);
      } finally {
        setLoadingSkills(false);
      }
    };

    loadSkills();
  }, []);

  if (!vacante || loadingSkills) return <p>Cargando...</p>;

  return (
    <>
      <HeaderEmpresa
        className="mb-6"
        title="Editar Vacante"
        description="Actualice los detalles de la vacante."
      />
      <VacanteForm initialData={vacante} skillsCatalogo={skillsCatalogo} vacanteId={vacanteId} />
    </>
  );
}
