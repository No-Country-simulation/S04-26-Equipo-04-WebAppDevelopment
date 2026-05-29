"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { EmptyState, HeaderEmpresa, LoadingCards } from "@/components/empresa";
import { useMarketplaceStore } from "@/store/marketplace.store";

export default function SearchPage() {
  const { talentos, loadingTalentos, error, getTalentos } = useMarketplaceStore();
  const [selectedTalent, setSelectedTalent] = useState<number | null>(null);

  useEffect(() => {
    getTalentos();
  }, [getTalentos]);

  return (
    <>
      <HeaderEmpresa
        className="mb-6"
        title="Buscar Talento Senior"
        description="Perfiles ordenados por compatibilidad con tu búsqueda activa."
      />
      {loadingTalentos && <LoadingCards />}

      {loadingTalentos && error && <EmptyState title="Ocurrió un error" description={error} />}

      {!loadingTalentos && !error && talentos.length === 0 && (
        <EmptyState
          title="No hay talentos disponibles"
          description="Todavía no existen perfiles visibles en el marketplace."
        />
      )}

      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm text-primary-navy mb-1 block">Área profesional</label>
            <select className="w-full h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-sm outline-none text-text-secondary-light">
              <option>Recursos Humanos</option>
              <option>Finanzas</option>
              <option>Tecnología</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm text-primary-navy mb-1 block">Skills requeridas</label>
            <div className="flex gap-2 w-full h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 outline-none">
              <Badge variant="amber" className="text-[11px]">
                Gestión equipos <X size={14} />
              </Badge>
              <Badge variant="amber" className="text-[11px]">
                Comunicación <X size={14} />
              </Badge>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-sm text-primary-navy mb-2 block">Modalidad</label>
            <select className="w-full h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-sm outline-none text-text-secondary-light">
              <option>Híbrido</option>
              <option>Remoto</option>
              <option>Presencial</option>
            </select>
          </div>

          <Button className="mt-5">Buscar</Button>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-3">
        <p className="text-text-secondary-light text-[13px]">
          {talentos.length} perfiles encontrados
        </p>
        <p className="text-[13px] text-text-secondary-light">Mayor compatibilidad primero</p>
      </div>
      {!loadingTalentos && !error && talentos.length > 0 && (
        <div className="space-y-3 mb-6">
          {talentos.map((talento, index) => {
            const isSelected = selectedTalent === talento.id;
            const initials = `${talento.apellido?.[0] ?? ""}${
              talento.nombre?.[0] ?? ""
            }`.toUpperCase();

            const avatarVariant = index % 2 === 0 ? "amber" : "navy";
            return (
              <div key={talento.id} onClick={() => setSelectedTalent(talento.id)}>
                <Card
                  className={`cursor-pointer transition-all border-amber-accent border ${isSelected ? "border-l-4" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar variant={avatarVariant}>{initials}</Avatar>
                    <div className="flex-1">
                      <p className="text-primary-navy text-[14px] font-medium">
                        {talento.nombre} {talento.apellido}
                      </p>
                      <p className="text-text-secondary-light text-[13px]">{talento.titular}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <Button variant={isSelected ? "primary" : "ghost"} className="text-[13px]">
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
      <div className="bg-light-bg border border-black/10 rounded-lg p-4 flex items-center justify-start gap-3">
        <Info className="text-text-secondary-light size-4" />
        <p className="text-text-secondary-light text-[12px]">
          El score de compatibilidad se calcula cruzando skills verificadas, área de experiencia y
          modalidad de trabajo.
        </p>
      </div>
    </>
  );
}
