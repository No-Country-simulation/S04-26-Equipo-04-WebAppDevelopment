import Link from "next/link";
import { Shield } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";

export default function CompanyRegisterPage() {
  return (
    <div className="min-h-screen bg-light-bg flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg mb-6">
        <Link href="/" className="inline-block mb-4">
          <Logo />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-amber-accent text-[13px] hover:underline"
        >
          ← Volver al inicio
        </Link>
      </div>

      <Card className="w-full max-w-lg">
        <div className="mb-6">
          <p className="text-amber-accent text-[11px] uppercase tracking-wide">
            Acceso para empresas
          </p>
        </div>

        <h3 className="text-primary-navy mb-2 font-medium">Encuentra talento senior validado</h3>
        <p className="text-text-secondary-light text-[13px] mb-6">
          Accede a perfiles de profesionales con skills verificadas.
        </p>

        <div className="space-y-3 mb-6">
          <Input label="Nombre de la empresa" placeholder="Tu empresa" />
          <div>
            <label className="text-[14px] text-primary-navy mb-2 block font-medium">
              Sector / Industria
            </label>
            <select className="w-full px-3.5 py-2.5 rounded-lg border-[0.5px] border-black/10 text-[14px] outline-none text-text-secondary-light">
              <option value="">Ej: Tecnología, Finanzas, RRHH</option>
              <option>Tecnología</option>
              <option>Finanzas</option>
              <option>Salud</option>
              <option>Educación</option>
            </select>
          </div>
          <div>
            <label className="text-[14px] text-primary-navy mb-2 block font-medium">
              Tamaño de la empresa
            </label>
            <select className="w-full px-3.5 py-2.5 rounded-lg border-[0.5px] border-black/10 text-[14px] outline-none text-text-secondary-light">
              <option value="">Selecciona un rango</option>
              <option>1-10 empleados</option>
              <option>10-50 empleados</option>
              <option>50-200 empleados</option>
              <option>200+ empleados</option>
            </select>
          </div>
          <Input label="Nombre del contacto" placeholder="Tu nombre" />
          <Input label="Correo corporativo" type="email" placeholder="tu@empresa.com" />
          <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" />
        </div>

        <Link href="/company/search">
          <Button variant="dark" className="w-full mb-4">
            Crear cuenta empresa →
          </Button>
        </Link>

        <p className="text-center text-[13px] text-text-secondary-light mb-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-amber-accent hover:underline">
            Inicia sesión
          </Link>
        </p>

        <div className="bg-light-bg rounded-lg p-3 flex items-start gap-2">
          <Shield className="text-text-secondary-light shrink-0 mt-0.5 size-3.5" />
          <p className="text-text-secondary-light text-[12px]">
            Tus datos están protegidos. Solo contactamos talento verificado.
          </p>
        </div>
      </Card>
    </div>
  );
}
