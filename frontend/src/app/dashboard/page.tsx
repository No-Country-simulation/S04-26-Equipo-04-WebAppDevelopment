import Link from "next/link";
import { Shield, TrendingUp, Share2, CheckCircle, Users2 } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-primary-navy mb-2 font-medium">Hola, Javier</h2>
        <div className="flex items-start justify-between">
          <p className="text-text-secondary-light text-[14px] max-w-2xl">
            Esta es tu ruta recomendada basada en tu experiencia de 20 años en Finanzas.
          </p>
          <Card variant="dark" className="flex items-center gap-3 px-4 py-3">
            <Shield className="text-amber-accent size-5" />
            <div>
              <p className="text-text-secondary-dark text-[11px] uppercase tracking-wide font-medium">
                EXPERTISE LEVEL
              </p>
              <p className="text-white text-[14px] font-medium">Senior Executive</p>
            </div>
          </Card>
        </div>
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-secondary-light text-[13px] font-medium">
            Recomendado para tu perfil senior
          </p>
          <Link href="/dashboard/modules" className="text-amber-accent text-[13px] hover:underline">
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card variant="dark" className="relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-10">
              <Shield className="text-amber-accent size-6" />
            </div>
            <h4 className="text-white mb-2 relative z-10 font-medium">
              Certificación en IA Generativa para CFOs
            </h4>
            <p className="text-text-secondary-dark text-[13px] mb-4 relative z-10">
              Programa intensivo de 6 semanas para aplicar IA en análisis financiero y reporting.
            </p>
            <Button variant="secondary" className="relative z-10">
              Ver detalle del programa
            </Button>
          </Card>

          <Card>
            <Users2 size={24} className="text-primary-navy mb-3" />
            <h4 className="text-primary-navy mb-2 font-medium">Sesión con Mentor Pro</h4>
            <p className="text-text-secondary-light text-[13px] mb-4">
              Conecta 1:1 con profesionales senior que transicionaron exitosamente.
            </p>
            <Link href="/dashboard/mentors" className="text-amber-accent text-[14px] hover:underline">
              Explorar Mentores →
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
