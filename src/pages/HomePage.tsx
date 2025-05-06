
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Shield, Database, AlertTriangle, Search, Map, BarChart, FileText } from 'lucide-react';
import DataRibbon from '@/components/common/DataRibbon';

// Simulated sentiment metrics for home page
const initialMetrics = {
  positive: 62,
  neutral: 28,
  negative: 10,
  alerts: 3,
  regions: 7,
  sources: 5
};

const HomePage = () => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [accessCode, setAccessCode] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Generate random access code
  useEffect(() => {
    setAccessCode(`SC-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  // Simulate metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        positive: Math.max(50, Math.min(70, prev.positive + Math.floor(Math.random() * 5) - 2)),
        neutral: Math.max(20, Math.min(35, prev.neutral + Math.floor(Math.random() * 3) - 1)),
        negative: Math.max(5, Math.min(20, prev.negative + Math.floor(Math.random() * 3) - 1)),
        alerts: Math.max(1, Math.min(7, prev.alerts + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0))),
        regions: prev.regions,
        sources: prev.sources
      }));
      setLastUpdated(new Date());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAccessRequest = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorized(true);
      setIsAuthorizing(false);
    }, 2000);
  };
  
  return (
    <Layout>
      <DataRibbon position="top" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-block mb-4 px-4 py-1 border border-gray-700 bg-secondary rounded">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-gray-400">
                SYMBIONT INTELLIGENCE SYSTEM // RESTRICTED ACCESS
              </span>
              <Shield size={14} className="text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-mono mb-4 text-primary">
            INTELLIGENCE MONITORING PLATFORM
            <span className="blink ml-1">_</span>
          </h1>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            Real-time sentiment analysis protocol active. Current monitoring status: OPERATIONAL. 
            Last data refresh: {lastUpdated.toLocaleTimeString()}
          </p>
          
          {!isAuthorized ? (
            <div className="mt-6">
              {isAuthorizing ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-gray-400">VERIFYING CREDENTIALS...</p>
                </div>
              ) : (
                <Button 
                  onClick={handleAccessRequest}
                  className="bg-secondary border border-primary text-primary hover:bg-primary hover:text-black transition-colors"
                >
                  <Shield size={16} className="mr-2" />
                  REQUEST SYSTEM ACCESS
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-6 flex justify-center">
              <Link to="/dashboard">
                <Button className="bg-primary text-black hover:bg-primary/80">
                  <Search size={16} className="mr-2" />
                  LAUNCH INTELLIGENCE DASHBOARD
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {isAuthorized && (
          <>
            {/* System metrics display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-secondary p-5 rounded border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm text-gray-300 font-mono flex items-center">
                    <Database size={14} className="mr-2 text-primary" />
                    SENTIMENT DISTRIBUTION
                  </h2>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-primary">LIVE</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">POSITIVE</span>
                      <span className="text-primary">{metrics.positive}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${metrics.positive}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">NEUTRAL</span>
                      <span className="text-primary">{metrics.neutral}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-500" style={{ width: `${metrics.neutral}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">NEGATIVE</span>
                      <span className="text-primary">{metrics.negative}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${metrics.negative}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">REFRESH RATE:</span>
                    <span className="text-xs text-primary">5.0s</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary p-5 rounded border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm text-gray-300 font-mono flex items-center">
                    <AlertTriangle size={14} className="mr-2 text-orange-400" />
                    ALERT STATUS
                  </h2>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-orange-400 animate-pulse">
                    {metrics.alerts} ACTIVE
                  </span>
                </div>
                
                <ul className="space-y-2">
                  <li className="text-xs p-2 border border-red-800 bg-red-900 bg-opacity-20 rounded">
                    <div className="flex items-center text-red-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></div>
                      CRITICAL: Traffic congestion sentiments -34% in Dubai
                    </div>
                  </li>
                  <li className="text-xs p-2 border border-orange-800 bg-orange-900 bg-opacity-20 rounded">
                    <div className="flex items-center text-orange-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2"></div>
                      WARNING: Tech sector employment stability concerns emerging
                    </div>
                  </li>
                  <li className="text-xs p-2 border border-yellow-800 bg-yellow-900 bg-opacity-20 rounded">
                    <div className="flex items-center text-yellow-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-2"></div>
                      NOTICE: Economic policy reception polarized among groups
                    </div>
                  </li>
                </ul>
                
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">MONITOR STATUS:</span>
                    <span className="text-xs text-green-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></div>
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary p-5 rounded border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm text-gray-300 font-mono flex items-center">
                    <Map size={14} className="mr-2 text-blue-400" />
                    REGIONAL COVERAGE
                  </h2>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-blue-400">
                    {metrics.regions} REGIONS
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Abu Dhabi</div>
                    <div className="flex justify-between items-center">
                      <div className="w-2/3 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `85%` }}></div>
                      </div>
                      <span className="text-xs text-green-400">85%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Dubai</div>
                    <div className="flex justify-between items-center">
                      <div className="w-2/3 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `72%` }}></div>
                      </div>
                      <span className="text-xs text-yellow-400">72%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Sharjah</div>
                    <div className="flex justify-between items-center">
                      <div className="w-2/3 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `65%` }}></div>
                      </div>
                      <span className="text-xs text-yellow-400">65%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Ajman</div>
                    <div className="flex justify-between items-center">
                      <div className="w-2/3 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: `43%` }}></div>
                      </div>
                      <span className="text-xs text-orange-400">43%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">DATA SOURCES:</span>
                    <span className="text-xs text-primary">{metrics.sources} ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Access Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/dashboard" className="bg-secondary p-4 rounded border border-gray-700 hover:border-primary transition-colors group">
                <div className="flex flex-col items-center justify-center h-full">
                  <Search size={24} className="text-primary mb-3 group-hover:text-white transition-colors" />
                  <span className="text-xs text-gray-300 group-hover:text-primary transition-colors">DASHBOARD</span>
                </div>
              </Link>
              
              <Link to="/map" className="bg-secondary p-4 rounded border border-gray-700 hover:border-primary transition-colors group">
                <div className="flex flex-col items-center justify-center h-full">
                  <Map size={24} className="text-primary mb-3 group-hover:text-white transition-colors" />
                  <span className="text-xs text-gray-300 group-hover:text-primary transition-colors">HEATMAP</span>
                </div>
              </Link>
              
              <Link to="/insights" className="bg-secondary p-4 rounded border border-gray-700 hover:border-primary transition-colors group">
                <div className="flex flex-col items-center justify-center h-full">
                  <BarChart size={24} className="text-primary mb-3 group-hover:text-white transition-colors" />
                  <span className="text-xs text-gray-300 group-hover:text-primary transition-colors">INSIGHTS</span>
                </div>
              </Link>
              
              <Link to="/reports" className="bg-secondary p-4 rounded border border-gray-700 hover:border-primary transition-colors group">
                <div className="flex flex-col items-center justify-center h-full">
                  <FileText size={24} className="text-primary mb-3 group-hover:text-white transition-colors" />
                  <span className="text-xs text-gray-300 group-hover:text-primary transition-colors">REPORTS</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
      
      <DataRibbon position="bottom" />
    </Layout>
  );
};

export default HomePage;
