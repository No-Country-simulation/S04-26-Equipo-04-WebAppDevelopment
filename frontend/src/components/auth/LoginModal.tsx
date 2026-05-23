"use client";

import {
  type FormEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  type AuthMode,
  loginRequest,
  registerRequest,
  type AuthResponse,
  type LoginPayload,
} from "@/lib/auth-client";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type RegisterPayload = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
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

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2" />
      <path d="M8.1 10.2H5.8V18h2.3v-7.8Z" fill="white" />
      <path
        d="M7 9.1c.8 0 1.4-.6 1.4-1.3 0-.8-.6-1.3-1.4-1.3-.8 0-1.4.6-1.4 1.3 0 .8.6 1.3 1.4 1.3Z"
        fill="white"
      />
      <path
        d="M18.2 13.5c0-2.3-1.2-3.4-2.9-3.4-1.3 0-1.9.7-2.2 1.2v-1.1h-2.3V18h2.3v-4.1c0-1.1.2-2.1 1.5-2.1s1.3 1.2 1.3 2.2V18h2.3l.1-4.5Z"
        fill="white"
      />
    </svg>
  );
}

function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        o continúa con
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function SocialButtons({
  loginLabel,
  onGoogle,
  onLinkedIn,
}: {
  loginLabel: string;
  onGoogle: () => void;
  onLinkedIn: () => void;
}) {
  return (
    <>
      <Button type="button" variant="outline" className="w-full" onClick={onGoogle}>
        <GoogleIcon />
        {loginLabel} Google
      </Button>
      <Button type="button" variant="outline" className="mt-3 w-full" onClick={onLinkedIn}>
        <LinkedInIcon />
        {loginLabel} LinkedIn
      </Button>
    </>
  );
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginData, setLoginData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterPayload>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    acceptedTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const backdropPointerDownRef = useRef(false);

  const closeModal = useCallback(() => {
    setMode("login");
    setErrorMessage(null);
    onClose();
  }, [onClose]);

  const handleAuthSuccess = useCallback(
    (response: AuthResponse | null) => {
      if (!response) {
        closeModal();
        return;
      }
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem(
        "auth_user",
        JSON.stringify({ id: response.id, nombre: response.nombre, email: response.email }),
      );
      closeModal();
    },
    [closeModal],
  );

  const handleLoginSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrorMessage(null);
      setIsSubmitting(true);

      try {
        const response = await loginRequest(loginData);
        handleAuthSuccess(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [loginData, handleAuthSuccess],
  );

  const handleRegisterSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrorMessage(null);

      if (!registerData.acceptedTerms) {
        setErrorMessage("Debes aceptar términos y condiciones.");
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await registerRequest({
          name: registerData.name,
          lastName: registerData.lastName,
          email: registerData.email,
          password: registerData.password,
        });
        handleAuthSuccess(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "No se pudo crear cuenta.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [registerData, handleAuthSuccess],
  );

  const handleGoogleAuth = useCallback(async () => {
    setErrorMessage("Google login en backend todavía no disponible.");
  }, []);

  const handleLinkedInAuth = useCallback(async () => {
    setErrorMessage("LinkedIn login en backend todavía no disponible.");
  }, []);

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

  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    backdropPointerDownRef.current = event.target === event.currentTarget;
  };

  const handleBackdropPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const upOnBackdrop = event.target === event.currentTarget;
    if (backdropPointerDownRef.current && upOnBackdrop) {
      closeModal();
    }
    backdropPointerDownRef.current = false;
  };

  const handleBackdropPointerCancel = () => {
    backdropPointerDownRef.current = false;
  };

  const socialLabel = mode === "login" ? "Iniciar con" : "Registrarme con";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-primary/45 px-0 pt-10 sm:px-4 sm:pt-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
      onPointerCancel={handleBackdropPointerCancel}
    >
      <Card
        className={cn(
          "max-h-[90vh] w-full gap-0 overflow-y-auto rounded-b-none py-0 ring-foreground/10 sm:max-w-md sm:rounded-xl",
          "shadow-[0px_4px_20px_rgba(26,43,75,0.08)]",
        )}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <CardHeader className="relative border-b border-border pb-4 pt-6">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={closeModal}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 text-muted-foreground"
          >
            <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </Button>
          <CardTitle
            id="login-modal-title"
            className="font-heading text-2xl font-bold tracking-tight text-primary"
          >
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Bienvenido de nuevo a TalentRenew."
              : "Crea tu cuenta con lo mínimo para empezar."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pb-6">
          {errorMessage ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {errorMessage}
            </p>
          ) : null}

          {mode === "login" ? (
            <>
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Correo electrónico</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    value={loginData.email}
                    onChange={(event) =>
                      setLoginData((prev) => ({ ...prev, email: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    value={loginData.password}
                    onChange={(event) =>
                      setLoginData((prev) => ({ ...prev, password: event.target.value }))
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="xl" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <AuthDivider />

              <SocialButtons
                loginLabel={socialLabel}
                onGoogle={handleGoogleAuth}
                onLinkedIn={handleLinkedInAuth}
              />

              <p className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-secondary"
                  onClick={() => setMode("register")}
                >
                  Crear cuenta
                </Button>
              </p>
            </>
          ) : (
            <>
              <SocialButtons
                loginLabel={socialLabel}
                onGoogle={handleGoogleAuth}
                onLinkedIn={handleLinkedInAuth}
              />

              <AuthDivider />

              <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nombres</Label>
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Tus nombres"
                    value={registerData.name}
                    onChange={(event) =>
                      setRegisterData((prev) => ({ ...prev, name: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-lastname">Apellidos</Label>
                  <Input
                    id="register-lastname"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Tus apellidos"
                    value={registerData.lastName}
                    onChange={(event) =>
                      setRegisterData((prev) => ({ ...prev, lastName: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Correo electrónico</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    value={registerData.email}
                    onChange={(event) =>
                      setRegisterData((prev) => ({ ...prev, email: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="********"
                    value={registerData.password}
                    onChange={(event) =>
                      setRegisterData((prev) => ({ ...prev, password: event.target.value }))
                    }
                    minLength={8}
                    required
                  />
                </div>

                <label className="flex items-start gap-3 rounded-lg border border-border bg-muted p-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={registerData.acceptedTerms}
                    onChange={(event) =>
                      setRegisterData((prev) => ({
                        ...prev,
                        acceptedTerms: event.target.checked,
                      }))
                    }
                    className="mt-0.5 size-4 rounded border-input text-secondary accent-secondary focus:ring-ring"
                  />
                  <span>
                    Acepto los{" "}
                    <a href="#" className="font-semibold text-secondary hover:underline">
                      términos y condiciones
                    </a>
                    .
                  </span>
                </label>

                <Button
                  type="submit"
                  className="w-full"
                  size="xl"
                  disabled={isSubmitting || !registerData.acceptedTerms}
                >
                  {isSubmitting ? "Creando..." : "Crear cuenta"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-secondary"
                  onClick={() => setMode("login")}
                >
                  Iniciar sesión
                </Button>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
