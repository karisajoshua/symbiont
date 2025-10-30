import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineDataPoint {
  time: string;
  positive: number;
  neutral: number;
  negative: number;
}

interface SentimentTimelineProps {
  data: TimelineDataPoint[];
}

const SentimentTimeline: React.FC<SentimentTimelineProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 border border-primary/30 p-3 rounded shadow-lg backdrop-blur-sm">
          <p className="font-mono text-primary text-xs mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs font-mono" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-gray-700 bg-secondary/50 backdrop-blur-sm shadow-lg overflow-hidden">
      <CardHeader className="bg-gray-800/50 border-b border-gray-700 p-4">
        <CardTitle className="text-sm font-mono text-primary flex items-center">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
          SENTIMENT FLOW - LAST HOUR
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33ff00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#33ff00" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4d5566" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4d5566" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C0392B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#C0392B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="time" 
                stroke="#666"
                tick={{ fontSize: 10, fontFamily: 'monospace' }}
              />
              <YAxis 
                stroke="#666"
                tick={{ fontSize: 10, fontFamily: 'monospace' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="positive" 
                stroke="#33ff00" 
                fillOpacity={1}
                fill="url(#colorPositive)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="neutral" 
                stroke="#4d5566" 
                fillOpacity={1}
                fill="url(#colorNeutral)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="negative" 
                stroke="#C0392B" 
                fillOpacity={1}
                fill="url(#colorNegative)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentTimeline;
