import { DashboardDemoNotice } from "@/components/auth/DashboardDemoNotice";
import { Sidebar } from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-light-bg">
      {/* <Sidebar userName="Finanzas SA" userRole="Empresa" type="company" /> */}

      <Sidebar userName="Javier" userRole="Profesional +45" />
      <main className="flex-1 overflow-y-auto p-8">
        <DashboardDemoNotice />
        {children}
      </main>
    </div>
  );
}
