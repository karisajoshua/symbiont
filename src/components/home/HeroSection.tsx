
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AgentAuthDialog from './AgentAuthDialog';

const HeroSection = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 clip-path-slant text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Understand the Voice of the People — in Real Time.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              AI-powered sentiment tracking across platforms to guide smarter leadership decisions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <Link to="/dashboard">
                  <span>🔍 Launch Sentiment Dashboard</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => setAuthDialogOpen(true)}
              >
                Request Access
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative h-96">
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-black/20 backdrop-blur shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
              <img
                src="https://images.unsplash.com/photo-1536412597336-ade7b523ecfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="UAE Cityscape"
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 bg-black/70 rounded-lg text-center max-w-xs">
                  <div className="mb-2 text-secondary font-bold">LIVE SENTIMENT</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Positive:</span>
                    <span className="text-positive font-semibold">62%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-positive h-2.5 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AgentAuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </section>
  );
};

export default HeroSection;
