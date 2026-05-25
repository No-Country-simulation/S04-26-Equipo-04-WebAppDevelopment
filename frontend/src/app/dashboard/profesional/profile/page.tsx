import { MapPin, Edit, Check, Lock, ArrowRight } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function ProfilePage() {
  const verifiedSkills = [
    "Comunicación efectiva",
    "Gestión de equipos",
    "Herramientas digitales",
    "Liderazgo adaptativo",
  ];

  const pendingSkills = ["Toma de decisiones", "Marca personal"];

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-primary-navy font-medium">Mi Perfil Profesional</h2>

        <div className="flex items-center gap-3">
          <span className="text-text-secondary-light text-[14px]">Visible para empresas</span>
          <button className="w-12 h-6 bg-amber-accent rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-navy text-white flex items-center justify-center text-[20px] font-medium">
                JG
              </div>
              <div className="flex-1">
                <h3 className="text-primary-navy font-medium">Javier González</h3>
                <p className="text-text-secondary-light text-[14px]">
                  Gerente de RRHH · 20 años de experiencia
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={14} className="text-text-secondary-light" />
                  <span className="text-text-secondary-light text-[13px]">
                    Buenos Aires, Argentina
                  </span>
                </div>
                <Badge variant="green" className="mt-2 text-[11px]">
                  Disponible para oportunidades
                </Badge>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary-light text-[13px]">Completitud del perfil</p>
                <p className="text-amber-accent text-[14px] font-medium">78%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-accent" style={{ width: "78%" }}></div>
              </div>
            </div>

            <Button variant="ghost" className="w-full">
              <Edit className="size-4" />
              Editar perfil
            </Button>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-primary-navy font-medium">Experiencia</h4>
              <Edit className="size-4 text-text-secondary-light cursor-pointer" />
            </div>

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

        <div className="space-y-6">
          <Card>
            <h4 className="text-primary-navy mb-2 font-medium">
              Skills verificadas en TalentRenew
            </h4>
            <p className="text-text-secondary-light text-[13px] mb-6">
              Estas habilidades fueron validadas completando módulos en la plataforma.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {verifiedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-light-bg rounded-lg border border-success-green/30"
                >
                  <Check className="text-success-green shrink-0 size-3.5" />
                  <div className="flex-1">
                    <p className="text-primary-navy text-[13px]">{skill}</p>
                  </div>
                  <Badge variant="green" className="text-[10px]">
                    Verificada
                  </Badge>
                </div>
              ))}

              {pendingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-200"
                >
                  <Lock className="text-gray-400 shrink-0 size-3.5" />
                  <div className="flex-1">
                    <p className="text-gray-600 text-[13px]">{skill}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="dark">
            <h4 className="text-white mb-2 font-medium">Tu compatibilidad actual</h4>
            <p className="text-text-secondary-dark text-[13px] mb-4">
              Tu perfil tiene alta compatibilidad con 3 oportunidades activas
            </p>

            <div className="mb-4">
              <p className="text-amber-accent text-[32px] mb-2 font-medium">78%</p>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-accent" style={{ width: "78%" }}></div>
              </div>
            </div>

            <p className="text-text-secondary-dark text-[13px] mb-6">
              Completa 2 módulos más para llegar al 90%
            </p>

            <Button variant="primary" className="w-full">
              Ver oportunidades <ArrowRight className="size-4" />
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}