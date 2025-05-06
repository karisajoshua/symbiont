import React, { createContext, useState, useEffect, useContext } from 'react';

interface SentimentItem {
  id: number;
  username: string;
  message: string;
  platform: 'twitter' | 'facebook' | 'instagram';
  sentiment: 'positive' | 'neutral' | 'negative';
  time: string;
  location: string;
  engagement: number;
}

interface SimulatedDataContextType {
  sentimentData: SentimentItem[];
  metrics: {
    positive: number;
    neutral: number;
    negative: number;
    total: number;
  };
  lastUpdated: Date;
}

const SimulatedDataContext = createContext<SimulatedDataContextType | null>(null);

// Mock data for simulation
const mockUsernames = [
  'AhmedK', 'Sara_Dubai', 'UAEBusinessHubs', 'FatimaNoor', 'KhalidM', 'DubaiTech',
  'TrafficUAE', 'AbuDhabi_News', 'UAESportsLife', 'EduProgress', 'HealthcareUAE', 'TechInnovator',
  'UAEConnect', 'DesertRose', 'SheikhZayedFan', 'UAEVisitor', 'ExploreDubai', 'StudentAD'
];

const mockMessages = [
  'The new healthcare initiative in Abu Dhabi has significantly improved access to medical services! #HealthcareUAE',
  'Traffic conditions on Sheikh Zayed Road need attention. Daily commuters are spending too much time in congestion. #DubaiTraffic',
  'The latest economic policies seem well-balanced, though their long-term effects remain to be seen.',
  'Education reforms are showing positive results in our schools. Teachers report higher student engagement! 🎓👏 #UAEEducation',
  'The new renewable energy plant in RAK is a fantastic step toward sustainability. Proud of our leadership\'s vision! #GreenUAE',
  'Concerning trends in tech sector employment. Several startups are struggling to retain talent despite government incentives.',
  'Public transport expansion in Sharjah is making daily commutes much easier! Thank you @RTA #PublicTransport',
  'Housing prices continue to rise in key areas. Young professionals finding it increasingly difficult to settle.',
  'The cultural festival brought together so many communities! True representation of UAE\'s diversity and tolerance.',
  'Internet connectivity issues persist in remote areas. Hoping for infrastructure investments soon. #Connectivity',
  'New healthcare facility in our neighborhood is excellent! Modern facilities and caring staff.',
  'Restaurant hygiene standards have improved dramatically this year. Great work by municipality inspectors!',
  'School curriculum updates are challenging but will better prepare students for global competition.',
  'Airport security measures are efficient and professional. Never faced delays during recent travels.',
  'Construction noise in residential areas is becoming a major issue. Regulations should be reviewed.'
];

const locations = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
const platforms = ['twitter', 'facebook', 'instagram'] as const;
const sentiments = ['positive', 'neutral', 'negative'] as const;

export const SimulatedDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [sentimentData, setSentimentData] = useState<SentimentItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Generate initial data
  useEffect(() => {
    const initialData: SentimentItem[] = [];
    
    for (let i = 0; i < 20; i++) {
      initialData.push(generateSentimentItem(i));
    }
    
    setSentimentData(initialData);
  }, []);
  
  // Periodically update data
  useEffect(() => {
    const interval = setInterval(() => {
      setSentimentData(prev => {
        // Add 1-3 new items at random positions
        const newItems = Array(Math.floor(Math.random() * 3) + 1)
          .fill(null)
          .map((_, i) => generateSentimentItem(prev.length + i));
        
        // Return a mix of old and new items, keeping array at max 20 items
        const updatedData = [...newItems, ...prev].slice(0, 20);
        
        setLastUpdated(new Date());
        return updatedData;
      });
    }, 8000); // Update every 8 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate metrics
  const metrics = {
    positive: sentimentData.filter(item => item.sentiment === 'positive').length,
    neutral: sentimentData.filter(item => item.sentiment === 'neutral').length,
    negative: sentimentData.filter(item => item.sentiment === 'negative').length,
    total: sentimentData.length,
  };
  
  return (
    <SimulatedDataContext.Provider value={{ sentimentData, metrics, lastUpdated }}>
      {children}
    </SimulatedDataContext.Provider>
  );
};

// Helper function to generate a sentiment item
function generateSentimentItem(id: number): SentimentItem {
  const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  
  return {
    id,
    username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
    message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    sentiment: randomSentiment,
    time: generateTimeAgo(),
    location: randomLocation,
    engagement: Math.floor(Math.random() * 100) + 1
  };
}

// Helper to generate time strings
function generateTimeAgo(): string {
  const options = [
    'just now',
    '1 min ago',
    '2 mins ago',
    '5 mins ago',
    '10 mins ago',
    '15 mins ago',
    '30 mins ago',
    '1 hr ago'
  ];
  
  return options[Math.floor(Math.random() * options.length)];
}

// Custom hook to use the simulated data
export const useSimulatedData = () => {
  const context = useContext(SimulatedDataContext);
  if (!context) {
    throw new Error('useSimulatedData must be used within a SimulatedDataProvider');
  }
  return context;
};
