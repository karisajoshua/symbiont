
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// SVG map of UAE
const UAEMap = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  
  // Define regions with sentiment data
  const regions = [
    { id: 'abu-dhabi', name: 'Abu Dhabi', sentiment: 0.85, posts: 1245 },
    { id: 'dubai', name: 'Dubai', sentiment: 0.72, posts: 1850 },
    { id: 'sharjah', name: 'Sharjah', sentiment: 0.65, posts: 950 },
    { id: 'ajman', name: 'Ajman', sentiment: 0.43, posts: 520 },
    { id: 'umm-al-quwain', name: 'Umm Al Quwain', sentiment: 0.58, posts: 320 },
    { id: 'ras-al-khaimah', name: 'Ras Al Khaimah', sentiment: 0.79, posts: 480 },
    { id: 'fujairah', name: 'Fujairah', sentiment: 0.62, posts: 390 },
  ];
  
  // Helper function to determine fill color based on sentiment
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.7) return '#2ECC71'; // Green for positive
    if (sentiment >= 0.5) return '#F1C40F'; // Yellow for neutral-positive
    if (sentiment >= 0.3) return '#E67E22'; // Orange for neutral-negative
    return '#C0392B'; // Red for negative
  };

  return (
    <div className="relative">
      <div className="text-center mb-4">
        {activeRegion && (
          <div className="animate-fade-in absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200">
            {regions.find(region => region.id === activeRegion) && (
              <>
                <h3 className="font-bold text-lg">{regions.find(region => region.id === activeRegion)?.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <div className="text-xs text-gray-500">Sentiment</div>
                    <div className="font-bold">
                      {(regions.find(region => region.id === activeRegion)?.sentiment || 0) * 100}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Posts</div>
                    <div className="font-bold">{regions.find(region => region.id === activeRegion)?.posts}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        <svg 
          viewBox="0 0 800 600" 
          className="mx-auto w-full max-w-3xl h-auto"
        >
          {/* Simplified UAE map - paths for each emirate */}
          {/* Abu Dhabi */}
          <path 
            id="abu-dhabi" 
            d="M100,400 L250,450 L300,300 L400,250 L500,300 L550,400 L450,500 L300,550 L100,500 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'abu-dhabi')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'abu-dhabi' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('abu-dhabi')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          
          {/* Dubai */}
          <path 
            id="dubai" 
            d="M500,300 L550,250 L600,270 L580,350 L550,400 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'dubai')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'dubai' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('dubai')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          
          {/* Sharjah */}
          <path 
            id="sharjah" 
            d="M550,250 L600,220 L650,240 L630,280 L600,270 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'sharjah')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'sharjah' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('sharjah')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          
          {/* Ajman */}
          <path 
            id="ajman" 
            d="M600,220 L620,200 L640,210 L650,240 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'ajman')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'ajman' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('ajman')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          
          {/* Umm Al Quwain */}
          <path 
            id="umm-al-quwain" 
            d="M620,200 L650,180 L670,190 L640,210 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'umm-al-quwain')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'umm-al-quwain' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('umm-al-quwain')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          
          {/* Ras Al Khaimah */}
          <path 
            id="ras-al-khaimah" 
            d="M650,180 L700,150 L730,170 L700,200 L670,190 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'ras-al-khaimah')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'ras-al-khaimah' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('ras-al-khaimah')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          
          {/* Fujairah */}
          <path 
            id="fujairah" 
            d="M700,200 L730,170 L750,200 L730,230 L700,220 Z" 
            fill={getSentimentColor(regions.find(r => r.id === 'fujairah')?.sentiment || 0)}
            stroke="#fff" 
            strokeWidth="2"
            opacity={activeRegion === 'fujairah' || !activeRegion ? 1 : 0.5}
            onMouseEnter={() => setActiveRegion('fujairah')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
        </svg>
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#C0392B] mr-2"></div>
            <span className="text-sm">Critical</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#E67E22] mr-2"></div>
            <span className="text-sm">Concern</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#F1C40F] mr-2"></div>
            <span className="text-sm">Neutral</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#2ECC71] mr-2"></div>
            <span className="text-sm">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SentimentMap = () => {
  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">National Sentiment Map</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Sentiment distribution across UAE regions</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 animate-pulse-slow">
          Live Data
        </Badge>
      </CardHeader>
      <CardContent>
        <UAEMap />
      </CardContent>
    </Card>
  );
};

export default SentimentMap;
