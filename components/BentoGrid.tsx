import React from 'react';

type BentoGridProps = {
  children?: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
};

export default function BentoGrid({
  children,
  className = '',
  columns = 3,
}: BentoGridProps) {
  const columnClass =
    columns === 4
      ? 'xl:grid-cols-4'
      : columns === 2
        ? 'xl:grid-cols-2'
        : 'xl:grid-cols-3';

  return (
    <div
      className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 ${columnClass} ${className}`}
    >
      {children}
    </div>
  );
}
