"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVacantesStore } from "@/store/vacantes.store";

import { Button } from "@/components/Button";
import { HeaderEmpresa, VacanteCard } from "@/components/empresa";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function VacantesPage() {
  const { vacantes, getVacantes, loading, deleteVacante } = useVacantesStore();
  const [vacanteToDelete, setVacanteToDelete] = useState<number | null>(null);

  useEffect(() => {
    getVacantes();
  }, [getVacantes]);

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <HeaderEmpresa title="Gestión de vacantes" description="Estado actual de tus búsquedas." />
      <div className="flex items-end justify-between mb-3">
        <p className="text-text-secondary-light text-[13px]">{vacantes.length} vacantes activos</p>
        <Link href="/dashboard/empresa/vacantes/nueva">
          <Button variant="primary">Crear nueva vacante</Button>
        </Link>
      </div>
      <div className="space-y-5">
        {vacantes.map((v) => (
          <VacanteCard key={v.id} vacante={v} onDelete={(id) => setVacanteToDelete(id)} />
        ))}
      </div>
      <ConfirmModal
        open={!!vacanteToDelete}
        onClose={() => setVacanteToDelete(null)}
        onConfirm={() => {
          if (vacanteToDelete) {
            deleteVacante(vacanteToDelete);
            setVacanteToDelete(null);
          }
        }}
        title="Eliminar vacante"
        description="Esta acción eliminará la vacante permanentemente."
        confirmText="Eliminar"
        warningText="No podrás recuperar esta vacante después."
      />
    </>
  );
}
