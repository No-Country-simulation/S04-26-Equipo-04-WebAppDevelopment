"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { login } from "@/services/auth";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await login({ email, password });

      // Guardar token
      localStorage.setItem("token", data.token);

      const role = "profesional";

      const diagnosticoId = localStorage.getItem("diagnosticoId");

      if (role === "profesional") {
        if (!diagnosticoId) {
          router.push("/diagnostico");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg flex flex-col items-center justify-center px-4 py-8">
      <div className="mb-6 w-full max-w-md">
        <Link href="/" className="inline-block mb-4">
          <Logo />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-amber-accent text-[13px] hover:underline mb-6"
        >
          ← Volver al inicio
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <h3 className="text-primary-navy mb-2 font-medium">Inicia sesión</h3>
        <p className="text-text-secondary-light text-[13px] mb-6">
          Accede a tu cuenta para continuar.
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-3 mb-6">
            <Input
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-[0.5px] bg-black/10 flex-1"></div>
            <span className="text-[12px] text-text-secondary-light">o continuá con</span>
            <div className="h-[0.5px] bg-black/10 flex-1"></div>
          </div>

          <Button variant="ghost" className="w-full mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </Button>

          <Button variant="primary" className="w-full" type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Continuar →"}
          </Button>
        </form>
        <p className="text-center text-[13px] text-text-secondary-light mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-amber-accent hover:underline">
            Regístrate
          </Link>
        </p>
      </Card>
    </div>
  );
}
