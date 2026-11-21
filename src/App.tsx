import { useEffect, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { CoverageSection } from './components/CoverageSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LicenseDirectorySection } from './components/LicenseDirectorySection';
import { RecruitmentSection } from './components/RecruitmentSection';
import { TRANSLATIONS } from './data/translations';
import { CoverageKey, Language } from './types';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCoverage, setSelectedCoverage] = useState<CoverageKey>('mortgage_protection');
  const [estimatorNote, setEstimatorNote] = useState<string>('');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCoverage = (coverageKey: CoverageKey, note?: string) => {
    setSelectedCoverage(coverageKey);
    if (note) {
      setEstimatorNote(note);
    }
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071426] text-white">
      <Header t={t.nav} onNavigate={scrollToSection} />

      <main className="flex-1">
        <HeroSection
          t={t.hero}
          language={language}
          onLanguageChange={setLanguage}
          onPrimaryCta={() => scrollToSection('contact')}
          onSecondaryCta={() => scrollToSection('licenses')}
        />

        <CoverageSection
          t={t.coverage}
          language={language}
          onSelectCoverage={handleSelectCoverage}
        />

        <LicenseDirectorySection t={t.licenses} />

        <RecruitmentSection t={t.careers} validationT={t.contact.validation} />

        <ContactSection
          t={t.contact}
          plansT={t.coverage.plans}
          language={language}
          selectedCoverage={selectedCoverage}
          estimatorNote={estimatorNote}
        />
      </main>

      <Footer
        t={t.footer}
        navT={t.nav}
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={scrollToSection}
      />
    </div>
  );
}

export default App;
