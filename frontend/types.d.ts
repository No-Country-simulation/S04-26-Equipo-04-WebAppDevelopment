declare global {
  interface IconsProps {
    className?: string;
    size?: number;
    width?: number;
    height?: number;
    strokeWidth?: number;
  }

  // Diagnostico
  interface Option {
    id: number;
    texto: string;
  }

  interface Question {
    id: number;
    texto: string;
    opciones: Option[];
  }

  interface QuestionGroup {
    categoria: string;
    preguntas: Question[];
  }

  interface Answer {
    preguntaId: number;
    opcionId: number;
  }

  interface QuestionWithCategory extends Question {
    categoria: string;
  }
}

//Empresa
// --- VACANTES ---
export interface Vacante {
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
export interface VacantePayload {
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
export interface UpdateVacantePayload extends VacantePayload {
  estado?: "abierta" | "cerrada";
}

//Marketplace
export type SkillNivel = "basico" | "intermedio" | "avanzado";

export interface TalentSkill {
  id: number;
  skillId: number;
  skillNombre: string;
  categoriaNombre: string;
  origen: string;
  nivel: SkillNivel;
  validada: boolean;
}

export interface TalentExperience {
  id: number;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
}

export interface TalentProfile {
  id: number;
  usuarioId: number;
  nombre: string;
  apellido: string;
  email: string;
  titular: string;
  biografia: string;
  urlLinkedin: string;
  visibleMarketplace: boolean;
  skills: TalentSkill[];
  experiencias: TalentExperience[];
}

export interface MatchCandidate {
  perfilId: number;
  usuarioId: number;
  nombre: string;
  apellido: string;
  titular: string;
  urlLinkedin: string;
  porcentajeMatch: number;
  skillsCoincidentes: string[];
  skillsFaltantes: string[];
}
