"use client";

import { useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { NewsSource } from "../types";

interface AddSourceFormProps {
  onSourceAdded: () => void;
}

export default function AddSourceForm({ onSourceAdded }: AddSourceFormProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, name: name || null }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setUrl("");
        setName("");
        onSourceAdded();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Failed to add source");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-lg p-6 mb-6 space-y-4 border border-blue-200"
    >
      <h2 className="text-xl font-bold text-indigo-600 mb-4">Add News Source</h2>
      
      <Input
        label="Website URL *"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="e.g. example.com or https://example.com"
        required
        disabled={loading}
        error={error && !success ? error : undefined}
      />

      <Input
        label="Display Name (optional)"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. BBC News"
        disabled={loading}
      />

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Source added successfully!
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        isLoading={loading}
        className="w-full"
      >
        Add Source
      </Button>
    </form>
  );
}

