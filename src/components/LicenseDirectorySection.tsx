import React, { useMemo, useState } from 'react';
import { Check, CheckCircle2, Clock, Copy, ExternalLink, Search, X } from 'lucide-react';
import { PRODUCER_NPN, STATE_LICENSES } from '../data/licenses';
import { TranslationBundle } from '../data/translations';
import { LicenseStatus, Region, StateLicense } from '../types';

interface LicenseDirectorySectionProps {
  t: TranslationBundle['licenses'];
}

const REGION_KEYS: Region[] = ['all', 'midwest', 'south', 'west', 'northeast'];
const DEFAULT_VISIBLE_LIMIT = 6;

export const LicenseDirectorySection: React.FC<LicenseDirectorySectionProps> = ({ t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LicenseStatus>('all');
  const [showAll, setShowAll] = useState(false);
  const [activeRecord, setActiveRecord] = useState<StateLicense | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLicenses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STATE_LICENSES.filter((item) => {
      const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesQuery =
        q.length === 0 ||
        item.state.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.licenseNumber.toLowerCase().includes(q);
      return matchesRegion && matchesStatus && matchesQuery;
    });
  }, [searchQuery, selectedRegion, statusFilter]);

  const isFiltered =
    searchQuery.trim().length > 0 || selectedRegion !== 'all' || statusFilter !== 'all';

  const visibleLicenses =
    showAll || isFiltered ? filteredLicenses : filteredLicenses.slice(0, DEFAULT_VISIBLE_LIMIT);

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setStatusFilter('all');
  };

  return (
    <section id="licenses" className="py-12 lg:py-16 bg-[#071426] border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.sectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-200">{t.sectionSubtitle}</p>
          </div>

          <div className="inline-flex items-center gap-3 bg-[#0F2342] border border-white/25 rounded-lg px-4 py-2 shrink-0">
            <span className="text-xs text-slate-300">{t.npnLabel}:</span>
            <span className="font-mono text-sm font-semibold text-white tabular-nums">
              {PRODUCER_NPN}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(PRODUCER_NPN, 'npn')}
              aria-label="Copy NPN"
              className="text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              {copiedId === 'npn' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Compact Filter Bar */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#0F2342] border border-white/20 rounded-xl p-3">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#071426] rounded-lg border border-white/15">
            {REGION_KEYS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                aria-pressed={selectedRegion === region}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-white text-[#071426]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {t.regions[region]}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 lg:max-w-md">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-slate-300 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full ps-9 pe-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | LicenseStatus)}
              aria-label={t.tableHeaders.status}
              className="px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-white cursor-pointer"
            >
              <option value="all">{t.statusFilterAll}</option>
              <option value="active">{t.statusFilterActive}</option>
              <option value="renewal_scheduled">{t.statusFilterRenewal}</option>
            </select>
          </div>
        </div>

        {/* Limited License Table */}
        {visibleLicenses.length === 0 ? (
          <div className="mt-4 border border-white/20 rounded-xl p-8 text-center bg-[#0F2342]">
            <p className="font-display text-base font-semibold text-white">{t.emptyTitle}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 px-4 py-2 text-xs font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="mt-4 border border-white/20 rounded-xl overflow-hidden bg-[#0F2342]">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] border-b border-white/15 text-xs font-semibold text-slate-200">
                    <th className="py-3 px-4 text-start">{t.tableHeaders.state}</th>
                    <th className="py-3 px-4 text-start">{t.tableHeaders.licenseNumber}</th>
                    <th className="py-3 px-4 text-start hidden sm:table-cell">
                      {t.tableHeaders.lines}
                    </th>
                    <th className="py-3 px-4 text-start">{t.tableHeaders.status}</th>
                    <th className="py-3 px-4 text-end">{t.tableHeaders.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {visibleLicenses.map((license) => (
                    <tr
                      key={license.code}
                      onClick={() => setActiveRecord(license)}
                      className="hover:bg-[#17345E] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-semibold text-white">{license.state}</span>
                        <span className="ms-1.5 text-xs font-mono text-slate-300">
                          {license.code}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs sm:text-sm text-white tabular-nums whitespace-nowrap">
                        {license.licenseNumber}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-200 hidden sm:table-cell whitespace-nowrap">
                        {license.linesOfAuthority.join(' · ')}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {license.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                            <span>{t.statusLabels.active}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                            <Clock className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                            <span>{t.statusLabels.renewal_scheduled}</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-end whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRecord(license);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-[#071426] border border-white/25 rounded-md hover:bg-white hover:text-[#071426] transition-colors cursor-pointer"
                        >
                          {t.verifyButton}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 bg-[#0A192F] border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-300 tabular-nums">
                {t.showingCount
                  .replace('{count}', String(visibleLicenses.length))
                  .replace('{total}', String(filteredLicenses.length))}
              </p>

              {!isFiltered && filteredLicenses.length > DEFAULT_VISIBLE_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="text-xs font-semibold text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  {showAll
                    ? t.showLessButton
                    : t.showAllButton.replace('{total}', String(filteredLicenses.length))}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* License Record Modal */}
      {activeRecord && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="license-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setActiveRecord(null)}
        >
          <div
            className="w-full max-w-md bg-[#0F2342] border border-white/25 rounded-xl shadow-xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-[#0A192F] border-b border-white/15 flex items-center justify-between">
              <h3 id="license-modal-title" className="font-display text-base font-bold text-white">
                {activeRecord.state} ({activeRecord.code}) · {t.modal.title}
              </h3>
              <button
                type="button"
                aria-label={t.modal.close}
                onClick={() => setActiveRecord(null)}
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-200 hover:bg-[#17345E] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-300">{t.modal.licenseNumber}</p>
                  <p className="font-mono font-semibold text-white tabular-nums">
                    {activeRecord.licenseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-300">{t.modal.npn}</p>
                  <p className="font-mono font-semibold text-white tabular-nums">
                    {activeRecord.npn}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-300">{t.modal.authority}</p>
                <p className="font-medium text-white">{activeRecord.departmentName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/15">
                <div>
                  <p className="text-xs text-slate-300">{t.modal.issueDate}</p>
                  <p className="font-mono text-xs text-white tabular-nums">
                    {activeRecord.issueDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-300">{t.modal.expirationDate}</p>
                  <p className="font-mono text-xs text-white tabular-nums">
                    {activeRecord.expirationDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#0A192F] border-t border-white/15 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopy(activeRecord.licenseNumber, activeRecord.code)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#071426] border border-white/25 rounded-lg hover:bg-[#17345E] cursor-pointer"
              >
                {copiedId === activeRecord.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.modal.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.modal.copyLicense}</span>
                  </>
                )}
              </button>

              <a
                href={activeRecord.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100"
              >
                <span>{t.modal.officialPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
