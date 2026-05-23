import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[870px] items-center overflow-hidden bg-surface px-8"
    >
      <div className="mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="z-10">
          <Badge variant="new">REINVENTANDO LA EXPERIENCIA</Badge>
          <h1 className="my-6 font-heading text-5xl/14 font-bold tracking-[-0.02em] text-primary">
            Tu experiencia es tu mayor valor. Conéctala con el futuro.
          </h1>
          <p className="mb-10 max-w-xl text-lg text-on-surface-variant">
            Plataforma de empleabilidad +45 que une diagnóstico, aprendizaje dinámico y conexión
            real con empresas líderes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="xl" className="shadow-lg hover:-translate-y-0.5">
              Quiero potenciar mi perfil
            </Button>
            <Button variant="outline" size="xl">
              Busco talento
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-secondary-fixed opacity-20 blur-[100px]" />
          <div className="relative z-10 rotate-2 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              alt="Profesional con experiencia"
              width={584}
              height={500}
              className="h-[500px] w-full object-cover"
              src="/mujer.png"
              priority
            />
            <div className="glass-card absolute bottom-6 left-6 max-w-xs rounded-xl border-l-4 border-secondary p-6 shadow-lg">
              <p className="mb-1 font-heading text-lg font-semibold text-primary">Valued Authority</p>
              <p className="text-sm text-on-surface-variant">
                Uniendo décadas de trayectoria con la agilidad del mañana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
