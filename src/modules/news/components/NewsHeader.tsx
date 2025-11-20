interface NewsHeaderProps {
  title: string;
  url: string;
  description?: string;
}

export default function NewsHeader({ title, url, description }: NewsHeaderProps) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-1">{title}</h2>
          <p className="text-sm text-gray-500">Source: <span className="font-mono text-indigo-700">{url}</span></p>
        </div>
      </div>
      {description && description !== "No description found" && (
        <p className="text-gray-700 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

