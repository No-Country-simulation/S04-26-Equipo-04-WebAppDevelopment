export function Logo({
  size = "default",
  variant = "light",
}: {
  size?: "default" | "small";
  variant?: "light" | "dark";
}) {
  const iconSize = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const textSize = size === "small" ? "text-[14px]" : "text-[16px]";
  const talentColor = variant === "dark" ? "text-white" : "text-primary-navy";

  return (
    <div className="flex items-center gap-2">
      <div className={`${iconSize} rounded-lg bg-amber-accent flex items-center justify-center`}>
        <span className="text-dark-base text-[12px] font-medium">TR</span>
      </div>
      <div className={`${textSize} font-medium`}>
        <span className={talentColor}>Talent</span>
        <span className="text-amber-accent">Renew</span>
      </div>
    </div>
  );
}