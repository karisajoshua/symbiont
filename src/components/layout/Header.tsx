
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, AlertTriangle, Database, Shield, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
    navigate('/');
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      navigate('/dashboard');
    }
  };
  
  const navItems = [
    {
      name: 'Home',
      path: isAuthenticated ? '/dashboard' : '/',
      icon: <Home size={14} className="mr-1" />,
      always: true
    }, 
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Database size={14} className="mr-1" />,
      always: true
    }, 
    {
      name: 'Map',
      path: '/map',
      icon: <Database size={14} className="mr-1" />,
      always: true
    }, 
    {
      name: 'Insights',
      path: '/insights',
      icon: <Database size={14} className="mr-1" />,
      always: true
    }, 
    {
      name: 'Reports',
      path: '/reports',
      icon: <Database size={14} className="mr-1" />,
      always: true
    }, 
    {
      name: 'About',
      path: '/about',
      icon: <Database size={14} className="mr-1" />,
      always: false
    }, 
    {
      name: 'Contact',
      path: '/contact',
      icon: <Database size={14} className="mr-1" />,
      always: false
    }
  ];

  // Filter out About and Contact from the visible menu items
  const visibleNavItems = navItems.filter(item => item.always);

  // Generate a random access code
  const accessCode = "AC-" + Math.floor(Math.random() * 9000 + 1000) + "-X";
  
  return (
    <header className="bg-secondary border-b border-gray-700 relative z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center" onClick={handleHomeClick}>
              <span className="text-primary font-bold text-xl mr-1">S.Y.M.B.I.O.N.T</span>
              <div className="flex h-4 items-center">
                <span className="text-xs bg-primary px-1 text-black font-mono">v2.5</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center bg-gray-800 border border-gray-700 rounded px-2 py-1">
              <span className="text-xs text-gray-400 mr-1">ACCESS:</span>
              <span className="text-xs font-bold text-orange-400">{accessCode}</span>
              <Shield size={12} className="ml-1 text-orange-400" />
            </div>
          </div>

          {/* Desktop Navigation - Only show when authenticated */}
          {isAuthenticated && (
            <nav className="hidden md:flex">
              <ul className="flex space-x-2 items-center">
                {visibleNavItems.map(item => 
                  <li key={item.name}>
                    <Link to={item.path} className={`text-xs px-3 py-2 rounded flex items-center ${location.pathname === item.path ? 'bg-gray-800 text-primary border border-gray-700' : 'text-gray-400 hover:bg-gray-800 hover:text-primary'}`}>
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                )}
                <li>
                  <Button size="sm" variant="outline" className="bg-gray-800 text-primary border-gray-700 hover:bg-gray-700 text-xs">
                    <AlertTriangle size={14} className="mr-1" />
                    COMMAND
                  </Button>
                </li>
                <li>
                  <Button size="sm" variant="destructive" className="text-xs ml-2" onClick={handleLogout}>
                    <LogOut size={14} className="mr-1" />
                    LOGOUT
                  </Button>
                </li>
              </ul>
            </nav>
          )}

          {/* Mobile Menu Button - Only show when authenticated */}
          {isAuthenticated && (
            <button className="md:hidden text-gray-400" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Only show when authenticated */}
      {isAuthenticated && isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-secondary shadow-md border-t border-gray-700 animate-fade-in">
          <ul className="py-2">
            {visibleNavItems.map(item => 
              <li key={item.name} className="px-4 py-2">
                <Link 
                  to={item.path} 
                  className={`block text-xs flex items-center ${location.pathname === item.path ? 'text-primary' : 'text-gray-400'}`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            )}
            <li className="px-4 py-2">
              <Button size="sm" variant="outline" className="w-full bg-gray-800 text-primary border-gray-700 hover:bg-gray-700 text-xs">
                <AlertTriangle size={14} className="mr-1" />
                COMMAND
              </Button>
            </li>
            <li className="px-4 py-2">
              <Button size="sm" variant="destructive" className="w-full text-xs" onClick={handleLogout}>
                <LogOut size={14} className="mr-1" />
                LOGOUT
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
