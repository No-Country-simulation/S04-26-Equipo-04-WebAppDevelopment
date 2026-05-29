"use client";

import Link from "next/link";

import { EstadoPostulacion, Postulacion } from "@/types/postulaciones.types";

import { Button } from "@/components/Button";

import { EstadoPostulacionBadge } from "./EstadoPostulacionBadge";

interface Props {
  postulacion: Postulacion;

  onChangeEstado: (estado: EstadoPostulacion, feedback: string | null) => Promise<void>;
}

export const PostulacionCard = ({ postulacion, onChangeEstado }: Props) => {
  const handleAction = async (estado: EstadoPostulacion) => {
    try {
      await onChangeEstado(estado, null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
          bg-white
          border
          rounded-2xl
          p-5
          space-y-5
        "
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{postulacion.profesionalNombre}</h3>

          <p className="text-sm text-gray-500">{postulacion.profesionalEmail}</p>
        </div>

        <EstadoPostulacionBadge estado={postulacion.estadoSeleccion} />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant="secondary" onClick={() => handleAction("en_proceso")}>
          En proceso
        </Button>

        <Link
          href={`/dashboard/empresa/vacantes/${postulacion.vacanteId}/postulaciones/${postulacion.id}`}
        >
          <Button variant="primary">Evaluar candidato</Button>
        </Link>

        <Button variant="primary" onClick={() => handleAction("rechazado")}>
          Rechazar
        </Button>
      </div>

      {postulacion.feedbackEmpresa && (
        <div
          className="
              bg-gray-50
              rounded-xl
              p-4
            "
        >
          <p className="text-sm font-medium mb-1">Feedback</p>

          <p className="text-sm text-gray-600">{postulacion.feedbackEmpresa}</p>
        </div>
      )}
    </div>
  );
};
