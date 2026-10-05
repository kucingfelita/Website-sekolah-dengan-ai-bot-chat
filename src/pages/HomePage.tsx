import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { UserIntentTabs } from '../components/home/UserIntentTabs';
import { AnnouncementBanner } from '../components/home/AnnouncementBanner';
import { NewsEditorialSection } from '../components/home/NewsEditorialSection';
import { AchievementsSection } from '../components/home/AchievementsSection';
import { StudentProjectsSection } from '../components/home/StudentProjectsSection';
import { DigitalServicesGrid } from '../components/home/DigitalServicesGrid';
import { SPMBBanner } from '../components/home/SPMBBanner';
import { ContactMapSection } from '../components/home/ContactMapSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenAI: () => void;
  onOpenSearch: () => void;
  onOpenMatcher?: () => void;
  onOpenCalculator?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenAI, 
  onOpenSearch,
  onOpenMatcher,
  onOpenCalculator
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section introducing SMKN 1 Bawang */}
      <HeroSection onNavigate={onNavigate} onOpenAI={onOpenAI} />

      {/* 2. User Intent Tabs (Calon Siswa, Siswa, Ortu, Industri) */}
      <UserIntentTabs onNavigate={onNavigate} onOpenAI={onOpenAI} />

      {/* 3. Official Administrative Circulars / Urgent Announcement Banner */}
      <AnnouncementBanner onNavigate={onNavigate} />

      {/* 4. Editorial News & Press Releases */}
      <NewsEditorialSection onNavigate={onNavigate} />

      {/* 5. Student Hall of Fame & Verified Achievements (LKS Jawa Tengah & Nasional) */}
      <AchievementsSection onNavigate={onNavigate} />

      {/* 6. Student Works & Innovation Showcase (Karya Siswa) */}
      <StudentProjectsSection onNavigate={onNavigate} />

      {/* 7. Unified Digital School Services Grid */}
      <DigitalServicesGrid onNavigate={onNavigate} />

      {/* 8. SPMB 2026/2027 Admission Banner (Bebas SPP) */}
      <SPMBBanner onNavigate={onNavigate} onOpenCalculator={onOpenCalculator} />

      {/* 9. Campus Location & Transportation Access */}
      <ContactMapSection />
    </div>
  );
};

export default HomePage;
