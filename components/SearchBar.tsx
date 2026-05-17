'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  hero?: boolean;
};

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Search brand, model, chipset, or category...',
  hero = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function submit() {
    const clean = query.trim();
    if (clean) router.push(`/search?q=${encodeURIComponent(clean)}`);
  }

  const cls = hero ? 'hero-search' : 'search-bar';

  return (
    <div className={cls}>
      <span className={hero ? 'hero-search-icon' : ''}>⌕</span>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        placeholder={placeholder}
      />
      <button onClick={submit}>Search</button>
    </div>
  );
}
