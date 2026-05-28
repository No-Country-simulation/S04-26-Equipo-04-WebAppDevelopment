import { z } from "zod";

export const nivelEnum = z.enum(["basico", "intermedio", "avanzado"]);

export const skillSchema = z.object({
  skillId: z.number().min(1, "Selecciona una skill"),
  nivelRequerido: nivelEnum,
});

export const vacanteSchema = z.object({
  titulo: z.string().min(1, "Requerido"),
  descripcion: z.string().min(1, "Requerido"),
  ubicacion: z.string().min(1, "Requerido"),
  modalidad: z.enum(["remoto", "presencial", "hibrido"]),
  estado: z.enum(["abierta", "cerrada"]),
  rangoSalarial: z.string().min(1, "Requerido"),
  skillsRequeridas: z
    .array(skillSchema)
    .min(1, "Debes agregar al menos una skill")
    .refine((skills) => {
      const ids = skills.map((s) => s.skillId);
      return new Set(ids).size === ids.length;
    }, "No puedes repetir skills"),
});

export type VacanteFormData = z.infer<typeof vacanteSchema>;