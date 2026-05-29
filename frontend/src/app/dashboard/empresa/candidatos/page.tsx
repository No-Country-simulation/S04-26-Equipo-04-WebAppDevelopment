import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { HeaderEmpresa } from "@/components/empresa/HeaderEmpresa";

export default function CandidatosPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <HeaderEmpresa
          title="Gestión de candidatos"
          description="Estado actual de tus búsquedas."
        />
        <Badge variant="amber">3 procesos activos</Badge>
      </div>

      <div className="space-y-5">
        <div
          className={`rounded-xl border p-6 flex items-start justify-between border-amber-accent border-l-3 bg-white`}
        >
          {/* Left */}
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-primary-navy text-white flex items-center justify-center font-medium">
              CL
            </div>

            {/* Info */}
            <div>
              <h4 className="text-text-primary-light font-medium text-sm">Claudia López</h4>
              <p className="text-text-secondary-light text-sm mb-3">Gerente de RRHH</p>

              {/* Progress */}

              <div className="flex items-center gap-3 mb-3">
                <p className="text-text-secondary-light text-sm">Compatibilidad:</p>

                <div className="w-50 h-2 bg-border-light rounded-full overflow-hidden">
                  <div className="h-full bg-amber-accent rounded-full" style={{ width: 92 }} />
                </div>

                <p className="text-amber-accent text-sm font-medium">92%</p>
              </div>

              <div className="flex gap-3 mt-2">
                <Button variant="ghost">Ver perfil</Button>
                <Button variant="primary">Registrar feedback</Button>
              </div>
            </div>
          </div>

          {/* Status */}
          <Badge variant="green">Preseleccionada</Badge>
        </div>
        <div
          className={`rounded-xl border border-border-light p-6 flex items-start justify-between bg-white`}
        >
          {/* Left */}
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-amber-accent text-white flex items-center justify-center font-medium">
              RM
            </div>

            {/* Info */}
            <div>
              <h4 className="text-text-primary-light font-medium text-sm">Roberto Méndez</h4>
              <p className="text-text-secondary-light text-sm mb-3">Jefe de Ventas</p>

              {/* Progress */}

              <div className="flex items-center gap-3 mb-3">
                <p className="text-text-secondary-light text-sm">Compatibilidad:</p>

                <div className="w-50 h-2 bg-border-light rounded-full overflow-hidden">
                  <div className="h-full bg-amber-accent rounded-full" style={{ width: 85 }} />
                </div>

                <p className="text-amber-accent text-sm font-medium">85%</p>
              </div>

              {/* Actions */}

              <div className="flex gap-3 mt-2">
                <Button variant="ghost">Ver perfil</Button>
                <Button variant="primary">Registrar feedback</Button>
              </div>
            </div>
          </div>

          {/* Status */}
          <Badge variant="inProgress">En evaluación</Badge>
        </div>
        <div
          className={`rounded-xl border p-6 flex items-start justify-between border-border-light bg-white`}
        >
          {/* Left */}
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-[#E0E0E0] text-[#9E9E9E] flex items-center justify-center font-medium">
              JP
            </div>

            {/* Info */}
            <div>
              <h4 className="text-text-primary-light font-medium text-sm">Jorge Pérez</h4>
              <p className="text-text-secondary-light text-sm mb-3">Analista Senior</p>

              {/* Feedback */}

              <div className="bg-gray-100 text-text-secondary-light text-sm p-4 rounded-lg">
                <span className="font-medium text-text-primary-light">Feedback registrado:</span>{" "}
                Buscamos candidatos con mayor experiencia en ERP.
              </div>
            </div>
          </div>

          {/* Status */}
          <Badge variant="gray">No avanzó</Badge>
        </div>
      </div>
    </>
  );
}
