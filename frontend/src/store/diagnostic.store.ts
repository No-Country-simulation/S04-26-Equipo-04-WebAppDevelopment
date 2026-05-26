import { create } from "zustand";
import { DiagnosticService } from "@/services/diagnostic.service";

type State = {
  loading: boolean;
  started: boolean;

  diagnosticoId: number | null;

  questions: QuestionGroup[];
  answers: Answer[];

  result: unknown;

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

    const data = await DiagnosticService.getQuestions();

    set({
      questions: data,
      loading: false,
    });
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

    set({ result });

    return result;
  },
}));