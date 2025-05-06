
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SentimentMap from '@/components/map/SentimentMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const regionData = [
  { name: 'Abu Dhabi', positive: 785, neutral: 320, negative: 140, total: 1245 },
  { name: 'Dubai', positive: 1110, neutral: 450, negative: 290, total: 1850 },
  { name: 'Sharjah', positive: 618, neutral: 227, negative: 105, total: 950 },
  { name: 'Ajman', positive: 224, neutral: 182, negative: 114, total: 520 },
  { name: 'Umm Al Quwain', positive: 186, neutral: 96, negative: 38, total: 320 },
  { name: 'Ras Al Khaimah', positive: 379, neutral: 72, negative: 29, total: 480 },
  { name: 'Fujairah', positive: 242, neutral: 102, negative: 46, total: 390 },
];

const platformData = [
  { name: 'Twitter', value: 3250, color: '#1DA1F2' },
  { name: 'Facebook', value: 2840, color: '#4267B2' },
  { name: 'Instagram', value: 2165, color: '#C13584' },
  { name: 'TikTok', value: 1730, color: '#000000' },
  { name: 'LinkedIn', value: 980, color: '#0077B5' },
];

const MapPage = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <Layout>
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Regional Sentiment Heatmap</h1>
            <p className="text-gray-600">
              Visualize support levels by region across the UAE. The heatmap dynamically updates based on sentiment trends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SentimentMap />
            </div>

            <div>
              <Card className="border border-gray-100 shadow-sm mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Statistics by Region</CardTitle>
                    <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Last 24h</SelectItem>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.map((region) => (
                      <div key={region.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{region.name}</span>
                          <span className="font-semibold">{region.total} mentions</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div
                              className="bg-positive"
                              style={{ width: `${(region.positive / region.total) * 100}%` }}
                            ></div>
                            <div
                              className="bg-gray-400"
                              style={{ width: `${(region.neutral / region.total) * 100}%` }}
                            ></div>
                            <div
                              className="bg-destructive"
                              style={{ width: `${(region.negative / region.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Mentions by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={platformData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip formatter={(value) => [`${value} mentions`, 'Volume']} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
