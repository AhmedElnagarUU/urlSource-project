interface ErrorDisplayProps {
  error: string | null;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="bg-red-900/30 backdrop-blur-md border border-red-500/50 text-red-200 px-6 py-4 rounded-lg mb-6 shadow-lg">
      <p className="font-semibold">Error:</p>
      <p>{error}</p>
    </div>
  );
}

