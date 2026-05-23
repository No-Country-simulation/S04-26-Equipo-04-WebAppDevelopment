interface CardProps {
  variant?: 'light' | 'dark' | 'darkest';
  children: React.ReactNode;
  className?: string;
}

export function Card({ variant = 'light', children, className = '' }: CardProps) {
  const variants = {
    light: 'bg-white border-[0.5px] border-black/10',
    dark: 'bg-primary-navy border-[0.5px] border-white/8',
    darkest: 'bg-dark-base border-[0.5px] border-white/8'
  };

  return (
    <div className={`rounded-xl p-5 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
