"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Lock, Play } from "lucide-react";
import { api } from "@/lib/api";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

// 1. Interruptor de simulación (cámbialo a false para conectar con la API de Render)
const USE_MOCK = true;

// 2. Base de datos simulada indexada por el ID del módulo (slug)
const MOCK_DETALLE_CURSOS: Record<string, any> = {
  "1": {
    id: 1,
    titulo: "Inteligencia Artificial para la Productividad Diaria",
    descripcion: "Aprende a usar ChatGPT y Copilot para redactar, resumir y organizar tu jornada laboral de forma moderna.",
    categoriaNombre: "Sistemas y Tecnología",
    skills: ["Uso de IA", "Herramientas de Colaboración"],
        clases: [
      { 
        id: 1, 
        titulo: "Clase 1: Introducción a la IA Generativa", 
        videoUrl: "https://www.youtube.com/embed/1Wx2nZsYfLw", // Convertido
        completada: true 
      },
      { 
        id: 2, 
        titulo: "Clase 2: Creación de Cuenta y Primeros Pasos", 
        videoUrl: "https://www.youtube.com/embed/cmep2mdip3k", // Convertido
        completada: false 
      },
      { 
        id: 3, 
        titulo: "Clase 3: La Anatomía de un Buen Prompt", 
        videoUrl: "https://www.youtube.com/embed/DtmJGuCndO4", // Convertido
        completada: false 
      },
      { 
        id: 4, 
        titulo: "Clase 4: Redacción de Correos Profesionales", 
        videoUrl: "https://www.youtube.com/embed/gRbyLfEwsz8", // Convertido
        completada: false 
      }
    ]
  },
  "2": {
    id: 2,
    titulo: "Excel Avanzado para Reportes de Negocio",
    descripcion: "Domina el armado de reportes, presupuestos y control de costos mediante hojas de cálculo.",
    categoriaNombre: "Finanzas y Administración",
    skills: ["Excel Avanzado", "Análisis de Datos"],
    clases: [
      { id: 5, titulo: "Clase 1: Introducción a Excel Avanzado", videoUrl: "https://www.youtube.com/embed/rFt3qJWkeQs", completada: false },
      { id: 6, titulo: "Clase 2: Tablas Dinámicas y Segmentación", videoUrl: "https://www.youtube.com/embed/rpSAvYQfNeo", completada: false },
      { id: 7, titulo: "Clase 3: Diseño de Dashboards Ejecutivos", videoUrl: "https://www.youtube.com/embed/V1wC6FVPifU", completada: false }
    ]
  },
  "3": {
    id: 3,
    titulo: "Liderazgo de Equipos Híbridos y Gestión del Cambio",
    descripcion: "Aprende a coordinar colaboradores en entornos combinados (presencial/remoto) y guiar procesos de cambio.",
    categoriaNombre: "Liderazgo",
    skills: ["Liderazgo Híbrido", "Gestión del Cambio"],
    clases: [
      { id: 8, titulo: "Clase 1: Coordinación de Tiempos y Canales de Comunicación", videoUrl: "https://www.youtube.com/embed/M3KKGQ5_LAQ", completada: false },
      { id: 9, titulo: "Clase 2: Medición por Objetivos (OKRs)", videoUrl: "https://www.youtube.com/embed/EIcpFZ5rbGc", completada: false }
    ]
  }
};

export default function DetalleModuloPage() {
  // useParams() lee el fragmento dinámico de la URL (el nombre de la carpeta [slug])
  const params = useParams();
  const moduloId = (params.slug as string) || "1"; // Si no hay URL, toma el módulo 1 por defecto

  const [curso, setCurso] = useState<any>(null);
  const [clases, setClases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Clase que se está reproduciendo actualmente en el video player
  const [claseActiva, setClaseActiva] = useState<any>(null);

  useEffect(() => {
    const cargarCurso = async () => {
      try {
        if (USE_MOCK) {
          // Buscamos los datos en nuestro diccionario local usando el moduloId
          const dataSimulada = MOCK_DETALLE_CURSOS[moduloId] || MOCK_DETALLE_CURSOS["1"];
          setCurso(dataSimulada);
          setClases(dataSimulada.clases);
          setClaseActiva(dataSimulada.clases[0]); // Seleccionamos la clase 1 por defecto
        } else {
          // Conexión real con la API
          const response = await api.get(`/Rutas/progreso/${moduloId}/clases`);
          setCurso(response.data.modulo);
          setClases(response.data.progresosClase);
          setClaseActiva(response.data.progresosClase[0]);
        }
      } catch (error) {
        console.error("Error al cargar las clases, usando mock:", error);
        const fallback = MOCK_DETALLE_CURSOS["1"];
        setCurso(fallback);
        setClases(fallback.clases);
        setClaseActiva(fallback.clases[0]);
      } finally {
        setLoading(false);
      }
    };

    cargarCurso();
  }, [moduloId]);

  // Función para marcar clases como completadas
  const handleCompletarClase = async (claseId: number) => {
    try {
      if (USE_MOCK) {
        console.log(`[MOCK] Completando clase ID: ${claseId}`);
        // Actualizamos el estado de la clase localmente para que veas el check y la barra subir
        setClases(prev => 
          prev.map(c => c.id === claseId ? { ...c, completada: true } : c)
        );
      } else {
        // API real de Render
        await api.put(`/Rutas/progreso/clase/${claseId}`);
        // Volvemos a traer las clases para actualizar el estado real de la BD
        const response = await api.get(`/Rutas/progreso/${moduloId}/clases`);
        setClases(response.data.progresosClase);
      }
    } catch (error) {
      console.error("Error al completar clase:", error);
    }
  };

  if (loading) return <div className="p-8 text-center text-text-secondary-light">Cargando curso...</div>;
  if (!curso) return <div className="p-8 text-center">Curso no encontrado.</div>;

  // Cálculo del progreso en tiempo real
  const completadas = clases.filter(c => c.completada).length;
  const totalClases = clases.length;
  const porcentaje = totalClases > 0 ? Math.round((completadas / totalClases) * 100) : 0;

  return (
    <div className="p-6 grid grid-cols-12 gap-6 bg-light-bg min-h-screen">
      
      {/* COLUMNA IZQUIERDA (Video Player y Lecciones) */}
      <div className="col-span-9 space-y-6">
        
        {/* Breadcrumb */}
        <div className="text-text-secondary-light flex items-center gap-2 text-sm">
          <Link href="/dashboard/profesional/mi-ruta" className="text-amber-accent flex items-center gap-1 hover:underline">
            <ArrowLeft size={14} />
            Mi ruta
          </Link>
          <span>/</span>
          <span>{curso.categoriaNombre}</span>
        </div>

        {/* Título y estado del simulador */}
        <div className="flex justify-between items-center">
          <h2 className="text-primary-navy font-semibold">{curso.titulo}</h2>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${USE_MOCK ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
            {USE_MOCK ? "Simulador" : "API Real"}
          </span>
        </div>

                {/* Video Player Embebido de YouTube */}
        {claseActiva && (
          <Card className="p-0 overflow-hidden bg-black h-[500px] flex flex-col">
            <iframe
              className="w-full flex-1" 
              src={claseActiva.videoUrl || claseActiva.clase?.videoUrl}
              title={claseActiva.titulo || claseActiva.clase?.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="p-4 bg-white border-t border-black/10 flex justify-between items-center">
              <div>
                <p className="text-xs text-amber-accent font-semibold uppercase">Reproduciendo ahora:</p>
                <h4 className="text-primary-navy font-medium">{claseActiva.titulo || claseActiva.clase?.titulo}</h4>
              </div>
              
              {/* Botón para completar clase */}
              {!(claseActiva.completada) && (
                <Button 
                  variant="primary" 
                  onClick={() => handleCompletarClase(claseActiva.id)}
                  className="text-xs"
                >
                  Marcar como completada
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Listado de Lecciones */}
        <Card className="space-y-4">
          <h3 className="text-primary-navy font-semibold text-lg">Lecciones</h3>
          
          <div className="space-y-2">
            {clases.map((c, index) => {
              const isSelected = claseActiva?.id === c.id;
              
              return (
                <div 
                  key={c.id} 
                  onClick={() => setClaseActiva(c)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected ? "bg-amber-50 border-amber-accent/50" : "bg-white border-black/10 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {c.completada ? (
                      <div className="w-5 h-5 rounded-full bg-success-green/20 flex items-center justify-center">
                        <Check size={12} className="text-success-green" />
                      </div>
                    ) : (
                      <Play size={14} className="text-text-secondary-light" />
                    )}
                    <span className={`text-[14px] ${c.completada ? "text-gray-400 line-through" : "text-primary-navy"}`}>
                      {c.titulo || c.clase?.titulo}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary-light">
                    {c.duracion || c.clase?.duracion || "15 min"}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* COLUMNA DERECHA (Progreso y Skills) */}
      <div className="col-span-3 space-y-6">
        
        {/* Caja de Progreso Dinámico */}
        <Card className="space-y-3">
          <p className="text-text-secondary-light text-sm font-medium">Tu Progreso en el Módulo</p>
          <h2 className="text-amber-accent text-3xl font-bold">{porcentaje}%</h2>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-accent rounded-full transition-all duration-300" style={{ width: `${porcentaje}%` }} />
          </div>

          <p className="text-text-secondary-light text-xs">
            {completadas} de {totalClases} lecciones completadas
          </p>
        </Card>

        {/* Habilidades a desbloquear */}
        <Card variant="dark" className="text-center space-y-3">
          <h4 className="text-white font-medium">Insignia Digital</h4>
          <p className="text-text-secondary-dark text-xs">
            Completa el 100% de este módulo para acreditar automáticamente las siguientes habilidades en tu perfil público:
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {curso.skills?.map((skill: string, index: number) => (
              <Badge key={index} variant="amber" className="text-[10px]">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}