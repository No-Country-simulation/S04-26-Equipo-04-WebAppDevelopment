import Link from "next/link";

import { Logo } from "@/components/Logo";

type AuthShellProps = {
  children: React.ReactNode;
  showSteps?: boolean;
  step?: number;
  totalSteps?: number;
};

export function AuthShell({
  children,
  showSteps = false,
  step = 1,
  totalSteps = 3,
}: AuthShellProps) {
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

      {showSteps ? (
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-accent" />
            <span className="text-[13px] text-text-secondary-light">
              Paso {step} de {totalSteps}
            </span>
          </div>
          {Array.from({ length: totalSteps - 1 }, (_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      ) : null}

      {children}
    </div>
  );
}
