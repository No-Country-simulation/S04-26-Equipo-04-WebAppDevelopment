"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosticStore } from "@/store/diagnostic.store";
import { GENERAL_CATEGORIES } from "@/constants/categories";
import {
  CategorySelector,
  DiagnosticFooter,
  DiagnosticHeader,
  ExitModal,
  QuestionCard,
} from "@/components/diagnostico";

export default function CategoryPage() {
  const router = useRouter();

  const { questions, loadQuestions, setSelectedCategory, selectedCategory, loading } =
    useDiagnosticStore();

  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleSelect = (categoria: string) => {
    setSelectedCategory(categoria);
  };

  const handleContinue = () => {
    if (!selectedCategory) return;
    router.push("/diagnostico/preguntas");
  };

  const categories = [
    ...new Set(
      questions.map((q) => q.categoria).filter((cat) => !GENERAL_CATEGORIES.includes(cat)),
    ),
  ];

  const handleExit = () => router.push("/");

  return (
    <div className="h-screen flex flex-col">
      <DiagnosticHeader onExit={() => setShowExitModal(true)} category="Categoria" />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <QuestionCard texto="Selecciona tu área principal de interés para el diagnóstico">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-blue-400 animate-pulse text-sm">Cargando categorías...</div>
              </div>
            ) : (
              categories.map((categoria) => (
                <CategorySelector
                  key={categoria}
                  categoria={categoria}
                  selected={selectedCategory === categoria}
                  onSelect={() => handleSelect(categoria)}
                />
              ))
            )}
          </QuestionCard>
        </div>
      </div>
      <DiagnosticFooter
        onNext={handleContinue}
        disabledNext={!selectedCategory}
        disabledPrev={false}
        isLast={false}
        submitting={false}
        selected={!!selectedCategory}
      />

      {showExitModal && (
        <ExitModal
          open={showExitModal}
          onClose={() => setShowExitModal(false)}
          onConfirm={handleExit}
        />
      )}
    </div>
  );
}
