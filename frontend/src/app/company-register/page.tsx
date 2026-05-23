import { redirect } from "next/navigation";

export default function CompanyRegisterPage() {
  redirect("/login?tab=register&tipo=empresa");
}
