
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Zap, Database } from 'lucide-react';

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  const [networkActivity, setNetworkActivity] = useState<number>(0);
  const [securityLevel, setSecurityLevel] = useState('ALPHA');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate network activity
  useEffect(() => {
    const activityInterval = setInterval(() => {
      setNetworkActivity(Math.floor(Math.random() * 100));
    }, 3000);

    return () => clearInterval(activityInterval);
  }, []);

  // Format the date in military style
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  // Format the time in military style
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="bg-secondary px-4 py-1 text-xs flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <span className="text-gray-400 mr-1">DATE:</span>
          <span className="font-medium text-gray-200">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 mr-1">TIME:</span>
          <span className="font-medium text-gray-200">{formattedTime}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 mr-1">STATUS:</span>
          <span className="font-medium text-green-400">{systemStatus}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-5">
        <div className="flex items-center">
          <Database className="h-3 w-3 text-blue-400 mr-1" />
          <span className="text-gray-400 mr-1">SYS:</span>
          <div className="flex items-center">
            <div className={`w-1.5 h-1.5 rounded-full mr-1 ${networkActivity > 70 ? 'status-warning' : 'status-online'}`}></div>
            <span className="text-gray-200">{networkActivity}%</span>
          </div>
        </div>
        <div className="flex items-center">
          <Zap className="h-3 w-3 text-yellow-500 mr-1" />
          <span className="text-gray-400 mr-1">NET:</span>
          <span className="font-medium text-gray-200">ACTIVE</span>
        </div>
        <div className="flex items-center">
          <Shield className="h-3 w-3 text-red-500 mr-1" />
          <span className="text-gray-400 mr-1">SEC:</span>
          <span className="font-medium text-orange-400">{securityLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
