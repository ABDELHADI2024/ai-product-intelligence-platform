import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';

const nav = [
  ['Products', '/products'],
  ['Search', '/search'],
  ['Compare', '/compare'],
  ['Assistant', '/assistant'],
  ['Best', '/best'],
  ['Brands', '/brands'],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-base">
              W
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="font-bold text-gray-900">WitFlag</div>
              <div className="text-xs text-gray-500">Product Intelligence</div>
            </div>
          </Link>

          <nav className="hidden lg:flex gap-1">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/search" className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Search">
              <Search className="h-5 w-5 text-gray-600" />
            </Link>
            <Link href="/assistant" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium text-sm hover:shadow-lg transition-all duration-200">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Assistant</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
