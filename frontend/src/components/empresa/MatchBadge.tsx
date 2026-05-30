import { getMatchColor } from "@/lib/match";

interface Props {
  percentage: number;
}

export const MatchBadge = ({ percentage }: Props) => {
  const styles = getMatchColor(percentage);

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium text-sm border ${styles.bg} ${styles.text} ${styles.border}`}
    >
      {percentage}% Match
    </div>
  );
};
