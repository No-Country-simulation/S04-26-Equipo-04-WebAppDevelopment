import Link from "next/link";
import { PlayCircle, Award } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function ModuleViewPage() {
  return (
    <>
      <div className="mb-6">
        <p className="text-text-secondary-light text-[13px]">
          <Link href="/dashboard/modules" className="text-amber-accent hover:underline">
            ← Learning Path
          </Link>{" "}
          / <span className="text-text-secondary-light">Habilidades Digitales para Directivos</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div>
            <h2 className="text-primary-navy mb-2 font-medium">
              Habilidades Digitales para Directivos
            </h2>
            <div className="flex items-center gap-3">
              <Badge variant="amber">Act. Digital</Badge>
              <span className="text-text-secondary-light text-[13px]">60 min</span>
              <span className="text-text-secondary-light text-[13px]">Nivel: Intermedio</span>
            </div>
          </div>

          <Card className="bg-dark-base aspect-video flex items-center justify-center">
            <div className="text-center">
              <PlayCircle size={48} className="text-amber-accent mx-auto mb-3" />
              <p className="text-white text-[15px]">Reproducir módulo</p>
            </div>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-secondary-light text-[13px]">Progreso del módulo</p>
              <p className="text-amber-accent text-[14px] font-medium">30%</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-amber-accent" style={{ width: "30%" }}></div>
            </div>
            <p className="text-text-secondary-light text-[13px]">3 de 10 lecciones completadas</p>
          </div>

          <div>
            <h4 className="text-primary-navy mb-4 font-medium">En este módulo vas a aprender:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-success-green/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-success-green"></div>
                </div>
                <p className="text-text-secondary-light text-[14px]">
                  Herramientas de análisis predictivo para toma de decisiones
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-success-green/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-success-green"></div>
                </div>
                <p className="text-text-secondary-light text-[14px]">
                  Gestión de equipos remotos con plataformas colaborativas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-success-green/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-success-green"></div>
                </div>
                <p className="text-text-secondary-light text-[14px]">
                  Automatización con IA para directivos y líderes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <p className="text-text-secondary-light text-[13px] mb-4 font-medium">Tu progreso</p>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#C98A2A"
                    strokeWidth="8"
                    strokeDasharray="351.86"
                    strokeDashoffset="246.3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-amber-accent text-[24px] font-medium">30%</p>
                </div>
              </div>
            </div>
            <p className="text-center text-primary-navy text-[14px] mb-1 font-medium">
              30% completado
            </p>
            <p className="text-center text-text-secondary-light text-[13px]">
              7 lecciones restantes
            </p>
          </Card>

          <Card variant="dark">
            <Award className="text-amber-accent mb-3 size-6" />
            <p className="text-white text-[14px] mb-2 font-medium">Obtén tu badge</p>
            <p className="text-text-secondary-dark text-[13px] mb-4">
              Completa el módulo para obtener tu badge verificado
            </p>
            <Button variant="primary" className="w-full text-[13px]">
              Ver requisitos
            </Button>
          </Card>

          <Card>
            <p className="text-text-secondary-light text-[13px] mb-2 font-medium">
              Siguiente módulo
            </p>
            <Link
              href="/dashboard/modules"
              className="text-primary-navy hover:text-amber-accent transition-colors text-[14px]"
            >
              Toma de Decisiones con Datos →
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
