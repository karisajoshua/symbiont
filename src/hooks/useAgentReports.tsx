import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AgentReport {
  id: string;
  platform: string;
  content: string;
  sentiment: string | null;
  county: string | null;
  risk_level: string | null;
  created_at: string;
}

export interface AgentStats {
  totalReports: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  highRiskCount: number;
  platformBreakdown: Record<string, number>;
  countyBreakdown: Record<string, number>;
}

export const useAgentReports = () => {
  const [reports, setReports] = useState<AgentReport[]>([]);
  const [stats, setStats] = useState<AgentStats>({
    totalReports: 0,
    positiveCount: 0,
    negativeCount: 0,
    neutralCount: 0,
    highRiskCount: 0,
    platformBreakdown: {},
    countyBreakdown: {},
  });
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate stats from reports
  const calculateStats = useCallback((reportsList: AgentReport[]): AgentStats => {
    const platformBreakdown: Record<string, number> = {};
    const countyBreakdown: Record<string, number> = {};
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    let highRiskCount = 0;

    reportsList.forEach((report) => {
      // Platform breakdown
      if (report.platform) {
        platformBreakdown[report.platform] = (platformBreakdown[report.platform] || 0) + 1;
      }

      // County breakdown
      if (report.county) {
        countyBreakdown[report.county] = (countyBreakdown[report.county] || 0) + 1;
      }

      // Sentiment counts
      switch (report.sentiment) {
        case 'Positive':
          positiveCount++;
          break;
        case 'Negative':
          negativeCount++;
          break;
        default:
          neutralCount++;
      }

      // Risk count
      if (report.risk_level === 'High') {
        highRiskCount++;
      }
    });

    return {
      totalReports: reportsList.length,
      positiveCount,
      negativeCount,
      neutralCount,
      highRiskCount,
      platformBreakdown,
      countyBreakdown,
    };
  }, []);

  // Fetch initial reports
  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('agent_reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching reports:', error);
        toast.error('Failed to fetch reports');
        return;
      }

      const typedData = data as AgentReport[];
      setReports(typedData);
      setStats(calculateStats(typedData));
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateStats]);

  // Trigger the symbiont brain to process a new post
  const triggerAgent = useCallback(async () => {
    try {
      console.log('🚀 Triggering Symbiont Brain...');
      const response = await supabase.functions.invoke('symbiont-brain');
      
      if (response.error) {
        console.error('Agent trigger error:', response.error);
        toast.error('Failed to trigger agent');
        return null;
      }

      console.log('✅ Agent response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error triggering agent:', error);
      toast.error('Failed to trigger agent');
      return null;
    }
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    console.log('📡 Connecting to Symbiont Neural Net...');
    
    fetchReports();

    const channel = supabase
      .channel('public:agent_reports')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'agent_reports' },
        (payload) => {
          console.log('📥 New agent report received:', payload);
          const newReport = payload.new as AgentReport;

          // Show toast notification
          toast(`🎯 New Report from ${newReport.county}`, {
            description: `${newReport.platform}: ${newReport.content?.slice(0, 100)}...`,
            duration: 5000,
          });

          // Auto-select the county on the map
          setSelectedCounty(newReport.county);

          // Update reports list
          setReports((prev) => {
            const updated = [newReport, ...prev].slice(0, 100);
            setStats(calculateStats(updated));
            return updated;
          });
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      console.log('🔌 Disconnecting from Symbiont Neural Net...');
      supabase.removeChannel(channel);
    };
  }, [fetchReports, calculateStats]);

  return {
    reports,
    stats,
    selectedCounty,
    setSelectedCounty,
    isConnected,
    isLoading,
    triggerAgent,
    refreshReports: fetchReports,
  };
};
