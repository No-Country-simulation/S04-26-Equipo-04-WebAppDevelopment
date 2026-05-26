"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosticStore } from "@/store/diagnostic.store";
import { GENERAL_CATEGORIES } from "@/constants/categories";
import {
  DiagnosticFooter,
  DiagnosticHeader,
  DiagnosticProgress,
  ExitModal,
  OptionItem,
  QuestionCard,
} from "@/components/diagnostico";

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

  //.3
  const answeredCount = useMemo(() => {
    return new Set(answers.map((a) => a.preguntaId)).size;
  }, [answers]);

  // 4. filtrar preguntas
  const filteredGroups = useMemo(() => {
    if (!selectedCategory) return [];

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
  if (!allQuestions.length || !question) {
    return <div className="text-blue-400">Cargando preguntas...</div>;
  }

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
    if (currentIndex === 0) {
      router.push("/diagnostico/categoria");
      return;
    }

    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleExit = () => router.push("/");

  const isLast = currentIndex === allQuestions.length - 1;

  return (
    <div className="flex flex-col h-screen">
      <DiagnosticHeader
        current={currentIndex + 1}
        total={allQuestions.length}
        onExit={() => setShowExitModal(true)}
        category={question.categoria}
      />
      <DiagnosticProgress value={progress} />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <QuestionCard texto={question.texto}>
            {question.opciones.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                selected={selectedOption === option.id}
                onSelect={() => handleSelect(option.id)}
                formatText={formatOption}
              />
            ))}
          </QuestionCard>
        </div>
      </div>
      <DiagnosticFooter
        onNext={next}
        onPrev={prev}
        showPrev={true}
        disabledNext={!selectedOption || submitting}
        disabledPrev={submitting}
        isLast={isLast}
        submitting={submitting}
        selected={!!selectedOption}
      />
      {showExitModal && (
        <ExitModal
          open={showExitModal}
          onClose={() => setShowExitModal(false)}
          onConfirm={handleExit}
          texto={
            answeredCount === 0
              ? "Has respondido 0 preguntas"
              : `Llevas ${answeredCount} preguntas respondidas`
          }
        />
      )}
    </div>
  );
}
