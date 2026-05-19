import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Laptop, BarChart3, CheckCircle, Users2, Lock, Info } from "lucide-react";
import { Linkedin } from "@/components/icons/Linkedin";

export default function Modules() {
  const modules = [
    {
      icon: Laptop,
      iconBg: "bg-amber-accent",
      title: "Habilidades Digitales para Directivos",
      category: "Act. Digital",
      duration: "60 min",
      status: "En curso",
      statusVariant: "navy" as const,
      action: "Continuar",
    },
    {
      icon: BarChart3,
      iconBg: "bg-primary-navy",
      title: "Toma de Decisiones con Datos",
      category: "Cognitiva",
      duration: "45 min",
      status: "Disponible",
      statusVariant: "amber" as const,
      action: "Empezar",
    },
    {
      icon: CheckCircle,
      iconBg: "bg-success-green",
      title: "Comunicación de Valor",
      category: "Socioemocional",
      duration: "45 min",
      status: "Completado",
      statusVariant: "green" as const,
      action: "Ver certificado",
    },
    {
      icon: Users2,
      iconBg: "bg-primary-navy",
      title: "Liderazgo en la Era Híbrida",
      category: "Liderazgo",
      duration: "50 min",
      status: "Bloqueado",
      statusVariant: "gray" as const,
      action: "locked",
    },
    {
      icon: Linkedin,
      iconBg: "bg-amber-accent",
      title: "Marca Personal Digital",
      category: "Empleabilidad",
      duration: "35 min",
      status: "Bloqueado",
      statusVariant: "gray" as const,
      action: "locked",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-primary-navy mb-1 font-medium">Learning Path</h2>
        <p className="text-text-secondary-light text-[14px]">
          Tu ruta de aprendizaje personalizada
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Badge variant="amber">Todos</Badge>
        <Badge variant="gray">En curso</Badge>
        <Badge variant="gray">Completados</Badge>
        <Badge variant="gray">Pendientes</Badge>
      </div>

      <div className="space-y-3 mb-6">
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Card key={index} className="flex items-center gap-4">
              <div
                className={`w-9 h-9 rounded-lg ${module.iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon
                  size={20}
                  className={
                    module.iconBg.includes("amber") || module.iconBg.includes("success")
                      ? "text-white"
                      : "text-white"
                  }
                />
              </div>

              <div className="flex-1">
                <h4 className="text-primary-navy text-[14px] mb-1 font-medium">{module.title}</h4>
                <div className="flex items-center gap-3">
                  <Badge variant="amber" className="text-[11px]">
                    {module.category}
                  </Badge>
                  <span className="text-text-secondary-light text-[12px]">{module.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant={module.statusVariant} className="text-[11px]">
                  {module.status}
                </Badge>
                {module.action === "locked" ? (
                  <Lock size={20} className="text-gray-400" />
                ) : module.action === "Ver certificado" ? (
                  <a href="#" className="text-amber-accent text-[13px] hover:underline">
                    {module.action}
                  </a>
                ) : (
                  <Button
                    variant={module.action === "Continuar" ? "primary" : "ghost"}
                    className="text-[13px]"
                  >
                    {module.action}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-light-bg border border-black/10 rounded-lg p-4 flex items-start gap-3">
        <Info className="text-text-secondary-light shrink-0 mt-0.5 size-4" />
        <p className="text-text-secondary-light text-[13px]">
          Completa el módulo anterior para desbloquear el siguiente.
        </p>
      </div>
    </>
  );
}
