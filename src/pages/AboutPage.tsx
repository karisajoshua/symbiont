
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Database, Lock, BarChart4, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Ethical AI, Built for Public Insight
            </h1>
            <p className="text-xl text-gray-600 text-center">
              Advanced technology designed with privacy, transparency, and responsible governance in mind.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mb-12 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
            <p className="mb-4 text-gray-700">
              Symbiont uses only publicly available data and applies advanced natural language processing 
              to surface insights that help leaders engage more meaningfully—with full respect for citizen privacy and speech.
            </p>
            <p className="mb-8 text-gray-700">
              Our AI models are trained to identify sentiment, emerging trends, and public concerns without any 
              personal data collection or invasive monitoring. We believe technology should enhance governance 
              while respecting fundamental rights and freedoms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600 mb-4">
                      <Lock size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Only processes publicly accessible data</li>
                    <li>No personal data collection or storage</li>
                    <li>Anonymous aggregation of sentiment data</li>
                    <li>Strong data protection and security protocols</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                      <BarChart4 size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Insightful Analytics</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Advanced sentiment analysis across text, images, and video</li>
                    <li>Multi-language support for Arabic and English</li>
                    <li>Topic clustering and trend identification</li>
                    <li>Geospatial sentiment mapping across regions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Key Technology Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Zap size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
                <p className="text-gray-600">
                  Advanced NLP models process social media feeds in real-time to extract valuable sentiment insights with minimal latency.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                    <Database size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Data</h3>
                <p className="text-gray-600">
                  Monitors multiple platforms and languages to provide a complete picture of public sentiment across different channels.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-green-50 text-positive">
                    <Lightbulb size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Driven Insights</h3>
                <p className="text-gray-600">
                  Transforms raw sentiment data into actionable recommendations to help leaders make better-informed decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Ethical Commitments</h2>
            <p className="mb-6 text-gray-700">
              Our platform is built with strong ethical guidelines that ensure responsible use:
            </p>

            <div className="space-y-5">
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Data Integrity & Transparency</h4>
                  <p className="text-gray-600">
                    We maintain clear documentation on our data sources, AI methodologies, and present findings with appropriate context and confidence levels.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Bias Mitigation</h4>
                  <p className="text-gray-600">
                    Our systems undergo regular auditing to identify and address potential algorithmic biases in sentiment analysis across different demographics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Public Benefit Focus</h4>
                  <p className="text-gray-600">
                    The platform is designed to help leadership better understand and respond to public needs, not to manipulate or control public discourse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
