
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SentimentMap from '@/components/map/SentimentMap';
import ServerConnectionMap from '@/components/map/ServerConnectionMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DataRibbon from '@/components/common/DataRibbon';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TerminalDialog from '@/components/map/TerminalDialog';
import { 
  generateServerNodeData, 
  generateNetworkTrafficData, 
  generateSecurityAlertData, 
  generateAgentActivityData,
  generateSystemCommandData
} from '@/services/terminalDataService';

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
  const [activeTab, setActiveTab] = useState('sentiment');
  
  // Terminal dialog states
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [serverDialogOpen, setServerDialogOpen] = useState(false);
  const [networkDialogOpen, setNetworkDialogOpen] = useState(false);
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);

  const handleTerminalClick = () => {
    // Play activation sound
    const audio = new Audio('/terminal-activate.mp3');
    audio.volume = 0.3;
    audio.play().catch(err => console.error("Audio play error:", err));
    
    // Open all dialogs with a slight delay between them
    setTerminalOpen(true);
    setTimeout(() => setServerDialogOpen(true), 300);
    setTimeout(() => setNetworkDialogOpen(true), 600);
    setTimeout(() => setSecurityDialogOpen(true), 900);
    setTimeout(() => setAgentDialogOpen(true), 1200);
  };

  const closeAllTerminals = () => {
    setTerminalOpen(false);
    setServerDialogOpen(false);
    setNetworkDialogOpen(false);
    setSecurityDialogOpen(false);
    setAgentDialogOpen(false);
  };

  return (
    <Layout>
      <DataRibbon position="top" />
      <div className="container mx-auto px-4 py-8 relative" style={{ minHeight: '80vh' }}>
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">STRATEGIC MAPPING INTERFACE</h1>
            <p className="text-gray-400">
              Geographic visualization of network activity and sentiment analysis. Classification level: RESTRICTED.
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-gray-800 text-primary border-gray-700 hover:bg-gray-700">
              <ArrowLeft size={16} className="mr-2" /> RETURN TO HOME
            </Button>
          </Link>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-secondary border border-gray-700">
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-gray-800 data-[state=active]:text-primary">
              SENTIMENT HEATMAP
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-gray-800 data-[state=active]:text-primary">
              SERVER NETWORK
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sentiment" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SentimentMap />
              </div>

              <div>
                <Card className="bg-secondary border border-gray-700 shadow-md mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-gray-200">Regional Statistics</CardTitle>
                      <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
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
                            <span className="text-gray-300">{region.name}</span>
                            <span className="font-semibold text-primary">{region.total} mentions</span>
                          </div>
                          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="flex h-full">
                              <div
                                className="bg-positive"
                                style={{ width: `${(region.positive / region.total) * 100}%` }}
                              ></div>
                              <div
                                className="bg-gray-500"
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

                <Card className="bg-secondary border border-gray-700 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-200">Platform Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={platformData}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                          <XAxis type="number" stroke="#777" />
                          <YAxis dataKey="name" type="category" width={80} stroke="#777" />
                          <Tooltip 
                            formatter={(value) => [`${value} mentions`, 'Volume']}
                            contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                            itemStyle={{ color: '#ddd' }}
                          />
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
          </TabsContent>
          
          <TabsContent value="network" className="mt-6">
            <Card className="bg-secondary border border-gray-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-200">Global Server Network</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">Monitoring active connections and suspicious traffic patterns</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-800 text-terminal-green border-gray-700 hover:bg-gray-700 hover:text-terminal-green hover:border-terminal-green"
                    onClick={handleTerminalClick}
                  >
                    <Terminal size={16} className="mr-2" />
                    TERMINAL
                  </Button>
                  <Badge variant="outline" className="bg-gray-800 text-primary border-gray-700 animate-pulse-slow">
                    LIVE TRAFFIC
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <ServerConnectionMap />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Terminal Dialogs - All positioned on the extreme left with vertical spacing */}
        <TerminalDialog
          open={terminalOpen}
          onOpenChange={setTerminalOpen}
          title="SYSTEM COMMAND"
          position={{ top: '100', left: '20' }}
          width="450px"
          height="250px"
          dataGenerator={generateSystemCommandData}
          updateInterval={6000}
        />
        
        <TerminalDialog
          open={serverDialogOpen}
          onOpenChange={setServerDialogOpen}
          title="SERVER NODE ACTIVITY"
          position={{ top: '150', left: '20' }}
          width="450px"
          height="250px"
          dataGenerator={generateServerNodeData}
          updateInterval={4000}
        />
        
        <TerminalDialog
          open={networkDialogOpen}
          onOpenChange={setNetworkDialogOpen}
          title="NETWORK TRAFFIC"
          position={{ top: '200', left: '20' }}
          width="450px"
          height="250px"
          dataGenerator={generateNetworkTrafficData}
          updateInterval={3000}
        />
        
        <TerminalDialog
          open={securityDialogOpen}
          onOpenChange={setSecurityDialogOpen}
          title="SECURITY ALERTS"
          position={{ top: '250', left: '20' }}
          width="450px"
          height="250px"
          dataGenerator={generateSecurityAlertData}
          updateInterval={7000}
        />
        
        <TerminalDialog
          open={agentDialogOpen}
          onOpenChange={setAgentDialogOpen}
          title="AGENT ACTIVITY"
          position={{ top: '300', left: '20' }}
          width="450px"
          height="250px"
          dataGenerator={generateAgentActivityData}
          updateInterval={5000}
        />
      </div>
      
      <DataRibbon position="bottom" />
    </Layout>
  );
};

export default MapPage;
