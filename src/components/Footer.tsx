import React from 'react';
import { Language } from '../types';
import { TranslationBundle } from '../data/translations';

interface FooterProps {
  t: TranslationBundle['footer'];
  navT: TranslationBundle['nav'];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  navT,
  language,
  onLanguageChange,
  onNavigate,
}) => {
  return (
    <footer className="bg-[#050F1E] text-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <p className="text-sm font-semibold text-white">{t.tagline}</p>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-xs text-slate-200">
            <a
              href="#coverage"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('coverage');
              }}
              className="hover:text-white transition-colors"
            >
              {navT.coverage}
            </a>
            <a
              href="#licenses"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('licenses');
              }}
              className="hover:text-white transition-colors"
            >
              {navT.licenses}
            </a>
            <a
              href="#careers"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('careers');
              }}
              className="hover:text-white transition-colors"
            >
              {navT.careers}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="hover:text-white transition-colors"
            >
              {navT.contact}
            </a>
          </nav>

          <div className="inline-flex items-center gap-1 p-1 bg-[#0F2342] rounded-lg border border-white/20 self-start md:self-auto">
            {(['en', 'ar', 'es'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === lang
                    ? 'bg-white text-[#071426]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'ar' ? 'AR' : 'ES'}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
          <p>{t.compliance}</p>
          <p className="text-slate-300 whitespace-nowrap">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
