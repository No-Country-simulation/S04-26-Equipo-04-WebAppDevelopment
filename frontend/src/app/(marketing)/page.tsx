import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronRight,
  EyeOff,
  FileX,
  Laptop,
  Lock,
  Play,
  Star,
} from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-navy px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-accent/30 bg-amber-accent/10 mb-6">
          <Star className="text-amber-accent h-3.5 w-3.5" />
          <span className="text-amber-accent text-[13px]">
            Red de Bienestar Laboral · +650 profesionales
          </span>
        </div>

        <h1 className="text-white mx-auto mb-4 whitespace-nowrap font-medium">
          Tu experiencia tiene más <span className="text-amber-accent">valor</span> del que crees
        </h1>

        <p className="text-text-secondary-dark max-w-md mx-auto mb-8">
          Actualiza tus habilidades, construye tu perfil profesional y conecta con empresas que
          valoran el talento senior.
        </p>

        <div className="flex items-center gap-3 justify-center mb-6">
          <Link href="/diagnostico">
            <Button variant="primary">
              Comenzar mi diagnóstico <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/company/register">
            <Button variant="secondary">
              <Briefcase className="h-4 w-4" />
              Buscar talento senior
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-2 h-2 rounded-full bg-success-green"></div>
          <p className="text-[13px] text-text-muted-dark">
            650 profesionales ya forman parte de la comunidad
          </p>
        </div>

        <Card variant="darkest" className="max-w-3xl mx-auto p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-transparent rounded-lg p-4 border border-amber-accent/30">
              <p className="text-amber-accent text-[20px] mb-1 font-medium">78%</p>
              <p className="text-text-secondary-dark text-[12px]">Perfil completado</p>
            </div>
            <div className="bg-transparent rounded-lg p-4 border border-amber-accent/30">
              <p className="text-amber-accent text-[20px] mb-1 font-medium">4/6</p>
              <p className="text-text-secondary-dark text-[12px]">Módulos</p>
            </div>
            <div className="bg-transparent rounded-lg p-4 border border-amber-accent/30">
              <p className="text-amber-accent text-[20px] mb-1 font-medium">3</p>
              <p className="text-text-secondary-dark text-[12px]">Oportunidades nuevas</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Social Proof Numbers */}
      <section className="bg-white py-12">
        <Card className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 divide-x divide-black/10">
            <div className="px-8 text-center">
              <p className="text-primary-navy text-[22px] font-medium">+650</p>
              <p className="text-text-secondary-light text-[12px]">profesionales en la comunidad</p>
            </div>
            <div className="px-8 text-center">
              <p className="text-primary-navy text-[22px] font-medium">50%</p>
              <p className="text-text-secondary-light text-[12px]">en búsqueda activa de empleo</p>
            </div>
            <div className="px-8 text-center">
              <p className="text-primary-navy text-[22px] font-medium">+45</p>
              <p className="text-text-secondary-light text-[12px]">años de experiencia promedio</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Problem Section */}
      <section className="bg-light-bg px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-accent text-[11px] uppercase tracking-wider mb-2 font-medium">
            El problema
          </p>
          <h2 className="text-primary-navy mb-8 font-medium">
            ¿Te identificas con alguna de estas situaciones?
          </h2>

          <div className="grid grid-cols-3 gap-6">
            <Card>
              <div className="w-12 h-12 rounded-lg bg-[#EEF2F8] flex items-center justify-center mb-4">
                <FileX className="text-primary-navy h-6 w-6" />
              </div>
              <h4 className="text-primary-navy mb-2 font-medium">Tu CV no te representa</h4>
              <p className="text-text-secondary-light text-[14px]">
                Tienes 20+ años de experiencia, pero tu CV parece desactualizado frente a perfiles
                más jóvenes.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 rounded-lg bg-light-amber flex items-center justify-center mb-4">
                <Laptop className="text-amber-accent h-6 w-6" />
              </div>
              <h4 className="text-primary-navy mb-2 font-medium">Habilidades por actualizar</h4>
              <p className="text-text-secondary-light text-[14px]">
                El mercado cambió. Necesitas herramientas digitales que antes no eran necesarias en
                tu rol.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 rounded-lg bg-[#EAF3DE] flex items-center justify-center mb-4">
                <EyeOff className="text-success-green h-6 w-6" />
              </div>
              <h4 className="text-primary-navy mb-2 font-medium">Invisible para las empresas</h4>
              <p className="text-text-secondary-light text-[14px]">
                Las plataformas tradicionales no valoran tu experiencia. Quedas fuera de los filtros
                automáticos.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-accent text-[11px] uppercase tracking-wider mb-2 font-medium">
            Cómo funciona
          </p>
          <h2 className="text-primary-navy mb-12 font-medium">
            De la experiencia a la oportunidad, en 4 pasos
          </h2>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-navy text-white flex items-center justify-center text-[14px] font-medium">
                    1
                  </div>
                  <div className="w-0.5 h-16 bg-primary-navy/20 mx-auto mt-2"></div>
                </div>
                <div>
                  <h4 className="text-primary-navy mb-1 font-medium">Diagnóstico inicial</h4>
                  <p className="text-text-secondary-light text-[14px]">
                    Evaluamos tus habilidades en 15 minutos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-navy text-white flex items-center justify-center text-[14px] font-medium">
                    2
                  </div>
                  <div className="w-0.5 h-16 bg-primary-navy/20 mx-auto mt-2"></div>
                </div>
                <div>
                  <h4 className="text-primary-navy mb-1 font-medium">Ruta personalizada</h4>
                  <p className="text-text-secondary-light text-[14px]">
                    Plan de formación adaptado a tu perfil.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-navy text-white flex items-center justify-center text-[14px] font-medium">
                    3
                  </div>
                  <div className="w-0.5 h-16 bg-primary-navy/20 mx-auto mt-2"></div>
                </div>
                <div>
                  <h4 className="text-primary-navy mb-1 font-medium">Perfil dinámico</h4>
                  <p className="text-text-secondary-light text-[14px]">
                    Cada skill completada actualiza tu perfil.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-amber-accent text-dark-base flex items-center justify-center text-[14px] font-medium">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="text-primary-navy mb-1 font-medium">Oportunidades concretas</h4>
                  <p className="text-text-secondary-light text-[14px]">
                    Empresas te contactan directamente.
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <div className="space-y-3">
                <div className="bg-success-green/20 rounded-lg p-4 flex items-center gap-3 border border-success-green/40">
                  <Check className="text-success-green shrink-0 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-primary-navy text-[14px] font-medium">
                      Comunicación efectiva
                    </p>
                    <p className="text-text-secondary-light text-[12px]">Completado · 45 min</p>
                  </div>
                </div>

                <div className="bg-light-navy rounded-lg p-4 flex items-center gap-3 border border-primary-navy/30">
                  <Play className="text-primary-navy shrink-0 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-primary-navy text-[14px] font-medium">
                      Herramientas digitales
                    </p>
                    <p className="text-text-secondary-light text-[12px]">En progreso · 60 min</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3 border border-gray-200">
                  <Lock className="text-gray-400 shrink-0 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-gray-600 text-[14px] font-medium">Liderazgo adaptativo</p>
                    <p className="text-gray-400 text-[12px]">Pendiente · 50 min</p>
                  </div>
                </div>

                <Link href="/diagnostico">
                  <Button variant="primary" className="w-full mt-4">
                    Comenzar mi diagnóstico <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Companies + Testimonials */}
      <section className="bg-light-bg px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
          <Card variant="dark">
            <p className="text-amber-accent text-[11px] uppercase tracking-wider mb-3 font-medium">
              Para empresas
            </p>
            <h3 className="text-white mb-2 font-medium">Accede a talento senior validado</h3>
            <p className="text-text-secondary-dark text-[14px] mb-6">
              Encuentra profesionales con habilidades verificadas y experiencia comprobada.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-accent" />
                </div>
                <p className="text-text-secondary-dark text-[14px]">
                  Skills verificadas en módulos prácticos
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-accent" />
                </div>
                <p className="text-text-secondary-dark text-[14px]">
                  Filtros por área y experiencia
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-accent" />
                </div>
                <p className="text-text-secondary-dark text-[14px]">
                  Reducción del riesgo de contratación
                </p>
              </div>
            </div>

            <Link href="/company/search">
              <Button variant="primary">
                Buscar talento senior <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <div className="space-y-4">
            <Card>
              <p className="text-primary-navy text-[14px] italic mb-4">
                &quot;Después de 2 años buscando, TalentRenew me ayudó a reactivar mi carrera. En 3
                meses completé mi ruta y hoy estoy trabajando en una empresa que valora mi
                experiencia.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-navy text-white flex items-center justify-center text-[14px] font-medium">
                  CL
                </div>
                <div>
                  <p className="text-primary-navy text-[13px] font-medium">Claudia L., 49</p>
                  <p className="text-text-secondary-light text-[12px]">
                    Ex Gerente RRHH · Buenos Aires
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-primary-navy text-[14px] italic mb-4">
                &quot;Tenía miedo de quedarme atrás tecnológicamente. Los módulos fueron prácticos y
                aplicables a mi día a día. Ahora me siento más seguro en entrevistas.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-accent text-dark-base flex items-center justify-center text-[14px] font-medium">
                  RM
                </div>
                <div>
                  <p className="text-primary-navy text-[13px] font-medium">Roberto M., 52</p>
                  <p className="text-text-secondary-light text-[12px]">Jefe de Ventas · Córdoba</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-accent text-[11px] uppercase tracking-wider mb-2 font-medium">
            Preguntas frecuentes
          </p>
          <h2 className="text-primary-navy mb-8 font-medium">
            Lo que quieres saber antes de empezar
          </h2>

          <div className="space-y-4">
            <div className="border-b border-black/10 pb-4">
              <div className="flex items-start justify-between">
                <h4 className="text-primary-navy font-medium">¿TalentRenew es gratuito?</h4>
                <ChevronRight className="h-5 w-5 text-amber-accent" />
              </div>
            </div>
            <div className="border-b border-black/10 pb-4">
              <div className="flex items-start justify-between">
                <h4 className="text-primary-navy font-medium">
                  ¿Cuánto tiempo lleva el diagnóstico?
                </h4>
                <ChevronRight className="h-5 w-5 text-amber-accent" />
              </div>
            </div>
            <div className="border-b border-black/10 pb-4">
              <div className="flex items-start justify-between">
                <h4 className="text-primary-navy font-medium">
                  ¿Las empresas ven mi perfil sin mi permiso?
                </h4>
                <ChevronRight className="h-5 w-5 text-amber-accent" />
              </div>
            </div>
            <div className="border-b border-black/10 pb-4">
              <div className="flex items-start justify-between">
                <h4 className="text-primary-navy font-medium">
                  ¿Necesito experiencia en tecnología?
                </h4>
                <ChevronRight className="h-5 w-5 text-amber-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-primary-navy px-8 py-16 text-center">
        <Badge variant="green" className="mb-4">
          Empieza hoy, es gratis
        </Badge>
        <h2 className="text-white max-w-2xl mx-auto mb-4 font-medium">
          Tu próxima oportunidad empieza con un diagnóstico
        </h2>
        <p className="text-text-secondary-dark mb-8 max-w-lg mx-auto">
          15 minutos que pueden cambiar el rumbo de tu carrera.
        </p>
        <Link href="/diagnostico">
          <Button variant="primary" className="text-[15px] px-8 py-3">
            Comenzar mi diagnóstico gratis <ArrowRight size={18} />
          </Button>
        </Link>
      </section>
    </>
  );
}