import { Card } from "../Card";

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <Card
    >
      <h3 className="text-lg font-semibold text-primary-navy">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 max-w-md">
        {description}
      </p>
    </Card>
  );
};