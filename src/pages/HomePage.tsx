
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AboutTechSection from '@/components/home/AboutTechSection';
import ContactSection from '@/components/home/ContactSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <AboutTechSection />
      <ContactSection />
    </Layout>
  );
};

export default HomePage;
