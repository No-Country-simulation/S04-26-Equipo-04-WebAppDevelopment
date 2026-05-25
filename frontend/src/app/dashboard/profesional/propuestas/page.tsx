import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Briefcase } from "lucide-react";

interface JobProps {
  title: string;
  company: string;
  match: number;
}

interface ProcessProps {
  company: string;
  role: string;
  stage: "review" | "interview" | "closed";
}

export default function PropuestasPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-primary-navy">
          Propuestas Laborales
        </h1>
        <p className="text-sm text-gray-500">
          Evalúa coincidencias con tu perfil y gestiona tus procesos.
        </p>
      </div>

      {/* Nuevas coincidencias */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-primary-navy">
          Nuevas Coincidencias
        </h2>

        <JobCard
          title="Director de Finanzas"
          company="TalentGroup"
          match={92}
        />

        <JobCard
          title="Gerente Financiero"
          company="FinanzaCorp"
          match={88}
        />
      </section>

      {/* Procesos activos */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-primary-navy">
          Procesos Activos
        </h2>

        <ProcessCard
          company="FinanzaCorp"
          role="Director de Finanzas"
          stage="review"
        />

        <ProcessCard
          company="DesignStudio"
          role="Gerente de Proyectos"
          stage="closed"
        />
      </section>
    </div>
  );
}


export function JobCard({ title, company, match }: JobProps) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary-navy flex items-center justify-center text-white">
          <Briefcase size={18} />
        </div>

        {/* Info */}
        <div>
          <p className="font-medium text-primary-navy">{title}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <span className="px-4 py-2 rounded-full bg-primary-navy text-white text-sm">
          Compatibilidad {match}%
        </span>

        <Button variant="secondary">Descartar</Button>
        <Button>Ver Propuesta</Button>
      </div>
    </Card>
  );
}


export function ProcessCard({ company, role, stage }: ProcessProps) {
  const stages = ["Visto", "En revisión", "Entrevista"];

  const currentIndex =
    stage === "review" ? 1 : stage === "interview" ? 2 : 3;

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary-navy text-white flex items-center justify-center">
          {company.slice(0, 2)}
        </div>

        <div>
          <p className="font-medium text-primary-navy">{company}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      {/* Progress */}
      {stage !== "closed" ? (
        <div className="flex items-center justify-between text-xs text-gray-500">
          {stages.map((label, i) => (
            <div key={label} className="flex-1 text-center">
              <div
                className={`h-1 mb-2 ${
                  i <= currentIndex ? "bg-amber-accent" : "bg-gray-200"
                }`}
              />
              {label}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-400 bg-gray-100 p-3 rounded-lg">
          Proceso cerrado. Feedback: Te sugerimos el módulo de IA.
        </div>
      )}
    </Card>
  );
}