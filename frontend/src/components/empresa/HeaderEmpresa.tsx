interface Props {
  title: string;
  description: string;
  className?: string;
}

export const HeaderEmpresa = ({ title, description, className }: Props) => {
  return (
    <div className={className}>
      <h2 className="text-primary-navy mb-1 font-medium">{title}</h2>
      <p className="text-text-secondary-light text-[14px]/5">{description}</p>
    </div>
  );
};
