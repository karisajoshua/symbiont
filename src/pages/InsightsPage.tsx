
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import InsightCard from '@/components/insights/InsightCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

// Mock insights data
const insightsData = [
  {
    id: 1,
    title: 'Healthcare Access Sentiment Surge',
    description: 'Positive sentiment around healthcare access has increased by 27% following the new initiative launch in Abu Dhabi. Consider highlighting successful case studies to further amplify positive reception.',
    type: 'action' as const,
    priority: 'high' as const,
    topics: ['Healthcare', 'Abu Dhabi', 'Public Services'],
    time: '10 minutes ago',
  },
  {
    id: 2,
    title: 'Traffic Congestion Complaints Rising',
    description: 'Increasing negative sentiment (34% growth) around traffic conditions on Sheikh Zayed Road. Data suggests peak congestion between 7:30-9:00 AM. Consider public communication about ongoing infrastructure improvements.',
    type: 'alert' as const,
    priority: 'high' as const,
    topics: ['Transportation', 'Dubai', 'Infrastructure'],
    time: '25 minutes ago',
  },
  {
    id: 3,
    title: 'Economic Policy Reception Mixed',
    description: 'Current economic policies are receiving mixed sentiment with polarization between business owners (positive) and employees (concerned). Consider targeted messaging to address specific concerns from affected groups.',
    type: 'trend' as const,
    priority: 'medium' as const,
    topics: ['Economy', 'Business', 'Employment'],
    time: '1 hour ago',
  },
  {
    id: 4,
    title: 'Education Reform Positive Feedback',
    description: 'Education reforms are being well-received especially among parents and teachers. There\'s an opportunity to showcase teacher success stories and student achievements to reinforce positive sentiment.',
    type: 'action' as const,
    priority: 'medium' as const,
    topics: ['Education', 'Schools', 'Teachers'],
    time: '2 hours ago',
  },
  {
    id: 5,
    title: 'Renewable Energy Project Support',
    description: 'Strong positive sentiment around the new renewable energy plant in RAK. This presents a good opportunity to communicate broader sustainability goals and future green initiatives.',
    type: 'action' as const,
    priority: 'low' as const,
    topics: ['Energy', 'Sustainability', 'Ras Al Khaimah'],
    time: '3 hours ago',
  },
  {
    id: 6,
    title: 'Tech Employment Concerns Emerging',
    description: 'Early detection of concerns about tech sector employment stability. Several startups mentioned struggling despite government incentives. Consider reviewing current tech support programs effectiveness.',
    type: 'alert' as const,
    priority: 'medium' as const,
    topics: ['Technology', 'Employment', 'Economy'],
    time: '4 hours ago',
  },
];

const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter insights based on active filters
  const filteredInsights = insightsData.filter((insight) => {
    // Filter by type
    if (activeTab !== 'all' && insight.type !== activeTab) return false;
    
    // Filter by priority
    if (priorityFilter !== 'all' && insight.priority !== priorityFilter) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        insight.title.toLowerCase().includes(query) ||
        insight.description.toLowerCase().includes(query) ||
        insight.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  return (
    <Layout>
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">AI-Powered Insights & Recommendations</h1>
            <p className="text-gray-600">
              AI-generated insights to help identify trends, alerts, and recommended actions based on social sentiment analysis.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Insights</TabsTrigger>
                <TabsTrigger value="action">Actions</TabsTrigger>
                <TabsTrigger value="alert">Alerts</TabsTrigger>
                <TabsTrigger value="trend">Trends</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2 items-center justify-between md:justify-end w-full">
              <div className="w-full md:w-64 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredInsights.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No insights found matching your filters</p>
              <Button onClick={() => {
                setActiveTab('all');
                setPriorityFilter('all');
                setSearchQuery('');
              }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                  priority={insight.priority}
                  topics={insight.topics}
                  time={insight.time}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InsightsPage;
