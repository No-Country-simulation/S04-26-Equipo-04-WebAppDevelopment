"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Edit, Check, Lock, ArrowRight, X, Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";

// 1. Interruptor de simulación (true para desarrollo, false para API real de Render)
const USE_MOCK = true;

// 2. Datos de perfil simulados idénticos a los del diseño visual
const MOCK_PERFIL = {
  id: 1,
  usuarioId: 2,
  nombre: "Javier",
  apellido: "González",
  email: "javier.gonzalez@talent.com",
  titular: "Gerente de RRHH · 20 años de experiencia",
  biografia: "Líder de gestión humana con amplia trayectoria en transformación de equipos.",
  urlLinkedin: "https://linkedin.com/in/javiergonzalez",
  visibleMarketplace: true,
  skills: [
    { id: 1, skillId: 1, skillNombre: "Comunicación efectiva", categoriaNombre: "Blandas", origen: "diagnostico", nivel: "avanzado", validada: true },
    { id: 2, skillId: 2, skillNombre: "Gestión de equipos", categoriaNombre: "Liderazgo", origen: "diagnostico", nivel: "avanzado", validada: true },
    { id: 3, skillId: 3, skillNombre: "Herramientas digitales", categoriaNombre: "Sistemas", origen: "diagnostico", nivel: "intermedio", validada: true },
    { id: 4, skillId: 4, skillNombre: "Liderazgo adaptativo", categoriaNombre: "Liderazgo", origen: "diagnostico", nivel: "avanzado", validada: true },
    { id: 5, skillId: 5, skillNombre: "Toma de decisiones", categoriaNombre: "Liderazgo", origen: "autodeclaracion", nivel: "basico", validada: false },
    { id: 6, skillId: 6, skillNombre: "Marca personal", categoriaNombre: "Empleabilidad", origen: "autodeclaracion", nivel: "basico", validada: false },
  ],
  experiencias: [
    {
      id: 10,
      empresa: "Empresa Financiera SA",
      cargo: "Gerente de RRHH",
      fechaInicio: "2015-03-01T00:00:00Z",
      fechaFin: "2023-12-31T00:00:00Z",
      descripcion: "Lideré un equipo de 12 personas en procesos de reclutamiento, capacitación y desarrollo organizacional."
    },
    {
      id: 11,
      empresa: "Tech Solutions",
      cargo: "Coordinadora de Personas", // Manteniendo el texto original
      fechaInicio: "2010-06-01T00:00:00Z",
      fechaFin: "2015-02-28T00:00:00Z",
      descripcion: "Responsable de onboarding, cultura organizacional y programas de bienestar."
    }
  ]
};

export default function ProfilePage() {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modales
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  
  // Formulario Perfil
  const [profileForm, setProfileForm] = useState({
    titular: "",
    biografia: "",
    urlLinkedin: ""
  });

  // Formulario Experiencia
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [expForm, setExpForm] = useState({
    cargo: "",
    empresa: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: ""
  });

  const cargarPerfil = async () => {
    try {
      if (USE_MOCK) {
        setPerfil(MOCK_PERFIL);
      } else {
        const response = await api.get("/Perfiles/mi-perfil");
        setPerfil(response.data);
      }
    } catch (error: any) {
      console.warn("Error al cargar perfil real, usando simulación:", error.message || error);
      setPerfil(MOCK_PERFIL);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  // Inicializar formularios
  useEffect(() => {
    if (perfil) {
      setProfileForm({
        titular: perfil.titular || "",
        biografia: perfil.biografia || "",
        urlLinkedin: perfil.urlLinkedin || ""
      });
    }
  }, [perfil]);

  if (loading) {
    return <div className="p-8 text-center text-text-secondary-light">Cargando tu perfil profesional...</div>;
  }

  // --- HANDLERS PERFIL ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (USE_MOCK) {
        setPerfil((prev: any) => ({
          ...prev,
          ...profileForm
        }));
        setIsEditProfileOpen(false);
      } else {
        const response = await api.put("/Perfiles/mi-perfil", profileForm);
        setPerfil(response.data);
        setIsEditProfileOpen(false);
      }
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
    }
  };

  // --- HANDLERS EXPERIENCIAS ---
  const handleOpenExpModal = (exp?: any) => {
    if (exp) {
      setSelectedExp(exp);
      setExpForm({
        cargo: exp.cargo || "",
        empresa: exp.empresa || "",
        fechaInicio: exp.fechaInicio ? exp.fechaInicio.substring(0, 10) : "",
        fechaFin: exp.fechaFin ? exp.fechaFin.substring(0, 10) : "",
        descripcion: exp.descripcion || ""
      });
    } else {
      setSelectedExp(null);
      setExpForm({
        cargo: "",
        empresa: "",
        fechaInicio: "",
        fechaFin: "",
        descripcion: ""
      });
    }
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...expForm,
        fechaInicio: new Date(expForm.fechaInicio).toISOString(),
        fechaFin: expForm.fechaFin ? new Date(expForm.fechaFin).toISOString() : null
      };

      if (USE_MOCK) {
        if (selectedExp) {
          // Editar local
          setPerfil((prev: any) => ({
            ...prev,
            experiencias: prev.experiencias.map((x: any) => 
              x.id === selectedExp.id ? { ...x, ...payload } : x
            )
          }));
        } else {
          // Agregar local
          const newExp = {
            id: Date.now(),
            ...payload
          };
          setPerfil((prev: any) => ({
            ...prev,
            experiencias: [newExp, ...prev.experiencias]
          }));
        }
        setIsExpModalOpen(false);
      } else {
        if (selectedExp) {
          await api.put(`/Perfiles/experiencia/${selectedExp.id}`, payload);
        } else {
          await api.post("/Perfiles/experiencia", payload);
        }
        await cargarPerfil();
        setIsExpModalOpen(false);
      }
    } catch (err) {
      console.error("Error al guardar experiencia:", err);
    }
  };

  const handleDeleteExp = async (expId: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta experiencia laboral?")) return;
    try {
      if (USE_MOCK) {
        setPerfil((prev: any) => ({
          ...prev,
          experiencias: prev.experiencias.filter((x: any) => x.id !== expId)
        }));
      } else {
        await api.delete(`/Perfiles/experiencia/${expId}`);
        await cargarPerfil();
      }
    } catch (err) {
      console.error("Error al eliminar experiencia:", err);
    }
  };

  const handleToggleVisibility = () => {
    alert("La visibilidad pública en el marketplace se activa automáticamente al completar el 100% de tu ruta de aprendizaje.");
  };

  // Cálculos dinámicos
  const experiences = perfil?.experiencias || [];
  const skills = perfil?.skills || [];
  const verifiedSkills = skills.filter((s: any) => s.validada);
  const pendingSkills = skills.filter((s: any) => !s.validada);

  // Completitud en base a la información cargada (Nombre, Biografía, Experiencia, LinkedIn)
  let completitud = 40; // Base por tener cuenta y diagnóstico iniciado
  if (perfil.biografia) completitud += 15;
  if (perfil.titular) completitud += 15;
  if (perfil.urlLinkedin) completitud += 10;
  if (experiences.length > 0) completitud += 10;
  if (verifiedSkills.length > 0) completitud += 10;
  if (completitud > 100) completitud = 100;

  // Formatear fechas
  const formatYearRange = (inicio: string, fin?: string) => {
    const yInicio = inicio ? new Date(inicio).getFullYear() : "";
    const yFin = fin ? new Date(fin).getFullYear() : "Presente";
    return `${yInicio} - ${yFin}`;
  };

  return (
    <>
      {/* Encabezado con estado del simulador */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-primary-navy font-medium">Mi Perfil Profesional</h2>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${USE_MOCK ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
            {USE_MOCK ? "Simulador" : "API Real"}
          </span>
        </div>

        {/* Interruptor de Visibilidad */}
        <div className="flex items-center gap-3">
          <span className="text-text-secondary-light text-[14px]">Visible para empresas</span>
          <button 
            onClick={handleToggleVisibility}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              perfil.visibleMarketplace ? "bg-amber-accent" : "bg-gray-300"
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
              perfil.visibleMarketplace ? "right-0.5" : "left-0.5"
            }`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-6">
          
          {/* Card Detalle Personal */}
          <Card>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-navy text-white flex items-center justify-center text-[20px] font-medium shrink-0">
                {perfil.nombre?.substring(0, 1).toUpperCase()}
                {perfil.apellido?.substring(0, 1).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-primary-navy font-medium">
                  {perfil.nombre} {perfil.apellido}
                </h3>
                <p className="text-text-secondary-light text-[14px] font-medium mb-1">
                  {perfil.titular || "Añade tu titular profesional"}
                </p>
                <p className="text-text-secondary-light text-[13px] italic mb-2">
                  {perfil.biografia || "Haz clic en editar para agregar una breve biografía sobre ti."}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={14} className="text-text-secondary-light" />
                  <span className="text-text-secondary-light text-[13px]">
                    Buenos Aires, Argentina
                  </span>
                </div>
                {perfil.visibleMarketplace && (
                  <Badge variant="green" className="mt-3 text-[11px]">
                    Disponible para oportunidades
                  </Badge>
                )}
              </div>
            </div>

            {/* Completitud */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary-light text-[13px]">Completitud del perfil</p>
                <p className="text-amber-accent text-[14px] font-medium">{completitud}%</p>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-accent transition-all duration-500" style={{ width: `${completitud}%` }}></div>
              </div>
            </div>

            <Button variant="ghost" className="w-full" onClick={() => setIsEditProfileOpen(true)}>
              <Edit className="size-4" />
              Editar perfil
            </Button>
          </Card>

          {/* Card Experiencia */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-primary-navy font-medium">Experiencia</h4>
              <button 
                onClick={() => handleOpenExpModal()}
                className="p-1 rounded hover:bg-gray-100 transition-colors text-text-secondary-light"
              >
                <Plus className="size-5" />
              </button>
            </div>

            {experiences.length === 0 ? (
              <p className="text-text-secondary-light text-[13px] py-4 text-center">
                Aún no has agregado experiencias laborales.
              </p>
            ) : (
              <div className="space-y-5">
                {experiences.map((exp: any, index: number) => (
                  <div 
                    key={exp.id} 
                    className={`${index < experiences.length - 1 ? "border-b border-black/10 pb-4" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-primary-navy text-[14px] font-medium">{exp.cargo}</p>
                        <p className="text-text-secondary-light text-[13px]">
                          {exp.empresa} · {formatYearRange(exp.fechaInicio, exp.fechaFin)}
                        </p>
                      </div>
                      
                      {/* Acciones de Experiencia */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleOpenExpModal(exp)}
                          className="text-text-secondary-light hover:text-primary-navy"
                        >
                          <Edit className="size-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteExp(exp.id)}
                          className="text-text-secondary-light hover:text-red-500"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary-light text-[13px] mt-2 whitespace-pre-wrap">
                      {exp.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="space-y-6">
          
          {/* Card Habilidades */}
          <Card>
            <h4 className="text-primary-navy mb-2 font-medium">
              Skills verificadas en TalentRenew
            </h4>
            <p className="text-text-secondary-light text-[13px] mb-6">
              Estas habilidades fueron validadas completando módulos en la plataforma.
            </p>

            {skills.length === 0 ? (
              <p className="text-text-secondary-light text-[13px] text-center py-4">
                Realiza los módulos de formación para validar habilidades en tu CV.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {/* Verificadas */}
                {verifiedSkills.map((s: any) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 p-3 bg-light-bg rounded-lg border border-success-green/30"
                  >
                    <Check className="text-success-green shrink-0 size-3.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-primary-navy text-[13px] truncate">{s.skillNombre}</p>
                    </div>
                    <Badge variant="green" className="text-[10px] shrink-0">
                      Verificada
                    </Badge>
                  </div>
                ))}

                {/* Pendientes */}
                {pendingSkills.map((s: any) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-200"
                  >
                    <Lock className="text-gray-400 shrink-0 size-3.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-[13px] truncate">{s.skillNombre}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Card Compatibilidad */}
          <Card variant="dark">
            <h4 className="text-white mb-2 font-medium">Tu compatibilidad actual</h4>
            <p className="text-text-secondary-dark text-[13px] mb-4">
              Tu perfil tiene alta compatibilidad con 3 oportunidades activas
            </p>

            <div className="mb-4">
              <p className="text-amber-accent text-[32px] mb-2 font-medium">{completitud}%</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-accent" style={{ width: `${completitud}%` }}></div>
              </div>
            </div>

            <p className="text-text-secondary-dark text-[13px] mb-6">
              Completa 2 módulos más para llegar al 90%
            </p>

            <Link href="/dashboard/profesional/opportunities">
              <Button variant="primary" className="w-full">
                Ver oportunidades <ArrowRight className="size-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* --- MODAL EDITAR PERFIL --- */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-primary-navy font-semibold text-lg">Editar Perfil Profesional</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-text-secondary-light hover:text-black">
                <X className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input 
                label="Titular Profesional"
                value={profileForm.titular}
                onChange={(e: any) => setProfileForm(p => ({ ...p, titular: e.target.value }))}
                placeholder="Ej. Gerente de RRHH · 20 años de experiencia"
              />
              <div>
                <label className="text-[13px] text-text-secondary-light mb-1.5 block font-medium">Biografía</label>
                <textarea 
                  value={profileForm.biografia}
                  onChange={(e: any) => setProfileForm(p => ({ ...p, biografia: e.target.value }))}
                  className="w-full p-3 rounded-lg border border-black/10 text-[14px] outline-none h-24 resize-none bg-white text-black"
                  placeholder="Escribe una breve descripción de tu perfil..."
                />
              </div>
              <Input 
                label="URL de LinkedIn"
                value={profileForm.urlLinkedin}
                onChange={(e: any) => setProfileForm(p => ({ ...p, urlLinkedin: e.target.value }))}
                placeholder="Ej. https://linkedin.com/in/usuario"
              />
              
              <div className="flex gap-3 pt-4 border-t border-black/5">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsEditProfileOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* --- MODAL AGREGAR / EDITAR EXPERIENCIA --- */}
      {isExpModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-primary-navy font-semibold text-lg">
                {selectedExp ? "Editar Experiencia" : "Agregar Experiencia"}
              </h3>
              <button onClick={() => setIsExpModalOpen(false)} className="text-text-secondary-light hover:text-black">
                <X className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveExp} className="space-y-4">
              <Input 
                label="Cargo / Puesto"
                value={expForm.cargo}
                onChange={(e: any) => setExpForm(p => ({ ...p, cargo: e.target.value }))}
                placeholder="Ej. Gerente de RRHH"
                required
              />
              <Input 
                label="Empresa"
                value={expForm.empresa}
                onChange={(e: any) => setExpForm(p => ({ ...p, empresa: e.target.value }))}
                placeholder="Ej. Empresa Financiera SA"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Fecha de Inicio"
                  type="date"
                  value={expForm.fechaInicio}
                  onChange={(e: any) => setExpForm(p => ({ ...p, fechaInicio: e.target.value }))}
                  required
                />
                <Input 
                  label="Fecha de Fin (Vacío si continúa)"
                  type="date"
                  value={expForm.fechaFin}
                  onChange={(e: any) => setExpForm(p => ({ ...p, fechaFin: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-[13px] text-text-secondary-light mb-1.5 block font-medium">Descripción de funciones</label>
                <textarea 
                  value={expForm.descripcion}
                  onChange={(e: any) => setExpForm(p => ({ ...p, descripcion: e.target.value }))}
                  className="w-full p-3 rounded-lg border border-black/10 text-[14px] outline-none h-24 resize-none bg-white text-black"
                  placeholder="Detalla tus responsabilidades y logros obtenidos..."
                />
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-black/5">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsExpModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Guardar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}