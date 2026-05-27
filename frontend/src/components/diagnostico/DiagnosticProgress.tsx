export const DiagnosticProgress = ({ value }: { value: number }) => {
  return (
    <div className="h-1 bg-white/8">
      <div
        className="h-full bg-amber-accent transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
