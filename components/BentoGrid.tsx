import React from 'react';

type BentoGridProps = {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
};

export default function BentoGrid({ children, columns = 3 }: BentoGridProps) {
  const colMap = {
    2: 'repeat(2,1fr)',
    3: 'repeat(3,1fr)',
    4: 'repeat(4,1fr)',
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: colMap[columns],
        gap: '1rem',
      }}
    >
      {children}
    </div>
  );
}
