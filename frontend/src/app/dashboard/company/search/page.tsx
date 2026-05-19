import { Info } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function CompanySearchPage() {
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
      bgColor: "bg-success-green",
    },
    {
      initials: "MS",
      name: "María Soto",
      role: "Coordinadora RRHH",
      years: "15 años",
      compatibility: 61,
      bgColor: "bg-primary-navy",
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-primary-navy text-[22px] mb-1 font-medium">Buscar Talento Senior</h2>
        <p className="text-text-secondary-light text-[14px]">
          Perfiles ordenados por compatibilidad con tu búsqueda activa
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-[13px] text-text-secondary-light mb-1 block">
              Área profesional
            </label>
            <select className="w-full px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-[14px] outline-none">
              <option>Recursos Humanos</option>
              <option>Finanzas</option>
              <option>Tecnología</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-[13px] text-text-secondary-light mb-1 block">
              Skills requeridas
            </label>
            <div className="flex gap-2">
              <Badge variant="amber" className="text-[11px]">
                Gestión equipos ×
              </Badge>
              <Badge variant="amber" className="text-[11px]">
                Comunicación ×
              </Badge>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-[13px] text-text-secondary-light mb-1 block">Modalidad</label>
            <select className="w-full px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-[14px] outline-none">
              <option>Híbrido</option>
              <option>Remoto</option>
              <option>Presencial</option>
            </select>
          </div>

          <Button variant="primary" className="mt-5">
            Actualizar búsqueda
          </Button>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <p className="text-text-secondary-light text-[13px]">12 perfiles encontrados</p>
        <select className="px-3 py-1 rounded-lg border-[0.5px] border-black/10 text-[13px] text-text-secondary-light outline-none">
          <option>Ordenado por: Compatibilidad ↓</option>
          <option>Ordenado por: Experiencia ↓</option>
          <option>Ordenado por: Años de experiencia ↓</option>
        </select>
      </div>

      <div className="space-y-3 mb-6">
        {candidates.map((candidate, index) => (
          <Card key={index} className={index === 0 ? "border-l-2 border-l-amber-accent" : ""}>
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
                <div className="flex gap-2 mt-2">
                  <Badge variant="amber" className="text-[10px]">
                    Gestión equipos
                  </Badge>
                  <Badge variant="amber" className="text-[10px]">
                    Comunicación
                  </Badge>
                  <Badge variant="amber" className="text-[10px]">
                    Liderazgo
                  </Badge>
                  <span className="text-text-secondary-light text-[11px]">+2 más</span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <p className="text-amber-accent text-[16px] mb-1 font-medium">
                  {candidate.compatibility}%
                </p>
                <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-amber-accent transition-all"
                    style={{ width: `${candidate.compatibility}%` }}
                  ></div>
                </div>
                <Button variant={index === 0 ? "primary" : "ghost"} className="text-[13px]">
                  Ver perfil
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-light-bg border border-black/10 rounded-lg p-4 flex items-start gap-3">
        <Info className="text-text-secondary-light shrink-0 mt-0.5 size-4" />
        <p className="text-text-secondary-light text-[12px]">
          El score de compatibilidad se calcula cruzando skills verificadas, área de experiencia y
          modalidad de trabajo.
        </p>
      </div>
    </>
  );
}
