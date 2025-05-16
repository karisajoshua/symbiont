
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import { DatePickerWithRange } from '@/components/reports/DateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import DataRibbon from '@/components/common/DataRibbon';

// Mock data for time series
const timeSeriesData = [
  { date: 'Jan 1', positive: 65, neutral: 28, negative: 7 },
  { date: 'Jan 8', positive: 59, neutral: 32, negative: 9 },
  { date: 'Jan 15', positive: 80, neutral: 13, negative: 7 },
  { date: 'Jan 22', positive: 81, neutral: 15, negative: 4 },
  { date: 'Jan 29', positive: 56, neutral: 29, negative: 15 },
  { date: 'Feb 5', positive: 55, neutral: 30, negative: 15 },
  { date: 'Feb 12', positive: 40, neutral: 35, negative: 25 },
];

// Mock data for topics
const topicsData = [
  { name: 'Healthcare', positive: 72, neutral: 18, negative: 10 },
  { name: 'Economy', positive: 45, neutral: 35, negative: 20 },
  { name: 'Transport', positive: 35, neutral: 25, negative: 40 },
  { name: 'Education', positive: 65, neutral: 25, negative: 10 },
  { name: 'Housing', positive: 40, neutral: 30, negative: 30 },
  { name: 'Environment', positive: 80, neutral: 15, negative: 5 },
];

const ReportsPage = () => {
  const [date, setDate] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  });

  const [reportType, setReportType] = useState('time');
  const [region, setRegion] = useState('all');
  const navigate = useNavigate();

  return (
    <Layout>
      <DataRibbon position="top" />
      <div className="bg-background py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4 bg-secondary border-gray-700 text-primary hover:bg-gray-700"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={16} className="mr-1" />
              Return to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">Trend Reports</h1>
              <p className="text-gray-400 text-sm">
                Track shifts by week, campaign, or topic—across all platforms and regions
              </p>
            </div>
          </div>

          <div className="bg-secondary rounded-lg border border-gray-700 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date Range</label>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Report Type</label>
                <Select defaultValue={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-gray-700 text-gray-200">
                    <SelectItem value="time">Time Series</SelectItem>
                    <SelectItem value="topics">Topics</SelectItem>
                    <SelectItem value="platforms">Platforms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Region</label>
                <Select defaultValue={region} onValueChange={setRegion}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-gray-700 text-gray-200">
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                    <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                    <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                    <SelectItem value="fujairah">Fujairah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-primary hover:bg-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-primary hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-primary hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="chart" className="mb-6">
            <div className="flex justify-between items-center">
              <TabsList className="bg-secondary border border-gray-700">
                <TabsTrigger value="chart" className="data-[state=active]:bg-gray-800 data-[state=active]:text-primary">Chart</TabsTrigger>
                <TabsTrigger value="summary" className="data-[state=active]:bg-gray-800 data-[state=active]:text-primary">Summary</TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-gray-800 data-[state=active]:text-primary">Details</TabsTrigger>
              </TabsList>
              <span className="text-sm text-gray-400">
                Showing data from {date.from?.toLocaleDateString()} to {date.to?.toLocaleDateString()}
              </span>
            </div>

            <TabsContent value="chart" className="pt-4">
              <Card className="border border-gray-700 bg-secondary text-foreground">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {reportType === 'time' && 'Sentiment Trends Over Time'}
                    {reportType === 'topics' && 'Sentiment by Topic'}
                    {reportType === 'platforms' && 'Sentiment by Platform'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {reportType === 'time' ? (
                        <LineChart
                          data={timeSeriesData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="date" stroke="#ccc" />
                          <YAxis stroke="#ccc" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                            itemStyle={{ color: '#ccc' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="positive" 
                            name="Positive" 
                            stroke="#33cc99" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="neutral" 
                            name="Neutral" 
                            stroke="#88ccee" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="negative" 
                            name="Negative" 
                            stroke="#ff6666" 
                          />
                        </LineChart>
                      ) : (
                        <BarChart
                          data={topicsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="#ccc" />
                          <YAxis stroke="#ccc" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                            itemStyle={{ color: '#ccc' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend />
                          <Bar dataKey="positive" name="Positive" stackId="a" fill="#33cc99" />
                          <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#88ccee" />
                          <Bar dataKey="negative" name="Negative" stackId="a" fill="#ff6666" />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card className="border border-gray-700 bg-secondary text-foreground">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-primary">Report Summary</h3>
                      <p className="text-gray-300">
                        This report covers social sentiment data from {date.from?.toLocaleDateString()} to {date.to?.toLocaleDateString()}. 
                        Overall sentiment trends show 62% positive mentions, 28% neutral mentions, and 10% negative mentions across all monitored platforms.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-primary">Key Insights</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-300">
                        <li>Positive sentiment has increased by 7% compared to the previous period.</li>
                        <li>Healthcare and Education topics received the most favorable mentions.</li>
                        <li>Transportation issues continue to generate the highest negative sentiment.</li>
                        <li>Dubai and Abu Dhabi regions show the highest volume of social conversations.</li>
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 border border-green-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-400 mb-1">62%</div>
                        <div className="text-sm text-gray-300">Positive Sentiment</div>
                      </div>
                      <div className="bg-gray-800 border border-blue-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-1">28%</div>
                        <div className="text-sm text-gray-300">Neutral Sentiment</div>
                      </div>
                      <div className="bg-gray-800 border border-red-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-red-400 mb-1">10%</div>
                        <div className="text-sm text-gray-300">Negative Sentiment</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <DataRibbon position="bottom" />
    </Layout>
  );
};

export default ReportsPage;
