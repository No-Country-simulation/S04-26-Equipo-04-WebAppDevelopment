"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, X } from "lucide-react";
import { useDiagnosticStore } from "@/store/diagnostic.store";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { GENERAL_CATEGORIES } from "@/constants/categories";

export default function DiagnosticQuestionPage() {
  const router = useRouter();

  const { questions, loadQuestions, setAnswer, answers, sendAnswers, selectedCategory } =
    useDiagnosticStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. cargar preguntas
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // 2. asegurar categoría
  useEffect(() => {
    if (!selectedCategory) {
      router.push("/diagnostico/categoria");
    }
  }, [selectedCategory, router]);

  // 3. reset índice cuando cambia dataset
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // 4. filtrar preguntas
  const filteredGroups = useMemo(() => {
    if (!selectedCategory || !questions.length) return [];

    return questions.filter(
      (group) =>
        group.categoria === selectedCategory || GENERAL_CATEGORIES.includes(group.categoria),
    );
  }, [questions, selectedCategory]);

  // 5. aplanar preguntas
  const allQuestions: QuestionWithCategory[] = useMemo(() => {
    return filteredGroups.flatMap((g) =>
      g.preguntas.map((p) => ({
        ...p,
        categoria: g.categoria,
      })),
    );
  }, [filteredGroups]);

  const question = allQuestions[currentIndex];

  // 6. estado respuesta
  const selectedOption = useMemo(() => {
    if (!question) return null;

    const answer = answers.find((a) => a.preguntaId === question.id);
    return answer ? answer.opcionId : null;
  }, [answers, question]);

  // 7. format
  const formatOption = (text: string) => {
    const parts = text.split("/");
    return parts.length > 1 ? parts[1].trim() : text;
  };

  // 8. loading guards
  if (!allQuestions.length) return <div className="text-blue-400">Cargando preguntas...</div>;
  if (!question) return <div className="text-blue-400">Cargando pregunta...</div>;

  const progress = ((currentIndex + 1) / allQuestions.length) * 100;

  const handleSelect = (optionId: number) => {
    setAnswer(question.id, optionId);
  };

  // 🚨 SUBMIT REAL
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      await sendAnswers();

      router.push("/diagnostico/resultado");
    } catch (error) {
      console.error("Error en submit:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // next / submit
  const next = async () => {
    const isLast = currentIndex === allQuestions.length - 1;

    if (isLast) {
      await handleSubmit();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleExit = () => router.push("/");

  const isLast = currentIndex === allQuestions.length - 1;

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
          <p className="text-text-muted-dark text-[13px]">
            Pregunta {currentIndex + 1} de {allQuestions.length}
          </p>
        </div>
        <Badge variant="navy" className="text-[11px]">
          {question.categoria}
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
            <h2 className="text-white text-[20px] mb-6 font-medium">{question.texto}</h2>

            <div className="space-y-3">
              {question.opciones.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedOption === option.id
                      ? "bg-amber-accent/10 border-amber-accent"
                      : "bg-white/8 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center ${
                        selectedOption === option.id ? "border-amber-accent" : "border-white/30"
                      }`}
                    >
                      {selectedOption === option.id && (
                        <div className="w-2 h-2 rounded-full bg-amber-accent"></div>
                      )}
                    </div>
                    <span className="text-[#D4E4F5] text-[14px]">{formatOption(option.texto)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 px-7 py-4 flex items-center justify-between">
        <Button
          onClick={prev}
          disabled={currentIndex === 0}
          variant="secondary"
          className="min-h-11"
        >
          <ArrowLeft className="size-4" /> Anterior
        </Button>

        <p className="text-[12px] text-[#4A6480]">
          {selectedOption ? "Opción seleccionada" : "Selecciona una opción"}
        </p>

        <Button
          variant="primary"
          disabled={!selectedOption || submitting}
          onClick={next}
          className="min-h-11"
        >
          {isLast ? (submitting ? "Enviando..." : "Ver resultado") : "Siguiente"}
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {showExitModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowExitModal(false)}
        >
          <Card className="max-w-sm w-full m-4 p-6">
            <h4 className="text-primary-navy mb-3 font-medium">¿Salir del diagnóstico?</h4>
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
