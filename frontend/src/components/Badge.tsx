interface BadgeProps {
  variant?: 'amber' | 'green' | 'navy' | 'success' | 'gray'| 'inProgress';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'amber', children, className = '' }: BadgeProps) {
  const variants = {
    amber: 'bg-amber-accent/15 border-[0.5px] border-amber-accent/35 text-amber-accent',
    green: 'bg-success-green/20 border-[0.5px] border-success-green/40 text-[#5DBF82]',
    navy: 'bg-primary-navy/60 text-[#85B7EB]',
    success: 'bg-[#EAF3DE] text-[#27500A]',
    gray: 'bg-gray-200 text-gray-600',
    inProgress: 'bg-blue-200 text-black border border-blue-300'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}