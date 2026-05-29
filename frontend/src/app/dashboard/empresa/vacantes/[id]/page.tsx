"use client";

import Link from "next/link";

import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { Trash2, MapPin, Briefcase, DollarSign, Edit, Users, Target } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

import { HeaderEmpresa, MatchBadge } from "@/components/empresa";

import { useVacantesStore } from "@/store/vacantes.store";

export default function VacanteDetallePage() {
  const params = useParams();
  const router = useRouter();

  const vacanteId = Number(params.id);

  const { vacanteDetalle, deleteVacante, loadingDetalle, getVacanteById, clearVacanteDetalle } =
    useVacantesStore();

  useEffect(() => {
    getVacanteById(vacanteId);

    return () => clearVacanteDetalle();
  }, [vacanteId, getVacanteById, clearVacanteDetalle]);

  const onDelete = async (id: number) => {
    const confirmed = window.confirm("¿Seguro que deseas eliminar esta vacante?");

    if (!confirmed) return;

    try {
      await deleteVacante(id);

      router.push("/dashboard/empresa/vacantes");
    } catch (error) {
      console.error(error);

      alert("No se pudo eliminar la vacante.");
    }
  };

  if (loadingDetalle) {
    return <p>Cargando vacante...</p>;
  }

  if (!vacanteDetalle) {
    return <p>Vacante no encontrada</p>;
  }

  return (
    <div className="space-y-6">
      <HeaderEmpresa title={vacanteDetalle.titulo} description={vacanteDetalle.descripcion} />
      <Card className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-text-primary-light font-medium text-base">
              {vacanteDetalle.titulo}
            </h4>
            <p className="text-text-secondary-light text-sm">{vacanteDetalle.empresaNombre}</p>
          </div>

          <MatchBadge percentage={vacanteDetalle.estado === "abierta" ? 100 : 0} />
        </div>
        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-text-secondary-light -mt-2">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            {vacanteDetalle.ubicacion}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={16} />
            {vacanteDetalle.modalidad}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={16} />
            {vacanteDetalle.rangoSalarial}
          </div>
        </div>
        {/* Descripción */}
        <p className="text-sm text-text-secondary-light line-clamp-3 -mt-2">
          {vacanteDetalle.descripcion}
        </p>
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {vacanteDetalle.skillsRequeridas.map((skill) => (
            <Badge
              key={skill.id}
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {skill.skillNombre} • {skill.nivelRequerido}
            </Badge>
          ))}
        </div>
        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-black/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-text-secondary-light">
            Publicado: {new Date(vacanteDetalle.fechaPublicacion).toLocaleDateString()}
          </span>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="ghost"
              onClick={() => onDelete(vacanteId)}
              className="hover:opacity-80"
            >
              <Trash2 size={16} />
              Eliminar
            </Button>
            <Link href={`/dashboard/empresa/vacantes/${vacanteId}/editar`}>
              <Button>
                <Edit size={16} />
                Editar
              </Button>
            </Link>
            <Link href={`/dashboard/empresa/vacantes/${vacanteId}/match`}>
              <Button>
                <Target size={16} /> Ver matches
              </Button>
            </Link>
            <Link href={`/dashboard/empresa/vacantes/${vacanteId}/evaluaciones`}>
              <Button>
                <Users size={16} />
                Dar feedback
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
