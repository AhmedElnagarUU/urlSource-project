"use client";

import Button from "@/shared/components/Button";

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  loading: boolean;
}

export default function RefreshButton({ onRefresh, loading }: RefreshButtonProps) {
  return (
    <Button
      onClick={onRefresh}
      isLoading={loading}
      variant="primary"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Refresh All News
    </Button>
  );
}

