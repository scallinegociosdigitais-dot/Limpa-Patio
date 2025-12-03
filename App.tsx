import React, { useState, useEffect, Suspense } from 'react';
import { Header } from './components/Header';
import { ContentProvider } from './context/ContentContext';
import { ScriptManager } from './components/ScriptManager';
import { FaviconManager } from './components/FaviconManager';
import { Loader2 } from 'lucide-react';

// Lazy load heavy components
const HeroVideo = React.lazy(() => import('./components/HeroVideo').then(module => ({ default: module.HeroVideo })));
const PartnerGrid = React.lazy(() => import('./components/PartnerGrid').then(module => ({ default: module.PartnerGrid })));
const BenefitsSection = React.lazy(() => import('./components/BenefitsSection').then(module => ({ default: module.BenefitsSection })));
const AboutEventSection = React.lazy(() => import('./components/AboutEventSection').then(module => ({ default: module.AboutEventSection })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));
const DashboardPanel = React.lazy(() => import('./components/DashboardPanel').then(module => ({ default: module.DashboardPanel })));
const TickerBanner = React.lazy(() => import('./components/TickerBanner').then(module => ({ default: module.TickerBanner })));
const TeaserCarousel = React.lazy(() => import('./components/TeaserCarousel').then(module => ({ default: module.TeaserCarousel })));

const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-12 h-12 text-[#E11D2B] animate-spin mb-4" />
      <p className="text-gray-500 text-sm font-medium animate-pulse">Carregando ofertas...</p>
  </div>
);

const AppContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
    
    // Cleanup navigation listener (back button fix)
    window.addEventListener('popstate', handleHashChange);

    // Simulate initial data fetch delay to show loading screen cleanly
    // In a real app, this would be tied to ContentContext isLoading, 
    // but since we wrap everything in Suspense, we handle it slightly differently here.
    const timer = setTimeout(() => setIsInitialLoad(false), 1000);

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('popstate', handleHashChange);
        clearTimeout(timer);
    }
  }, []);

  if (isInitialLoad) {
      return <LoadingScreen />;
  }

  // If Dashboard is open via Route, we show ONLY the dashboard (Mobile App feel)
  if (isDashboardOpen) {
    return (
       <Suspense fallback={<LoadingScreen />}>
          <DashboardPanel 
            isOpen={true} 
            onClose={() => {
              window.location.hash = '';
              setIsDashboardOpen(false);
            }} 
          />
       </Suspense>
    );
  }

  return (
      <div className="min-h-screen flex flex-col font-sans relative">
        <ScriptManager />
        <FaviconManager />
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-gray-300" /></div>}>
             <HeroVideo />
             <TickerBanner />
             <PartnerGrid />
             <TeaserCarousel />
             <AboutEventSection />
             <BenefitsSection />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20 bg-gray-100"></div>}>
            <Footer 
            onOpenAdmin={() => setIsAdminOpen(true)} 
            onOpenDashboard={() => {
                window.location.hash = '#/dashboard';
                setIsDashboardOpen(true);
            }}
            />
        </Suspense>
        
        <Suspense fallback={null}>
            <AdminPanel 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
            />
        </Suspense>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
       <AppContent />
    </ContentProvider>
  );
}

export default App;