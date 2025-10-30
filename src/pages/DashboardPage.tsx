
import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import SentimentFilter, { FilterState } from '@/components/dashboard/SentimentFilter';
import SentimentCard from '@/components/dashboard/SentimentCard';
import SentimentMetrics from '@/components/dashboard/SentimentMetrics';
import AnimatedMetricCard from '@/components/dashboard/AnimatedMetricCard';
import LiveFeedTicker from '@/components/dashboard/LiveFeedTicker';
import SentimentTimeline from '@/components/dashboard/SentimentTimeline';
import EngagementHeatmap from '@/components/dashboard/EngagementHeatmap';
import { Badge } from '@/components/ui/badge';
import { Shield, Database, TrendingUp, Users, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRealTimeData } from '@/hooks/useRealTimeData';

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
    timestamp: Date.now() - 600000,
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
    timestamp: Date.now() - 1500000,
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
    timestamp: Date.now() - 3600000,
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
    timestamp: Date.now() - 7200000,
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
    timestamp: Date.now() - 10800000,
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
    timestamp: Date.now() - 14400000,
  },
];

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    platform: 'all',
    region: 'all',
    sentiment: 'all',
    search: '',
  });

  // Use real-time data hook
  const { data: liveData, newItemId } = useRealTimeData(mockSentimentData, 10000);

  // Ensure user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Filter data based on current filters
  const filteredData = liveData.filter((item) => {
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

  // Timeline data for sentiment flow
  const timelineData = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 12 }, (_, i) => {
      const time = new Date(now - (11 - i) * 5 * 60 * 1000);
      return {
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        positive: Math.floor(Math.random() * 15) + 5,
        neutral: Math.floor(Math.random() * 10) + 3,
        negative: Math.floor(Math.random() * 8) + 2,
      };
    });
  }, []);

  // Heatmap data for regional engagement
  const heatmapData = useMemo(() => [
    { region: 'Abu Dhabi', engagement: 145, sentiment: 'positive' as const },
    { region: 'Dubai', engagement: 198, sentiment: 'positive' as const },
    { region: 'Sharjah', engagement: 87, sentiment: 'neutral' as const },
    { region: 'Ajman', engagement: 56, sentiment: 'neutral' as const },
    { region: 'Fujairah', engagement: 42, sentiment: 'positive' as const },
    { region: 'RAK', engagement: 73, sentiment: 'negative' as const },
  ], []);

  // Recent activity for live ticker
  const recentActivity = useMemo(() => 
    liveData.slice(0, 5).map(item => 
      `New ${item.sentiment} sentiment from ${item.location} on ${item.platform}`
    ), [liveData]
  );

  return (
    <Layout>
      <div className="bg-background py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center mb-2">
                <Shield className="text-primary mr-2" size={18} />
                <span className="text-xs text-primary tracking-wider">CLASSIFIED INTEL</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-mono font-bold text-white">SENTIMENT ANALYSIS DASHBOARD</h1>
              <p className="text-gray-400 mt-1 font-mono">Monitor public sentiment across digital communication channels</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Badge variant="outline" className="bg-gray-800 border border-primary text-primary animate-pulse-slow mr-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-1"></span>
                LIVE DATA
              </Badge>
              <span className="text-sm text-gray-400 font-mono">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="bg-secondary border border-gray-700 p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-2">
              <Database className="text-primary mr-2" size={16} />
              <h2 className="text-lg font-mono text-gray-200">FILTER PARAMETERS</h2>
            </div>
            <SentimentFilter onFilterChange={setFilters} filters={filters} />
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnimatedMetricCard
              value={metrics.total}
              label="Total Sentiments"
              color="blue"
              icon={<Activity className="h-5 w-5" />}
              previousValue={metrics.total - 2}
            />
            <AnimatedMetricCard
              value={metrics.positive}
              label="Positive"
              color="green"
              icon={<TrendingUp className="h-5 w-5" />}
              previousValue={metrics.positive - 1}
            />
            <AnimatedMetricCard
              value={metrics.neutral}
              label="Neutral"
              color="blue"
              icon={<Users className="h-5 w-5" />}
              previousValue={metrics.neutral}
            />
            <AnimatedMetricCard
              value={metrics.negative}
              label="Negative"
              color="red"
              icon={<Database className="h-5 w-5" />}
              previousValue={metrics.negative}
            />
          </div>

          {/* Live Feed Ticker */}
          <div className="mb-6">
            <LiveFeedTicker recentActivity={recentActivity} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Sentiment Timeline */}
              <SentimentTimeline data={timelineData} />

              {/* Sentiment Cards */}
              <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></div>
                    <h2 className="text-lg font-mono text-primary">SOCIAL PULSE</h2>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
                    <span>SHOWING</span>
                    <span className="text-primary">{filteredData.length}</span>
                    <span>OF</span>
                    <span className="text-primary">{mockSentimentData.length}</span>
                  </div>
                </div>
                
                {filteredData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded">
                    <div className="terminal-text">NO DATA MATCHING CURRENT FILTERS</div>
                    <div className="text-xs text-gray-400 mt-2 font-mono">Adjust parameters to view more results</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredData.slice(0, 10).map((item) => (
                      <div key={item.id} className={item.id === newItemId ? 'animate-slide-in' : ''}>
                        <SentimentCard
                          username={item.username}
                          message={item.message}
                          platform={item.platform}
                          sentiment={item.sentiment}
                          time={item.time}
                          location={item.location}
                          engagement={item.engagement}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Engagement Heatmap */}
              <EngagementHeatmap data={heatmapData} />

              <SentimentMetrics metrics={metrics} />
              
              {/* Terminal-style system status widget */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-primary text-sm flex items-center">
                    <span className="h-2 w-2 rounded-full status-online mr-2"></span>
                    SYSTEM STATUS
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">v2.5.3</span>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">API CONNECTION</span>
                    <span className="text-green-400">OPERATIONAL</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">DATA STREAM</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">ENCRYPTION</span>
                    <span className="text-yellow-400">AES-256</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">MEMORY USAGE</span>
                    <span className="text-primary">32.4%</span>
                  </div>
                </div>
                
                <div className="mt-4 h-16 bg-black rounded border border-gray-700 p-2 font-mono text-xs text-green-500 overflow-hidden relative">
                  <div className="terminal-scanning absolute inset-0 opacity-10 pointer-events-none"></div>
                  <div className="space-y-1">
                    <div>{"> system.check()"}</div>
                    <div>{"> status: operational"}</div>
                    <div className="flex">
                      <span>{"> _"}</span>
                      <span className="blink ml-1">|</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
