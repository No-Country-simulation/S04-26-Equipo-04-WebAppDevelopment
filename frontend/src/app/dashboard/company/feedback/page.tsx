"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function CompanyFeedback() {
  const [showModal, setShowModal] = useState(false);

  const candidates = [
    {
      initials: "CL",
      name: "Claudia López",
      role: "Gerente RRHH",
      compatibility: 80,
      status: "Preseleccionada",
      statusVariant: "green" as const,
      feedback: "Perfil muy completo, excelente experiencia en gestión de equipos.",
      bgColor: "bg-primary-navy",
    },
    {
      initials: "RM",
      name: "Roberto Méndez",
      role: "Jefe Ventas",
      compatibility: 72,
      status: "En evaluación",
      statusVariant: "navy" as const,
      feedback: null,
      bgColor: "bg-amber-accent",
    },
    {
      initials: "JP",
      name: "Jorge Pérez",
      role: "Director Financiero",
      compatibility: 68,
      status: "No avanzó",
      statusVariant: "gray" as const,
      feedback: "Buscamos mayor experiencia en herramientas de análisis predictivo.",
      bgColor: "bg-success-green",
    },
  ];

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-primary-navy mb-1 font-medium">Candidatos Preseleccionados</h2>
          <p className="text-text-secondary-light text-[14px]">
            Gestiona el estado de tus candidatos y deja retroalimentación estructurada
          </p>
        </div>
        <Badge variant="amber">3 preseleccionados</Badge>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-light-bg">
            <tr>
              <th className="text-left px-4 py-3 text-[13px] font-medium text-text-secondary-light">
                Candidato
              </th>
              <th className="text-left px-4 py-3 text-[13px] font-medium text-text-secondary-light">
                Rol buscado
              </th>
              <th className="text-left px-4 py-3 text-[13px] font-medium text-text-secondary-light">
                Compatibilidad
              </th>
              <th className="text-left px-4 py-3 text-[13px] font-medium text-text-secondary-light">
                Estado
              </th>
              <th className="text-left px-4 py-3 text-[13px] font-medium text-text-secondary-light">
                Feedback
              </th>
              <th className="text-left px-4 py-3 text-[13px] font-medium text-text-secondary-light">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="border-t border-black/10">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${candidate.bgColor} text-white flex items-center justify-center text-[13px] font-medium`}
                    >
                      {candidate.initials}
                    </div>
                    <span className="text-primary-navy text-[14px] font-medium">
                      {candidate.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-text-secondary-light text-[13px]">{candidate.role}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-accent"
                        style={{ width: `${candidate.compatibility}%` }}
                      ></div>
                    </div>
                    <span className="text-amber-accent text-[13px] font-medium">
                      {candidate.compatibility}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Badge variant={candidate.statusVariant} className="text-[11px]">
                    {candidate.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 max-w-xs">
                  {candidate.feedback ? (
                    <p className="text-text-secondary-light text-[12px] italic line-clamp-2">
                      ${"{candidate.feedback}"}
                    </p>
                  ) : (
                    <Button
                      variant="primary"
                      className="text-[12px] px-3 py-1.5"
                      onClick={() => setShowModal(true)}
                    >
                      Dejar retroalimentación
                    </Button>
                  )}
                </td>
                <td className="px-4 py-4">
                  <a href="#" className="text-amber-accent text-[13px] hover:underline">
                    Ver perfil
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="bg-light-bg rounded-lg p-4 flex items-center justify-center gap-2 mt-4">
        <Info className="text-text-secondary-light size-3.5" />
        <p className="text-text-secondary-light text-[13px]">
          No hay más candidatos preseleccionados en este momento.
        </p>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <Card className="max-w-md w-full m-4">
            <h3 className="text-primary-navy mb-4 font-medium">
              Dejar retroalimentación a Roberto Méndez
            </h3>

            <div className="mb-4">
              <label className="text-[13px] text-text-secondary-light mb-2 block">
                Estado del candidato
              </label>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-full border border-amber-accent bg-amber-accent/10 text-amber-accent text-[12px] font-medium">
                  Preseleccionado
                </button>
                <button className="flex-1 px-3 py-2 rounded-full border border-primary-navy/30 bg-light-navy text-primary-navy text-[12px] font-medium">
                  En evaluación
                </button>
                <button className="flex-1 px-3 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-600 text-[12px] font-medium">
                  No avanza
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[13px] text-text-secondary-light mb-2 block">
                Comentario (opcional)
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-[14px] outline-none resize-none"
                rows={4}
                placeholder="Deja un comentario constructivo para el profesional..."
              ></textarea>
            </div>

            <div className="bg-light-bg rounded-lg p-3 flex items-start gap-2 mb-6">
              <Info className="text-text-secondary-light shrink-0 mt-0.5 size-3.5" />
              <p className="text-text-secondary-light text-[12px]">
                El profesional recibirá este feedback en su dashboard.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => setShowModal(false)}>
                Enviar feedback →
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
