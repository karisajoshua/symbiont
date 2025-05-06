
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import StatusBar from './StatusBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <StatusBar />
      <Header />
      <main className="flex-grow grid-overlay bg-background text-foreground">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
