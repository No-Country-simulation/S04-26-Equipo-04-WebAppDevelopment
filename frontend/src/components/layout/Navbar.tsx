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
      <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/90 px-8 shadow-[0px_4px_20px_rgba(26,43,75,0.08)] backdrop-blur-md">
        <Link
          href="/"
          className="font-heading text-xl font-black tracking-tight text-[#1A2B4B]"
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
                  ? "border-b-2 border-secondary pb-1 font-bold text-[#1A2B4B]"
                  : "font-medium text-slate-600 hover:text-secondary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/diseno"
            className="hidden text-sm font-medium text-slate-600 hover:text-secondary sm:inline"
          >
            Ver prototipo
          </Link>
          <Button type="button" onClick={() => setIsLoginOpen(true)}>
            Iniciar sesión
          </Button>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
