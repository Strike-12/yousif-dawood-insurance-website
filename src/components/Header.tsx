import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TranslationBundle } from '../data/translations';

interface HeaderProps {
  t: TranslationBundle['nav'];
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ t, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071426]/95 backdrop-blur-sm border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded"
        >
          Yousif Dawood
        </a>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200">
          <a
            href="#coverage"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('coverage');
            }}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            {t.coverage}
          </a>
          <a
            href="#licenses"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('licenses');
            }}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            {t.licenses}
          </a>
          <a
            href="#careers"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('careers');
            }}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            {t.careers}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            {t.contact}
          </a>
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            {t.cta}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/25 text-white hover:bg-[#0F2342] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/15 bg-[#0A192F] px-4 py-4 space-y-2">
          <a
            href="#coverage"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('coverage');
            }}
            className="block px-3 py-2.5 text-sm font-medium text-white hover:bg-[#132B4F] rounded-lg"
          >
            {t.coverage}
          </a>
          <a
            href="#licenses"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('licenses');
            }}
            className="block px-3 py-2.5 text-sm font-medium text-white hover:bg-[#132B4F] rounded-lg"
          >
            {t.licenses}
          </a>
          <a
            href="#careers"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('careers');
            }}
            className="block px-3 py-2.5 text-sm font-medium text-white hover:bg-[#132B4F] rounded-lg"
          >
            {t.careers}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="block px-3 py-2.5 text-sm font-medium text-white hover:bg-[#132B4F] rounded-lg"
          >
            {t.contact}
          </a>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="w-full mt-2 px-4 py-3 text-sm font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {t.cta}
          </button>
        </div>
      )}
    </header>
  );
};
