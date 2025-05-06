
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
    high: 'bg-destructive/10 text-destructive',
    medium: 'bg-secondary/10 text-secondary',
    low: 'bg-blue-100 text-blue-700',
  };

  const typeIcons = {
    action: <Lightbulb className="h-5 w-5" />,
    alert: <AlertTriangle className="h-5 w-5" />,
    trend: <TrendingUp className="h-5 w-5" />,
  };

  const typeStyles = {
    action: 'bg-secondary text-black',
    alert: 'bg-destructive text-white',
    trend: 'bg-blue-600 text-white',
  };

  const typeNames = {
    action: 'Recommended Action',
    alert: 'Alert',
    trend: 'Emerging Trend',
  };

  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={typeStyles[type]}>
            <span className="flex items-center">
              {typeIcons[type]}
              <span className="ml-1">{typeNames[type]}</span>
            </span>
          </Badge>
          <Badge variant="outline" className={priorityStyles[priority]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </Badge>
        </div>
        <CardTitle className="text-lg mt-3">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {topics.map((topic, index) => (
            <Badge key={index} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Generated {time}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end">
        <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightCard;
