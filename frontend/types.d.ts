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

//Empresa
// --- VACANTES ---
interface Vacante {
  id: number;
  empresaId: number;
  empresaNombre: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: "remoto" | "presencial" | "hibrido";
  rangoSalarial: string;
  estado: "abierta" | "cerrada";
  fechaPublicacion: string;
  skillsRequeridas: Skill[];
}

/**
 * Payload para CREAR vacante
 * (NO incluye campos que define el backend)
 */
interface VacantePayload {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: "remoto" | "presencial" | "hibrido";
  rangoSalarial: string;
  skillsRequeridas: Skill[];
}


/**
 * Payload para ACTUALIZAR vacante
 * (permite cambiar estado opcionalmente)
 */
interface UpdateVacantePayload extends VacantePayload {
  estado?: "abierta" | "cerrada";
}