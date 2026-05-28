"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useVacanteForm } from "@/hooks/useVacanteForm";
import { VacanteFormData } from "@/schemas/vacante.schema";

type SkillCatalogo = {
  skillId: number;
  skillNombre: string;
};

type Props = {
  initialData?: VacanteFormData;
  vacanteId?: number;
  skillsCatalogo: SkillCatalogo[];
};

export const VacanteForm = ({ initialData, vacanteId, skillsCatalogo }: Props) => {
  const router = useRouter();

  const { form, fields, append, remove, onSubmit, isValid, isSubmitting } = useVacanteForm({
    initialData,
    vacanteId,
  });

  const { register } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input label="Título" placeholder="Escribe el título del puesto..." {...register("titulo")} />
      <Input
        as="textarea"
        label="Descripción"
        placeholder="Escribe una descripción del puesto..."
        rows={2}
        {...register("descripcion")}
      />
      <div className="flex gap-6 w-full items-end">
        <div className="flex-7">
          <Input
            label="Ubicación"
            placeholder="Escribe la ubicación del puesto..."
            {...register("ubicacion")}
          />
        </div>
        <div className="flex-3">
          <label className="text-sm text-primary-navy mb-2 block font-medium">Modalidad</label>
          <select
            {...register("modalidad")}
            className="w-full h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-sm outline-none text-text-secondary-light"
          >
            <option value="hibrido">Híbrido</option>
            <option value="remoto">Remoto</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>
      </div>
      <div className="flex gap-6 w-full items-end">
        <div className="flex-7">
          <Input
            label="Salario"
            placeholder="Escribe el rango salarial..."
            {...register("rangoSalarial")}
          />
        </div>
        <div className="flex-3">
          <label className="text-sm text-primary-navy mb-2 block font-medium">Estado</label>
          <select
            {...register("estado")}
            className="w-full h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-sm outline-none text-text-secondary-light"
          >
            <option value="abierta">Abierta</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </div>
      </div>
      {/* SKILLS */}
      <div>
        <Button
          type="button"
          variant="dark"
          onClick={() => append({ skillId: 0, nivelRequerido: "basico" })}
        >
          + Skill
        </Button>
        {fields.map((field, i) => (
          <div key={field.id} className="flex gap-2 mt-2">
            <select
              className="h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-sm outline-none text-text-secondary-light"
              {...register(`skillsRequeridas.${i}.skillId`, { valueAsNumber: true })}
            >
              <option value={0}>Seleccionar</option>
              {skillsCatalogo.map((s) => (
                <option key={s.skillId} value={s.skillId}>
                  {s.skillNombre}
                </option>
              ))}
            </select>

            <select
              className="h-11 px-3 py-2 rounded-lg border-[0.5px] border-black/10 text-sm outline-none text-text-secondary-light"
              {...register(`skillsRequeridas.${i}.nivelRequerido`)}
            >
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
            <Button className="h-11" type="button" variant="ghost" onClick={() => remove(i)}>
              X
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="mr-4"
        variant="ghost"
        onClick={() => router.push("/dashboard/empresa/vacantes")}
      >
        Volver
      </Button>
      <Button type="submit" disabled={!isValid || isSubmitting}>
        {vacanteId ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
};
