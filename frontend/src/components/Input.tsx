interface BaseProps {
  label?: string;
  dark?: boolean;
  className?: string;
}

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  } & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps;

export function Input(props: Props) {
  const { label, dark = false, className = "", as = "input", ...rest } = props;

  const bgClass = dark
    ? "bg-white/5 border-white/20 text-white placeholder:text-text-muted-dark"
    : "bg-white border-black/10 text-primary-navy placeholder:text-text-secondary-light";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-[14px] font-medium"
          style={{
            color: dark ? "var(--text-primary-dark)" : "var(--text-primary-light)",
          }}
        >
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`w-full p-4 rounded-lg border border-border-light text-sm resize-none outline-none transition-all ${bgClass} ${className}`}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          className={`px-3.5 py-2.5 rounded-lg border-[0.5px] text-[14px] outline-none transition-all ${bgClass} ${className}`}
        />
      )}
    </div>
  );
}
