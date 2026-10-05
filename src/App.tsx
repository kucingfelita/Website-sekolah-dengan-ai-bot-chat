import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';
import { FloatingActions } from './components/common/FloatingActions';

// Pages
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { SPMBPage } from './pages/SPMBPage';
import { DigitalServicesPage } from './pages/DigitalServicesPage';
import { NewsPage } from './pages/NewsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { StudentWorkPage } from './pages/StudentWorkPage';
import { IndustryPartnersPage } from './pages/IndustryPartnersPage';
import { ComplaintServicePage } from './pages/ComplaintServicePage';
import { DownloadsAndAgendaPage } from './pages/DownloadsAndAgendaPage';

// Admin & SEO
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUser } from './types/adminTypes';
import { updatePageSEO } from './utils/seo';

// Smart Features
import { SmartMajorMatcherModal } from './components/smart/SmartMajorMatcherModal';
import { SmartSPMBCalculatorModal } from './components/smart/SmartSPMBCalculatorModal';
import { 
  initSmoothScroll, 
  destroySmoothScroll, 
  scrollToTop, 
  lockScroll, 
  unlockScroll 
} from './utils/smoothScroll';
import { PreloadProvider } from './context/PreloadContext';

const getInitialRoute = (): string => {
  if (typeof window === 'undefined') return '#/';
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/mods' || path === '/admin' || path === '/kelola') {
    return '#/mods';
  }
  return window.location.hash || '#/';
};

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');

  // Smart Features state
  const [isMatcherOpen, setIsMatcherOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  const handleAskAI = (question: string) => {
    setAiPrompt(question);
    setIsAIOpen(true);
  };

  // Admin session state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('skansa_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    localStorage.setItem('skansa_admin_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('skansa_admin_session');
    navigate('#/');
  };

  const isAdminRoute = currentRoute.startsWith('#/admin') || 
    currentRoute.startsWith('#/mods') || 
    currentRoute.startsWith('#/kelola');

  // Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  // Lock background smooth scroll whenever an interactive modal is open
  useEffect(() => {
    const hasOpenModal = isSearchOpen || isAIOpen || isMatcherOpen || isCalculatorOpen;
    if (hasOpenModal) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isSearchOpen, isAIOpen, isMatcherOpen, isCalculatorOpen]);

  // Dynamic SEO title, description & robots
  useEffect(() => {
    updatePageSEO(currentRoute);
  }, [currentRoute]);

  // Listen to hash and popstate changes for robust client-side routing
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      if (path === '/mods' || path === '/admin' || path === '/kelola') {
        setCurrentRoute('#/mods');
        return;
      }
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);
      scrollToTop();
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      try {
        window.history.pushState(null, '', '/' + path);
      } catch {
        // Fallback if browser pushState fails
      }
    }
    if (window.location.hash === path) {
      scrollToTop();
    } else {
      window.location.hash = path;
    }
    setCurrentRoute(path);
  };

  // Route Dispatcher
  const renderCurrentPage = () => {
    const route = currentRoute;

    // Secret Admin Routes (#/admin, #/mods, #/kelola)
    if (isAdminRoute) {
      if (adminUser) {
        return (
          <AdminDashboardPage 
            user={adminUser} 
            onLogout={handleLogout} 
            onNavigatePublic={navigate} 
          />
        );
      }
      return (
        <AdminLoginPage 
          onLoginSuccess={handleLoginSuccess} 
          onNavigateBack={() => navigate('#/')} 
        />
      );
    }

    if (route === '#/' || route === '') {
      return (
        <HomePage 
          onNavigate={navigate} 
          onOpenAI={() => setIsAIOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMatcher={() => setIsMatcherOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />
      );
    }

    if (route.startsWith('#/profil')) {
      return <ProfilePage onNavigate={navigate} />;
    }

    if (route.startsWith('#/mitra-industri')) {
      return <IndustryPartnersPage onNavigate={navigate} />;
    }

    if (route === '#/program-keahlian') {
      return <ProgramsPage onNavigate={navigate} />;
    }

    if (route.startsWith('#/program-keahlian/')) {
      const slug = route.replace('#/program-keahlian/', '');
      return <ProgramDetailPage slug={slug} onNavigate={navigate} onAskAI={handleAskAI} />;
    }

    if (route === '#/spmb') {
      return (
        <SPMBPage 
          onNavigate={navigate} 
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onAskAI={handleAskAI}
        />
      );
    }

    if (route === '#/layanan' || route === '#/layanan-digital') {
      return <DigitalServicesPage onNavigate={navigate} />;
    }

    if (route === '#/informasi') {
      return <NewsPage onNavigate={navigate} />;
    }

    if (route === '#/prestasi') {
      return <AchievementsPage onNavigate={navigate} />;
    }

    if (route === '#/karya-siswa') {
      return <StudentWorkPage onNavigate={navigate} />;
    }

    if (route === '#/pengaduan' || route === '#/layanan-pengaduan') {
      return <ComplaintServicePage onNavigate={navigate} />;
    }

    if (route === '#/unduhan' || route === '#/agenda') {
      return <DownloadsAndAgendaPage onNavigate={navigate} />;
    }

    // Default fallback to HomePage
    return (
      <HomePage 
        onNavigate={navigate} 
        onOpenAI={() => setIsAIOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMatcher={() => setIsMatcherOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />
    );
  };

  // If in secret admin panel, render isolated administrative interface with institutional daylight theme
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-institution-100 selection:text-institution-950">
        {renderCurrentPage()}
      </div>
    );
  }

  return (
    <PreloadProvider>
      <div className="min-h-screen flex flex-col bg-institution-25 text-slate-900 selection:bg-institution-100 selection:text-institution-950 font-sans">
        
      {/* Institutional Header & Navigation */}
      <Header
        currentPath={currentRoute}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />

      {/* AI School Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => {
          setIsAIOpen(false);
          setAiPrompt('');
        }}
        onNavigate={navigate}
        initialPrompt={aiPrompt}
      />

      {/* Smart Vocational Matcher Modal */}
      <SmartMajorMatcherModal
        isOpen={isMatcherOpen}
        onClose={() => setIsMatcherOpen(false)}
        onSelectMajor={(slug) => {
          setIsMatcherOpen(false);
          navigate(`#/program-keahlian/${slug}`);
        }}
        onAskAI={handleAskAI}
      />

      {/* Smart SPMB Chance Calculator Modal */}
      <SmartSPMBCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onNavigate={navigate}
        onAskAI={handleAskAI}
      />

      {/* Floating Bottom-Right Controls: AI Trigger & Back To Top */}
      <FloatingActions onOpenAI={() => setIsAIOpen(true)} />

      {/* Institutional Footer */}
      <Footer onNavigate={navigate} />

      </div>
    </PreloadProvider>
  );
}

export default App;
