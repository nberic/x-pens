import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Expenses', path: '/expenses' },
  { name: 'Categories', path: '/categories' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-xl text-blue-600">XPens</span>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${location.pathname === item.path ? 'underline' : ''}`}
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
