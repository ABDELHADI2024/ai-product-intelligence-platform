'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
};

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Search smartphones, brands, chipsets, camera...',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function submit() {
    const clean = query.trim();
    if (clean) router.push(`/search?q=${encodeURIComponent(clean)}`);
  }

  return (
    <div className="search-bar">
      <span>⌕</span>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') submit();
        }}
        placeholder={placeholder}
      />
      <button onClick={submit}>Search</button>
    </div>
  );
}
