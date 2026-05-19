interface SvgProps extends IconsProps {
  children: React.ReactNode;
}

export const Svg: React.FC<SvgProps> = ({
  className,
  width = 18,
  height = 18,
  strokeWidth = 1.5,
  children,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={width}
      height={height}
      viewBox='0 0 18 18'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h18v18H0z' fill='none' />
      <>{children}</>
    </svg>
  );
};