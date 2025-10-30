import { useState, useEffect } from 'react';

export interface SentimentDataPoint {
  id: number;
  username: string;
  message: string;
  platform: 'twitter' | 'instagram' | 'facebook';
  sentiment: 'positive' | 'neutral' | 'negative';
  time: string;
  location: string;
  engagement: number;
  timestamp: number;
}

const locations = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain'];
const platforms: ('twitter' | 'instagram' | 'facebook')[] = ['twitter', 'instagram', 'facebook'];
const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];

const messages = {
  positive: [
    'Amazing progress on the new infrastructure projects! #UAE',
    'The healthcare system has improved dramatically this year 🏥',
    'Proud to see renewable energy initiatives taking shape ⚡',
    'Education reforms are making a real difference 📚',
    'Innovation hub is bringing incredible opportunities 🚀'
  ],
  neutral: [
    'Interesting policy changes announced today',
    'Monitoring the situation closely',
    'Mixed feedback from the community',
    'Updates on ongoing developments',
    'Awaiting more information on this'
  ],
  negative: [
    'Traffic congestion continues to be a major issue',
    'Concerns about rising costs in the housing market',
    'Service delays reported in several areas',
    'Implementation could be improved',
    'Challenges remain to be addressed'
  ]
};

const generateRandomData = (id: number): SentimentDataPoint => {
  const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const message = messages[sentiment][Math.floor(Math.random() * messages[sentiment].length)];
  
  return {
    id,
    username: `User${Math.floor(Math.random() * 9999)}`,
    message,
    platform,
    sentiment,
    time: 'Just now',
    location,
    engagement: Math.floor(Math.random() * 100) + 1,
    timestamp: Date.now()
  };
};

export const useRealTimeData = (initialData: SentimentDataPoint[], interval: number = 8000) => {
  const [data, setData] = useState<SentimentDataPoint[]>(initialData);
  const [newItemId, setNewItemId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const newItem = generateRandomData(Date.now());
      setNewItemId(newItem.id);
      
      setData(prev => {
        const updated = [newItem, ...prev].slice(0, 20); // Keep only 20 most recent
        return updated;
      });

      // Clear highlight after animation
      setTimeout(() => setNewItemId(null), 2000);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { data, newItemId };
};
