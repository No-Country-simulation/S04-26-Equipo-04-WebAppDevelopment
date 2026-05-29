"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const hydrated = useAuthStore.persist.hasHydrated();

  if (!hydrated) {
    return null;
  }

  if (!token) {
    router.replace("/login");
    return null;
  }

  return (
    <div className="flex h-screen bg-light-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
