import { EstadoPostulacion } from "@/types/postulaciones.types";

interface Props {
  estado: EstadoPostulacion;
}

export const EstadoPostulacionBadge = ({
  estado,
}: Props) => {
  const styles = {
    aplicado:
      "bg-gray-100 text-gray-700",

    en_proceso:
      "bg-blue-100 text-blue-700",

    rechazado:
      "bg-red-100 text-red-700",

    seleccionado:
      "bg-green-100 text-green-700",
  };

  const labels = {
    aplicado: "Aplicado",

    en_proceso: "En proceso",

    rechazado: "Rechazado",

    seleccionado: "Seleccionado",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[estado]}
      `}
    >
      {labels[estado]}
    </span>
  );
};