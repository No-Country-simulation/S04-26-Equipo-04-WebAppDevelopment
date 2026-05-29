"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Share2, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";
import { authRequestConfig } from "@/lib/auth-request-config";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useAuthStore } from "@/store/auth.store";

// 1. Interruptor de simulación (true para usar mock por ahora, false para usar API real)
const USE_MOCK = false;

// 2. Datos Simulados idénticos al diseño visual y al backend
const MOCK_RUTA = {
  id: 101,
  usuarioId: 2,
  diagnosticoId: 3,
  fechaCreacion: "2026-05-25T13:00:00Z",
  estado: "activa",
  progresos: [
    {
      id: 10,
      moduloId: 1,
      estado: "en_progreso", 
      modulo: {
        id: 1,
        titulo: "Habilidades Digitales para Directivos",
        descripcion: "Domina las herramientas clave para gestionar equipos en entornos híbridos.",
        categoriaNombre: "Sistemas y Tecnología",
        duracionEstimada: "4 horas",
        nivelDificultad: "basico"
      },
      progresosClase: [
        { id: 1, completado: true },
        { id: 2, completado: false },
        { id: 3, completado: false },
      ]
    },
    {
      id: 11,
      moduloId: 2,
      estado: "pendiente",
      modulo: {
        id: 2,
        titulo: "Liderazgo en la Era Híbrida",
        descripcion: "Aprende a liderar equipos distribuidos con herramientas modernas.",
        categoriaNombre: "Liderazgo",
        duracionEstimada: "5 horas",
        nivelDificultad: "intermedio"
      },
      progresosClase: [
        { id: 4, completado: false },
        { id: 5, completado: false }
      ]
    },
    {
      id: 12,
      moduloId: 3,
      estado: "completado",
      modulo: {
        id: 3,
        titulo: "Comunicación de Valor",
        descripcion: "Transmite tu experiencia de forma clara y convincente.",
        categoriaNombre: "Comunicación",
        duracionEstimada: "6 horas",
        nivelDificultad: "intermedio"
      },
      progresosClase: [
        { id: 6, completado: true },
        { id: 7, completado: true }
      ]
    }
  ]
};

// Obtener icono según el estado del módulo para alinearse al diseño visual
function getIconForStatus(estado: string) {
  if (estado === "completado") return CheckCircle;
  if (estado === "en_progreso") return TrendingUp;
  return Share2;
}

export default function DashboardPage() {
  const [ruta, setRuta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuthStore();
  const userName = user?.nombre || "Javier";

  useEffect(() => {
    // Cargar la ruta activa de aprendizaje desde la API o usar Mock
    const cargarRuta = async () => {
      try {
        if (USE_MOCK) {
          setRuta(MOCK_RUTA);
        } else {
          const response = await api.get("/Rutas/mi-ruta", authRequestConfig(token));
          setRuta(response.data);
        }
      } catch (error) {
        console.warn("No se encontró una ruta de aprendizaje activa en el servidor.", error);
        setRuta(null);
      } finally {
        setLoading(false);
      }
    };

    cargarRuta();
  }, [token]);

  if (loading) {
    return (
      <div className="p-8 text-center text-text-secondary-light">
        Cargando tu dashboard...
      </div>
    );
  }

  // Si no tiene ruta o está vacía (y no estamos usando mock), mostramos la invitación al diagnóstico
  if (!ruta || !ruta.progresos || ruta.progresos.length === 0) {
    return (
      <div className="p-8 text-center bg-white border rounded-xl max-w-md mx-auto mt-12">
        <h3 className="text-primary-navy mb-2 font-medium">Hola, {userName}</h3>
        <p className="text-text-secondary-light text-[14px] mb-6">
          Realiza el diagnóstico inicial para generar tu ruta de aprendizaje personalizada y activar tu panel.
        </p>
        <Link href="/diagnostico">
          <Button variant="primary">Ir al Diagnóstico</Button>
        </Link>
      </div>
    );
  }

  const progresos = ruta.progresos || [];
  const totalModulos = progresos.length;
  const completados = progresos.filter((p: any) => p.estado === "completado").length;
  const pendientes = totalModulos - completados;
  
  // Progreso general en base a los módulos completados
  const progresoGeneral = totalModulos > 0 ? Math.round((completados / totalModulos) * 100) : 0;

  return (
    <>
      {/* Título de bienvenida dinámico y estado del simulador */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-primary-navy mb-1 font-medium">Hola, {userName}</h2>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${USE_MOCK ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
          {USE_MOCK ? "Simulador" : "API Real"}
        </span>
      </div>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-secondary-light text-[13px] font-medium">Progreso General</p>
          <p className="text-amber-accent text-[14px] font-medium">{progresoGeneral}%</p>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-amber-accent rounded-full transition-all duration-500" 
            style={{ width: `${progresoGeneral}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
            <span className="text-text-secondary-light">
              {completados} Completado{completados !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
            <span className="text-text-secondary-light">
              {pendientes} Pendiente{pendientes !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <p className="text-text-secondary-light text-[13px] mb-4 font-medium">Módulos de tu Ruta</p>

        <div className="grid grid-cols-3 gap-6">
          {progresos.slice(0, 3).map((item: any) => {
            const Icon = getIconForStatus(item.estado);
            const isCompletado = item.estado === "completado";
            const isInProgreso = item.estado === "en_progreso";
            
            // Calcular el progreso específico del módulo en base a sus clases asociadas
            const totalClases = item.progresosClase?.length || 0;
            const clasesCompletas = item.progresosClase?.filter((c: any) => c.completado || c.completada).length || 0;
            const moduloPorcentaje = totalClases > 0 ? Math.round((clasesCompletas / totalClases) * 100) : 0;

            return (
              <Card 
                key={item.id} 
                className={`flex flex-col justify-between h-full ${
                  isInProgreso 
                    ? "border-l-2 border-l-primary-navy" 
                    : isCompletado 
                      ? "border-l-2 border-l-success-green" 
                      : ""
                }`}
              >
                <div>
                  {/* Badge de Estado del Módulo */}
                  {isInProgreso && (
                    <Badge variant="amber" className="mb-4">
                      En curso
                    </Badge>
                  )}
                  {isCompletado && (
                    <Badge variant="green" className="mb-4">
                      Completado
                    </Badge>
                  )}

                  {/* Icono con color idéntico al mockup */}
                  <Icon 
                    className={`${
                      isCompletado 
                        ? "text-success-green" 
                        : isInProgreso 
                          ? "text-amber-accent" 
                          : "text-text-secondary-light"
                    } mb-3 size-6`} 
                  />
                  
                  {/* Título y Descripción del Módulo */}
                  <h4 className="text-primary-navy mb-2 font-medium">
                    {item.modulo?.titulo}
                  </h4>
                  <p className="text-text-secondary-light text-[13px] mb-4 line-clamp-3">
                    {item.modulo?.descripcion}
                  </p>
                </div>

                <div>
                  {/* Barra de progreso de clases para módulos en curso */}
                  {isInProgreso && (
                    <div className="mb-4">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-accent transition-all duration-300" 
                          style={{ width: `${moduloPorcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Botón de Acción */}
                  {isCompletado ? (
                    <Button variant="ghost" className="w-full opacity-50" disabled>
                      Completado
                    </Button>
                  ) : (
                    <Link href={`/dashboard/profesional/mi-ruta/${item.id}`}>
                      <Button variant={isInProgreso ? "primary" : "ghost"} className="w-full">
                        {isInProgreso ? "Continuar Módulo" : "Empezar Módulo"}
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
