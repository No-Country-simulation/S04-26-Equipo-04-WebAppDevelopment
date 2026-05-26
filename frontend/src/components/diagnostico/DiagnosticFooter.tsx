import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

type Props = {
  onNext: () => void;
  onPrev?: () => void;
  showPrev?: boolean;
  disabledNext: boolean;
  disabledPrev: boolean;
  isLast: boolean;
  submitting: boolean;
  selected: boolean;
};

export const DiagnosticFooter = ({
  onNext,
  onPrev,
  showPrev,
  disabledNext,
  disabledPrev,
  isLast,
  submitting,
  selected,
}: Props) => {
  return (
    <div className="border-t border-white/6 px-7 py-4 flex items-center justify-between">
      {showPrev ? (
        <Button onClick={onPrev} disabled={disabledPrev} variant="secondary" className="min-h-11">
          <ArrowLeft className="size-4" /> Anterior
        </Button>
      ) : (
        <div />
      )}
      <p className="text-[12px] text-[#4A6480]">
        {selected ? "Opción seleccionada" : "Selecciona una opción"}
      </p>
      <Button onClick={onNext} disabled={disabledNext} variant="primary" className="min-h-11 disabled:opacity-50 disabled:cursor-not-allowed">
        {isLast ? (submitting ? "Enviando..." : "Ver resultado") : "Siguiente"}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
};
