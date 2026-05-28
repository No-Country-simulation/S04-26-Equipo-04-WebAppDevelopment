import { HeaderEmpresa, VacanteForm } from "@/components/empresa";

export default function NuevaVacantePage() {
  const skillsCatalogo = [
    { skillId: 1, skillNombre: "Excel" },
    { skillId: 2, skillNombre: "SQL" },
    { skillId: 3, skillNombre: "Comunicación" },
  ];

  return (
    <>
      <HeaderEmpresa
        className="mb-6"
        title="Nueva Vacante"
        description="Complete los detalles de la nueva vacante."
      />
      <VacanteForm skillsCatalogo={skillsCatalogo} />
    </>
  );
}
