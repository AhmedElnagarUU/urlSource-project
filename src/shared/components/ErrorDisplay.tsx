interface ErrorDisplayProps {
  error: string | null;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
      <p className="font-semibold">Error:</p>
      <p>{error}</p>
    </div>
  );
}

