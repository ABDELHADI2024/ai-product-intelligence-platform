import React from 'react';

type BentoGridProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
}
