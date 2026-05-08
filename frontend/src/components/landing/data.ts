export type LandingIconKey =
  | "trendDown"
  | "shuffle"
  | "target"
  | "sparkle"
  | "activity"
  | "briefcase"
  | "shield"
  | "compass"
  | "search"
  | "handshake";

export const challengeCards = [
  {
    title: "El sesgo invisible",
    description:
      "Reemplazamos prejuicios por evidencia de adaptabilidad real y resultados verificables.",
    icon: "search",
  },
  {
    title: "La brecha de herramientas",
    description:
      "No es falta de capacidad, es falta de acceso a una actualización estratégica constante.",
    icon: "compass",
  },
  {
    title: "Talento oculto",
    description:
      "Transformamos trayectorias en autoridad digital visible para empresas que valoran experiencia.",
    icon: "target",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  description: string;
  icon: LandingIconKey;
}>;

export const solutions = [
  {
    title: "Ruta de aprendizaje dinámica",
    description:
      "Rutas de actualización personalizadas, enfocadas en impacto laboral real y continuidad.",
    tags: ["Adaptativo", "Mentoría IA"],
    tone: "dark",
    icon: "sparkle",
  },
  {
    title: "Diagnóstico 360",
    description:
      "Identifica fortalezas, oportunidades tecnológicas y prioridades de evolución profesional.",
    tags: ["Evaluación", "Data"],
    tone: "mid",
    icon: "activity",
  },
  {
    title: "Mercado de talento élite",
    description:
      "Acceso a vacantes estratégicas donde la experiencia senior es ventaja competitiva.",
    tags: ["Empresas", "Talento"],
    tone: "light",
    icon: "briefcase",
  },
  {
    title: "Perfil dinámico y conexión real",
    description:
      "Tu trayectoria convertida en una narrativa digital clara, visible y accionable.",
    tags: ["Perfil", "Match"],
    tone: "dark",
    icon: "shield",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  description: string;
  tags: readonly string[];
  tone: "dark" | "mid" | "light";
  icon: LandingIconKey;
}>;

export const journeySteps = [
  {
    title: "Diagnóstico",
    description: "Diagnóstico de competencias y brecha digital.",
    icon: "activity",
  },
  {
    title: "Ruta personal",
    description: "Ruta de aprendizaje personalizada por objetivos.",
    icon: "compass",
  },
  {
    title: "Perfil pro",
    description: "Perfil profesional optimizado con evidencia.",
    icon: "search",
  },
  {
    title: "Match",
    description: "Conexión con empresas alineadas a tu experiencia.",
    icon: "handshake",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  description: string;
  icon: LandingIconKey;
}>;

export const stats = [
  { value: "12k+", label: "PROFESIONALES ACTIVOS" },
  { value: "85%", label: "TASA DE EMPLEABILIDAD" },
  { value: "450", label: "EMPRESAS ALIADAS" },
  { value: "3200", label: "ACTUALIZACIONES COMPLETADAS" },
];
