"use client";

import { useEffect, useState } from "react";
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persist = useAuthStore.persist;

    setHydrated(persist?.hasHydrated?.() ?? true);

    const unsubscribe = persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });

    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.replace("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token) return null;

  return (
    <div className="flex h-screen bg-light-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
