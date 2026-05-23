import { Brain, Eye, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const cards: {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
  offset?: boolean;
}[] = [
  {
    icon: Brain,
    label: "El Desafío",
    title:
      "El sesgo invisible: Reemplazamos el prejuicio por evidencia de adaptabilidad real.",
    body: "No se trata solo de edad, sino de la percepción de obsolescencia. Validamos tu capacidad de reinvención con métricas concretas.",
  },
  {
    icon: Wrench,
    label: "La Realidad",
    title:
      "La brecha de herramientas: No es falta de capacidad, es falta de acceso a la actualización estratégica.",
    body: "El dominio técnico se adquiere; la visión estratégica toma décadas. Proporcionamos el puente digital para tu liderazgo.",
    offset: true,
  },
  {
    icon: Eye,
    label: "La Solución",
    title:
      "Talento oculto: Transformamos décadas de trayectoria en autoridad digital visible para las empresas.",
    body: "Dejamos atrás los CVs tradicionales para crear perfiles de impacto que las empresas no pueden permitirse ignorar.",
  },
];

function ProblemCard({
  icon: Icon,
  label,
  title,
  body,
  offset,
}: (typeof cards)[number]) {
  return (
    <article
      className={`group relative flex h-full flex-col items-center overflow-hidden rounded-[32px] border border-slate-100 bg-white p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_20px_50px_rgba(26,43,75,0.1)] ${offset ? "md:translate-y-8" : ""}`}
    >
      <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-secondary/5 blur-3xl transition-colors group-hover:bg-secondary/10" />
      <div className="relative z-10 mb-8 flex flex-col items-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-secondary/10 transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-14 w-14 text-secondary opacity-90" strokeWidth={1.25} />
        </div>
        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-secondary uppercase">{label}</p>
        <h3 className="mb-6 font-heading text-xl leading-tight font-semibold text-primary">{title}</h3>
      </div>
      <div className="relative z-10 mt-auto flex flex-col items-center">
        <div className="mb-6 h-1.5 w-12 rounded-full bg-secondary/20" />
        <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
      </div>
    </article>
  );
}

export default function ProblemSection() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden border-y border-outline-variant/30 bg-surface-container-low/40 px-8 py-24"
    >
      <div className="pointer-events-none absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -left-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-container-max">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="mb-4 font-heading text-3xl font-semibold text-primary md:text-4xl">
            Rompiendo el Techo de Cristal de la Experiencia
          </h2>
          <p className="mx-auto mb-6 max-w-3xl text-lg text-on-surface-variant">
            En un mundo obsesionado con la novedad, el mercado laboral desperdicia sistemáticamente el
            activo más escaso: la sabiduría aplicada. Enfrentamos una pérdida de valor estructural que
            solo puede resolverse reconectando la maestría con la innovación.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-3">
          {cards.map((card) => (
            <ProblemCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
