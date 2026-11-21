import React, { useState } from 'react';
import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TranslationBundle } from '../data/translations';
import heroOfficeImg from '../assets/images/hero_advisor_office_1795243193508.jpg';

interface HeroSectionProps {
  t: TranslationBundle['hero'];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  language,
  onLanguageChange,
  onPrimaryCta,
  onSecondaryCta,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="top" className="pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-white/15 bg-[#071426]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/15">
          <p className="text-xs sm:text-sm font-medium text-slate-200 tracking-wide">
            {t.affiliation}
          </p>

          <div
            role="group"
            aria-label={t.languageLabel}
            className="inline-flex items-center gap-1 p-1 bg-[#0F2342] rounded-lg border border-white/20"
          >
            <Globe className="w-3.5 h-3.5 text-slate-200 ms-2 me-1" aria-hidden="true" />
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => onLanguageChange(option.code)}
                aria-pressed={language === option.code}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === option.code
                    ? 'bg-white text-[#071426]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.12] max-w-2xl"
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                textWrap: 'balance',
              }}
            >
              {t.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl tracking-wide">
              {t.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onPrimaryCta}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{t.primaryCta}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onSecondaryCta}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F2342] border border-white/25 rounded-lg hover:bg-[#17345E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
                <span>{t.secondaryCta}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl overflow-hidden border border-white/25 bg-[#0F2342] min-h-[220px] lg:min-h-[300px] flex items-center justify-center">
              {!imgFailed ? (
                <img
                  src={heroOfficeImg}
                  alt="Yousif Dawood Insurance consultation office"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full lg:h-full object-cover"
                />
              ) : (
                <div className="p-6 text-center space-y-2 bg-[#0F2342] w-full h-full flex flex-col items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-white" aria-hidden="true" />
                  <p className="font-display font-semibold text-white">Yousif Dawood</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-display text-xl font-bold text-white tabular-nums">
              {t.metrics.statesValue}
            </p>
            <p className="mt-0.5 text-xs text-slate-300">{t.metrics.statesLabel}</p>
          </div>
          <div>
            <p className="font-display text-xl font-bold text-white tabular-nums">
              {t.metrics.carriersValue}
            </p>
            <p className="mt-0.5 text-xs text-slate-300">{t.metrics.carriersLabel}</p>
          </div>
          <div>
            <p className="font-display text-xl font-bold text-white tabular-nums">
              {t.metrics.languagesValue}
            </p>
            <p className="mt-0.5 text-xs text-slate-300">{t.metrics.languagesLabel}</p>
          </div>
          <div>
            <p className="font-mono text-lg sm:text-xl font-semibold text-white tabular-nums">
              {t.metrics.partnerValue}
            </p>
            <p className="mt-0.5 text-xs text-slate-300">{t.metrics.partnerLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
