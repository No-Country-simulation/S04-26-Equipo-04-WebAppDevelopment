import { api } from "@/lib/api";

type SkillResponse = {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  categoriaNombre: string;
};

export type SkillCatalogo = {
  skillId: number;
  skillNombre: string;
};

export const getSkillsCatalogo = async (): Promise<SkillCatalogo[]> => {
  const { data } = await api.get<SkillResponse[]>("/Skills");

  return data.map((skill) => ({
    skillId: skill.id,
    skillNombre: skill.nombre,
  }));
};
