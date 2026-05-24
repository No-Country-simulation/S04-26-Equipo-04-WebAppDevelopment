interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  dark?: boolean;
}

export function Input({ label, dark = false, className = '', ...props }: InputProps) {
  const bgClass = dark ? 'bg-white/5 border-white/20 text-white placeholder:text-text-muted-dark' : 'bg-white border-black/10 text-primary-navy placeholder:text-text-secondary-light';

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[14px] font-medium" style={{ color: dark ? 'var(--text-primary-dark)' : 'var(--text-primary-light)' }}>
          {label}
        </label>
      )}
      <input
        className={`px-3.5 py-2.5 rounded-lg border-[0.5px] text-[14px] outline-none transition-all ${bgClass} ${className}`}
        {...props}
      />
    </div>
  );
}