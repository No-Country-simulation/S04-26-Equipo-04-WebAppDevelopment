"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosticStore } from "@/store/diagnostic.store";
import { Button } from "@/components/Button";
import { GENERAL_CATEGORIES } from "@/constants/categories";

export default function CategoryPage() {
  const router = useRouter();

  const { questions, loadQuestions, setSelectedCategory, selectedCategory } = useDiagnosticStore();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#162840] px-4">
      <div className="max-w-xl w-full">
        <h2 className="text-white text-xl mb-6">Selecciona tu área principal</h2>

        <div className="space-y-3 mb-6">
          {categories.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleSelect(categoria)}
              className={`w-full p-4 rounded-xl border text-left ${
                selectedCategory === categoria
                  ? "border-amber-accent bg-amber-accent/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <p className="text-white">{categoria}</p>
            </button>
          ))}
        </div>

        <Button onClick={handleContinue} disabled={!selectedCategory}>
          Continuar →
        </Button>
      </div>
    </div>
  );
}
