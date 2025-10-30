import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface LiveFeedTickerProps {
  recentActivity: string[];
}

const LiveFeedTicker: React.FC<LiveFeedTickerProps> = ({ recentActivity }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (recentActivity.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentActivity.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [recentActivity.length]);

  if (recentActivity.length === 0) return null;

  return (
    <div className="bg-gray-900/50 border border-primary/30 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <Activity className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-xs font-mono text-primary">LIVE FEED</span>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary text-xs animate-pulse-slow">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-1"></span>
          STREAMING
        </Badge>
      </div>
      <div className={`mt-2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm text-gray-300 font-mono truncate">
          {recentActivity[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default LiveFeedTicker;
