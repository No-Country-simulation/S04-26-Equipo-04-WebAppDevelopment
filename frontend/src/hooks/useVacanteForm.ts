"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vacanteSchema, VacanteFormData } from "@/schemas/vacante.schema";
import { useVacantesStore } from "@/store/vacantes.store";

type Props = {
  initialData?: VacanteFormData;
  vacanteId?: number;
};

export const useVacanteForm = ({ initialData, vacanteId }: Props) => {
  const { createVacante, updateVacante, getVacantes } = useVacantesStore();

  const router = useRouter();

  const form = useForm<VacanteFormData>({
    resolver: zodResolver(vacanteSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      ubicacion: "",
      modalidad: "remoto",
      estado: "abierta",
      rangoSalarial: "",
      skillsRequeridas: [],
    },
    mode: "onChange", // 🔥 importante para isValid
  });

  const { control, handleSubmit, formState, reset } = form;

  useEffect(() => {
    if (initialData) {
      reset({ ...initialData, estado: initialData.estado ?? "abierta" });
    }
  }, [initialData, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skillsRequeridas",
  });

  const onSubmit = handleSubmit(async (data) => {
    if (vacanteId) {
      await updateVacante(vacanteId, data, data.estado);
    } else {
      await createVacante(data);
    }

    await getVacantes();

    router.push("/dashboard/empresa/vacantes");
  });

  return {
    form,
    fields,
    append,
    remove,
    onSubmit,
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
  };
};