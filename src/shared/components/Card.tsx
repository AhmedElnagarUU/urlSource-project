import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  const baseClasses = "bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col";
  const hoverClass = hover ? "hover:shadow-xl transition-shadow duration-300" : "";
  
  return (
    <article className={`${baseClasses} ${hoverClass} ${className}`}>
      {children}
    </article>
  );
}

