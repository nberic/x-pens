
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Expenses', path: '/expenses' },
  { name: 'Categories', path: '/categories' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 w-full sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-2xl text-blue-600 tracking-tight select-none">XPens</span>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden p-2 rounded-md border border-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            // Close (X) icon (SVG X)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              <line x1="6" y1="18" x2="18" y2="6" strokeLinecap="round" />
            </svg>
          ) : (
            // Hamburger icon (SVG 3 bars)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
              <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
              <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
            </svg>
          )}
        </button>
        {/* Menu for desktop/tablet */}
        <ul className="hidden sm:flex flex-row gap-6 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-3 py-1 rounded-md transition-colors font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 ${location.pathname === item.path ? 'bg-blue-100 text-blue-700' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col gap-2 px-4 py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 ${location.pathname === item.path ? 'bg-blue-100 text-blue-700' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
