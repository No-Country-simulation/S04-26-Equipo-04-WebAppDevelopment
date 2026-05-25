"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-light-bg">
      {/*<Sidebar userName="Finanzas SA" userRole="Empresa" type="empresa" />*/}

      <Sidebar userName="Javier" userRole="Profesional +45" />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
