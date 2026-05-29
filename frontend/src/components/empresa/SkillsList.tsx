interface Props {
  skills: string[];
  variant?: "success" | "danger";
}

export const SkillsList = ({ skills, variant = "success" }: Props) => {
  if (!skills.length) {
    return null;
  }

  const baseStyles =
    variant === "success"
      ? "bg-green-50 text-green-700 border-green-100"
      : "bg-red-50 text-red-700 border-red-100";

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`
            px-2
            py-1
            rounded-lg
            border
            text-xs
            font-medium
            ${baseStyles}
          `}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};
