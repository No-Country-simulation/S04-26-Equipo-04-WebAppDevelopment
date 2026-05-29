"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { HeaderEmpresa } from "@/components/empresa/HeaderEmpresa";

export default function EvaluacionesPage() {
  return (
    <>
      {/* Header */}
      <HeaderEmpresa
        title="Retroalimentación"
        description="Evaluaciones estructuradas para el talento."
      />

      {/* PENDIENTES */}
      <section className="space-y-4">
        <p className="text-xs tracking-wider text-amber-accent font-medium">PENDIENTES</p>

        <div className="bg-white border border-border-light rounded-xl p-6 space-y-6">
          {/* Header candidato */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-primary-navy font-medium">
                RM
              </div>

              <div>
                <h4 className="text-primary-navy">Roberto Méndez</h4>
                <p className="text-text-secondary-light text-sm">Jefe de Ventas</p>
              </div>
            </div>

            <Badge variant="amber">Pendiente</Badge>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <p className="text-sm text-primary-navy">Estado del candidato</p>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-primary-navy text-white text-sm">
                Preseleccionado
              </button>

              <button className="px-4 py-2 rounded-lg border border-border-light text-sm text-text-secondary-light">
                En evaluación
              </button>

              <button className="px-4 py-2 rounded-lg border border-border-light text-sm text-text-secondary-light">
                No avanza
              </button>
            </div>
          </div>

          {/* Comentario */}
          <div className="space-y-2">
            <p className="text-sm text-primary-navy">Comentario para el candidato</p>

            <textarea
              className="w-full p-4 rounded-lg border border-border-light text-sm resize-none outline-none"
              rows={4}
              placeholder="Escribe un comentario constructivo que le ayude a mejorar su perfil..."
            />
          </div>

          {/* Nota */}
          <p className="text-xs text-text-secondary-light">
            El candidato recibirá este comentario en su panel de propuestas.
          </p>

          {/* Acciones */}
          <div className="flex gap-3">
            <Button variant="ghost">Cancelar</Button>
            <Button variant="primary">Enviar retroalimentación</Button>
          </div>
        </div>
      </section>

      {/* ENVIADAS */}
      <section className="space-y-4">
        <p className="text-xs tracking-wider text-[#9E9E9E] font-medium">ENVIADAS</p>
        <div className="bg-white border border-border-light rounded-xl p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-primary-navy font-medium">
                CL
              </div>

              <div>
                <h4 className="text-primary-navy">Claudia López</h4>
                <p className="text-text-secondary-light text-sm">Gerente de RRHH</p>
              </div>
            </div>

            <Badge variant="green">Preseleccionada</Badge>
          </div>

          {/* Feedback */}
          <div className="bg-light-bg border border-border-light rounded-lg p-4 text-sm text-text-secondary-light italic">
            Retroalimentación enviada: Perfil muy completo, excelente experiencia en gestión de
            equipos.
          </div>
        </div>
      </section>
    </>
  );
}
