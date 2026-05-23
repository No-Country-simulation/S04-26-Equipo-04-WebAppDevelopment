"use client";

import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

export default function Navbar() {
  return (
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
          href="/login?tab=register&tipo=empresa"
          className="text-[13px] text-text-secondary-dark hover:text-white transition-colors"
        >
          Para empresas
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button type="button" variant="secondary">
            Iniciar sesión
          </Button>
        </Link>
        <Link href="/login?tab=register&tipo=profesional">
          <Button type="button" variant="primary">
            Comenzar gratis
          </Button>
        </Link>
      </div>
    </nav>
  );
}
