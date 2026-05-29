"use client";

import { useEffect, useState } from "react";
import { HeaderEmpresa, VacanteForm } from "@/components/empresa";
import { getSkillsCatalogo, SkillCatalogo } from "@/services/skills.service";

export default function NuevaVacantePage() {
  const [skillsCatalogo, setSkillsCatalogo] = useState<SkillCatalogo[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

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

  return (
    <>
      <HeaderEmpresa
        className="mb-6"
        title="Nueva Vacante"
        description="Complete los detalles de la nueva vacante."
      />
      {loadingSkills ? <p>Cargando skills...</p> : <VacanteForm skillsCatalogo={skillsCatalogo} />}
    </>
  );
}
