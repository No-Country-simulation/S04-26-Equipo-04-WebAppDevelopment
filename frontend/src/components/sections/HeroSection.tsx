import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-217.5 items-center overflow-hidden bg-surface px-8"
    >
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <Badge variant="new">REINVENTANDO LA EXPERIENCIA</Badge>
          <h1 className="font-heading text-5xl/14 text-primary my-6 font-bold tracking-[-0.02em]">
            Tu experiencia es tu mayor valor. Conéctala con el futuro.
          </h1>
          <p className="text-[#44474E] mb-10 max-w-xl">
            Plataforma de empleabilidad +45 que une diagnóstico, aprendizaje dinámico y conexión
            real con empresas líderes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button  size="xl">
              Quiero potenciar mi perfil
            </Button>
            <Button variant="outline" size="xl">
              Busco talento
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary-fixed opacity-20 blur-[100px] rounded-full"></div>
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
            <Image
              alt="Experienced Professional"
              width={584}
              height={500}
              className="w-full h-125 object-cover"
              src="/mujer.png"
            />
            <div className="absolute bottom-6 left-6 max-w-xs rounded-xl border-l-4 border-secondary bg-white/70 p-6 shadow-lg backdrop-blur-md">
              <p className="mb-1 font-heading text-primary">Autoridad valorada</p>
              <p className="text-[#44474E]">
                Uniendo décadas de trayectoria con la agilidad del mañana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
