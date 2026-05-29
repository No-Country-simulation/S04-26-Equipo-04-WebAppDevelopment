"use client";

import { Info, X } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { HeaderEmpresa } from "@/components/empresa/HeaderEmpresa";

export default function SearchPage() {
  const candidates = [
    {
      initials: "CL",
      name: "Claudia López",
      role: "Gerente de RRHH",
      years: "20 años",
      compatibility: 80,
      bgColor: "bg-primary-navy",
    },
    {
      initials: "RM",
      name: "Roberto Méndez",
      role: "Jefe de Ventas",
      years: "25 años",
      compatibility: 72,
      bgColor: "bg-amber-accent",
    },
    {
      initials: "JP",
      name: "Jorge Pérez",
      role: "Director Financiero",
      years: "18 años",
      compatibility: 68,
      bgColor: "bg-primary-navy",
    },
    {
      initials: "MS",
      name: "María Soto",
      role: "Coordinadora RRHH",
      years: "15 años",
      compatibility: 61,
      bgColor: "bg-amber-accent",
    },
  ];

  return (
    <>
      <HeaderEmpresa
        className="mb-6"
        title="Buscar Talento Senior"
        description="Perfiles ordenados por compatibilidad con tu búsqueda activa."
      />
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
        <p className="text-text-secondary-light text-[13px]">12 perfiles encontrados</p>
        <p className="text-[13px] text-text-secondary-light">Mayor compatibilidad primero</p>
      </div>

      <div className="space-y-3 mb-6">
        {candidates.map((candidate, index) => (
          <Card key={index} className={index === 0 ? "border-amber-accent border-l-3 border" : ""}>
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full ${candidate.bgColor} text-white flex items-center justify-center text-[14px] font-medium`}
              >
                {candidate.initials}
              </div>

              <div className="flex-1">
                <p className="text-primary-navy text-[14px] font-medium">{candidate.name}</p>
                <p className="text-text-secondary-light text-[13px]">
                  {candidate.role} · {candidate.years}
                </p>
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-amber-accent text-[18px] font-medium">
                    {candidate.compatibility}%
                  </p>
                  <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-amber-accent transition-all"
                      style={{ width: `${candidate.compatibility}%` }}
                    ></div>
                  </div>
                </div>
                <Button variant={index === 0 ? "primary" : "ghost"} className="text-[13px]">
                  Ver perfil
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

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
