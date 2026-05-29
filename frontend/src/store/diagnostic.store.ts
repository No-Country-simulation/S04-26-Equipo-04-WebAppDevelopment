import { create } from "zustand";
import { DiagnosticService } from "@/services/diagnostic.service";
import { api } from "@/lib/api";

type ResultItem = {
  categoria: string;
  puntajeObtenido: number;
  puntajeMaximo: number;
  nivel: string;
  recomendacion: string;
};

type DiagnosticResult = {
  diagnosticoId: number;
  estado: string;
  resultados: ResultItem[];
};

type State = {
  loading: boolean;
  started: boolean;

  diagnosticoId: number | null;

  questions: QuestionGroup[];
  answers: Answer[];

  result: DiagnosticResult | null;
  fetchResultFromRoute: () => Promise<void>;

  selectedCategory: string | null;

  loadQuestions: () => Promise<void>;
  startDiagnostic: () => Promise<void>;

  setAnswer: (preguntaId: number, opcionId: number) => void;
  setSelectedCategory: (category: string) => void;

  sendAnswers: () => Promise<unknown>;
};

export const useDiagnosticStore = create<State>((set, get) => ({
  loading: false,
  started: false,

  diagnosticoId: null,

  questions: [],
  answers: [],

  result: null,
  selectedCategory: null,

  loadQuestions: async () => {
    set({ loading: true });

    try {
      const data = await DiagnosticService.getQuestions();

      set({
        questions: data,
      });
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      set({ loading: false });
    }
  },

  startDiagnostic: async () => {
    const data = await DiagnosticService.start();

    set({
      diagnosticoId: data.id,
      started: true,
    });
  },

  setSelectedCategory: (category) => {
    set({
      selectedCategory: category,
      answers: [],
      result: null,
    });
  },

  setAnswer: (preguntaId, opcionId) => {
    const answers = get().answers;

    const exists = answers.find((a) => a.preguntaId === preguntaId);

    if (exists) {
      set({
        answers: answers.map((a) =>
          a.preguntaId === preguntaId ? { preguntaId, opcionId } : a
        ),
      });
    } else {
      set({
        answers: [...answers, { preguntaId, opcionId }],
      });
    }
  },

  sendAnswers: async () => {
    const { diagnosticoId, answers } = get();

    if (!diagnosticoId) return;

    const result = await DiagnosticService.sendAnswers({
      diagnosticoId,
      respuestas: answers,
    });

    try {
      // Generar automáticamente la ruta de aprendizaje en base de datos al finalizar
      await api.post(`/Rutas/generar/${diagnosticoId}`);
    } catch (e) {
      console.error("Error al generar la ruta de aprendizaje:", e);
    }

    set({ result });

    return result;
  },
  fetchResultFromRoute: async () => {
    try {
      set({ loading: true });

      // 1. traer ruta
      const route = await DiagnosticService.getMyRoute();

      const diagnosticoId = route.diagnosticoId;

      // 2. traer resultado
      const result = await DiagnosticService.getResult(diagnosticoId);

      set({
        diagnosticoId,
        result,
      });
    } catch (error) {
      console.error("Error fetching result:", error);
    } finally {
      set({ loading: false });
    }
  },
}));