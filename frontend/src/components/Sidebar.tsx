"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  User,
  Settings,
  HelpCircle,
  Users,
  ClipboardList,
  LayoutDashboard,
  Route,
  Briefcase,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

interface SidebarProps {
  userName?: string;
  userRole?: string;
  type?: "profesional" | "empresa";
}

export function Sidebar({
  userName = "Javier",
  userRole = "Profesional +45",
  type = "profesional",
}: SidebarProps) {
  const pathname = usePathname();
  const logoLink = type === "empresa" ? "/dashboard/search" : "/dashboard";

  const professionalLinks = [
    { href: "/dashboard/profesional", icon: LayoutDashboard, label: "Inicio" },
    { href: "/dashboard/profesional/mi-ruta", icon: Route, label: "Mi Ruta" },
    { href: "/dashboard/profesional/profile", icon: User, label: "Perfil" },
    { href: "/dashboard/profesional/propuestas", icon: Briefcase, label: "Propuestas" },
  ];

  const companyLinks = [
    { href: "/dashboard/empresa/search", icon: Users, label: "Perfiles" },
    { href: "/dashboard/empresa/feedback", icon: ClipboardList, label: "Candidatos" },
    { href: "/dashboard/empresa/settings", icon: Settings, label: "Configuración" },
  ];

  const links = type === "empresa" ? companyLinks : professionalLinks;

  return (
    <aside className="w-50 bg-dark-base h-screen flex flex-col">
      <div className="p-5 border-b border-white/8">
        <Link href={logoLink}>
          <Logo size="small" variant="dark" />
        </Link>
        <div className="mt-4">
          <p className="text-white text-[14px] font-medium">{userName}</p>
          <Badge variant="navy" className="mt-1 text-[11px]">
            {userRole}
          </Badge>
        </div>
      </div>

      <nav className="flex-1 py-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-5 py-3 transition-colors relative ${
                isActive
                  ? "text-amber-accent"
                  : "text-text-muted-dark hover:text-text-secondary-dark"
              }`}
            >
              {isActive && <div className="absolute left-0 w-1 h-full bg-amber-accent"></div>}
              <Icon size={16} />
              <span className="text-[13px]">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/8 space-y-3">
        {type === "profesional" && (
          <Button variant="primary" className="w-full text-[13px]">
            Encontrar Oportunidades
          </Button>
        )}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 px-2 py-1 text-text-muted-dark hover:text-text-secondary-dark transition-colors"
        >
          <Settings size={14} />
          <span className="text-[12px]">Configuración</span>
        </Link>
        <Link
          href="/dashboard/support"
          className="flex items-center gap-2 px-2 py-1 text-text-muted-dark hover:text-text-secondary-dark transition-colors"
        >
          <HelpCircle size={14} />
          <span className="text-[12px]">Soporte</span>
        </Link>
      </div>
    </aside>
  );
}
