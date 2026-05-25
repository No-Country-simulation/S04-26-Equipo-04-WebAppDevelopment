import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function PageSinDiagnostico() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 border border-black/10 shadow-lg shadow-primary-navy/5 bg-white">
        <div className="w-16 h-16 rounded-full bg-amber-accent/15 border border-amber-accent/30 flex items-center justify-center mx-auto mb-6 text-amber-accent animate-pulse">
          <ClipboardList size={32} />
        </div>

        <h3 className="text-primary-navy text-[20px] font-semibold mb-2">
          Crea tu Ruta de Aprendizaje
        </h3>
        
        <p className="text-text-secondary-light text-[14px] mb-6 leading-relaxed">
          Antes de comenzar a estudiar, necesitamos evaluar tus habilidades actuales. 
          Te tomará unos minutos y desbloqueará tu camino personalizado.
        </p>

        <Link href="/diagnostic" className="block">
          <Button variant="primary" className="w-full py-3 text-[15px]">
            Comenzar Diagnóstico
          </Button>
        </Link>
      </Card>
    </div>
  );
}