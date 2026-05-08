import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="section-padding pt-28">
      <div className="app-container">
        <div className="mx-auto w-full max-w-lg card-elevated p-6 md:p-8">
          <h1 className="text-3xl font-black tracking-tight text-[#1A2B4B]">Crear cuenta</h1>
          <p className="mt-2 text-sm text-slate-600">
            Completa lo minimo para empezar. Tu perfil profesional lo completas despues.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#1A2B4B]" htmlFor="register-name">
                Nombre completo
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#1A2B4B]" htmlFor="register-email">
                Correo electronico
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#1A2B4B]" htmlFor="register-password">
                Contraseña
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="********"
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-semibold text-[#1A2B4B]"
                htmlFor="register-confirm-password"
              >
                Confirmar contraseña
              </label>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="********"
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <button type="button" className="btn-primary w-full">
              Crear cuenta
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link className="font-semibold text-secondary hover:underline" href="/">
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
