import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import KenyaMap from '@/components/map/KenyaMap';
import AgentReportsFeed from '@/components/map/AgentReportsFeed';
import DataRibbon from '@/components/common/DataRibbon';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAgentReports } from '@/hooks/useAgentReports';

const AgentMapPage = () => {
  const {
    reports,
    stats,
    selectedCounty,
    setSelectedCounty,
    isConnected,
    isLoading,
    triggerAgent,
  } = useAgentReports();

  const [isTriggering, setIsTriggering] = useState(false);

  const handleTriggerAgent = async () => {
    setIsTriggering(true);
    await triggerAgent();
    setIsTriggering(false);
  };

  return (
    <Layout>
      <DataRibbon position="top" />
      <div className="container mx-auto px-4 py-8" style={{ minHeight: '80vh' }}>
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
              SYMBIONT AGENT NETWORK
            </h1>
            <p className="text-gray-400">
              Real-time AI-powered social media sentiment analysis for Kenya.
              Classification level: RESTRICTED.
            </p>
          </div>
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 text-primary border-gray-700 hover:bg-gray-700"
            >
              <ArrowLeft size={16} className="mr-2" /> RETURN TO HOME
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <KenyaMap
              selectedCounty={selectedCounty}
              onCountySelect={setSelectedCounty}
              countyData={stats.countyBreakdown}
              isConnected={isConnected}
              onTriggerAgent={handleTriggerAgent}
              isTriggering={isTriggering}
            />
          </div>

          {/* Reports Feed */}
          <div>
            <AgentReportsFeed
              reports={reports}
              stats={stats}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <DataRibbon position="bottom" />
    </Layout>
  );
};

export default AgentMapPage;
