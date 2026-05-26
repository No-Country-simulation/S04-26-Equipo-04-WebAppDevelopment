interface QuestionCardProps {
  texto: string;
  children?: React.ReactNode;
}

export const QuestionCard = ({ texto, children }: QuestionCardProps) => {
  return (
    <div className="bg-white/4 border border-white/8 rounded-xl px-7 pt-6 pb-7">
      <h2 className="text-white text-[20px] mb-6 font-medium">{texto}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
