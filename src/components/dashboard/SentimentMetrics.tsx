
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
    { name: 'Positive', value: positive, color: '#2ECC71' },
    { name: 'Neutral', value: neutral, color: '#BDC3C7' },
    { name: 'Negative', value: negative, color: '#C0392B' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} mentions (${((Number(value) / total) * 100).toFixed(1)}%)`, null]}
                labelFormatter={(label) => data[label as number].name}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center">
            <div className="text-positive font-bold text-lg">{positive}</div>
            <div className="text-xs text-gray-500">Positive</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 font-bold text-lg">{neutral}</div>
            <div className="text-xs text-gray-500">Neutral</div>
          </div>
          <div className="text-center">
            <div className="text-destructive font-bold text-lg">{negative}</div>
            <div className="text-xs text-gray-500">Negative</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentMetrics;
