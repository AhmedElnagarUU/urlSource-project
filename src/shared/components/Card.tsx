import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  const baseClasses = "bg-[#1e293b]/80 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border border-[#334155]/50 flex flex-col";
  
  return (
    <article className={`${baseClasses} ${className}`}>
      {children}
    </article>
  );
}

