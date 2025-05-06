
import React from 'react';
import { MessageSquare, MapPin, Lightbulb, ChartBar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "Live Social Pulse",
    description: "Track the latest posts from public platforms, categorized by sentiment. Filter by region, platform, or keyword to see what people are saying—right now.",
    icon: MessageSquare,
    link: "/dashboard",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "National Sentiment Map",
    description: "Visualize support levels by region. Heatmaps dynamically update based on sentiment trends—green for strong support, red for critical zones.",
    icon: MapPin,
    link: "/map",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "AI-Powered Recommendations",
    description: "Let AI turn social signals into actionable insights. Our system identifies themes, flags emerging issues, and recommends strategic responses.",
    icon: Lightbulb,
    link: "/insights",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    title: "Understand the Trendlines",
    description: "Track shifts by week, campaign, or topic—across all platforms and regions with detailed visual analytics and exportable reports.",
    icon: ChartBar,
    link: "/reports",
    color: "bg-green-50",
    iconColor: "text-positive",
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Feature Highlights</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Comprehensive tools for monitoring and understanding public sentiment across social platforms in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className={`${feature.color} rounded-t-lg`}>
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full bg-white/80 ${feature.iconColor}`}>
                    <feature.icon size={24} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="text-xl font-bold mb-2 text-center">{feature.title}</CardTitle>
                <CardDescription className="text-center">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button asChild variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 font-medium">
                  <Link to={feature.link}>
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
