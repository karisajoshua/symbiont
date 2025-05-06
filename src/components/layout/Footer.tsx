
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, Database } from 'lucide-react';

const Footer = () => {
  const [systemActivity, setSystemActivity] = useState(0);
  const [accessLevel, setAccessLevel] = useState("LEVEL-3");

  // Simulate system activity
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemActivity(Math.floor(Math.random() * 100));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-secondary border-t border-gray-700 py-2 text-xs">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <Shield size={12} className="text-primary mr-1" />
              <span className="text-gray-400 mr-1">ACCESS:</span>
              <span className="text-primary">{accessLevel}</span>
            </div>
            
            <div className="flex items-center">
              <Database size={12} className="text-blue-400 mr-1" />
              <span className="text-gray-400 mr-1">SYS:</span>
              <div className="flex items-center">
                <div className={`w-1 h-1 rounded-full mr-1 ${systemActivity > 70 ? 'status-warning' : 'status-online'}`}></div>
                <span className="text-gray-300">{systemActivity}%</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <AlertTriangle size={12} className="text-orange-400 mr-1" />
              <span className="text-gray-400">SYMBIONT v2.5.4</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
              CONTACT
            </Link>
            <span className="text-gray-600">CLASSIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
