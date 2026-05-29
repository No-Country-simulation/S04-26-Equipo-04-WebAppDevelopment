interface AvatarProps {
  variant?: "amber" | "navy" | "gray";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Avatar({ variant = "amber", size = "md", children, className = "" }: AvatarProps) {
  const variants = {
    amber: "bg-amber-accent text-primary-navy",
    navy: "bg-primary-navy text-white",
    gray: "bg-[#E0E0E0] text-[#9E9E9E]",
  };

  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`
        rounded-full flex items-center justify-center font-bold uppercase text-sm
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
