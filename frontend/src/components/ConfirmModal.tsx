import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  warningText?: string;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  warningText,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Card className="max-w-sm w-full m-4 p-6">
        <h4 className="text-primary-navy mb-3 font-medium">{title}</h4>
        <p className="text-text-secondary-light text-[13px] mb-4">{description}</p>
        {warningText && (
          <div className="bg-light-amber border border-amber-accent/35 rounded-lg p-3 flex items-center gap-2 mb-6">
            <AlertTriangle size={16} className="text-amber-accent shrink-0" />
            <p className="text-amber-accent text-[13px]">{warningText}</p>
          </div>
        )}
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="dark" className="flex-1" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </Card>
    </div>
  );
}
