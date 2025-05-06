
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Symbiont</h3>
            <p className="text-gray-600 mb-4">
              AI-powered sentiment tracking across platforms to guide smarter leadership decisions.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
              <li><Link to="/map" className="text-gray-600 hover:text-primary">Regional Map</Link></li>
              <li><Link to="/insights" className="text-gray-600 hover:text-primary">AI Insights</Link></li>
              <li><Link to="/reports" className="text-gray-600 hover:text-primary">Trend Reports</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About Technology</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">Abu Dhabi, United Arab Emirates</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">contact@symbiont.ae</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">+971 2 123 4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Symbiont. All rights reserved.
            <span className="block sm:inline sm:ml-2">
              Ethical AI for better governance.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
