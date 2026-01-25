import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface CountyData {
  name: string;
  sentiment: number;
  posts: number;
}

interface KenyaMapProps {
  selectedCounty: string | null;
  onCountySelect: (county: string | null) => void;
  countyData: Record<string, number>;
  isConnected: boolean;
  onTriggerAgent: () => void;
  isTriggering?: boolean;
}

// Kenya county approximate positions for the map (simplified SVG representation)
const COUNTY_PATHS: Record<string, { path: string; center: { x: number; y: number } }> = {
  'Nairobi': { path: 'M380,340 L400,330 L420,340 L410,360 L390,360 Z', center: { x: 400, y: 345 } },
  'Mombasa': { path: 'M480,480 L500,470 L520,480 L510,500 L490,500 Z', center: { x: 500, y: 485 } },
  'Kisumu': { path: 'M200,280 L230,270 L250,285 L240,310 L210,310 Z', center: { x: 225, y: 290 } },
  'Nakuru': { path: 'M300,280 L340,270 L360,290 L350,320 L310,320 Z', center: { x: 330, y: 295 } },
  'Uasin Gishu': { path: 'M240,220 L280,210 L300,230 L290,260 L250,260 Z', center: { x: 270, y: 235 } },
  'Kiambu': { path: 'M360,300 L390,290 L410,305 L400,330 L370,330 Z', center: { x: 385, y: 310 } },
  'Machakos': { path: 'M420,360 L460,350 L480,375 L470,410 L430,410 Z', center: { x: 450, y: 380 } },
  'Kajiado': { path: 'M340,380 L390,370 L420,400 L400,450 L350,440 Z', center: { x: 375, y: 410 } },
  'Narok': { path: 'M260,360 L310,350 L340,380 L320,420 L270,410 Z', center: { x: 300, y: 385 } },
  'Kwale': { path: 'M450,480 L480,470 L500,500 L480,530 L455,520 Z', center: { x: 475, y: 500 } },
  'Kilifi': { path: 'M500,420 L530,410 L550,440 L540,480 L510,480 Z', center: { x: 525, y: 445 } },
  'Garissa': { path: 'M520,280 L580,260 L620,300 L600,360 L540,350 Z', center: { x: 565, y: 310 } },
  'Kakamega': { path: 'M200,230 L240,220 L255,245 L245,275 L205,270 Z', center: { x: 225, y: 250 } },
  'Kisii': { path: 'M220,320 L250,310 L270,330 L260,360 L230,355 Z', center: { x: 245, y: 335 } },
  'Turkana': { path: 'M280,80 L360,60 L400,120 L380,200 L300,180 Z', center: { x: 340, y: 130 } },
  'Marsabit': { path: 'M420,100 L500,80 L540,150 L510,220 L440,200 Z', center: { x: 475, y: 150 } },
};

const KenyaMap: React.FC<KenyaMapProps> = ({
  selectedCounty,
  onCountySelect,
  countyData,
  isConnected,
  onTriggerAgent,
  isTriggering = false,
}) => {
  // Get sentiment color based on report count (more reports = more activity)
  const getActivityColor = (county: string) => {
    const count = countyData[county] || 0;
    if (count === 0) return '#374151'; // Gray for no activity
    if (count >= 10) return '#EF4444'; // Red for high activity
    if (count >= 5) return '#F59E0B'; // Orange for medium
    if (count >= 2) return '#10B981'; // Green for some activity
    return '#3B82F6'; // Blue for low activity
  };

  return (
    <Card className="bg-secondary border border-gray-700 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-gray-200">Kenya Sentiment Map</CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            Real-time agent reports by county
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onTriggerAgent}
            disabled={isTriggering}
            className="bg-gray-800 text-primary border-gray-700 hover:bg-gray-700"
          >
            {isTriggering ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Play size={16} className="mr-2" />
            )}
            {isTriggering ? 'Processing...' : 'Trigger Agent'}
          </Button>
          <Badge
            variant="outline"
            className={`${
              isConnected
                ? 'bg-green-900/50 text-green-400 border-green-700'
                : 'bg-red-900/50 text-red-400 border-red-700'
            }`}
          >
            {isConnected ? (
              <>
                <Wifi size={12} className="mr-1" /> LIVE
              </>
            ) : (
              <>
                <WifiOff size={12} className="mr-1" /> OFFLINE
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Tooltip for selected county */}
          {selectedCounty && (
            <div className="absolute top-4 right-4 bg-gray-800/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-600 z-10 animate-fade-in">
              <h3 className="font-bold text-lg text-primary">{selectedCounty}</h3>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div>
                  <span className="text-xs text-gray-400">Reports: </span>
                  <span className="font-bold text-gray-200">
                    {countyData[selectedCounty] || 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          <svg viewBox="0 0 650 600" className="mx-auto w-full max-w-2xl h-auto">
            {/* Kenya outline (simplified) */}
            <path
              d="M180,60 L400,40 L580,80 L620,180 L640,350 L580,500 L480,560 L400,540 L300,500 L200,420 L160,300 L140,180 Z"
              fill="none"
              stroke="#4B5563"
              strokeWidth="2"
            />

            {/* County regions */}
            {Object.entries(COUNTY_PATHS).map(([county, { path, center }]) => (
              <g key={county}>
                <path
                  d={path}
                  fill={getActivityColor(county)}
                  stroke={selectedCounty === county ? '#F59E0B' : '#6B7280'}
                  strokeWidth={selectedCounty === county ? 3 : 1}
                  opacity={selectedCounty === county || !selectedCounty ? 0.8 : 0.4}
                  className="cursor-pointer transition-all duration-300 hover:opacity-100"
                  onMouseEnter={() => onCountySelect(county)}
                  onMouseLeave={() => onCountySelect(null)}
                  onClick={() => onCountySelect(county)}
                />
                <text
                  x={center.x}
                  y={center.y}
                  textAnchor="middle"
                  className="text-[8px] fill-gray-300 pointer-events-none font-medium"
                >
                  {county}
                </text>
                {countyData[county] > 0 && (
                  <circle
                    cx={center.x + 15}
                    cy={center.y - 10}
                    r={8}
                    fill="#EF4444"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="flex justify-center mt-4 gap-4 flex-wrap">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-600 mr-2" />
              <span className="text-sm text-gray-400">No Data</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
              <span className="text-sm text-gray-400">1 Report</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
              <span className="text-sm text-gray-400">2-4 Reports</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
              <span className="text-sm text-gray-400">5-9 Reports</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2" />
              <span className="text-sm text-gray-400">10+ Reports</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KenyaMap;
