export const LoadingCards = () => {
  return (
    <div className="space-y-3 mb-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-border-light rounded-2xl p-5 animate-pulse "
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />

            {/* Textos */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 rounded-mdbg-gray-200" />
              <div className="h-3 w-28 rounded-md bg-gray-100" />
            </div>

            {/* Botón */}
            <div className="h-10 w-28 rounded-xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};
