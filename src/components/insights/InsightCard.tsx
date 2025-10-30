
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'action' | 'alert' | 'trend';
  priority: 'high' | 'medium' | 'low';
  topics: string[];
  time: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  type,
  priority,
  topics,
  time,
}) => {
  const priorityStyles = {
    high: 'bg-destructive/20 text-destructive border-destructive',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-400',
    low: 'bg-primary/20 text-primary border-primary',
  };

  const typeIcons = {
    action: <Lightbulb className="h-5 w-5" />,
    alert: <AlertTriangle className="h-5 w-5" />,
    trend: <TrendingUp className="h-5 w-5" />,
  };

  const typeStyles = {
    action: 'bg-primary/20 text-primary border border-primary',
    alert: 'bg-destructive/20 text-destructive border border-destructive',
    trend: 'bg-blue-500/20 text-blue-400 border border-blue-400',
  };

  const typeNames = {
    action: 'Recommended Action',
    alert: 'Alert',
    trend: 'Emerging Trend',
  };

  return (
    <Card className="border border-gray-700 bg-secondary/80 backdrop-blur-sm shadow-lg hover:shadow-[0_0_20px_rgba(51,255,0,0.15)] hover:border-primary/50 transition-all duration-300 animate-fade-in hover:scale-[1.02]">
      <CardHeader className="pb-2 bg-gray-800/50 border-b border-gray-700">
        <div className="flex justify-between items-start">
          <Badge className={typeStyles[type]}>
            <span className="flex items-center font-mono">
              {typeIcons[type]}
              <span className="ml-1">{typeNames[type]}</span>
            </span>
          </Badge>
          <Badge variant="outline" className={`${priorityStyles[priority]} font-mono`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </Badge>
        </div>
        <CardTitle className="text-lg mt-3 text-primary font-mono">{title}</CardTitle>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-secondary to-gray-900/50">
        <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {topics.map((topic, index) => (
            <Badge key={index} variant="outline" className="border-primary/30 text-primary/80 font-mono text-xs">
              {topic}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 font-mono">Generated {time}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end bg-gray-800/30">
        <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 font-mono text-sm">
          View Details →
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightCard;
