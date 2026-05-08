"use client";

import { useCallback, useEffect, useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M21.8 12.23c0-.75-.07-1.47-.2-2.16H12v4.09h5.49a4.7 4.7 0 0 1-2.04 3.08v2.55h3.3c1.93-1.78 3.05-4.4 3.05-7.56Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.91 6.78-2.47l-3.3-2.55c-.92.62-2.09.99-3.48.99-2.67 0-4.94-1.8-5.75-4.22H2.84v2.63A10.23 10.23 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.25 13.75A6.13 6.13 0 0 1 5.92 12c0-.61.12-1.2.33-1.75V7.62H2.84A10.01 10.01 0 0 0 1.8 12c0 1.62.39 3.15 1.04 4.38l3.41-2.63Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.03c1.5 0 2.84.52 3.9 1.53l2.92-2.92C17.06 2.98 14.74 2 12 2a10.23 10.23 0 0 0-9.16 5.62l3.41 2.63c.81-2.42 3.08-4.22 5.75-4.22Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const closeModal = useCallback(() => {
    setMode("login");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[#031635]/45 px-0 pt-10 sm:px-4 sm:pt-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={closeModal}
    >
      <div
        className="card-elevated max-h-[90vh] w-full overflow-y-auto rounded-b-none p-6 sm:max-w-md sm:rounded-b-[var(--radius-lg)] md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 id="login-modal-title" className="text-2xl font-black tracking-tight text-[#1A2B4B]">
              {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {mode === "login"
                ? "Bienvenido de nuevo a TalentRenew."
                : "Crea tu cuenta con lo mínimo para empezar."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Cerrar modal"
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {mode === "login" ? (
          <>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1A2B4B]" htmlFor="login-email">
                  Correo electrónico
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1A2B4B]" htmlFor="login-password">
                  Contraseña
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <button className="btn-primary w-full" type="button">
                Entrar
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">o continúa con</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-sm font-semibold text-[#1A2B4B] transition hover:border-slate-400 hover:bg-slate-50"
            >
              <GoogleIcon />
              Iniciar con Google
            </button>

            <p className="mt-5 text-center text-sm text-slate-600">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-semibold text-secondary hover:underline"
              >
                Crear cuenta
              </button>
            </p>
          </>
        ) : (
          <>
            <form className="space-y-4">
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
                  Correo electrónico
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

              <label className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="terms"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary"
                />
                <span>
                  Acepto los{" "}
                  <a href="#" className="font-semibold text-secondary hover:underline">
                    términos y condiciones
                  </a>
                  .
                </span>
              </label>

              <button className="btn-primary w-full" type="button">
                Crear cuenta
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-secondary hover:underline"
              >
                Iniciar sesión
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
