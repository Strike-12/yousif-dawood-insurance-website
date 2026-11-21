import React, { useEffect, useState } from 'react';
import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { STATE_LICENSES } from '../data/licenses';
import { TranslationBundle } from '../data/translations';
import { CoverageKey, Language } from '../types';

interface ContactSectionProps {
  t: TranslationBundle['contact'];
  plansT: TranslationBundle['coverage']['plans'];
  language: Language;
  selectedCoverage: CoverageKey;
  estimatorNote: string;
}

const COVERAGE_KEYS: CoverageKey[] = [
  'mortgage_protection',
  'final_expense',
  'term_life',
  'indexed_universal_life',
  'annuities',
];

const RECIPIENT_EMAIL = 'FamilyFirstLifeBusiness@gmail.com';

export const ContactSection: React.FC<ContactSectionProps> = ({
  t,
  plansT,
  language,
  selectedCoverage,
  estimatorNote,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState(STATE_LICENSES[0]?.state ?? 'Michigan');
  const [coverage, setCoverage] = useState<CoverageKey>(selectedCoverage);
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(language);
  const [message, setMessage] = useState(estimatorNote);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    referenceId: string;
    delivered: boolean;
    mailtoUrl: string;
  } | null>(null);

  useEffect(() => {
    setCoverage(selectedCoverage);
  }, [selectedCoverage]);

  useEffect(() => {
    setPreferredLanguage(language);
  }, [language]);

  useEffect(() => {
    if (estimatorNote) {
      setMessage(estimatorNote);
    }
  }, [estimatorNote]);

  const buildMailtoUrl = (refId: string) => {
    const subject = encodeURIComponent(
      `Consultation Request (${refId}) - ${fullName.trim()} (${state})`
    );
    const body = encodeURIComponent(
      [
        `Reference: ${refId}`,
        `Name: ${fullName.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `State: ${state}`,
        `Coverage: ${plansT[coverage].title}`,
        `Preferred Language: ${preferredLanguage.toUpperCase()}`,
        message.trim() ? `Notes: ${message.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );
    return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) nextErrors.fullName = t.validation.required;

    if (!email.trim()) {
      nextErrors.email = t.validation.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = t.validation.invalidEmail;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      nextErrors.phone = t.validation.required;
    } else if (digitsOnly.length < 10) {
      nextErrors.phone = t.validation.invalidPhone;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consultation',
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          state,
          coverage: plansT[coverage].title,
          preferredLanguage,
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        referenceId?: string;
      };

      if (!response.ok || !data.ok) {
        setSubmitError(t.submitError);
        return;
      }

      const refId = data.referenceId || `YD-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceipt({
        referenceId: refId,
        delivered: Boolean(data.delivered),
        mailtoUrl: buildMailtoUrl(refId),
      });
    } catch {
      setSubmitError(t.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    setSubmitError(null);
    setReceipt(null);
  };

  return (
    <section id="contact" className="py-12 lg:py-16 bg-[#071426] border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.sectionTitle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-200">{t.sectionSubtitle}</p>
            </div>

            <dl className="space-y-3 text-sm pt-4 border-t border-white/15">
              <div>
                <dt className="text-xs text-slate-300">{t.directPhoneLabel}</dt>
                <dd className="mt-0.5">
                  <a
                    href="tel:+12485550194"
                    className="inline-flex items-center gap-2 font-mono font-semibold text-white hover:underline tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-200" aria-hidden="true" />
                    <span dir="ltr">+1 (248) 555-0194</span>
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs text-slate-300">{t.directEmailLabel}</dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
                    className="inline-flex items-center gap-2 font-medium text-white hover:underline break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-200 shrink-0" aria-hidden="true" />
                    <span>{RECIPIENT_EMAIL}</span>
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs text-slate-300">{t.officeHoursLabel}</dt>
                <dd className="mt-0.5 text-white">{t.officeHoursValue}</dd>
              </div>

              <div>
                <dt className="text-xs text-slate-300">{t.languagesLabel}</dt>
                <dd className="mt-0.5 text-white">{t.languagesValue}</dd>
              </div>
            </dl>

            <p className="text-xs text-slate-300 pt-2 border-t border-white/15">
              {t.affiliationValue}
            </p>
          </div>

          <div className="lg:col-span-8 bg-[#0F2342] border border-white/25 rounded-xl p-5 sm:p-6">
            {receipt ? (
              <div className="py-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-white">{t.successTitle}</h3>
                </div>
                <p className="text-sm text-slate-200">{t.successBody}</p>
                <p className="text-xs text-slate-300 font-mono tabular-nums">
                  {t.referenceLabel}: <strong className="text-white">{receipt.referenceId}</strong>
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {!receipt.delivered && (
                    <a
                      href={receipt.mailtoUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.fallbackAction}</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#071426] border border-white/25 rounded-lg hover:bg-[#17345E] cursor-pointer"
                  >
                    {t.resetButton}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-white mb-1"
                    >
                      {t.fields.fullName}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-300">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-white mb-1"
                    >
                      {t.fields.phone}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(248) 555-0194"
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-rose-300">{errors.phone}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-white mb-1"
                    >
                      {t.fields.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="contact-state"
                      className="block text-xs font-semibold text-white mb-1"
                    >
                      {t.fields.state}
                    </label>
                    <select
                      id="contact-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                    >
                      {STATE_LICENSES.map((lic) => (
                        <option key={lic.code} value={lic.state}>
                          {lic.state} ({lic.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-coverage"
                      className="block text-xs font-semibold text-white mb-1"
                    >
                      {t.fields.coverage}
                    </label>
                    <select
                      id="contact-coverage"
                      value={coverage}
                      onChange={(e) => setCoverage(e.target.value as CoverageKey)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                    >
                      {COVERAGE_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {plansT[key].title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-language"
                      className="block text-xs font-semibold text-white mb-1"
                    >
                      {t.fields.preferredLanguage}
                    </label>
                    <select
                      id="contact-language"
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value as Language)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-white mb-1"
                  >
                    {t.fields.message}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                  />
                </div>

                {submitError && <p className="text-xs text-rose-300">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-sm font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {submitting ? t.fields.submitting : t.fields.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
