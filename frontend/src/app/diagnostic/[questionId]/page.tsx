"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

const questions = [
  {
    id: 1,
    category: "Act. Digital",
    question: "¿Con qué frecuencia usa herramientas de comunicación digital en su trabajo?",
    options: [
      "Ocasionalmente, solo cuando es necesario",
      "Diariamente para email y mensajes básicos",
      "Uso avanzado de Slack, Teams o herramientas colaborativas",
      "Gestiono equipos remotos con múltiples plataformas integradas",
    ],
  },
  {
    id: 2,
    category: "Act. Digital",
    question: "¿Qué tanto automatiza sus cálculos matemáticos y reportes de números?",
    options: [
      "Uso hojas de cálculo básicas y cálculos manuales",
      "Uso Excel con fórmulas, tablas dinámicas y macros",
      "Uso herramientas como Power BI o Tableau para dashboards",
      "Automatizo reportes con scripts, IA o sistemas integrados",
    ],
  },
  {
    id: 3,
    category: "Gestión",
    question: "¿Cómo toma decisiones importantes en su rol actual?",
    options: [
      "Basándome en mi experiencia e intuición",
      "Consulto con mi equipo y superiores antes de decidir",
      "Analizo datos disponibles y tendencias del sector",
      "Uso metodologías estructuradas y análisis predictivo",
    ],
  },
];

export default function DiagnosticQuestionPage() {
  const params = useParams();
  const router = useRouter();

  const questionId = params?.questionId as string;
  const currentIndex = parseInt(questionId || "1") - 1;

  const question = questions[currentIndex] || questions[0];

  const [selectedOption, setSelectedOption] = useState<number | null>(2);
  const [showExitModal, setShowExitModal] = useState(false);

  const progress = ((currentIndex + 1) / 11) * 100;

  const handleExit = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#162840]">
      <div className="border-b border-white/6 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-1 text-text-muted-dark hover:text-white transition-colors text-[13px]"
          >
            <X className="h-3.5 w-3.5" />
            Salir
          </button>
          <p className="text-text-muted-dark text-[13px]">Pregunta {currentIndex + 1} de 11</p>
        </div>
        <Badge variant="navy" className="text-[11px]">
          {question.category}
        </Badge>
      </div>

      <div className="h-1 bg-white/8">
        <div
          className="h-full bg-amber-accent transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white/4 border border-white/8 rounded-xl px-7 pt-6 pb-7">
            <h2 className="text-white text-[20px] mb-6 font-medium">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedOption === index
                      ? "bg-amber-accent/10 border-amber-accent"
                      : "bg-white/8 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center ${
                        selectedOption === index ? "border-amber-accent" : "border-white/30"
                      }`}
                    >
                      {selectedOption === index && (
                        <div className="w-2 h-2 rounded-full bg-amber-accent"></div>
                      )}
                    </div>
                    <span className="text-[#D4E4F5] text-[14px]">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 px-7 py-4 flex items-center justify-between">
        <Link href={currentIndex > 0 ? `/diagnostic/${currentIndex}` : "/diagnostic"}>
          <Button variant="secondary" className="min-h-11">
            <ArrowLeft className="size-4" /> Anterior
          </Button>
        </Link>

        <p className="text-[12px] text-[#4A6480]">
          {selectedOption !== null ? "Opción seleccionada" : "Selecciona una opción"}
        </p>

        {currentIndex < 2 ? (
          <Link href={`/diagnostic/${currentIndex + 2}`}>
            <Button variant="primary" disabled={selectedOption === null} className="min-h-11">
              Siguiente <ArrowRight className="size-4" />
            </Button>
          </Link>
        ) : (
          <Link href="/diagnostic/result">
            <Button variant="primary" disabled={selectedOption === null} className="min-h-11">
              Ver resultado <ArrowRight className="size-4" />
            </Button>
          </Link>
        )}
      </div>

      {showExitModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowExitModal(false)}
        >
          <Card className="max-w-sm w-full m-4 p-6">
            <h4 className="text-primary-navy mb-3 font-medium">
              ¿Salir del diagnóstico?
            </h4>
            <p className="text-text-secondary-light text-[13px] mb-4">
              Tu progreso no se guardará y tendrás que comenzar desde el principio.
            </p>

            <div className="bg-light-amber border border-amber-accent/35 rounded-lg p-3 flex items-center gap-2 mb-6">
              <AlertTriangle size={16} className="text-amber-accent shrink-0" />
              <p className="text-amber-accent text-[13px]">
                Llevas {currentIndex + 1} preguntas respondidas
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setShowExitModal(false)}>
                Cancelar
              </Button>
              <Button variant="dark" className="flex-1" onClick={handleExit}>
                Salir de todas formas
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
