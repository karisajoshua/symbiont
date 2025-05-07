
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Shield, Database, AlertTriangle, Search, Map, BarChart, FileText } from 'lucide-react';
import DataRibbon from '@/components/common/DataRibbon';
import AgentAuthDialog from '@/components/home/AgentAuthDialog';
import { useAuth } from '@/contexts/AuthContext';

// Simulated sentiment metrics for home page
const initialMetrics = {
  positive: 62,
  neutral: 28,
  negative: 10,
  alerts: 3,
  regions: 7,
  sources: 5
};

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(initialMetrics);
  const [accessCode, setAccessCode] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Generate random access code
  useEffect(() => {
    setAccessCode(`SC-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  // Simulate metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        positive: Math.max(50, Math.min(70, prev.positive + Math.floor(Math.random() * 5) - 2)),
        neutral: Math.max(20, Math.min(35, prev.neutral + Math.floor(Math.random() * 3) - 1)),
        negative: Math.max(5, Math.min(20, prev.negative + Math.floor(Math.random() * 3) - 1)),
        alerts: Math.max(1, Math.min(7, prev.alerts + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0))),
        regions: prev.regions,
        sources: prev.sources
      }));
      setLastUpdated(new Date());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAccessRequest = () => {
    setAuthDialogOpen(true);
  };
  
  return (
    <Layout>
      <DataRibbon position="top" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-block mb-4 px-4 py-1 border border-gray-700 bg-secondary rounded">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-gray-400">
                SYMBIONT INTELLIGENCE SYSTEM // RESTRICTED ACCESS
              </span>
              <Shield size={14} className="text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-mono mb-4 text-primary">
            INTELLIGENCE MONITORING SYSTEM
            <span className="blink ml-1">_</span>
          </h1>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            Real-time sentiment analysis protocol active. Current monitoring status: OPERATIONAL. 
            Last data refresh: {lastUpdated.toLocaleTimeString()}
          </p>
          
          <div className="mt-6">
            {isAuthorizing ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400">VERIFYING CREDENTIALS...</p>
              </div>
            ) : (
              <Button 
                onClick={handleAccessRequest}
                className="bg-secondary border border-primary text-primary hover:bg-primary hover:text-black transition-colors"
              >
                <Shield size={16} className="mr-2" />
                REQUEST SYSTEM ACCESS
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <DataRibbon position="bottom" />
      
      {/* Add the AgentAuthDialog component */}
      <AgentAuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        onSuccess={() => {
          // Navigation is now handled by the effect watching isAuthenticated
        }}
      />
    </Layout>
  );
};

export default HomePage;
