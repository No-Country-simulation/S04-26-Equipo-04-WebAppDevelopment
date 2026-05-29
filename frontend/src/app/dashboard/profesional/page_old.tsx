import Link from "next/link";
import { TrendingUp, Share2, CheckCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-primary-navy mb-2 font-medium">Hola, Javier</h2>
      </div>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-secondary-light text-[13px] font-medium">Progreso General</p>
          <p className="text-amber-accent text-[14px] font-medium">35%</p>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-amber-accent rounded-full" style={{ width: "35%" }}></div>
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success-green"></div>
            <span className="text-text-secondary-light">1 Completado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-text-secondary-light">2 Pendientes</span>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <p className="text-text-secondary-light text-[13px] mb-4 font-medium">Módulos de tu Ruta</p>

        <div className="grid grid-cols-3 gap-6">
          <Card className="border-l-2 border-l-primary-navy">
            <Badge variant="amber" className="mb-4">
              En curso
            </Badge>
            <TrendingUp className="text-amber-accent mb-3 size-6" />
            <h4 className="text-primary-navy mb-2 font-medium">
              Habilidades Digitales para Directivos
            </h4>
            <p className="text-text-secondary-light text-[13px] mb-4">
              Domina las herramientas clave para gestionar equipos en entornos híbridos.
            </p>
            <div className="mb-4">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-accent" style={{ width: "30%" }}></div>
              </div>
            </div>
            <Link href="/dashboard/modules">
              <Button variant="primary" className="w-full">
                Continuar Módulo
              </Button>
            </Link>
          </Card>

          <Card>
            <Share2 className="text-text-secondary-light mb-3 size-6" />
            <h4 className="text-primary-navy mb-2 font-medium">Liderazgo en la Era Híbrida</h4>
            <p className="text-text-secondary-light text-[13px] mb-4">
              Aprende a liderar equipos distribuidos con herramientas modernas.
            </p>
            <Link href="/dashboard/modules">
              <Button variant="ghost" className="w-full">
                Empezar Módulo
              </Button>
            </Link>
          </Card>

          <Card className="border-l-2 border-l-success-green">
            <CheckCircle className="text-success-green mb-3 size-6" />
            <h4 className="text-primary-navy mb-2 font-medium">Comunicación de Valor</h4>
            <p className="text-text-secondary-light text-[13px] mb-4">
              Transmite tu experiencia de forma clara y convincente.
            </p>
            <Button variant="ghost" className="w-full opacity-50" disabled>
              Completado
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
