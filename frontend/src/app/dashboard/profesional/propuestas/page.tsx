"use client";

import { useState, useEffect } from "react";
import { Briefcase, X, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { api } from "@/lib/api";
import { authRequestConfig } from "@/lib/auth-request-config";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useAuthStore } from "@/store/auth.store";

// 1. Interruptor de simulación (true por defecto para testing/demostración, false para API real)
const USE_MOCK = false;

// 2. Base de datos simulada coincidente con los DTOs del backend
const MOCK_COINCIDENCIAS = [
  {
    vacanteId: 1,
    titulo: "Director de Finanzas",
    empresaNombre: "TalentGroup",
    ubicacion: "Buenos Aires, Argentina",
    modalidad: "hibrido",
    rangoSalarial: "$800.000 ARS",
    porcentajeMatch: 92,
    skillsCoincidentes: ["Planillas de Cálculo (Excel/Google Sheets)", "Gestión de equipos"],
    skillsFaltantes: ["Liderazgo Estratégico"]
  },
  {
    vacanteId: 2,
    titulo: "Gerente Financiero",
    empresaNombre: "FinanzaCorp",
    ubicacion: "Remoto",
    modalidad: "remoto",
    rangoSalarial: "$700.000 ARS",
    porcentajeMatch: 88,
    skillsCoincidentes: ["Planillas de Cálculo (Excel/Google Sheets)"],
    skillsFaltantes: ["Gestión del Cambio", "Liderazgo adaptativo"]
  }
];

const MOCK_PROCESOS = [
  {
    id: 101,
    usuarioId: 2,
    profesionalNombre: "Javier González",
    profesionalEmail: "javier@talent.com",
    vacanteId: 2,
    vacanteTitulo: "Director de Finanzas",
    empresaNombre: "FinanzaCorp",
    fechaAplicacion: "2026-05-25T14:00:00Z",
    estadoSeleccion: "en_proceso", // "aplicado", "en_proceso", "rechazado", "seleccionado"
    feedbackEmpresa: null,
    fechaFeedback: null
  },
  {
    id: 102,
    usuarioId: 2,
    profesionalNombre: "Javier González",
    profesionalEmail: "javier@talent.com",
    vacanteId: 3,
    vacanteTitulo: "Gerente de Proyectos",
    empresaNombre: "DesignStudio",
    fechaAplicacion: "2026-05-20T10:00:00Z",
    estadoSeleccion: "rechazado",
    feedbackEmpresa: "Te sugerimos el módulo de IA.",
    fechaFeedback: "2026-05-21T09:00:00Z"
  }
];

export default function PropuestasPage() {
  const [coincidencias, setCoincidencias] = useState<any[]>([]);
  const [procesos, setProcesos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  // Modal de Detalle de Propuesta
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);

  const cargarPropuestas = async () => {
    try {
      setErrorMessage(null);
      if (USE_MOCK) {
        setCoincidencias(MOCK_COINCIDENCIAS);
        setProcesos(MOCK_PROCESOS);
      } else {
        // GET /api/Marketplace/mis-oportunidades/match
        const resMatch = await api.get(
          "/Marketplace/mis-oportunidades/match",
          authRequestConfig(token)
        );
        setCoincidencias(resMatch.data);

        // GET /api/Postulaciones/mis-postulaciones
        const resPost = await api.get("/Postulaciones/mis-postulaciones", authRequestConfig(token));
        setProcesos(resPost.data);
      }
    } catch (error: any) {
      console.warn("Error al cargar propuestas reales:", error);
      setErrorMessage(error?.response?.data?.message || "No se pudieron cargar las propuestas reales.");
      setCoincidencias([]);
      setProcesos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPropuestas();
  }, [token]);

  // Aplicar a una vacante (Crear postulación)
  const handleApply = async (vacanteId: number) => {
    try {
      setIsApplying(true);
      const targetJob = coincidencias.find(c => c.vacanteId === vacanteId);
      if (!targetJob) return;

      if (USE_MOCK) {
        // Simular postulación agregándola localmente
        const newProcess = {
          id: Date.now(),
          usuarioId: 2,
          profesionalNombre: "Javier González",
          profesionalEmail: "javier@talent.com",
          vacanteId: targetJob.vacanteId,
          vacanteTitulo: targetJob.titulo,
          empresaNombre: targetJob.empresaNombre,
          fechaAplicacion: new Date().toISOString(),
          estadoSeleccion: "aplicado",
          feedbackEmpresa: null,
          fechaFeedback: null
        };

        setProcesos(prev => [newProcess, ...prev]);
        setCoincidencias(prev => prev.filter(c => c.vacanteId !== vacanteId));
        setSelectedJob(null);
      } else {
        // POST /api/Postulaciones
        await api.post("/Postulaciones", { vacanteId }, authRequestConfig(token));
        await cargarPropuestas();
        setSelectedJob(null);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al postularse a la vacante.");
    } finally {
      setIsApplying(false);
    }
  };

  // Descartar una coincidencia localmente
  const handleDiscard = (vacanteId: number) => {
    if (confirm("¿Deseas descartar esta recomendación?")) {
      setCoincidencias(prev => prev.filter(c => c.vacanteId !== vacanteId));
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-text-secondary-light">Cargando propuestas laborales...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary-navy">
            Propuestas Laborales
          </h1>
          <p className="text-sm text-gray-500">
            Evalúa coincidencias con tu perfil y gestiona tus procesos.
          </p>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${USE_MOCK ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
          {USE_MOCK ? "Simulador" : "API Real"}
        </span>
      </div>

      {/* Nuevas Coincidencias */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-primary-navy">
          Nuevas Coincidencias
        </h2>

        {errorMessage && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {errorMessage}
          </p>
        )}

        {coincidencias.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">
            No tienes nuevas coincidencias en este momento. Completa al menos un modulo de tu ruta para fortalecer tus postulaciones.
          </p>
        ) : (
          coincidencias.map((job) => (
            <Card key={job.vacanteId} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-navy flex items-center justify-center text-white shrink-0">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="font-medium text-primary-navy">{job.titulo}</p>
                  <p className="text-sm text-gray-500">{job.empresaNombre}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-primary-navy text-white text-sm font-medium">
                  Compatibilidad {job.porcentajeMatch || job.match}%
                </span>
                <Button variant="secondary" onClick={() => handleDiscard(job.vacanteId)}>
                  Descartar
                </Button>
                <Button onClick={() => setSelectedJob(job)}>
                  Ver Propuesta
                </Button>
              </div>
            </Card>
          ))
        )}
      </section>

      {/* Procesos Activos */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-primary-navy">
          Procesos Activos
        </h2>

        {procesos.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">
            Aún no te has postulado a ninguna vacante.
          </p>
        ) : (
          <div className="space-y-4">
            {procesos.map((proc) => {
              const stages = ["Visto", "En revisión", "Entrevista"];
              
              // Mapeo de estados del backend a etapas visuales
              let currentIndex = 0;
              let isClosed = false;
              let isHired = false;

              if (proc.estadoSeleccion === "en_proceso") {
                currentIndex = 1; // En revisión
              } else if (proc.estadoSeleccion === "seleccionado") {
                isHired = true;
              } else if (proc.estadoSeleccion === "rechazado") {
                isClosed = true;
              }

              return (
                <Card key={proc.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary-navy text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {proc.empresaNombre?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-primary-navy">{proc.empresaNombre}</p>
                      <p className="text-sm text-gray-500">{proc.vacanteTitulo}</p>
                    </div>
                  </div>

                  {/* Estado de la postulación */}
                  {isHired ? (
                    <div className="text-sm text-success-green bg-green-50 p-3 rounded-lg flex items-center gap-2 border border-success-green/20">
                      <CheckCircle2 size={16} />
                      <span><strong>¡Proceso Exitoso!</strong> Fuiste seleccionado para este puesto. {proc.feedbackEmpresa ? `Feedback: ${proc.feedbackEmpresa}` : ""}</span>
                    </div>
                  ) : isClosed ? (
                    <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg flex items-start gap-2 border border-gray-200">
                      <AlertTriangle size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Proceso cerrado.</strong> 
                        {proc.feedbackEmpresa && (
                          <p className="text-text-secondary-light text-xs mt-1">Feedback de la empresa: "{proc.feedbackEmpresa}"</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-gray-500 gap-4">
                      {stages.map((label, i) => (
                        <div key={label} className="flex-1 text-center">
                          <div
                            className={`h-1 mb-2 rounded-full ${
                              i <= currentIndex ? "bg-amber-accent" : "bg-gray-200"
                            }`}
                          />
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* --- MODAL DETALLE DE LA PROPUESTA / APLICACIÓN --- */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-primary-navy font-semibold text-lg">Detalle de Propuesta</h3>
              <button onClick={() => setSelectedJob(null)} className="text-text-secondary-light hover:text-black">
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-amber-accent font-semibold uppercase">Puesto</p>
                <h4 className="text-primary-navy text-lg font-medium">{selectedJob.titulo}</h4>
                <p className="text-sm text-text-secondary-light">{selectedJob.empresaNombre} · {selectedJob.ubicacion} ({selectedJob.modalidad})</p>
              </div>

              <div className="flex justify-between p-3 bg-light-bg rounded-lg border border-black/5">
                <div>
                  <p className="text-xs text-text-secondary-light">Compatibilidad</p>
                  <p className="text-primary-navy font-semibold">{selectedJob.porcentajeMatch}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-secondary-light">Rango Salarial</p>
                  <p className="text-primary-navy font-semibold">{selectedJob.rangoSalarial}</p>
                </div>
              </div>

              {/* Skills coincidencia */}
              <div>
                <p className="text-xs text-text-secondary-light mb-2 font-medium">Habilidades Coincidentes</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.skillsCoincidentes.map((s: string, idx: number) => (
                    <Badge key={idx} variant="green" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>

              {/* Skills faltantes */}
              {selectedJob.skillsFaltantes.length > 0 && (
                <div>
                  <p className="text-xs text-text-secondary-light mb-2 font-medium">Habilidades Faltantes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skillsFaltantes.map((s: string, idx: number) => (
                      <Badge key={idx} variant="gray" className="text-[10px]">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-black/5 pt-4">
              <Button variant="ghost" className="flex-1" onClick={() => setSelectedJob(null)} disabled={isApplying}>
                Volver
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => handleApply(selectedJob.vacanteId)} disabled={isApplying}>
                {isApplying ? "Postulándose..." : "Postularse Ahora"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
