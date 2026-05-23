import type { CvProfileData, SkillCategory } from "./types";
import type { ReactNode } from "react";
import {
  ChartLine,
  Briefcase,
  CalendarDots,
  CheckCircle,
  EnvelopeSimple,
  GraduationCap,
  HouseLine,
  Lightning,
  Lifebuoy,
  MagnifyingGlass,
  PersonSimpleRun,
  SlidersHorizontal,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

type SectionProps = {
  profile: CvProfileData;
};

export function ProfileHero({ profile }: SectionProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/10">
      <div
        className={`relative z-0 h-24 bg-gradient-to-r ${profile.summary.coverGradient}`}
        aria-hidden
      />

      {/* Zona blanca: el texto va siempre en flujo normal (contraste legible). El avatar solapa el
          borde banner/blanco con posición absoluta + translate, sin arrastrar el bloque del nombre. */}
      <div className="relative z-10 bg-white px-4 pb-5 pt-0 sm:px-8 sm:py-5 sm:pb-6">
        <div className="relative sm:min-h-[5.75rem]">
          {/* Móvil: flujo + solape. Desktop: absoluto en el borde banner/blanco (texto solo en fila blanca). */}
          <div className="relative z-20 mx-auto -mt-14 mb-3 h-28 w-28 max-sm:translate-y-2 overflow-hidden rounded-xl border-4 border-white shadow-lg sm:absolute sm:top-3 sm:left-4 sm:mx-0 sm:mt-0 sm:mb-0 sm:h-32 sm:w-32 sm:-translate-y-1/2 md:left-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.summary.avatar}
              alt={`Foto de perfil de ${profile.summary.fullName}`}
              className="h-full w-full object-cover object-[50%_14%] sm:object-[50%_16%]"
            />
            <span
              className="absolute right-1 bottom-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
              title="Disponible"
              aria-hidden
            />
          </div>

          <div className="flex flex-col gap-4 pt-1 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pt-3 sm:text-left">
            <div className="min-w-0 pl-0 sm:flex-1 sm:pl-40 md:pl-44">
              <h1 className="text-2xl leading-8 font-bold tracking-tight text-primary sm:text-[28px] sm:leading-9 md:text-[32px] md:leading-10">
                {profile.summary.fullName}
              </h1>
              <p className="mt-0.5 text-sm leading-snug font-medium text-secondary md:text-base">
                {profile.summary.role}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">{profile.summary.location}</p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:shrink-0 sm:items-center sm:justify-end sm:gap-3 md:gap-4">
              <button
                type="button"
                className="inline-flex h-11 min-w-[10rem] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                <EnvelopeSimple className="h-4 w-4 shrink-0" weight="bold" />
                Contactar
              </button>
              <button
                type="button"
                className="inline-flex h-11 min-w-[10rem] items-center justify-center whitespace-nowrap rounded-lg border-2 border-secondary bg-transparent px-5 text-sm font-semibold text-secondary shadow-sm transition hover:bg-muted"
              >
                Exportar CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EducationSection({ profile }: SectionProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-8 ring-1 ring-foreground/10">
      <header className="mb-8 flex items-center gap-2 text-primary">
        <GraduationCap className="h-6 w-6 text-secondary" weight="duotone" />
        <h2 className="text-2xl font-semibold">Formación académica</h2>
      </header>
      <ul className="space-y-0 divide-y divide-border">
        {profile.education.map((item) => (
          <li key={`${item.title}-${item.institution}`} className="flex flex-col gap-1 py-5 first:pt-0">
            <h3 className="text-lg font-bold text-primary">{item.title}</h3>
            <p className="text-sm font-semibold text-secondary">{item.institution}</p>
            <p className="text-sm text-on-surface-variant">{item.period}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ExperienceTimeline({ profile }: SectionProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-8 ring-1 ring-foreground/10">
      <header className="mb-8 flex items-center gap-2 text-primary">
        <Briefcase className="h-6 w-6 text-secondary" weight="duotone" />
        <h2 className="text-2xl font-semibold">Trayectoria profesional</h2>
      </header>
      <div className="relative flex flex-col gap-10">
        <div className="absolute bottom-2 left-5 top-2 w-px bg-surface-container" />
        {profile.experience.map((item) => (
          <div key={`${item.company}-${item.period}`} className="relative pl-12">
            <div
              className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-sm ${
                item.isCurrent ? "border-secondary" : "border-border"
              }`}
            >
              <Briefcase
                className={`h-5 w-5 ${item.isCurrent ? "text-secondary" : "text-on-surface-variant"}`}
                weight="duotone"
              />
            </div>
            <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-bold text-primary">{item.role}</h3>
              <span className="badge-soft">{item.period}</span>
            </div>
            <p className="text-sm font-semibold text-secondary">{item.company}</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {item.highlights}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export function SkillsPanel({ profile }: SectionProps) {
  const leadership = profile.skills.filter((skill) => skill.category === "leadership");
  const digital = profile.skills.filter((skill) => skill.category === "digital");

  return (
    <section className="rounded-xl border border-border bg-card p-8 ring-1 ring-foreground/10">
      <header className="mb-8 flex items-center gap-2 text-primary">
        <Lightning className="h-6 w-6 text-secondary" weight="duotone" />
        <h2 className="text-2xl font-semibold">Matriz de competencias</h2>
      </header>
      <div className="grid gap-12 md:grid-cols-2">
        <SkillsColumn title="Liderazgo tradicional" tone="leadership" skills={leadership} />
        <SkillsColumn title="Competencias digitales" tone="digital" skills={digital} />
      </div>
    </section>
  );
}

function SkillsColumn({
  title,
  tone,
  skills,
}: {
  title: string;
  tone: SkillCategory;
  skills: CvProfileData["skills"];
}) {
  const barTone = tone === "leadership" ? "bg-primary" : "bg-secondary";
  const levelTone = tone === "leadership" ? "text-secondary" : "text-on-secondary-container";

  return (
    <div>
      <h3 className={`mb-6 flex items-center justify-between text-lg font-semibold ${tone === "leadership" ? "text-primary" : "text-secondary"}`}>
        {title}
        <span className="text-xs font-normal text-muted-foreground">
          {tone === "leadership" ? "Sólida autoridad" : "Agilidad adaptativa"}
        </span>
      </h3>
      <div className="space-y-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{skill.name}</span>
              <span className={`font-semibold ${levelTone}`}>{skill.levelLabel}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className={`${barTone} h-full rounded-full`}
                style={{ width: `${skill.percentage}%` }}
                aria-hidden
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HighlightsBadges({ profile }: SectionProps) {
  const badgeGradients = [
    "from-amber-400 to-amber-600",
    "from-teal-400 to-secondary",
    "from-neutral to-primary",
    "from-blue-400 to-indigo-600",
  ];

  return (
    <article className="rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/10">
      <h3 className="mb-6 text-sm font-bold tracking-widest text-primary uppercase">
        Verificación TalentRenew
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {profile.badges.map((badge, index) => (
          <div
            key={badge.title}
            className="rounded-lg bg-muted p-3 text-center"
          >
            <div
              className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${badgeGradients[index % badgeGradients.length]} shadow-md`}
            >
              <CheckCircle className="h-6 w-6 text-white" weight="fill" />
            </div>
            <p className="text-[10px] font-bold text-primary">{badge.title}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ProfileSidebar({ profile }: SectionProps) {
  return (
    <aside className="space-y-6">
      <article className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-secondary opacity-20" />
        <h3 className="mb-4 text-sm font-bold tracking-widest text-secondary-fixed uppercase">
          Preparación para el mercado
        </h3>
        <div className="mb-2 flex items-end gap-2">
          <span className="text-4xl font-bold">{profile.marketReadiness.score}%</span>
          <span className="mb-1 inline-flex items-center gap-1 text-sm font-semibold text-secondary-fixed">
            <TrendUp className="h-4 w-4" weight="duotone" />
            {profile.marketReadiness.trend}
          </span>
        </div>
        <div className="mb-4 h-2 w-full rounded-full bg-white/20">
          <div
            className="h-2 rounded-full bg-secondary-fixed"
            style={{ width: `${profile.marketReadiness.score}%` }}
            aria-hidden
          />
        </div>
        <p className="text-xs leading-relaxed text-white/80">{profile.marketReadiness.description}</p>
      </article>

      <HighlightsBadges profile={profile} />

      <article className="rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/10">
        <h3 className="mb-4 text-sm font-bold tracking-widest text-primary uppercase">
          Disponibilidad
        </h3>
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-secondary-container p-3">
          <CalendarDots className="h-5 w-5 text-secondary" weight="duotone" />
          <div>
            <p className="text-sm font-bold text-on-secondary-container">
              {profile.availability.mode}
            </p>
            <p className="text-xs text-on-secondary-container/80">{profile.availability.schedule}</p>
          </div>
        </div>

        <h4 className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
          Sectores de interés
        </h4>
        <div className="flex flex-wrap gap-2">
          {profile.interestSectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-primary"
            >
              {sector}
            </span>
          ))}
        </div>
      </article>

    </aside>
  );
}

export function ProfileWorkspaceSidebar({ profile }: SectionProps) {
  return (
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-border bg-muted p-4 lg:flex">
      <div className="mb-8 px-3">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-primary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.summary.avatar}
              alt={`Mini perfil de ${profile.summary.fullName}`}
              className="h-full w-full object-cover object-[50%_14%]"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-primary">Experto valorado</p>
            <p className="text-xs text-muted-foreground">Programa de crecimiento activo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <SidebarItem icon={<HouseLine className="h-5 w-5" weight="duotone" />} label="Diagnóstico" />
        <SidebarItem
          icon={<MagnifyingGlass className="h-5 w-5" weight="duotone" />}
          label="Ruta de aprendizaje"
        />
        <SidebarItem
          icon={<PersonSimpleRun className="h-5 w-5" weight="duotone" />}
          label="Perfil"
          active
        />
        <SidebarItem icon={<ChartLine className="h-5 w-5" weight="duotone" />} label="Mercado" />
        <SidebarItem icon={<TrendUp className="h-5 w-5" weight="duotone" />} label="Progreso" />
      </nav>

      <div className="mt-6 border-t border-border pt-4">
        <button className="mb-4 w-full rounded-lg bg-secondary py-3 text-sm font-semibold text-primary-foreground">
          Buscar oportunidades
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-background">
          <SlidersHorizontal className="h-4 w-4" weight="duotone" />
          Ajustes
        </button>
        <button className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-background">
          <Lifebuoy className="h-4 w-4" weight="duotone" />
          Soporte
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm tracking-wide ${
        active
          ? "bg-secondary-container font-semibold text-on-secondary-container"
          : "text-muted-foreground transition hover:translate-x-1 hover:bg-background"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
