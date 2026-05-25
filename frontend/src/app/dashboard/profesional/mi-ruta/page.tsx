"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Laptop, 
  BarChart3, 
  CheckCircle, 
  Users2, 
  Lock, 
  Info,
  Play
} from "lucide-react";
import { Linkedin } from "@/components/icons/Linkedin";
import { api } from "@/lib/api";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

// 1. Interruptor de simulación
const USE_MOCK = true; // Cambia a false para usar la API real (asegúrate de que esté corriendo y configurada correctamente)

// 2. Datos Simulados idénticos a los del backend
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
        titulo: "Inteligencia Artificial para la Productividad Diaria",
        descripcion: "Aprende a usar ChatGPT y Copilot para redactar, resumir y organizar tu jornada laboral de forma moderna.",
        categoriaNombre: "Sistemas y Tecnología",
        duracionEstimada: "4 horas",
        nivelDificultad: "basico"
      }
    },
    {
      id: 11,
      moduloId: 2,
      estado: "pendiente",
      modulo: {
        id: 2,
        titulo: "Excel Avanzado para Reportes de Negocio",
        descripcion: "Domina el armado de reportes, presupuestos y control de costos mediante hojas de cálculo.",
        categoriaNombre: "Finanzas y Administración",
        duracionEstimada: "5 horas",
        nivelDificultad: "intermedio"
      }
    },
    {
      id: 12,
      moduloId: 3,
      estado: "completado",
      modulo: {
        id: 3,
        titulo: "Liderazgo de Equipos Híbridos y Gestión del Cambio",
        descripcion: "Aprende a coordinar colaboradores en entornos combinados (presencial/remoto) y guiar procesos de cambio.",
        categoriaNombre: "Liderazgo",
        duracionEstimada: "6 horas",
        nivelDificultad: "intermedio"
      }
    }
  ]
};

// 3. Helper para obtener el icono según la categoría
function getIconForCategory(categoria: string) {
  const normalized = (categoria || "").toLowerCase();
  if (normalized.includes("sistema") || normalized.includes("tecnología")) return Laptop;
  if (normalized.includes("finanza") || normalized.includes("administra")) return BarChart3;
  if (normalized.includes("liderazgo")) return Users2;
  if (normalized.includes("marca") || normalized.includes("linkedin")) return Linkedin;
  return CheckCircle;
}

// 4. Helper para formatear visualmente el estado del módulo
function getStatusDetails(estado: string) {
  switch (estado) {
    case "completado":
      return { label: "Completado", variant: "green" as const, actionLabel: "Ver certificado", isLocked: false };
    case "en_progreso":
      return { label: "En curso", variant: "inProgress" as const, actionLabel: "Continuar", isLocked: false };
    case "pendiente":
    default:
      return { label: "Disponible", variant: "amber" as const, actionLabel: "Empezar", isLocked: false };
  }
}

export default function MiRutaPage() {
  const [ruta, setRuta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"todos" | "en_curso" | "completado" | "pendiente">("todos");

  useEffect(() => {
    const cargarRuta = async () => {
      try {
        if (USE_MOCK) {
          setRuta(MOCK_RUTA);
        } else {
          const response = await api.get("/Rutas/mi-ruta");
          setRuta(response.data);
        }
      } catch (error) {
        console.error("Error al cargar la ruta, usando simulación:", error);
        setRuta(MOCK_RUTA);
      } finally {
        setLoading(false);
      }
    };

    cargarRuta();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-text-secondary-light">Cargando tu ruta de aprendizaje...</div>;
  }

  if (!ruta || !ruta.progresos || ruta.progresos.length === 0) {
    return (
      <div className="p-8 text-center bg-white border rounded-xl max-w-md mx-auto mt-12">
        <h3 className="text-primary-navy mb-2 font-medium">No tienes una ruta activa</h3>
        <p className="text-text-secondary-light text-[14px] mb-6">
          Realiza el diagnóstico para generar tu camino de formación personalizado.
        </p>
        <Link href="/diagnostic">
          <Button variant="primary">Ir al Diagnóstico</Button>
        </Link>
      </div>
    );
  }

  // Filtrado de módulos en el cliente
  const filteredProgresos = ruta.progresos.filter((item: any) => {
    if (filter === "todos") return true;
    if (filter === "en_curso") return item.estado === "en_progreso";
    return item.estado === filter;
  });

  return (
    <>
      {/* Header y selector de simulación */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-primary-navy mb-1 font-medium">Mi Ruta</h2>
          <p className="text-text-secondary-light text-[14px]">
            Ruta de aprendizaje personalizada.
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${USE_MOCK ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
          {USE_MOCK}
        </span>
      </div>

      {/* Botones de Filtro (Reemplazo interactivo del Badge estático) */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter("todos")}>
          <Badge variant={filter === "todos" ? "amber" : "gray"}>Todos</Badge>
        </button>
        <button onClick={() => setFilter("en_curso")}>
          <Badge variant={filter === "en_curso" ? "amber" : "gray"}>En curso</Badge>
        </button>
        <button onClick={() => setFilter("completado")}>
          <Badge variant={filter === "completado" ? "amber" : "gray"}>Completados</Badge>
        </button>
        <button onClick={() => setFilter("pendiente")}>
          <Badge variant={filter === "pendiente" ? "amber" : "gray"}>Pendientes</Badge>
        </button>
      </div>

      {/* Listado de Tarjetas */}
      <div className="space-y-3 mb-6">
        {filteredProgresos.map((item: any) => {
          const Icon = getIconForCategory(item.modulo.categoriaNombre);
          const { label, variant, actionLabel } = getStatusDetails(item.estado);
          
          return (
            <Card key={item.id} className="flex items-center gap-4">
              {/* Icono de Categoría */}
              <div className="w-9 h-9 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 text-white">
                <Icon size={20} />
              </div>

              {/* Información del módulo */}
              <div className="flex-1">
                <h4 className="text-primary-navy text-[14px] mb-1 font-medium">
                  {item.modulo.titulo}
                </h4>
                <div className="flex items-center gap-3">
                  <Badge variant="amber" className="text-[11px]">
                    {item.modulo.categoriaNombre}
                  </Badge>
                  <span className="text-text-secondary-light text-[12px]">
                    {item.modulo.duracionEstimada}
                  </span>
                </div>
              </div>

              {/* Estado y Acción */}
              <div className="flex items-center gap-4">
                <Badge variant={variant} className="text-[11px]">
                  {label}
                </Badge>
                
                {actionLabel === "Ver certificado" ? (
                  <span className="text-success-green text-[13px] font-medium">
                    ✓ Habilidad Acreditada
                  </span>
                ) : (
                  // Vincula a la ruta dinámica usando el id del módulo
                  <Link href={`/dashboard/profesional/mi-ruta/${item.moduloId}`}>
                    <Button 
                      variant={item.estado === "en_progreso" ? "primary" : "ghost"} 
                      className="text-[13px]"
                    >
                      {actionLabel}
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="bg-light-bg border border-black/10 rounded-lg p-4 flex items-start gap-3">
        <Info className="text-text-secondary-light shrink-0 mt-0.5 size-4" />
        <p className="text-text-secondary-light text-[13px]">
          Completa los módulos indicados para validar tus habilidades ante las empresas.
        </p>
      </div>
    </>
  );
}