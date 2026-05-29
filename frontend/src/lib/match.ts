export const getMatchColor = (percentage: number) => {
  if (percentage >= 80) {
    return {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
    };
  }

  if (percentage >= 50) {
    return {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200",
    };
  }

  return {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  };
};