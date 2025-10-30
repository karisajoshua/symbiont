import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeatmapData {
  region: string;
  engagement: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface EngagementHeatmapProps {
  data: HeatmapData[];
}

const EngagementHeatmap: React.FC<EngagementHeatmapProps> = ({ data }) => {
  const maxEngagement = Math.max(...data.map(d => d.engagement));

  const getHeatColor = (engagement: number) => {
    const intensity = engagement / maxEngagement;
    if (intensity > 0.7) return 'bg-primary/60 border-primary text-primary';
    if (intensity > 0.4) return 'bg-primary/40 border-primary/60 text-primary';
    return 'bg-primary/20 border-primary/30 text-primary/70';
  };

  return (
    <Card className="border border-gray-700 bg-secondary/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="bg-gray-800/50 border-b border-gray-700 p-4">
        <CardTitle className="text-sm font-mono text-primary flex items-center">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
          REGIONAL ENGAGEMENT HEAT
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={`${getHeatColor(item.engagement)} border rounded p-2 transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              <div className="text-xs font-mono font-bold truncate">{item.region}</div>
              <div className="text-lg font-bold font-mono tabular-nums">{item.engagement}</div>
              <div className="flex items-center mt-1">
                <div className={`h-1.5 w-1.5 rounded-full mr-1 ${
                  item.sentiment === 'positive' ? 'bg-primary' :
                  item.sentiment === 'negative' ? 'bg-destructive' :
                  'bg-muted'
                }`}></div>
                <span className="text-xs opacity-70">{item.sentiment}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementHeatmap;
