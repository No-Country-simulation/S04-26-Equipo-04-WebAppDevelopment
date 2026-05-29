import { getMatchColor } from "@/lib/match";

interface Props {
  percentage: number;
}

export const MatchBadge = ({ percentage }: Props) => {
  const styles = getMatchColor(percentage);

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-semibol border ${styles.bg} ${styles.text} ${styles.border}`}
    >
      {percentage}% Match
    </div>
  );
};
