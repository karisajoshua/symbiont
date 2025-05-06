
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText } from 'lucide-react';
import { DatePickerWithRange } from '@/components/reports/DateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  return (
    <Layout>
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Trend Reports</h1>
            <p className="text-gray-600">
              Track shifts by week, campaign, or topic—across all platforms and regions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <Select defaultValue={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Time Series</SelectItem>
                    <SelectItem value="topics">Topics</SelectItem>
                    <SelectItem value="platforms">Platforms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <Select defaultValue={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
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
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="chart" className="mb-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <span className="text-sm text-gray-500">
                Showing data from {date.from?.toLocaleDateString()} to {date.to?.toLocaleDateString()}
              </span>
            </div>

            <TabsContent value="chart" className="pt-4">
              <Card className="border border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg">
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
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="positive" 
                            name="Positive" 
                            stroke="#2ECC71" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="neutral" 
                            name="Neutral" 
                            stroke="#BDC3C7" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="negative" 
                            name="Negative" 
                            stroke="#C0392B" 
                          />
                        </LineChart>
                      ) : (
                        <BarChart
                          data={topicsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="positive" name="Positive" stackId="a" fill="#2ECC71" />
                          <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#BDC3C7" />
                          <Bar dataKey="negative" name="Negative" stackId="a" fill="#C0392B" />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card className="border border-gray-100">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Report Summary</h3>
                      <p className="text-gray-700">
                        This report covers social sentiment data from {date.from?.toLocaleDateString()} to {date.to?.toLocaleDateString()}. 
                        Overall sentiment trends show 62% positive mentions, 28% neutral mentions, and 10% negative mentions across all monitored platforms.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Positive sentiment has increased by 7% compared to the previous period.</li>
                        <li>Healthcare and Education topics received the most favorable mentions.</li>
                        <li>Transportation issues continue to generate the highest negative sentiment.</li>
                        <li>Dubai and Abu Dhabi regions show the highest volume of social conversations.</li>
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-positive mb-1">62%</div>
                        <div className="text-sm text-gray-700">Positive Sentiment</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-500 mb-1">28%</div>
                        <div className="text-sm text-gray-700">Neutral Sentiment</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-destructive mb-1">10%</div>
                        <div className="text-sm text-gray-700">Negative Sentiment</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
