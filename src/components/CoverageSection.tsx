import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { CoverageKey, Language } from '../types';
import { TranslationBundle } from '../data/translations';

interface CoverageSectionProps {
  t: TranslationBundle['coverage'];
  language: Language;
  onSelectCoverage: (coverageKey: CoverageKey, estimatedNote?: string) => void;
}

const PLAN_KEYS: CoverageKey[] = [
  'mortgage_protection',
  'term_life',
  'final_expense',
  'indexed_universal_life',
  'annuities',
];

export const CoverageSection: React.FC<CoverageSectionProps> = ({
  t,
  language,
  onSelectCoverage,
}) => {
  const [showEstimator, setShowEstimator] = useState(false);

  const [mortgageBalance, setMortgageBalance] = useState<number>(280000);
  const [annualIncome, setAnnualIncome] = useState<number>(85000);
  const [replacementYears, setReplacementYears] = useState<number>(5);
  const [finalExpenses, setFinalExpenses] = useState<number>(20000);

  const estimatedTotal = useMemo(() => {
    return mortgageBalance + annualIncome * replacementYears + finalExpenses;
  }, [mortgageBalance, annualIncome, replacementYears, finalExpenses]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat(language === 'ar' ? 'en-US' : language === 'es' ? 'es-US' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section id="coverage" className="py-12 lg:py-16 bg-[#0A192F] border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.sectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-200">{t.sectionSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setShowEstimator((prev) => !prev)}
            aria-expanded={showEstimator}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F2342] border border-white/25 rounded-lg hover:bg-[#17345E] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-4 h-4 text-white" aria-hidden="true" />
            <span>{showEstimator ? t.hideEstimator : t.toggleEstimator}</span>
            {showEstimator ? (
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Collapsible Quick Estimator */}
        {showEstimator && (
          <div className="mt-6 bg-[#071426] border border-white/25 text-white rounded-xl p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              <div className="md:col-span-3">
                <div className="flex justify-between text-xs text-slate-200 mb-1.5">
                  <label htmlFor="est-mortgage">{t.mortgageLabel}</label>
                  <span className="font-mono tabular-nums text-white">
                    {formatCurrency(mortgageBalance)}
                  </span>
                </div>
                <input
                  id="est-mortgage"
                  type="range"
                  min={0}
                  max={1000000}
                  step={25000}
                  value={mortgageBalance}
                  onChange={(e) => setMortgageBalance(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div className="md:col-span-3">
                <div className="flex justify-between text-xs text-slate-200 mb-1.5">
                  <label htmlFor="est-income">{t.incomeLabel}</label>
                  <span className="font-mono tabular-nums text-white">
                    {formatCurrency(annualIncome)}
                  </span>
                </div>
                <input
                  id="est-income"
                  type="range"
                  min={25000}
                  max={300000}
                  step={5000}
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="est-years" className="block text-xs text-slate-200 mb-1">
                    {t.yearsLabel}
                  </label>
                  <select
                    id="est-years"
                    value={replacementYears}
                    onChange={(e) => setReplacementYears(Number(e.target.value))}
                    className="w-full bg-[#0F2342] border border-white/25 rounded-lg px-2.5 py-1.5 text-xs text-white tabular-nums"
                  >
                    {[3, 5, 7, 10].map((yrs) => (
                      <option key={yrs} value={yrs}>
                        {yrs}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="est-final" className="block text-xs text-slate-200 mb-1">
                    {t.finalExpensesLabel}
                  </label>
                  <select
                    id="est-final"
                    value={finalExpenses}
                    onChange={(e) => setFinalExpenses(Number(e.target.value))}
                    className="w-full bg-[#0F2342] border border-white/25 rounded-lg px-2.5 py-1.5 text-xs text-white tabular-nums"
                  >
                    {[10000, 20000, 35000].map((amt) => (
                      <option key={amt} value={amt}>
                        {formatCurrency(amt)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-wrap items-center justify-between gap-3 md:justify-end">
                <div>
                  <p className="text-xs text-slate-300">{t.recommendedCoverageLabel}</p>
                  <p className="font-mono text-xl font-bold text-white tabular-nums">
                    {formatCurrency(estimatedTotal)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onSelectCoverage(
                      mortgageBalance > 0 ? 'mortgage_protection' : 'term_life',
                      `${t.recommendedCoverageLabel}: ${formatCurrency(estimatedTotal)}`
                    )
                  }
                  className="px-4 py-2 text-xs font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t.applyEstimatorCta}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Compact Coverage Cards Grid */}
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
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
                    <span>{plan.typicalTerm}</span>
                    <span className="font-mono tabular-nums text-white">{plan.coverageRange}</span>
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
