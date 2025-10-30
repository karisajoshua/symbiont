import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnimatedMetricCardProps {
  value: number;
  label: string;
  color: 'green' | 'blue' | 'red';
  icon?: React.ReactNode;
  previousValue?: number;
}

const AnimatedMetricCard: React.FC<AnimatedMetricCardProps> = ({
  value,
  label,
  color,
  icon,
  previousValue = 0
}) => {
  const [displayValue, setDisplayValue] = useState(previousValue);
  const change = value - previousValue;
  const changePercent = previousValue > 0 ? ((change / previousValue) * 100).toFixed(1) : 0;

  useEffect(() => {
    let start = displayValue;
    const end = value;
    const duration = 1000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const current = Math.floor(start + (end - start) * easeOutQuad);
      
      setDisplayValue(current);
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const colorStyles = {
    green: {
      bg: 'bg-green-900/20',
      border: 'border-primary',
      text: 'text-primary',
      glow: 'shadow-[0_0_15px_rgba(51,255,0,0.3)]'
    },
    blue: {
      bg: 'bg-blue-900/20',
      border: 'border-blue-400',
      text: 'text-blue-400',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    },
    red: {
      bg: 'bg-red-900/20',
      border: 'border-destructive',
      text: 'text-destructive',
      glow: 'shadow-[0_0_15px_rgba(192,57,43,0.3)]'
    }
  };

  const style = colorStyles[color];

  return (
    <Card className={`${style.bg} border ${style.border} ${style.glow} backdrop-blur-sm transition-all duration-300 hover:scale-105 overflow-hidden relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-50"></div>
      <div className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{label}</span>
          {icon && <div className={`${style.text} opacity-30`}>{icon}</div>}
        </div>
        <div className={`text-3xl font-bold ${style.text} font-mono tabular-nums`}>
          {displayValue}
        </div>
        {change !== 0 && (
          <div className="flex items-center mt-2 text-xs">
            {change > 0 ? (
              <TrendingUp className="h-3 w-3 text-primary mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive mr-1" />
            )}
            <span className={change > 0 ? 'text-primary' : 'text-destructive'}>
              {change > 0 ? '+' : ''}{change} ({changePercent}%)
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AnimatedMetricCard;
