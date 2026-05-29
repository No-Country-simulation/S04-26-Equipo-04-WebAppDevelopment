export type EstadoPostulacion =
  | "aplicado"
  | "en_proceso"
  | "rechazado"
  | "seleccionado";

export interface Postulacion {
  id: number;
  usuarioId: number;
  profesionalNombre: string;
  profesionalEmail: string;
  vacanteId: number;
  vacanteTitulo: string;
  empresaNombre: string;
  fechaAplicacion: string;
  estadoSeleccion: EstadoPostulacion;
  feedbackEmpresa: string | null;
  fechaFeedback: string | null;
}