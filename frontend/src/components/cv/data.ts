import type { CvProfileData } from "./types";

const sampleProfile: CvProfileData = {
  slug: "javier-mendoza",
  summary: {
    fullName: "Javier Mendoza",
    role: "Director financiero y estrategia de negocio | Transformación digital en finanzas",
    location: "Bogotá, Colombia",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=80",
    coverGradient: "from-primary to-secondary",
    executiveSummary:
      "Líder financiero con más de 25 años de trayectoria en corporaciones multinacionales, especializado en modernizar infraestructuras críticas y sostener el crecimiento. Integro el control financiero tradicional con soluciones ágiles y datos accionables, priorizando equipos multigeneracionales y proyectos de transformación que van más allá del balance.",
  },
  availability: {
    mode: "Inmediata (híbrido)",
    schedule: "Tiempo completo / CFO fraccional",
  },
  interestSectors: ["FinTech", "Energía limpia", "Logística", "Salud digital"],
  marketReadiness: {
    score: 94,
    trend: "+3% este mes",
    description:
      "Tu perfil está en el 5% superior de expertos verificados en transformación financiera y digital.",
  },
  experience: [
    {
      role: "Director financiero (CFO)",
      company: "Global Dynamics Inc.",
      period: "2018 - Presente",
      highlights:
        "Lideré la reestructuración financiera posterior a una fusión e incorporé sistemas ERP con soporte de IA, reduciendo el tiempo de cierre mensual en un 40%.",
      isCurrent: true,
    },
    {
      role: "Director de estrategia financiera",
      company: "NexGen Industrial",
      period: "2012 - 2018",
      highlights:
        "Supervisé operaciones en cinco países, con presupuesto anual de USD 200M y coordinación de la salida a bolsa de la división europea.",
    },
    {
      role: "Gerente regional de control y cumplimiento",
      company: "Atlas Manufacturing Group",
      period: "2005 - 2012",
      highlights:
        "Unifiqué los indicadores de gestión financiera en las regiones y consolidé los informes para el comité ejecutivo.",
    },
  ],
  skills: [
    {
      name: "Gestión de resultados (P&L)",
      levelLabel: "Experto",
      percentage: 100,
      category: "leadership",
    },
    {
      name: "Cumplimiento internacional",
      levelLabel: "Avanzado",
      percentage: 90,
      category: "leadership",
    },
    {
      name: "Fusiones y adquisiciones",
      levelLabel: "Experto",
      percentage: 95,
      category: "leadership",
    },
    {
      name: "Visualización de datos (Power BI / Tableau)",
      levelLabel: "Verificado",
      percentage: 85,
      category: "digital",
    },
    {
      name: "Blockchain aplicada a finanzas",
      levelLabel: "Verificado",
      percentage: 70,
      category: "digital",
    },
    {
      name: "Gestión de proyectos ágiles",
      levelLabel: "En curso",
      percentage: 60,
      category: "digital",
    },
  ],
  badges: [
    { title: "Estratega destacado", subtitle: "Impacto corporativo" },
    { title: "Transformación digital", subtitle: "Competencia digital" },
    { title: "Liderazgo híbrido", subtitle: "Equipos multigeneracionales" },
    { title: "Gobernanza ética", subtitle: "Cumplimiento y cultura" },
  ],
  education: [
    {
      title: "MBA en finanzas internacionales",
      institution: "IE Business School",
      period: "2002 - 2004",
    },
    {
      title: "Economía",
      institution: "Universidad de los Andes",
      period: "1995 - 2000",
    },
  ],
};

const profilesBySlug: Record<string, CvProfileData> = {
  [sampleProfile.slug]: sampleProfile,
};

export function getCvProfileBySlug(slug: string): CvProfileData {
  return profilesBySlug[slug] ?? sampleProfile;
}
