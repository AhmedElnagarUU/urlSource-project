"use client";

import { useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import axios from "@/lib/axios";
import { NewsSource } from "../types";

// Client-side logger wrapper (logs to console in browser)
const logUserAction = (action: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[User Action] ${action}`, data);
  }
};

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

    logUserAction("Add source initiated", { url: url.substring(0, 50) });

    try {
      const response = await axios.post("/api/sources", {
        url,
        name: name || null,
      });

      if (response.data.success) {
        logUserAction("Source added successfully", { 
          sourceId: response.data.source?.id,
          url: url.substring(0, 50),
        });
        setSuccess(true);
        setUrl("");
        setName("");
        onSourceAdded();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.error || "Failed to add source");
      }
    } catch (err: any) {
      logUserAction("Add source failed", { 
        error: err.response?.data?.error || err.message 
      });
      setError(err.response?.data?.error || err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e293b]/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-6 space-y-4 border border-[#334155]/50"
    >
      <h2 className="text-xl font-bold text-[#14b8a6] mb-4">Add News Source</h2>
      
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
        <div className="bg-[#064e3b]/80 backdrop-blur-md border border-[#14b8a6]/50 text-[#5eead4] px-4 py-3 rounded-lg">
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

