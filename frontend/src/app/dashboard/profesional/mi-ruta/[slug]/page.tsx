"use client";

import Link from "next/link";

import { ArrowLeft, Check, Lock, Play } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function MyRoutePage() {
  return (
    <div className="p-6 grid grid-cols-12 gap-6 bg-light-bg min-h-screen">
      
      {/* LEFT */}
      <div className="col-span-8 space-y-6">
        
        {/* Breadcrumb */}
        <div className="text-text-muted-dark flex items-center gap-2 text-sm">
          <Link
            href="/dashboard/profesional/modules"
            className="text-amber-accent flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Mi ruta
          </Link>
          <span>/</span>
          <span>Habilidades Digitales</span>
        </div>

        {/* Title */}
        <h1 className="text-primary-navy">
          Habilidades Digitales para Directivos
        </h1>

        {/* Description */}
        <Card variant="light" className="space-y-3">
          <p className="text-text-secondary-light">
            En este módulo aprenderás a aplicar herramientas digitales clave para tu rol directivo.
          </p>

          <ul className="space-y-2 text-text-secondary-light">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-success-green" />
              Herramientas de análisis predictivo para tu área
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-success-green" />
              Gestión de equipos remotos con plataformas digitales
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-success-green" />
              Automatización básica con inteligencia artificial
            </li>
          </ul>
        </Card>

        {/* Lessons */}
        <Card variant="light" className="space-y-4">
          <h3 className="text-primary-navy">Lecciones</h3>

          {/* Completed */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-light-bg border border-border-light">
            <div className="flex items-center gap-3">
              <Check size={16} className="text-success-green" />
              <span className="text-primary-navy">Herramientas predictivas</span>
            </div>
            <span className="text-text-secondary-light text-sm">12 min</span>
          </div>

          {/* Active */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-light-bg border border-border-light">
            <div className="flex items-center gap-3">
              <Play size={16} className="text-amber-accent" />
              <span className="text-primary-navy">Gestión remota</span>
            </div>
            <Button>Iniciar Lección</Button>
          </div>

          {/* Locked */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-light-bg border border-border-light opacity-50">
            <div className="flex items-center gap-3">
              <Lock size={16} />
              <span className="text-primary-navy">Automatización</span>
            </div>
            <span className="text-sm">18 min</span>
          </div>
        </Card>
      </div>

      {/* RIGHT */}
      <div className="col-span-4 space-y-6">
        
        {/* Progress */}
        <Card variant="light" className="space-y-3">
          <p className="text-text-secondary-light">Tu Progreso</p>

          <h2 className="text-amber-accent">30%</h2>

          <div className="w-full h-2 bg-border-light rounded-full">
            <div className="w-[30%] h-full bg-amber-accent rounded-full"></div>
          </div>

          <p className="text-text-secondary-light text-sm">
            7 lecciones restantes
          </p>
        </Card>

        {/* Badge */}
        <Card variant="dark" className="text-center space-y-3">
          <h4 className="text-white">Obtén tu insignia</h4>

          <p className="text-text-secondary-dark text-sm">
            Completa el módulo para obtener tu habilidad verificada en tu perfil.
          </p>

          <Button variant="secondary" className="w-full">
            Ver requisitos
          </Button>
        </Card>
      </div>
    </div>
  );
};
