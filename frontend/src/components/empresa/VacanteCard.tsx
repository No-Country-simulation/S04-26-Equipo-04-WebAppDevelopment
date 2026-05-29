"use client";

import Link from "next/link";
import { Trash2, MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

interface Skill {
  id: number;
  skillNombre: string;
  categoriaNombre: string;
  nivelRequerido: string;
}

interface Vacante {
  id: number;
  empresaNombre: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: string;
  rangoSalarial: string;
  estado: string;
  fechaPublicacion: string;
  skillsRequeridas: Skill[];
}

interface Props {
  vacante: Vacante;
  onDelete: (id: number) => void;
}

export function VacanteCard({ vacante, onDelete }: Props) {
  return (
    <Card className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-text-primary-light font-medium text-base">{vacante.titulo}</h4>
          <p className="text-text-secondary-light text-sm">{vacante.empresaNombre}</p>
        </div>

        <Badge variant={vacante.estado === "abierta" ? "green" : "gray"}>{vacante.estado}</Badge>
      </div>
      {/* Info */}
      <div className="flex flex-wrap gap-4 text-sm text-text-secondary-light -mt-2">
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          {vacante.ubicacion}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase size={16} />
          {vacante.modalidad}
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={16} />
          {vacante.rangoSalarial}
        </div>
      </div>
      {/* Descripción */}
      <p className="text-sm text-text-secondary-light line-clamp-3 -mt-2">{vacante.descripcion}</p>
      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {vacante.skillsRequeridas.map((skill) => (
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
          Publicado: {new Date(vacante.fechaPublicacion).toLocaleDateString()}
        </span>
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" onClick={() => onDelete(vacante.id)} className="hover:opacity-80">
            <Trash2 size={16} />
            Eliminar
          </Button>
          <Link href={`/dashboard/empresa/vacantes/${vacante.id}`}>
            <Button>
              Ver detalle
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
