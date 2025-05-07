
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SentimentMetricsProps {
  metrics: {
    positive: number;
    neutral: number;
    negative: number;
    total: number;
  };
}

const SentimentMetrics: React.FC<SentimentMetricsProps> = ({ metrics }) => {
  const { positive, neutral, negative, total } = metrics;

  const data = [
    { name: 'Positive', value: positive, color: '#33ff00' }, // Terminal green for positive
    { name: 'Neutral', value: neutral, color: '#4d5566' }, // Dark muted blue for neutral
    { name: 'Negative', value: negative, color: '#C0392B' }, // Crimson for negative
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-gray-800 border border-gray-700 p-2 text-xs rounded shadow-lg">
          <p className="font-mono text-primary">{`${data.name}: ${data.value}`}</p>
          <p className="text-gray-400">{`${((data.value / total) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex justify-around mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-300 font-mono">
              {entry.value} ({((data[index].value / total) * 100).toFixed(0)}%)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="border border-gray-700 bg-secondary shadow-lg overflow-hidden">
      <CardHeader className="bg-gray-800 border-b border-gray-700 p-4">
        <CardTitle className="text-lg font-mono text-primary flex items-center">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
          SENTIMENT ANALYSIS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative h-64">
          {/* Decorative background grid */}
          <div className="absolute inset-0 grid-overlay opacity-10"></div>
          
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                labelLine={false}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={2}
                stroke="#1a1f2c"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: 'drop-shadow(0 0 4px rgba(51, 255, 0, 0.5))' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Terminal-like data in the center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold terminal-text">{total}</div>
            <div className="text-xs text-gray-400 font-mono">SENTIMENTS</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="bg-gray-800 p-3 rounded border border-gray-700">
            <div className="text-center">
              <div className="text-primary font-bold text-lg terminal-text">{positive}</div>
              <div className="text-xs text-gray-400 font-mono">POSITIVE</div>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded border border-gray-700">
            <div className="text-center">
              <div className="text-gray-400 font-bold text-lg">{neutral}</div>
              <div className="text-xs text-gray-400 font-mono">NEUTRAL</div>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded border border-gray-700">
            <div className="text-center">
              <div className="text-destructive font-bold text-lg">{negative}</div>
              <div className="text-xs text-gray-400 font-mono">NEGATIVE</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentMetrics;
