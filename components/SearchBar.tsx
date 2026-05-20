type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  size?: 'default' | 'large';
};

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Search: best camera phone under 500...',
  size = 'default',
}: SearchBarProps) {
  return (
    <form action="/search" className="search-form" style={size === 'large' ? { maxWidth: 780 } : undefined}>
      <input name="q" defaultValue={defaultValue} placeholder={placeholder} className="search-input" />
      <button className="btn-primary" type="submit">Smart Search</button>
    </form>
  );
}
