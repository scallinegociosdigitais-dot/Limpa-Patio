import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroVideo } from './components/HeroVideo';
import { PartnerGrid } from './components/PartnerGrid';
import { BenefitsSection } from './components/BenefitsSection';
import { AboutEventSection } from './components/AboutEventSection';
import { Footer } from './components/Footer';
import { ContentProvider } from './context/ContentContext';
import { AdminPanel } from './components/AdminPanel';
import { DashboardPanel } from './components/DashboardPanel';
import { TickerBanner } from './components/TickerBanner';
import { ScriptManager } from './components/ScriptManager';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Handle URL routing for standalone Dashboard
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/dashboard') {
        setIsDashboardOpen(true);
      } else {
        setIsDashboardOpen(false);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // If Dashboard is open via Route, we show ONLY the dashboard (Mobile App feel)
  if (isDashboardOpen) {
    return (
       <ContentProvider>
          <DashboardPanel 
            isOpen={true} 
            onClose={() => {
              window.location.hash = '';
              setIsDashboardOpen(false);
            }} 
          />
       </ContentProvider>
    );
  }

  return (
    <ContentProvider>
      <ScriptManager />
      <div className="min-h-screen flex flex-col font-sans relative">
        <Header />
        <main className="flex-grow">
          <HeroVideo />
          <TickerBanner />
          <PartnerGrid />
          <AboutEventSection />
          <BenefitsSection />
        </main>
        <Footer 
          onOpenAdmin={() => setIsAdminOpen(true)} 
          onOpenDashboard={() => {
             window.location.hash = '#/dashboard';
             setIsDashboardOpen(true);
          }}
        />
        
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </ContentProvider>
  );
};

export default App;