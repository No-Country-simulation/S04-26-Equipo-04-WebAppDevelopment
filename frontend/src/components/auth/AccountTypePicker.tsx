"use client";

import { Briefcase, User } from "lucide-react";

import { Card } from "@/components/Card";
import type { UserAccountType } from "@/lib/auth-types";
import { usesDemoByDefault } from "@/lib/auth-demo";

type AccountTypePickerProps = {
  value: UserAccountType;
  onChange: (type: UserAccountType) => void;
  disabled?: boolean;
};

export function AccountTypePicker({ value, onChange, disabled }: AccountTypePickerProps) {
  const options: {
    id: UserAccountType;
    title: string;
    description: string;
    icon: typeof User;
    demo: boolean;
  }[] = [
    {
      id: "profesional",
      title: "Soy profesional",
      description: "Busco potenciar mi perfil, diagnóstico y oportunidades.",
      icon: User,
      demo: usesDemoByDefault("profesional"),
    },
    {
      id: "empresa",
      title: "Soy empresa",
      description: "Busco talento senior validado para mi organización.",
      icon: Briefcase,
      demo: usesDemoByDefault("empresa"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {options.map((option) => {
        const selected = value === option.id;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.id)}
            className="text-left disabled:opacity-60"
          >
            <Card
              className={`h-full transition-all ${
                selected
                  ? "ring-2 ring-amber-accent border-amber-accent/50 bg-amber-accent/5"
                  : "hover:border-amber-accent/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-lg p-2 ${
                    selected ? "bg-amber-accent text-dark-base" : "bg-[#EEF2F8] text-primary-navy"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-primary-navy font-medium text-[14px]">{option.title}</p>
                  <p className="text-text-secondary-light text-[12px] mt-1 leading-snug">
                    {option.description}
                  </p>
                  {option.demo ? (
                    <span className="inline-block mt-2 text-[11px] uppercase tracking-wide text-amber-accent font-medium">
                      Vista demo
                    </span>
                  ) : null}
                </div>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
