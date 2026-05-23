import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ tipo?: string }>;
};

export default async function RegisterPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tipo = params.tipo === "empresa" ? "empresa" : "profesional";
  redirect(`/login?tab=register&tipo=${tipo}`);
}
