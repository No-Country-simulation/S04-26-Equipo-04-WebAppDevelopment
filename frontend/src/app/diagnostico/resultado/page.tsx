"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Laptop, BarChart3, Users, Crown, Target, RefreshCcw } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Linkedin } from "@/components/icons/Linkedin";
import { useDiagnosticStore } from "@/store/diagnostic.store";

export default function DiagnosticResultPage() {
  const { result, fetchResultFromRoute, loading } = useDiagnosticStore();
  const [hydrated, setHydrated] = useState(false);

  // HIDRATACIÓN
  useEffect(() => {
    const init = async () => {
      await fetchResultFromRoute();
      setHydrated(true);
    };

    init();
  }, [fetchResultFromRoute]);

  const chartData = useMemo(() => {
    if (!result) return [];

    return result.resultados.map((item) => {
      const porcentaje =
        item.puntajeMaximo > 0 ? Math.round((item.puntajeObtenido / item.puntajeMaximo) * 100) : 0;

      return {
        label: item.categoria,
        value: porcentaje,
      };
    });
  }, [result]);

  const chartConfig = {
    categoria: {
      label: "Label",
      color: "#C98A2A",
    },
  } satisfies ChartConfig;

  if (!hydrated || loading || !result) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Cargando resultados...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-12 bg-[#162840]">
      <div className="max-w-270 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-white mb-2 font-medium">
            Tu <span className="text-amber-accent">Mapa Profesional</span>
          </h2>
          <p className="text-text-muted-dark text-[14px] max-w-2xl mx-auto">
            Analizamos tu perfil. Este mapa representa tus fortalezas y las áreas donde una
            actualización acelerará tu objetivo.
          </p>
        </div>

        <div className="flex justify-between gap-6">
          <Card variant="darkest" className="w-130">
            <p className="text-text-muted-dark text-[12px] uppercase tracking-wider mb-6">
              Fortalezas detectadas
            </p>
            {/* CHART */}
            <div className="mb-8">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-62.5 w-127"
              >
                <RadarChart data={chartData}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <PolarGrid radialLines={false} polarRadius={[90]} strokeWidth={0.5} />
                  <PolarAngleAxis dataKey="label" />
                  <Radar dataKey="value" fill="#C98A2A" fillOpacity={0.6} />
                </RadarChart>
              </ChartContainer>
            </div>
            {/* BARS */}
            <div className="space-y-3">
              {chartData.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <p className="text-text-secondary-dark text-[13px] w-38">{item.label}</p>
                  <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-accent"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <p className="text-amber-accent text-[13px] font-medium w-10 text-right">
                    {item.value}%
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div>
            <p className="text-text-muted-dark text-[12px] uppercase tracking-wider">
              Rutas sugeridas
            </p>
            <p className="text-text-secondary-dark text-[14px] mb-2">
              Basado en tus respuestas, te recomendamos priorizar:
            </p>

            <div className="space-y-2 mb-4">
              {result.resultados.map((item) => (
                <div
                  key={item.categoria}
                  className="bg-white/4 border border-white/8 rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-accent flex items-center justify-center shrink-0">
                    {categoryIcons[item.categoria] ?? (
                      <Laptop className="text-dark-base size-4.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white text-[13px] font-medium">
                      {item.categoria} · <span className="capitalize">{item.nivel}</span>
                    </h4>
                    <p className="text-text-muted-dark text-[12px]">{item.recomendacion}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/dashboard/profesional">
              <Button variant="primary" className="w-full">
                Ver mi dashboard →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const categoryIcons: Record<string, React.ReactNode> = {
  "Ventas y Marketing": <BarChart3 className="text-dark-base size-4.5" />,
  "Sistemas y Tecnología": <Laptop className="text-dark-base size-4.5" />,
  "Finanzas y Administración": <BarChart3 className="text-dark-base size-4.5" />,
  "RRHH y Operaciones": <Users className="text-dark-base size-4.5" />,
  Liderazgo: <Crown className="text-dark-base size-4.5" />,
  "Gestión Estratégica": <Target className="text-dark-base size-4.5" />,
  Adaptabilidad: <RefreshCcw className="text-dark-base size-4.5" />,
  "Marca Personal": <Linkedin className="stroke-[#0F1E30] w-4.5 h-4.5" />,
};
