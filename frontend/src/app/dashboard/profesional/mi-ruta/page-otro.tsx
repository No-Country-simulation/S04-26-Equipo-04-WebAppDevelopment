import Link from "next/link";
import { Laptop, BarChart3, Users2, Info } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function PageOtro() {
  const modulosAlternativos = [
    { id: 4, titulo: "Marca Personal Digital y LinkedIn para +45", categoria: "Marca Personal", duracion: "5 horas", icono: Users2 },
    { id: 5, titulo: "Gestión de Proyectos con Scrum", categoria: "Gestión Estratégica", duracion: "10 horas", icono: Laptop }
  ];

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-primary-navy mb-1 font-medium">Otros Módulos Sugeridos</h2>
          <p className="text-text-secondary-light text-[14px]">Cursos que puedes tomar opcionalmente</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
          Simulador B
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {modulosAlternativos.map((item) => {
          const Icon = item.icono;
          return (
            <Card key={item.id} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary-navy flex items-center justify-center text-white shrink-0">
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-primary-navy text-[14px] mb-1 font-medium">{item.titulo}</h4>
                <div className="flex items-center gap-3">
                  <Badge variant="amber" className="text-[11px]">{item.categoria}</Badge>
                  <span className="text-text-secondary-light text-[12px]">{item.duracion}</span>
                </div>
              </div>
              <Link href={`/dashboard/profesional/mi-ruta/${item.id}`}>
                <Button variant="ghost" className="text-[13px]">Empezar</Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}