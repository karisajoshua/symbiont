
import React from 'react';
import { Shield, Zap, Database } from 'lucide-react';

const AboutTechSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ethical AI, Built for Public Insight</h2>
          <p className="text-gray-600">
            We use only publicly available data and apply advanced natural language processing to surface insights 
            that help leaders engage more meaningfully—with full respect for citizen privacy and speech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <Shield size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600">
              Only processes publicly available data with strict anonymization protocols to protect user privacy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Zap size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-gray-600">
              Advanced NLP models process social media feeds in real-time to extract valuable sentiment insights.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                <Database size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Data</h3>
            <p className="text-gray-600">
              Monitors multiple platforms and languages to provide a complete picture of public sentiment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTechSection;
