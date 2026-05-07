"use client";

import {
  challengeCards,
  journeySteps,
  solutions,
  stats,
  type LandingIconKey,
} from "./data";
import Image from "next/image";
import {
  ArrowBendDoubleUpRight,
  Compass,
  Handshake,
  Pulse,
  ShieldCheck,
  Sparkle,
  GraduationCap,
  SuitcaseSimple,
  Target,
  TrendDown,
  UserFocus,
  CheckCircle,
  Buildings,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

const iconMap: Record<
  LandingIconKey,
  ComponentType<{ className?: string; weight?: "duotone" }>
> = {
  trendDown: TrendDown,
  shuffle: ArrowBendDoubleUpRight,
  target: Target,
  sparkle: Sparkle,
  activity: Pulse,
  briefcase: SuitcaseSimple,
  shield: ShieldCheck,
  compass: Compass,
  search: UserFocus,
  handshake: Handshake,
} as const;

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[870px] items-center overflow-hidden bg-surface px-8 pt-16"
    >
      <div className="app-container grid w-full items-center gap-12 md:grid-cols-2">
        <div className="z-10">
          <span className="inline-block rounded-full bg-secondary-container px-4 py-1 text-sm font-semibold uppercase tracking-wide text-[#1c6d6b]">
            REINVENTANDO LA EXPERIENCIA
          </span>
          <h1 className="mt-6 max-w-xl text-[48px] leading-[56px] font-bold tracking-[-0.02em] text-primary">
            Tu experiencia es tu mayor valor. Conéctala con el futuro.
          </h1>
          <p className="mt-6 mb-10 max-w-xl text-lg leading-7 text-on-surface-variant">
            Plataforma de empleabilidad +45 que une diagnóstico, aprendizaje
            dinámico y conexión real con empresas líderes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="btn-primary">Quiero potenciar mi perfil</button>
            <button className="btn-secondary">Busco talento</button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-secondary-fixed opacity-20 blur-[100px]" />
          <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl md:rotate-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGY_WdMso0xAxhDD4qn6ohGr2tXQSj6cFyXj9BTf8tXn51cCUAPQDfTBPk1vkHhwFSOP42GCU7QS77Jg9mHVTBG1kBSp1gsr9eCK6HrGUSir_6vOyNjgfW41oegKk2DJTzDzA4cv05dDjhVoRZ32VJt-YC4PbrpLR7BfEGgonbBDHJB7gHEJrbGYR4om04frd1ZWBCDKWR9X3QdNr8NCeu044POc9TlG3VzFNAowpFqTyIVKmTWZ5n7V3XqF47nnSo2Nqwq6bT70s"
              alt="Profesional senior sonriendo en oficina moderna"
              width={900}
              height={1100}
              className="h-[500px] w-full object-cover"
              priority
            />

            <div className="absolute bottom-6 left-6 max-w-xs rounded-xl border-l-4 border-secondary bg-white/70 p-6 shadow-lg backdrop-blur-md">
              <p className="text-xl font-semibold text-primary">
                Autoridad valorada
              </p>
              <p className="mt-1 text-sm text-on-surface-variant">
                Uniendo décadas de trayectoria con la agilidad del mañana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section
      id="como-funciona"
      className="section-padding bg-surface-container-low px-8"
    >
      <div className="app-container">
        <div className="mb-16 text-center">
          <h2 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-primary">
            El desafío de la longevidad laboral
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
            La brecha entre la experiencia acumulada y las demandas digitales
            actuales no debería ser un obstáculo, sino una oportunidad de
            evolución.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {challengeCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-outline-variant bg-white p-8 text-center transition-shadow hover:shadow-xl"
            >
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                {(() => {
                  const Icon = iconMap[card.icon];
                  return <Icon className="h-8 w-8 text-secondary" weight="duotone" />;
                })()}
              </div>
              <h3 className="text-2xl font-semibold text-primary">{card.title}</h3>
              <p className="mt-3 text-sm text-on-surface-variant">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionsSection() {
  return (
    <section className="section-padding bg-surface px-8">
      <div className="app-container">
        <div className="mb-16">
          <h2 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-primary">
            Soluciones diseñadas para expertos
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {solutions.map((solution, index) => {
            const spanClass =
              index === 0 || index === 3 ? "md:col-span-8" : "md:col-span-4";
            const toneClass =
              solution.tone === "dark"
                ? "bg-primary-container text-on-primary"
                : solution.tone === "mid"
                  ? "bg-secondary-container text-[#1c6d6b]"
                  : "border border-outline-variant bg-[#dee8ff] text-on-background";
            const minHeight =
              index === 0 || index === 3 ? "min-h-[300px]" : "min-h-[260px]";

            const tagClass =
              solution.tone === "dark"
                ? "border-white/25 bg-white/10 text-secondary-fixed"
                : solution.tone === "mid"
                  ? "border-secondary/35 bg-white/50 text-on-secondary-container"
                  : "border-secondary/40 bg-secondary/10 text-secondary";

            return (
              <article
                key={solution.title}
                className={`${spanClass} ${toneClass} ${minHeight} relative flex flex-col overflow-hidden rounded-2xl p-8`}
              >
                {index === 3 && (
                  <>
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmkaXjNryVFV_TRikUHP1D6lGRicl-FFSefhoFaPqBub_nQgr-f0rPtG_Q8MS0piglayibCYTEgqaCG34SmycB19mKek9-0VMMDSpi1GlR-whc-aCBsh3ZEPKqGHsianG2HronkBeYZXFTRnvrg5iQpjYYzAEh7dByj9BYH6f2B7DP3kvyT2r6RKlZL4NbkrYuspNgMU-bJtSoDhxQpW1y8y_3qF3P4x7ZQDo4K2ZQ_tRIQwhNcFOXzkBwC8morgsmRdY_LVJhm5E"
                      alt="Profesionales senior colaborando en un entorno corporativo moderno"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/45 to-primary/15" />
                  </>
                )}

                <div
                  className={`relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${
                    solution.tone === "dark"
                      ? "border-white/20 bg-white/15"
                      : solution.tone === "mid"
                        ? "border-[#1c6d6b]/25 bg-white/65"
                        : "border-secondary/25 bg-white"
                  }`}
                >
                  {(() => {
                    const Icon = iconMap[solution.icon];
                    return (
                      <Icon
                        className={`h-7 w-7 ${
                          solution.tone === "dark"
                            ? "text-secondary-fixed"
                            : solution.tone === "mid"
                              ? "text-on-secondary-container"
                              : "text-secondary"
                        }`}
                        weight="duotone"
                      />
                    );
                  })()}
                </div>

                <h3 className="relative z-10 text-[32px] leading-10 font-semibold tracking-[-0.01em]">
                  {solution.title}
                </h3>
                <p className="relative z-10 mt-3 max-w-lg text-sm opacity-85">
                  {solution.description}
                </p>
                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tagClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {index === 0 && (
                  <Sparkle
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 opacity-10"
                    weight="duotone"
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="section-padding bg-primary px-8 text-on-primary">
      <div className="app-container">
        <h2 className="mb-16 text-center text-[32px] leading-10 font-semibold tracking-[-0.01em]">
          Tu camino hacia la renovación
        </h2>
        <div className="relative grid gap-4 md:grid-cols-4">
          <div className="absolute left-0 top-8 z-0 hidden h-px w-full bg-[#364768] md:block" />
          {journeySteps.map((step, index) => (
            <article key={step.title} className="relative z-10 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary bg-secondary text-white shadow-xl">
                {(() => {
                  const Icon = iconMap[step.icon];
                  return <Icon className="h-7 w-7" weight="duotone" />;
                })()}
              </div>
              <p className="text-lg font-semibold">
                {index + 1}. {step.title}
              </p>
              <p className="mt-2 px-4 text-sm text-white/70">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  return (
    <section id="profesionales" className="section-padding px-8">
      <div className="app-container grid gap-8 md:grid-cols-2">
        <article className="flex h-full flex-col rounded-3xl border border-slate-100 bg-surface-container-low p-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-xl bg-secondary-container p-3 text-on-secondary-container">
              <GraduationCap className="h-8 w-8" weight="duotone" />
            </div>
            <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-primary">
              Para profesionales
            </h3>
          </div>
          <ul className="mt-6 space-y-3 text-on-surface-variant">
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-secondary" weight="duotone" />
              <span>Acceso a red de mentores senior.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-secondary" weight="duotone" />
              <span>Certificaciones digitales con aval corporativo.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-secondary" weight="duotone" />
              <span>Simulador de entrevistas con IA adaptada.</span>
            </li>
          </ul>
          <button className="btn-primary mt-8 w-full">Potenciar mi carrera</button>
        </article>

        <article
          id="empresas"
          className="flex h-full flex-col rounded-3xl border border-slate-200 bg-surface-container p-12"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-xl bg-primary-container p-3 text-secondary-fixed">
              <Buildings className="h-8 w-8" weight="duotone" />
            </div>
            <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-primary">
              Para empresas
            </h3>
          </div>
          <ul className="mt-6 space-y-3 text-on-surface-variant">
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-primary" weight="duotone" />
              <span>Filtrado inteligente por experiencia y soft skills.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-primary" weight="duotone" />
              <span>Programas de re-skilling interno +45.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-primary" weight="duotone" />
              <span>Dashboards de diversidad generacional.</span>
            </li>
          </ul>
          <button className="btn-secondary mt-8 w-full">Contactar ventas</button>
        </article>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding overflow-hidden bg-surface px-8">
      <div className="app-container text-center">
        <h2 className="mb-16 text-[32px] leading-10 font-semibold tracking-[-0.01em] text-primary">
          Nuestra comunidad en cifras
        </h2>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="mb-2 text-[56px] leading-tight font-extrabold text-secondary">
                {item.value}
              </p>
              <p className="text-sm font-semibold tracking-widest text-on-surface-variant">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="section-padding px-8">
      <div className="app-container relative overflow-hidden rounded-[40px] bg-[#1A2B4B] p-16 text-center text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_#156967_0%,_transparent_70%)]" />
        </div>
        <h2 className="relative z-10 text-balance text-4xl font-bold md:text-5xl">
          ¿Listo para escribir tu próximo gran capítulo?
        </h2>
        <p className="relative z-10 mx-auto mt-6 mb-12 max-w-2xl text-lg text-white/80">
          Únete a la plataforma que entiende que el talento no tiene fecha de
          caducidad, solo de evolución.
        </p>
        <button className="relative z-10 h-16 rounded-full bg-secondary px-12 text-lg font-semibold text-on-secondary shadow-2xl transition-transform hover:scale-105">
          Empezar ahora gratis
        </button>
      </div>
    </section>
  );
}
