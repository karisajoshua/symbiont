import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { AgentReport, AgentStats } from '@/hooks/useAgentReports';

interface AgentReportsFeedProps {
  reports: AgentReport[];
  stats: AgentStats;
  isLoading: boolean;
}

const getSentimentIcon = (sentiment: string | null) => {
  switch (sentiment) {
    case 'Positive':
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    case 'Negative':
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    default:
      return <Minus className="w-4 h-4 text-gray-400" />;
  }
};

const getSentimentColor = (sentiment: string | null) => {
  switch (sentiment) {
    case 'Positive':
      return 'bg-green-900/50 text-green-400 border-green-700';
    case 'Negative':
      return 'bg-red-900/50 text-red-400 border-red-700';
    default:
      return 'bg-gray-800 text-gray-400 border-gray-600';
  }
};

const getRiskColor = (risk: string | null) => {
  switch (risk) {
    case 'High':
      return 'bg-red-900/50 text-red-400 border-red-700';
    case 'Medium':
      return 'bg-orange-900/50 text-orange-400 border-orange-700';
    default:
      return 'bg-blue-900/50 text-blue-400 border-blue-700';
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'X':
      return 'bg-gray-900 text-white border-gray-600';
    case 'TikTok':
      return 'bg-pink-900/50 text-pink-400 border-pink-700';
    case 'Instagram':
      return 'bg-purple-900/50 text-purple-400 border-purple-700';
    case 'Facebook':
      return 'bg-blue-900/50 text-blue-400 border-blue-700';
    default:
      return 'bg-gray-800 text-gray-400 border-gray-600';
  }
};

const AgentReportsFeed: React.FC<AgentReportsFeedProps> = ({
  reports,
  stats,
  isLoading,
}) => {
  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-secondary border-gray-700">
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-primary">{stats.totalReports}</div>
            <div className="text-xs text-gray-400">Total Reports</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary border-gray-700">
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-green-400">{stats.positiveCount}</div>
            <div className="text-xs text-gray-400">Positive</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary border-gray-700">
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-red-400">{stats.negativeCount}</div>
            <div className="text-xs text-gray-400">Negative</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary border-gray-700">
          <CardContent className="p-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div>
              <div className="text-2xl font-bold text-red-400">{stats.highRiskCount}</div>
              <div className="text-xs text-gray-400">High Risk</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Feed */}
      <Card className="bg-secondary border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-200">Agent Reports Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>No reports yet. Click "Trigger Agent" to start!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={getPlatformColor(report.platform)}>
                          {report.platform}
                        </Badge>
                        <Badge variant="outline" className={getSentimentColor(report.sentiment)}>
                          {getSentimentIcon(report.sentiment)}
                          <span className="ml-1">{report.sentiment || 'Unknown'}</span>
                        </Badge>
                        {report.risk_level === 'High' && (
                          <Badge variant="outline" className={getRiskColor(report.risk_level)}>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            High Risk
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(report.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{report.content}</p>
                    {report.county && (
                      <div className="text-xs text-gray-500">
                        📍 {report.county}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentReportsFeed;
