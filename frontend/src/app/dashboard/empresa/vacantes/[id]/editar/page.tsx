"use client";

import { useParams } from "next/navigation";
import { useVacantesStore } from "@/store/vacantes.store";
import { HeaderEmpresa, VacanteForm } from "@/components/empresa";

export default function EditarVacantePage() {
  const params = useParams<{ id: string }>();
  const vacanteId = Number(params.id);

  const { vacantes } = useVacantesStore();

  const vacante = vacantes.find((v) => v.id === vacanteId);

  const skillsCatalogo = [
    { skillId: 1, skillNombre: "Excel" },
    { skillId: 2, skillNombre: "SQL" },
    { skillId: 3, skillNombre: "Comunicación" },
  ];

  if (!vacante) return <p>Cargando...</p>;

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
