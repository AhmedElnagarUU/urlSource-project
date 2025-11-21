import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "px-6 py-3 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 backdrop-blur-md border";
  
  const variantClasses = {
    primary: "bg-[#14b8a6]/80 border-[#14b8a6]/50 disabled:bg-[#0f766e]/50 disabled:border-[#0f766e]/30 text-white",
    secondary: "bg-[#334155]/80 border-[#334155]/50 disabled:bg-[#1e293b]/50 disabled:border-[#1e293b]/30 text-white",
    danger: "bg-red-600/80 border-red-600/50 disabled:bg-red-400/50 disabled:border-red-400/30 text-white",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled || isLoading ? "disabled:cursor-not-allowed" : ""}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

