"use client";

import { useDiagnosticStore } from "@/store/diagnostic.store";

import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Laptop, BarChart3, ArrowLeft } from "lucide-react";
import { Linkedin } from "@/components/icons/Linkedin";

export default function DiagnosticResultPage() {
  const radarData = [
    { label: "Act. Digital", value: 75, color: "#C98A2A" },
    { label: "Gestión", value: 85, color: "#378ADD" },
    { label: "Liderazgo", value: 70, color: "#C98A2A" },
    { label: "Empleabilidad", value: 55, color: "#4E8C6A" },
    { label: "Marca Personal", value: 60, color: "#C98A2A" },
  ];

  const result = useDiagnosticStore((s) => s.result);
  console.log(result);

  return (
    <div className="min-h-screen px-8 py-12 bg-[#162840]">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/diagnostic/3"
          className="flex items-center gap-2 text-amber-accent text-[13px] hover:underline mb-8"
        >
          <ArrowLeft size={14} />
          Volver al diagnóstico
        </Link>

        <div className="text-center mb-12">
          <h2 className="text-white mb-2 font-medium">
            Tu <span className="text-amber-accent">Mapa Profesional</span>
          </h2>
          <p className="text-text-muted-dark text-[14px] max-w-2xl mx-auto">
            Analizamos tu perfil. Este mapa representa tus fortalezas y las áreas donde una
            actualización acelerará tu objetivo.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card variant="darkest">
            <p className="text-text-muted-dark text-[12px] uppercase tracking-wider mb-6">
              Fortalezas detectadas
            </p>

            <div className="mb-8 relative">
              <svg viewBox="0 0 240 240" className="w-full max-w-sm mx-auto">
                {/* Grid lines - 3 concentric pentagons */}
                {[0.33, 0.66, 1].map((scale) => (
                  <polygon
                    key={scale}
                    points="120,20 200,77.6 172.4,172.4 67.6,172.4 40,77.6"
                    transform={`scale(${scale})`}
                    transform-origin="120 120"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Data polygon */}
                <polygon
                  points="120,45 185,77.6 165,155 75,155 55,77.6"
                  fill="rgba(201,138,42,0.2)"
                  stroke="#C98A2A"
                  strokeWidth="1.5"
                />

                {/* Data points */}
                {[
                  [120, 45],
                  [185, 77.6],
                  [165, 155],
                  [75, 155],
                  [55, 77.6],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#C98A2A" />
                ))}

                {/* Axis labels - positioned outside */}
                <text x="120" y="10" textAnchor="middle" fill="#7A9DC0" fontSize="10">
                  Act. Digital
                </text>
                <text x="215" y="82" textAnchor="start" fill="#7A9DC0" fontSize="10">
                  Gestión
                </text>
                <text x="185" y="185" textAnchor="start" fill="#7A9DC0" fontSize="10">
                  Liderazgo
                </text>
                <text x="55" y="185" textAnchor="end" fill="#7A9DC0" fontSize="10">
                  Empleabilidad
                </text>
                <text x="25" y="82" textAnchor="end" fill="#7A9DC0" fontSize="10">
                  Marca Personal
                </text>
              </svg>
            </div>

            <div className="space-y-3">
              {radarData.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <p className="text-text-secondary-dark text-[13px] w-28">{item.label}</p>
                  <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
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
            <p className="text-text-muted-dark text-[12px] uppercase tracking-wider mb-4">
              Rutas sugeridas
            </p>
            <p className="text-text-secondary-dark text-[14px] mb-6">
              Basado en tus respuestas, te recomendamos priorizar:
            </p>

            <div className="space-y-3 mb-6">
              <div className="bg-white/4 border border-white/8 rounded-xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-accent flex items-center justify-center shrink-0">
                  <Laptop className="text-dark-base size-4.5" />
                </div>
                <div>
                  <h4 className="text-white text-[13px] mb-1 font-medium">
                    Actualización Tecnológica
                  </h4>
                  <p className="text-text-muted-dark text-[12px]">
                    Domina las herramientas digitales más usadas en tu área.
                  </p>
                </div>
              </div>

              <div className="bg-white/4 border border-white/8 rounded-xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-accent flex items-center justify-center shrink-0">
                  <BarChart3 className="text-dark-base size-4.5" />
                </div>
                <div>
                  <h4 className="text-white text-[13px] mb-1 font-medium">Toma de Decisiones</h4>
                  <p className="text-text-muted-dark text-[12px]">
                    Organízate y analiza información de forma moderna.
                  </p>
                </div>
              </div>

              <div className="bg-white/4 border border-white/8 rounded-xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-accent flex items-center justify-center shrink-0">
                  <Linkedin className="stroke-[#0F1E30] w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-white text-[13px] mb-1 font-medium">
                    Marca Personal Digital
                  </h4>
                  <p className="text-text-muted-dark text-[12px]">
                    Optimiza tu presencia en LinkedIn y tu propuesta de valor.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/dashboard">
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
