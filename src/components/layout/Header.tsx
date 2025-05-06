
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Map', path: '/map' },
    { name: 'Insights', path: '/insights' },
    { name: 'Reports', path: '/reports' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary font-bold text-2xl">Symbiont</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-primary font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Launch Dashboard
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md border-t animate-fade-in">
          <ul className="py-3">
            {navItems.map((item) => (
              <li key={item.name} className="px-4 py-2">
                <Link
                  to={item.path}
                  className="block text-gray-700 hover:text-primary font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="px-4 py-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Launch Dashboard
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
