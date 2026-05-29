import Link from "next/link";
import { ArrowLeft, MapPin, Check, Star } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function CandidateProfilePage() {
  return (
    <>
      <Link
        href="/dashboard/company/search"
        className="flex items-center gap-2 text-amber-accent text-[13px] hover:underline mb-6"
      >
        <ArrowLeft className="size-4" />
        Volver al marketplace
      </Link>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-primary-navy text-white flex items-center justify-center text-[24px] font-medium">
                CL
              </div>
              <div className="flex-1">
                <h2 className="text-primary-navy mb-1 font-medium">Claudia López</h2>
                <p className="text-text-secondary-light text-[15px]">Gerente de RRHH</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="size-3.5" />
                  <span className="text-text-secondary-light text-[13px]">
                    Buenos Aires, Argentina
                  </span>
                </div>
                <Badge variant="green" className="mt-2 text-[11px]">
                  Disponible para oportunidades
                </Badge>
                <p className="text-text-secondary-light text-[13px] mt-3">20 años de experiencia</p>
              </div>
            </div>
          </Card>

          <Card variant="dark">
            <h4 className="text-white mb-3 font-medium">Compatibilidad con tu búsqueda</h4>
            <p className="text-amber-accent text-[36px] mb-3 font-medium">80%</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-amber-accent" style={{ width: "80%" }}></div>
            </div>

            <div className="space-y-3 mb-8 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary-dark">Skills verificadas</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">3/5 match</span>
                  <span className="text-text-muted-dark">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary-dark">Área de experiencia</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">RRHH match</span>
                  <span className="text-text-muted-dark">100%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary-dark">Modalidad</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">Híbrido match</span>
                  <span className="text-text-muted-dark">100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                <Star className="size-4" />
                Preseleccionar candidato
              </Button>
              <Button variant="secondary" className="w-full">
                Contactar directamente →
              </Button>
              <button className="w-full text-center text-text-secondary-dark text-[13px] hover:text-white transition-colors">
                No avanza en este proceso
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h4 className="text-primary-navy mb-4 font-medium">
              Skills verificadas en TalentRenew
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                "Gestión de equipos",
                "Comunicación efectiva",
                "Herramientas digitales",
                "Liderazgo adaptativo",
              ].map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-light-bg rounded-lg border border-success-green/30"
                >
                  <Check size={14} className="text-success-green shrink-0" />
                  <div className="flex-1">
                    <p className="text-primary-navy text-[12px]">{skill}</p>
                  </div>
                  <Badge variant="green" className="text-[10px]">
                    Verificada
                  </Badge>
                </div>
              ))}
            </div>

            <p className="text-text-secondary-light text-[12px]">
              Verificadas completando módulos en la plataforma
            </p>
          </Card>

          <Card>
            <h4 className="text-primary-navy mb-4 font-medium">Formación completada</h4>

            <div className="space-y-3">
              {[
                "Comunicación de Valor",
                "Habilidades Digitales para Directivos",
                "Gestión de Equipos Remotos",
              ].map((module, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-light-bg rounded-lg">
                  <Check size={16} className="text-success-green" />
                  <div className="flex-1">
                    <p className="text-primary-navy text-[13px]">{module}</p>
                  </div>
                  <div className="w-5 h-5 rounded bg-success-green/20 flex items-center justify-center">
                    <Check size={12} className="text-success-green" />
                  </div>
                  <Badge variant="green" className="text-[10px]">
                    Verificado
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h4 className="text-primary-navy mb-4 font-medium">Experiencia declarada</h4>

            <div className="space-y-4">
              <div className="border-b border-black/10 pb-4">
                <p className="text-primary-navy text-[14px] font-medium">Gerente de RRHH</p>
                <p className="text-text-secondary-light text-[13px]">
                  Empresa Financiera SA · 2015 - 2023
                </p>
                <p className="text-text-secondary-light text-[13px] mt-2">
                  Lideré un equipo de 12 personas en procesos de reclutamiento, capacitación y
                  desarrollo organizacional.
                </p>
              </div>

              <div>
                <p className="text-primary-navy text-[14px] font-medium">
                  Coordinadora de Personas
                </p>
                <p className="text-text-secondary-light text-[13px]">
                  Tech Solutions · 2010 - 2015
                </p>
                <p className="text-text-secondary-light text-[13px] mt-2">
                  Responsable de onboarding, cultura organizacional y programas de bienestar.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}