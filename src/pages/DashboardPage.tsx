
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SentimentFilter, { FilterState } from '@/components/dashboard/SentimentFilter';
import SentimentCard from '@/components/dashboard/SentimentCard';
import SentimentMetrics from '@/components/dashboard/SentimentMetrics';
import { Badge } from '@/components/ui/badge';

// Mock data for the dashboard
const mockSentimentData = [
  {
    id: 1,
    username: 'AhmedK',
    message: 'The new healthcare initiative in Abu Dhabi has significantly improved access to medical services! #HealthcareUAE',
    platform: 'twitter' as const,
    sentiment: 'positive' as const,
    time: '10 min ago',
    location: 'Abu Dhabi',
    engagement: 45,
  },
  {
    id: 2,
    username: 'Sara_Dubai',
    message: 'Traffic conditions on Sheikh Zayed Road need attention. Daily commuters are spending too much time in congestion. #DubaiTraffic',
    platform: 'facebook' as const,
    sentiment: 'negative' as const,
    time: '25 min ago',
    location: 'Dubai',
    engagement: 78,
  },
  {
    id: 3,
    username: 'UAEBusinessHubs',
    message: 'The latest economic policies seem well-balanced, though their long-term effects remain to be seen.',
    platform: 'instagram' as const,
    sentiment: 'neutral' as const,
    time: '1 hour ago',
    location: 'Sharjah',
    engagement: 32,
  },
  {
    id: 4,
    username: 'FatimaNoor',
    message: 'Education reforms are showing positive results in our schools. Teachers report higher student engagement! 🎓👏 #UAEEducation',
    platform: 'twitter' as const,
    sentiment: 'positive' as const,
    time: '2 hours ago',
    location: 'Fujairah',
    engagement: 56,
  },
  {
    id: 5,
    username: 'KhalidM',
    message: 'The new renewable energy plant in RAK is a fantastic step toward sustainability. Proud of our leadership\'s vision! #GreenUAE',
    platform: 'facebook' as const,
    sentiment: 'positive' as const,
    time: '3 hours ago',
    location: 'Ras Al Khaimah',
    engagement: 92,
  },
  {
    id: 6,
    username: 'DubaiTech',
    message: 'Concerning trends in tech sector employment. Several startups are struggling to retain talent despite government incentives.',
    platform: 'instagram' as const,
    sentiment: 'negative' as const,
    time: '4 hours ago',
    location: 'Dubai',
    engagement: 64,
  },
];

const DashboardPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    platform: 'all',
    region: 'all',
    sentiment: 'all',
    search: '',
  });

  // Filter data based on current filters
  const filteredData = mockSentimentData.filter((item) => {
    if (filters.platform !== 'all' && item.platform !== filters.platform) return false;
    if (filters.region !== 'all' && !item.location.toLowerCase().includes(filters.region.toLowerCase().replace('-', ' '))) return false;
    if (filters.sentiment !== 'all' && item.sentiment !== filters.sentiment) return false;
    if (filters.search && !item.message.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Calculate metrics
  const metrics = {
    positive: filteredData.filter(item => item.sentiment === 'positive').length,
    neutral: filteredData.filter(item => item.sentiment === 'neutral').length,
    negative: filteredData.filter(item => item.sentiment === 'negative').length,
    total: filteredData.length,
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Real-Time Sentiment Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze public sentiment across social platforms</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Badge variant="outline" className="bg-green-100 text-green-800 animate-pulse-slow mr-2">
                Live Data
              </Badge>
              <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <SentimentFilter onFilterChange={setFilters} filters={filters} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h2 className="text-lg font-semibold mb-4">Live Social Pulse</h2>
                
                {filteredData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No data found matching your filters
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredData.map((item) => (
                      <SentimentCard
                        key={item.id}
                        username={item.username}
                        message={item.message}
                        platform={item.platform}
                        sentiment={item.sentiment}
                        time={item.time}
                        location={item.location}
                        engagement={item.engagement}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <SentimentMetrics metrics={metrics} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
