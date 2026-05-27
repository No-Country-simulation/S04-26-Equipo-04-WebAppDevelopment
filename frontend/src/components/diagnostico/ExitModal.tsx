import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  texto?: string;
};

export const ExitModal = ({ open, onClose, onConfirm, texto }: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Card className="max-w-sm w-full m-4 p-6">
        <h4 className="text-primary-navy mb-3 font-medium">¿Salir del diagnóstico?</h4>
        <p className="text-text-secondary-light text-[13px] mb-4">
          Tu progreso no se guardará y tendrás que comenzar desde el principio.
        </p>
        {texto && (
          <div className="bg-light-amber border border-amber-accent/35 rounded-lg p-3 flex items-center gap-2 mb-6">
            <AlertTriangle size={16} className="text-amber-accent shrink-0" />
            <p className="text-amber-accent text-[13px]">{texto}</p>
          </div>
        )}
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="dark" className="flex-1" onClick={onConfirm}>
            Salir de todas formas
          </Button>
        </div>
      </Card>
    </div>
  );
};
