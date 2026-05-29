"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckSquare, Route, Star, Users, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

import { useDiagnosticStore } from "@/store/diagnostic.store";

export default function DiagnosticPage() {
  const router = useRouter();

  const startDiagnostic = useDiagnosticStore((s) => s.startDiagnostic);

  const handleStart = async () => {
    try {
      await startDiagnostic(); // 👈 llama backend correctamente
      router.push("/diagnostico/categoria"); 
    } catch (error) {
      console.error("Error iniciando diagnóstico", error);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 h-screen">
      <div className="w-full max-w-2xl">
        <Card variant="darkest" className="p-10 border border-white/8 relative">
          <Link
            href="/"
            className="absolute top-6 right-6 flex items-center gap-1 text-text-muted-dark hover:text-white transition-colors text-[13px]"
          >
            <X className="size-3.5" />
            Salir
          </Link>
          <div className="text-center mb-6">
            <Badge variant="amber" className="mb-6">
              <Star className="size-3" />
              Red de Bienestar Laboral +45
            </Badge>

            <h1 className="text-white text-[28px] mb-4 font-medium">
              Diagnóstico de <span className="text-amber-accent">Posicionamiento Profesional</span>
            </h1>

            <p className="text-text-secondary-dark max-w-lg mx-auto mb-8">
              Diseñado para entender tu momento profesional actual, identificar tus fortalezas
              estratégicas y detectar brechas clave.
            </p>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border-[0.5px] border-white rounded-full">
                <CheckSquare className="size-3.5 text-amber-accent" />
                <span className="text-text-secondary-dark text-[13px]">Análisis estratégico</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border-[0.5px] border-white rounded-full">
                <Route className="size-3.5 text-amber-accent" />
                <span className="text-text-secondary-dark text-[13px]">Ruta de upskilling</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border-[0.5px] border-white rounded-full">
                <Users className="size-3.5 text-amber-accent" />
                <span className="text-text-secondary-dark text-[13px]">Matching con empresas</span>
              </div>
            </div>

            <Button onClick={handleStart} variant="primary" className="mb-4">
              Comenzar evaluación →
            </Button>

            <p className="text-[13px] text-[#4A6480]">15 minutos · 11 preguntas</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
