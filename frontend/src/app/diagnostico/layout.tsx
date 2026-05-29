"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";

export default function DiagnosticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, token } = useAuthStore();
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
      return;
    }

    if (user?.role === "empresa") {
      router.replace("/dashboard/empresa/search");
      return;
    }

    if (
      user?.role === "profesional" &&
      user.hizoDiagnostico &&
      pathname !== "/diagnostico/resultado"
    ) {
      router.replace("/diagnostico/resultado");
    }
  }, [hydrated, token, user, pathname, router]);

  // 👇 evita render mientras decide
  if (!hydrated) return null;

  return <main className="min-h-screen bg-[#162840]">{children}</main>;
}
