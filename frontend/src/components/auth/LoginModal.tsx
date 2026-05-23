"use client";

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Card } from "@/components/Card";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { AuthMode } from "@/lib/auth-client";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onAuthSuccess?: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  initialMode = "login",
  onAuthSuccess,
}: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const backdropPointerDownRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const closeModal = useCallback(() => {
    setMode("login");
    onClose();
  }, [onClose]);

  const handleSuccess = useCallback(() => {
    onAuthSuccess?.();
    closeModal();
  }, [closeModal, onAuthSuccess]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    backdropPointerDownRef.current = event.target === event.currentTarget;
  };

  const handleBackdropPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (backdropPointerDownRef.current && event.target === event.currentTarget) {
      closeModal();
    }
    backdropPointerDownRef.current = false;
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-primary-navy/55 px-0 pt-10 sm:items-center sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
      onPointerCancel={() => {
        backdropPointerDownRef.current = false;
      }}
    >
      <div className="w-full max-w-md" onPointerDown={(e) => e.stopPropagation()}>
      <Card className="relative max-h-[90vh] overflow-y-auto rounded-b-none sm:rounded-xl shadow-[0_8px_32px_rgba(15,30,48,0.2)]">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-text-secondary-light hover:text-primary-navy transition-colors"
        >
          <svg aria-hidden className="size-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h3 id="auth-modal-title" className="text-primary-navy mb-1 font-medium pr-8">
          {mode === "login" ? "Iniciar sesión" : "Crea tu cuenta"}
        </h3>
        <p className="text-text-secondary-light text-[13px] mb-6">
          {mode === "login"
            ? "Bienvenido de nuevo a TalentRenew."
            : "Empieza gratis. En pocos pasos tienes tu perfil listo."}
        </p>

        {mode === "login" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setMode("register")}
            showRegisterLink
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setMode("login")}
            showLoginLink
          />
        )}
      </Card>
      </div>
    </div>
  );
}
