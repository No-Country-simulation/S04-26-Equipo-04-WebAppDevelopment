"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/auth/LoginModal";

const navItems = [
  { name: "Inicio", href: "#inicio", active: true },
  { name: "Cómo funciona", href: "#como-funciona" },
  { name: "Para profesionales", href: "#profesionales" },
  { name: "Para empresas", href: "#empresas" },
];

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 h-16 w-full border-b border-border bg-background/90 shadow-[0px_4px_20px_rgba(26,43,75,0.08)] backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-container-max items-center justify-between px-8">
          <Link
            href="/"
            className="font-heading text-xl font-extrabold tracking-tight text-primary"
          >
            TalentRenew
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-semibold transition ${
                  item.active
                    ? "border-b-3 border-secondary-700 pb-1 text-primary"
                    : "text-neutral hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Button type="button" onClick={() => setIsLoginOpen(true)}>
            Iniciar sesión
          </Button>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
