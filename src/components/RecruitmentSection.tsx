import React, { useState } from 'react';
import { Briefcase, CheckCircle2, Mail, Users } from 'lucide-react';
import { CareerTrackKey } from '../types';
import { TranslationBundle } from '../data/translations';
import mentorshipImg from '../assets/images/agent_team_mentorship_1795243195171.jpg';

interface RecruitmentSectionProps {
  t: TranslationBundle['careers'];
  validationT: TranslationBundle['contact']['validation'];
}

const TRACK_KEYS: CareerTrackKey[] = ['part_time', 'full_time', 'agency_builder'];
const RECIPIENT_EMAIL = 'FamilyFirstLifeBusiness@gmail.com';

export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({ t, validationT }) => {
  const [activeTrack, setActiveTrack] = useState<CareerTrackKey>('full_time');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [licenseStatus, setLicenseStatus] = useState<'licensed' | 'studying' | 'new_to_industry'>(
    'licensed'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    referenceId: string;
    delivered: boolean;
    mailtoUrl: string;
  } | null>(null);

  const track = t.tracks[activeTrack];

  const buildMailtoUrl = (refId: string) => {
    const subject = encodeURIComponent(
      `Agent Application (${refId}) - ${fullName.trim()} (${state.trim()})`
    );
    const body = encodeURIComponent(
      [
        `Reference: ${refId}`,
        `Track: ${track.label}`,
        `Name: ${fullName.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `State: ${state.trim()}`,
        `License Status: ${t.fields.licenseOptions[licenseStatus]}`,
      ].join('\n')
    );
    return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) nextErrors.fullName = validationT.required;
    if (!email.trim()) {
      nextErrors.email = validationT.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = validationT.invalidEmail;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      nextErrors.phone = validationT.required;
    } else if (digitsOnly.length < 10) {
      nextErrors.phone = validationT.invalidPhone;
    }

    if (!state.trim()) nextErrors.state = validationT.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'career',
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          state: state.trim(),
          licenseStatus: `${track.label} · ${t.fields.licenseOptions[licenseStatus]}`,
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

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setState('');
    setLicenseStatus('licensed');
    setErrors({});
    setSubmitError(null);
    setReceipt(null);
  };

  return (
    <section id="careers" className="py-12 lg:py-16 bg-[#0A192F] border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.sectionTitle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-200">{t.sectionSubtitle}</p>

              <p className="mt-4 text-xs sm:text-sm font-medium text-slate-200">
                {t.highlights.join(' · ')}
              </p>
            </div>

            <div className="bg-[#0F2342] border border-white/20 rounded-xl p-5">
              <div
                role="tablist"
                aria-label="Career tracks"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#071426] border border-white/15 rounded-lg"
              >
                {TRACK_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeTrack === key}
                    onClick={() => setActiveTrack(key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeTrack === key
                        ? 'bg-white text-[#071426]'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {t.tracks[key].label}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="font-display text-base font-bold text-white">{track.headline}</h3>
                <p className="mt-1 text-sm text-slate-200 leading-relaxed">{track.summary}</p>
              </div>

              {!showInquiryForm && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" aria-hidden="true" />
                    <span>{t.applyCta}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl overflow-hidden border border-white/25 bg-[#0F2342] min-h-[200px]">
              {!imgFailed ? (
                <img
                  src={mentorshipImg}
                  alt="Insurance advisors collaborating"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0F2342]">
                  <Users className="w-8 h-8 text-white mb-2" aria-hidden="true" />
                  <p className="font-display font-semibold text-white">Family First Life</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {showInquiryForm && (
          <div className="mt-6 bg-[#0F2342] border border-white/25 rounded-xl p-5 sm:p-6">
            {receipt ? (
              <div className="py-2 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    <h3 className="font-display text-lg font-bold text-white">{t.successTitle}</h3>
                  </div>
                  <p className="mt-1 text-sm text-slate-200">{t.successBody}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {!receipt.delivered && (
                    <a
                      href={receipt.mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.fallbackAction}</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#071426] border border-white/25 rounded-lg hover:bg-[#17345E] cursor-pointer"
                  >
                    {t.anotherButton}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/15">
                  <h3 className="font-display text-base font-bold text-white">{t.formTitle}</h3>
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="text-xs font-semibold text-slate-200 hover:text-white cursor-pointer"
                  >
                    {t.fields.cancel}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <input
                      type="text"
                      aria-label={t.fields.fullName}
                      placeholder={t.fields.fullName}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-300">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      aria-label={t.fields.email}
                      placeholder={t.fields.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      aria-label={t.fields.phone}
                      placeholder={t.fields.phone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-rose-300">{errors.phone}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      aria-label={t.fields.state}
                      placeholder={t.fields.state}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-white"
                    />
                    {errors.state && <p className="mt-1 text-xs text-rose-300">{errors.state}</p>}
                  </div>

                  <div>
                    <select
                      aria-label={t.fields.licenseStatus}
                      value={licenseStatus}
                      onChange={(e) =>
                        setLicenseStatus(
                          e.target.value as 'licensed' | 'studying' | 'new_to_industry'
                        )
                      }
                      className="w-full px-3 py-2 bg-[#071426] border border-white/25 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                    >
                      <option value="licensed">{t.fields.licenseOptions.licensed}</option>
                      <option value="studying">{t.fields.licenseOptions.studying}</option>
                      <option value="new_to_industry">
                        {t.fields.licenseOptions.new_to_industry}
                      </option>
                    </select>
                  </div>
                </div>

                {submitError && <p className="mt-3 text-xs text-rose-300">{submitError}</p>}

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#071426] bg-white rounded-lg hover:bg-slate-100 disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {submitting ? t.fields.submitting : t.fields.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
