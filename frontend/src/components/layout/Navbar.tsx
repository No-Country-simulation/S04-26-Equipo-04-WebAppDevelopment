"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LoginModal from "@/components/auth/LoginModal";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import type { AuthMode } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <nav className="bg-primary-navy h-14 px-8 flex items-center justify-between">
        <Link href="/">
          <Logo variant="dark" />
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/#como-funciona"
            className="text-[13px] text-text-secondary-dark hover:text-white transition-colors"
          >
            Cómo funciona
          </Link>
          <Link
            href="/company-register"
            className="text-[13px] text-text-secondary-dark hover:text-white transition-colors"
          >
            Para empresas
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" onClick={() => openAuth("login")}>
            Iniciar sesión
          </Button>
          <Button type="button" variant="primary" onClick={() => openAuth("register")}>
            Comenzar gratis
          </Button>
        </div>
      </nav>

      <LoginModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={() => router.push(authMode === "register" ? "/diagnostic" : "/dashboard")}
      />
    </>
  );
}
