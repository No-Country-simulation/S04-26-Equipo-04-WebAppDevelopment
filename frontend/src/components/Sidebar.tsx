"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

import {
  User,
  Settings,
  HelpCircle,
  Users,
  ClipboardList,
  LayoutDashboard,
  Route,
  Briefcase,
  LogOut,
  MessageSquareText,
  BriefcaseBusiness,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Badge } from "@/components/Badge";
import { Avatar } from "@/components/Avatar";

interface SidebarProps {
  userName?: string;
  userRole?: string;
  type?: "profesional" | "empresa";
}

export function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const logoLink = user.role === "empresa" ? "/dashboard/empresa/search" : "/dashboard/profesional";

  const professionalLinks = [
    { href: "/dashboard/profesional", icon: LayoutDashboard, label: "Inicio" },
    { href: "/dashboard/profesional/mi-ruta", icon: Route, label: "Mi Ruta" },
    { href: "/dashboard/profesional/profile", icon: User, label: "Perfil" },
    { href: "/dashboard/profesional/propuestas", icon: Briefcase, label: "Propuestas" },
  ];

  const companyLinks = [
    { href: "/dashboard/empresa/perfiles", icon: Users, label: "Perfiles" },
    { href: "/dashboard/empresa/candidatos", icon: ClipboardList, label: "Candidatos" },
    { href: "/dashboard/empresa/evaluaciones", icon: MessageSquareText, label: "Evaluaciones" },
    { href: "/dashboard/empresa/vacantes", icon: BriefcaseBusiness, label: "Vacantes" },
  ];

  const links = user.role === "empresa" ? companyLinks : professionalLinks;

  const color = user.role === "empresa" ? "amber" : "navy";

  return (
    <aside className="w-50 bg-dark-base h-screen flex flex-col">
      <div className="p-6 border-b border-white/8 flex flex-col gap-8">
        <Link href={logoLink}>
          <Logo size="small" variant="dark" />
        </Link>
        <div className="flex items-center justify-start gap-3">
          <Avatar size="sm" variant={color}>
            {user.nombre.substring(0, 2)}
          </Avatar>
          <div>
            <p className="text-white text-sm font-medium">{user.nombre}</p>
            <Badge variant={color} className="text-[10px] capitalize">
              {user.role}
            </Badge>
          </div>
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

      <div className="p-4 border-t border-white/8 space-y-3 flex flex-col items-start justify-start">
        <button
          onClick={() => {
            logout();
          }}
          className="bg-transparent font-medium duration-200 inline-flex items-center px-2 py-1 gap-2 justify-center cursor-pointer text-text-muted-dark hover:text-text-secondary-dark transition-colors"
        >
          <LogOut size={14} />
          <span className="text-[12px]">Cerrar sesión</span>
        </button>
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
