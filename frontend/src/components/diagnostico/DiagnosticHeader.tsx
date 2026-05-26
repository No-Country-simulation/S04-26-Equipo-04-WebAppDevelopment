import { X } from "lucide-react";
import { Badge } from "@/components/Badge";

type Props = {
  current?: number;
  total?: number;
  onExit: () => void;
  category?: string;
};

export const DiagnosticHeader = ({ current, total, onExit, category }: Props) => {
  return (
    <div className="border-b border-white/6 px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-text-muted-dark hover:text-white transition-colors text-[13px]"
        >
          <X className="h-3.5 w-3.5" />
          Salir
        </button>

        {current && total && (
          <p className="text-text-muted-dark text-[13px]">
            Pregunta {current} de {total}
          </p>
        )}
      </div>

      {category && (
        <Badge variant="navy" className="text-[11px]">
          {category}
        </Badge>
      )}
    </div>
  );
};
