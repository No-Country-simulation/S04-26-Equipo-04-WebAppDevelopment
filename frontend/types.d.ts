interface IconsProps {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// Diagnostico
interface Option {
  id: number;
  texto: string;
};

interface Question {
  id: number;
  texto: string;
  opciones: Option[];
};

interface QuestionGroup {
  categoria: string;
  preguntas: Question[];
};

interface Answer {
  preguntaId: number;
  opcionId: number;
};

interface QuestionWithCategory extends Question {
  categoria: string;
}