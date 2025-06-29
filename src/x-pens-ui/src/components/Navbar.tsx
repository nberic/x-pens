import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Expenses', path: '/expenses' },
  { name: 'Categories', path: '/categories' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white border-b border-gray-200 mb-4 w-full">
      <div className="w-full px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <span className="font-bold text-xl text-blue-600 whitespace-nowrap mb-2 sm:mb-0">XPens</span>
        <ul className="flex flex-row gap-4 sm:gap-6 w-full sm:w-auto overflow-x-auto">
          {navItems.map((item) => (
            <li key={item.path} className="min-w-fit">
              <Link
                to={item.path}
                className={`block px-2 py-1 text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap ${location.pathname === item.path ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
