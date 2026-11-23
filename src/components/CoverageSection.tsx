import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CoverageKey } from '../types';
import { TranslationBundle } from '../data/translations';

interface CoverageSectionProps {
  t: TranslationBundle['coverage'];
  onSelectCoverage: (coverageKey: CoverageKey) => void;
}

const PLAN_KEYS: CoverageKey[] = [
  'whole_life',
  'term_life',
  'final_expense',
  'indexed_universal_life',
  'guaranteed_whole_life',
];

export const CoverageSection: React.FC<CoverageSectionProps> = ({ t, onSelectCoverage }) => {
  return (
    <section id="coverage" className="py-12 lg:py-16 bg-[#0A192F] border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.sectionTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-200">{t.sectionSubtitle}</p>
        </div>

        {/* Policy Definitions Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAN_KEYS.map((key, index) => {
            const plan = t.plans[key];
            return (
              <article
                key={key}
                className={`bg-[#0F2342] border border-white/20 rounded-xl p-5 flex flex-col justify-between ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="text-xs text-slate-300">
                    <span>{plan.typicalTerm}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{plan.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-200 leading-relaxed">{plan.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/15">
                  <button
                    type="button"
                    onClick={() => onSelectCoverage(key)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    <span>{t.requestQuoteCta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
