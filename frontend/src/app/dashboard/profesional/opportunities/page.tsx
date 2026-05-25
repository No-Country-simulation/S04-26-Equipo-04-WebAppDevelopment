import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Info } from "lucide-react";

export default function OpportunitiesPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-primary-navy mb-1 font-medium">Mis Oportunidades</h2>
        <p className="text-text-secondary-light text-[14px]">
          Empresas que se interesaron en tu perfil
        </p>
      </div>

      <div className="space-y-3">
        <Card className="border-l-2 border-l-amber-accent">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-navy text-white flex items-center justify-center text-[14px] font-medium">
              FI
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-primary-navy text-[15px] font-medium">Finanzas Innovadoras SA</p>
                <span className="text-text-secondary-light text-[12px]">hace 2 días</span>
                <Badge variant="green" className="text-[11px]">
                  Nueva
                </Badge>
              </div>
              <h4 className="text-primary-navy mb-3 font-medium">Gerente de RRHH</h4>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-text-secondary-light text-[12px]">Compatibilidad</p>
                  <p className="text-amber-accent text-[13px] font-medium">80%</p>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-accent" style={{ width: "80%" }}></div>
                </div>
              </div>

              <p className="text-text-secondary-light text-[13px] mb-4">
                <span className="font-medium">Skills coincidentes:</span> Gestión de equipos ·
                Comunicación efectiva · Liderazgo
              </p>

              <div className="flex gap-3">
                <Button variant="primary">Ver detalles</Button>
                <Button variant="ghost">No me interesa</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-navy text-white flex items-center justify-center text-[14px] font-medium">
              TS
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-primary-navy text-[15px] font-medium">Tech Solutions</p>
                <span className="text-text-secondary-light text-[12px]">hace 5 días</span>
                <Badge variant="navy" className="text-[11px]">
                  En evaluación
                </Badge>
              </div>
              <h4 className="text-primary-navy mb-3 font-medium">Coordinadora de Personas</h4>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-text-secondary-light text-[12px]">Compatibilidad</p>
                  <p className="text-amber-accent text-[13px] font-medium">72%</p>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-accent" style={{ width: "72%" }}></div>
                </div>
              </div>

              <div className="bg-light-bg border border-black/10 rounded-lg p-3 flex items-start gap-2">
                <Info size={14} className="text-text-secondary-light shrink-0 mt-0.5" />
                <p className="text-text-secondary-light text-[13px]">
                  La empresa está revisando tu perfil.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-50">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-[14px] font-medium">
              CM
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-primary-navy text-[15px] font-medium">Consultoría Moderna</p>
                <span className="text-text-secondary-light text-[12px]">hace 1 semana</span>
                <Badge variant="gray" className="text-[11px]">
                  No avanzó
                </Badge>
              </div>

              <div className="bg-light-bg rounded-lg p-3 mt-4">
                <p className="text-text-secondary-light text-[12px] mb-2">
                  La empresa dejó este comentario:
                </p>
                <p className="text-text-secondary-light text-[13px] italic">
                  {"Buscan candidatos con mayor experiencia en herramientas ERP."}
                </p>
              </div>

              <a
                href="#"
                className="text-amber-accent text-[13px] hover:underline mt-3 inline-block"
              >
                ¿Quieres mejorar tu score? Completa el módulo recomendado →
              </a>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}