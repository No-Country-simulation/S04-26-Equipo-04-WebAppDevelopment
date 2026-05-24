interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-[22px] py-[11px] rounded-lg text-[14px] font-medium transition-all duration-200 inline-flex items-center gap-2 justify-center';

  const variants = {
    primary: 'bg-amber-accent text-dark-base hover:opacity-90',
    secondary: 'bg-transparent border border-white/40 text-white hover:bg-white/5',
    ghost: 'bg-transparent border border-primary-navy text-primary-navy hover:bg-primary-navy/5',
    dark: 'bg-primary-navy text-white hover:opacity-90'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}