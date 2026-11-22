import { CareerTrackKey, CoverageKey, Language, Region } from '../types';

export interface TranslationBundle {
  nav: {
    coverage: string;
    licenses: string;
    careers: string;
    contact: string;
    cta: string;
  };
  hero: {
    affiliation: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    languageLabel: string;
    metrics: {
      statesValue: string;
      statesLabel: string;
      languagesValue: string;
      languagesLabel: string;
      partnerValue: string;
      partnerLabel: string;
    };
  };
  coverage: {
    sectionTitle: string;
    sectionSubtitle: string;
    toggleEstimator: string;
    hideEstimator: string;
    estimatorTitle: string;
    debtLabel: string;
    incomeLabel: string;
    yearsLabel: string;
    finalExpensesLabel: string;
    recommendedCoverageLabel: string;
    applyEstimatorCta: string;
    requestQuoteCta: string;
    plans: Record<
      CoverageKey,
      {
        title: string;
        summary: string;
        typicalTerm: string;
        coverageRange: string;
      }
    >;
  };
  licenses: {
    sectionTitle: string;
    sectionSubtitle: string;
    npnLabel: string;
    searchPlaceholder: string;
    statusFilterAll: string;
    statusFilterActive: string;
    statusFilterRenewal: string;
    regions: Record<Region, string>;
    tableHeaders: {
      state: string;
      licenseNumber: string;
      lines: string;
      status: string;
      action: string;
    };
    statusLabels: {
      active: string;
      renewal_scheduled: string;
    };
    verifyButton: string;
    showAllButton: string;
    showLessButton: string;
    emptyTitle: string;
    clearFilters: string;
    modal: {
      title: string;
      authority: string;
      licenseClass: string;
      licenseNumber: string;
      npn: string;
      lines: string;
      issueDate: string;
      expirationDate: string;
      status: string;
      copyLicense: string;
      copied: string;
      officialPortal: string;
      close: string;
    };
  };
  careers: {
    sectionTitle: string;
    sectionSubtitle: string;
    highlights: string[];
    contractorNotice: string;
    tracks: Record<
      CareerTrackKey,
      {
        label: string;
        headline: string;
        summary: string;
      }
    >;
    applyCta: string;
    formTitle: string;
    fields: {
      fullName: string;
      email: string;
      phone: string;
      state: string;
      licenseStatus: string;
      licenseOptions: {
        licensed: string;
        studying: string;
        new_to_industry: string;
      };
      languagesLabel: string;
      otherLanguagesPlaceholder: string;
      submit: string;
      submitting: string;
      cancel: string;
    };
    successTitle: string;
    successBody: string;
    fallbackAction: string;
    submitError: string;
    anotherButton: string;
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    officeHoursLabel: string;
    officeHoursValue: string;
    languagesLabel: string;
    languagesValue: string;
    directPhoneLabel: string;
    directEmailLabel: string;
    affiliationValue: string;
    fields: {
      fullName: string;
      email: string;
      phone: string;
      state: string;
      coverage: string;
      preferredLanguage: string;
      message: string;
      submit: string;
      submitting: string;
    };
    validation: {
      required: string;
      invalidEmail: string;
      invalidPhone: string;
    };
    successTitle: string;
    successBody: string;
    fallbackAction: string;
    submitError: string;
    referenceLabel: string;
    resetButton: string;
  };
  footer: {
    tagline: string;
    compliance: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  en: {
    nav: {
      coverage: 'Coverage',
      licenses: 'Licenses',
      careers: 'Careers',
      contact: 'Contact',
      cta: 'Get a Quote',
    },
    hero: {
      affiliation: 'Yousif Dawood · Family First Life Independent Broker',
      title: 'Life insurance protection made clear for your family.',
      subtitle:
        'Comparing 30+ top-rated carriers in English, Arabic, Spanish, and Chaldean (ܣܘܪܝܬ) with zero pressure.',
      primaryCta: 'Get a Free Quote',
      secondaryCta: 'Verify Licenses',
      languageLabel: 'Language',
      metrics: {
        statesValue: '30+',
        statesLabel: 'Top-Rated Carriers',
        languagesValue: '4 Languages',
        languagesLabel: 'EN · AR · ES · Chaldean',
        partnerValue: 'NPN 22228159',
        partnerLabel: 'National Producer ID',
      },
    },
    coverage: {
      sectionTitle: '01. Coverage Options',
      sectionSubtitle: 'Straightforward life protection tailored to your family and retirement.',
      toggleEstimator: 'Estimate Coverage Needs',
      hideEstimator: 'Hide Estimator',
      estimatorTitle: 'Quick Coverage Estimator',
      debtLabel: 'Household Debt & Payoff',
      incomeLabel: 'Annual Income',
      yearsLabel: 'Years',
      finalExpensesLabel: 'Final Expenses',
      recommendedCoverageLabel: 'Suggested Target',
      applyEstimatorCta: 'Use This Estimate',
      requestQuoteCta: 'Select Plan',
      plans: {
        whole_life: {
          title: 'Whole Life Insurance',
          summary: 'Permanent lifelong protection with locked-in premiums and guaranteed cash value growth.',
          typicalTerm: 'Lifetime',
          coverageRange: '$25K – $1M+',
        },
        final_expense: {
          title: 'Final Expense',
          summary: 'Permanent whole life coverage with locked-in rates for burial and end-of-life costs.',
          typicalTerm: 'Lifetime',
          coverageRange: '$5K – $50K',
        },
        term_life: {
          title: 'Term Life',
          summary: 'Affordable income replacement during your family’s peak earning years.',
          typicalTerm: '10–30 Years',
          coverageRange: '$250K – $5M+',
        },
        indexed_universal_life: {
          title: 'Indexed Universal Life (IUL)',
          summary: 'Lifetime protection with tax-advantaged cash growth and a 0% market loss floor.',
          typicalTerm: 'Lifetime',
          coverageRange: '$100K – $3M+',
        },
        annuities: {
          title: 'Retirement Annuities',
          summary: 'Principal-protected 401(k) and IRA rollovers with guaranteed lifetime income.',
          typicalTerm: '5–10 Years',
          coverageRange: '$25K – $2M+',
        },
      },
    },
    licenses: {
      sectionTitle: '02. State License Directory',
      sectionSubtitle: 'Search or filter verified U.S. producer licenses by state.',
      npnLabel: 'National Producer Number',
      searchPlaceholder: 'Search state, code (CA, TX), or license #...',
      statusFilterAll: 'All Statuses',
      statusFilterActive: 'Active Only',
      statusFilterRenewal: 'Renewal Scheduled',
      regions: {
        all: 'All',
        midwest: 'Midwest',
        south: 'South',
        west: 'West',
      },
      tableHeaders: {
        state: 'Jurisdiction',
        licenseNumber: 'License #',
        lines: 'Lines',
        status: 'Status',
        action: 'Verify',
      },
      statusLabels: {
        active: 'Active',
        renewal_scheduled: 'Renewal Pending',
      },
      verifyButton: 'Details',
      showAllButton: 'Show All {total} Jurisdictions',
      showLessButton: 'Show Top 6',
      emptyTitle: 'No matching licenses found',
      clearFilters: 'Reset Filters',
      modal: {
        title: 'Producer License Record',
        authority: 'Issuing Department',
        licenseClass: 'License Class',
        licenseNumber: 'License Number',
        npn: 'National Producer #',
        lines: 'Authorized Lines',
        issueDate: 'First Active',
        expirationDate: 'Expiration Date',
        status: 'Status',
        copyLicense: 'Copy #',
        copied: 'Copied',
        officialPortal: 'State DOI Portal',
        close: 'Close',
      },
    },
    careers: {
      sectionTitle: '03. Join Our Agency — 1099 Life Insurance Agent',
      sectionSubtitle:
        'Self-employed, commission-only sales opportunity with uncapped earning potential, flexible scheduling, and remote work options.',
      highlights: [
        'Uncapped commission-only earnings',
        'Flexible schedule & remote work',
        'Vested renewals & exclusive leads',
      ],
      contractorNotice:
        'Independent Contractor Notice: Applicants are 1099 independent contractors (not W-2 employees) responsible for their own taxes and business expenses, and must hold an active state Life Insurance license or be willing to get licensed.',
      tracks: {
        independent_1099: {
          label: '1099 Producer',
          headline: '1099 Independent Contractor Life Insurance Agent',
          summary:
            'Self-employed, commission-only role with uncapped income, remote flexibility, and direct carrier contracts.',
        },
      },
      applyCta: 'Apply Now',
      formTitle: '1099 Agent Application',
      fields: {
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        state: 'State of Residence',
        licenseStatus: 'Current Licensing Status',
        licenseOptions: {
          licensed: 'Active State Life Insurance License',
          studying: 'Currently Completing Pre-Licensing',
          new_to_industry: 'Unlicensed — Willing to Get Licensed',
        },
        languagesLabel: 'Languages You Speak',
        otherLanguagesPlaceholder: 'Other language(s) (optional)',
        submit: 'Submit Application',
        submitting: 'Sending...',
        cancel: 'Cancel',
      },
      successTitle: 'Application Sent',
      successBody:
        'Sent to yousifdaFFL@gmail.com. Yousif will respond within one business day.',
      fallbackAction: 'Send via Email App',
      submitError: 'Could not submit right now. Please try again.',
      anotherButton: 'Submit Another',
    },
    contact: {
      sectionTitle: '04. Request a Consultation',
      sectionSubtitle: 'Free coverage comparison in English, Arabic, Spanish, or Chaldean (ܣܘܪܝܬ).',
      officeHoursLabel: 'Hours',
      officeHoursValue: 'Mon – Sat · 8:30 AM – 7:30 PM PST',
      languagesLabel: 'Languages',
      languagesValue: 'English · العربية · Español · Chaldean (ܣܘܪܝܬ)',
      directPhoneLabel: 'Phone',
      directEmailLabel: 'Email',
      affiliationValue: 'Family First Life · NPN 22228159',
      fields: {
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        state: 'State',
        coverage: 'Coverage Type',
        preferredLanguage: 'Language',
        message: 'Notes (Optional)',
        submit: 'Request Consultation',
        submitting: 'Sending...',
      },
      validation: {
        required: 'Required.',
        invalidEmail: 'Enter a valid email.',
        invalidPhone: 'Enter a 10-digit phone number.',
      },
      successTitle: 'Request Sent',
      successBody:
        'Sent to yousifdaFFL@gmail.com. Yousif will reply within one business day.',
      fallbackAction: 'Send via Email App',
      submitError: 'Could not submit right now. Please try again.',
      referenceLabel: 'Reference',
      resetButton: 'New Request',
    },
    footer: {
      tagline: 'Yousif Dawood Insurance · Family First Life Independent Broker',
      compliance: 'Coverage availability and rates vary by state and underwriting qualification.',
      copyright: '© 2026 Yousif Dawood Insurance',
    },
  },
  ar: {
    nav: {
      coverage: 'التغطية',
      licenses: 'التراخيص',
      careers: 'الوظائف',
      contact: 'تواصل معنا',
      cta: 'احصل على عرض',
    },
    hero: {
      affiliation: 'يوسف داود · وسيط مستقل منتسب إلى Family First Life',
      title: 'حماية التأمين على الحياة بكل وضوح لعائلتك.',
      subtitle:
        'نقارن أكثر من 30 شركة تأمين رائدة بالإنجليزية والعربية والإسبانية والكلدانية (ܣܘܪܝܬ) دون أي ضغط.',
      primaryCta: 'طلب استشارة مجانية',
      secondaryCta: 'التحقق من التراخيص',
      languageLabel: 'اللغة',
      metrics: {
        statesValue: '+30',
        statesLabel: 'شركة تأمين معتمدة',
        languagesValue: '4 لغات',
        languagesLabel: 'EN · AR · ES · ܣܘܪܝܬ',
        partnerValue: 'NPN 22228159',
        partnerLabel: 'الرقم الوطني المعتمد',
      },
    },
    coverage: {
      sectionTitle: '01. خيارات التغطية',
      sectionSubtitle: 'حماية مباشرة لعائلتك ومستقبلك وتقاعدك.',
      toggleEstimator: 'حاسبة التغطية السريعة',
      hideEstimator: 'إخفاء الحاسبة',
      estimatorTitle: 'تقدير سريع للتغطية',
      debtLabel: 'الالتزامات والديون',
      incomeLabel: 'الدخل السنوي',
      yearsLabel: 'السنوات',
      finalExpensesLabel: 'المصاريف النهائية',
      recommendedCoverageLabel: 'التغطية المقترحة',
      applyEstimatorCta: 'اعتماد التقدير',
      requestQuoteCta: 'اختر الخطة',
      plans: {
        whole_life: {
          title: 'التأمين الدائم على الحياة (Whole Life)',
          summary: 'حماية دائمة مدى الحياة بأقساط ثابتة ونمو نقدي مضمون.',
          typicalTerm: 'مدى الحياة',
          coverageRange: '$25K – $1M+',
        },
        final_expense: {
          title: 'المصاريف النهائية',
          summary: 'تغطية دائمة بأقساط ثابتة لتكاليف الجنازة والالتزامات النهائية.',
          typicalTerm: 'مدى الحياة',
          coverageRange: '$5K – $50K',
        },
        term_life: {
          title: 'التأمين المؤقت',
          summary: 'تعويض دخل اقتصادي للأسرة خلال سنوات العمل النشطة.',
          typicalTerm: '10–30 سنة',
          coverageRange: '$250K – $5M+',
        },
        indexed_universal_life: {
          title: 'التأمين الشامل (IUL)',
          summary: 'حماية دائمة مع نمو نقدي بمزايا ضريبية وحماية 0% من الخسائر.',
          typicalTerm: 'مدى الحياة',
          coverageRange: '$100K – $3M+',
        },
        annuities: {
          title: 'معاشات التقاعد',
          summary: 'حماية حسابات 401(k) وIRA مع دخل مضمون مدى الحياة.',
          typicalTerm: '5–10 سنوات',
          coverageRange: '$25K – $2M+',
        },
      },
    },
    licenses: {
      sectionTitle: '02. دليل تراخيص الولايات',
      sectionSubtitle: 'ابحث أو صفِّ التراخيص الموثقة حسب الولاية.',
      npnLabel: 'الرقم الوطني للوسيط',
      searchPlaceholder: 'ابحث بالولاية أو الرمز أو رقم الترخيص...',
      statusFilterAll: 'كل الحالات',
      statusFilterActive: 'النشطة فقط',
      statusFilterRenewal: 'تجديد مجدول',
      regions: {
        all: 'الكل',
        midwest: 'الغرب الأوسط',
        south: 'الجنوب',
        west: 'الغرب',
      },
      tableHeaders: {
        state: 'الولاية',
        licenseNumber: 'رقم الترخيص',
        lines: 'التخصصات',
        status: 'الحالة',
        action: 'السجل',
      },
      statusLabels: {
        active: 'نشط',
        renewal_scheduled: 'تجديد مجدول',
      },
      verifyButton: 'التفاصيل',
      showAllButton: 'عرض الكل ({total})',
      showLessButton: 'عرض أول 6',
      emptyTitle: 'لا توجد نتائج مطابقة',
      clearFilters: 'إعادة ضبط',
      modal: {
        title: 'سجل ترخيص الوسيط',
        authority: 'الجهة المصدرة',
        licenseClass: 'فئة الترخيص',
        licenseNumber: 'رقم الترخيص',
        npn: 'الرقم الوطني (NPN)',
        lines: 'الفئات المصرح بها',
        issueDate: 'تاريخ التفعيل',
        expirationDate: 'تاريخ الانتهاء',
        status: 'الحالة',
        copyLicense: 'نسخ الرقم',
        copied: 'تم النسخ',
        officialPortal: 'البوابة الرسمية للولاية',
        close: 'إغلاق',
      },
    },
    careers: {
      sectionTitle: '03. انضم إلى فريقنا — وكيل تأمين مستقل 1099',
      sectionSubtitle:
        'فرصة عمل حر بنظام العمولة فقط بدخل غير محدود وجدول مرن وخيارات عمل عن بُعد.',
      highlights: [
        'عمولات غير محدودة',
        'مرونة في العمل والعمل عن بُعد',
        'ملكية التجديدات وعملاء مهتمون',
      ],
      contractorNotice:
        'إفصاح المتعاقد المستقل (1099): المتقدمون يعملون كمتعاقدين مستقلين بنظام 1099 (وليسوا موظفي W-2) ومسؤولون عن ضرائبهم ومصاريف أعمالهم، ويجب أن يحملوا رخصة تأمين على الحياة سارية أو الاستعداد للحصول عليها.',
      tracks: {
        independent_1099: {
          label: 'وكيل 1099 مستقل',
          headline: 'وكيل تأمين على الحياة متعاقد مستقل 1099',
          summary:
            'عمل مستقل بنظام العمولة فقط مع دخل غير محدود ومرونة عن بُعد وعقود مباشرة مع شركات التأمين.',
        },
      },
      applyCta: 'قدّم الآن',
      formTitle: 'طلب التقديم كوكيل 1099',
      fields: {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        state: 'ولاية الإقامة',
        licenseStatus: 'حالة الترخيص الحالية',
        licenseOptions: {
          licensed: 'رخصة تأمين على الحياة سارية',
          studying: 'أكمل حالياً دورة ما قبل الترخيص',
          new_to_industry: 'غير مرخص — مستعد للحصول على الرخصة',
        },
        languagesLabel: 'اللغات التي تتحدثها',
        otherLanguagesPlaceholder: 'لغات أخرى (اختياري)',
        submit: 'إرسال الطلب',
        submitting: 'جارٍ الإرسال...',
        cancel: 'إلغاء',
      },
      successTitle: 'تم إرسال الطلب',
      successBody:
        'تم توجيه الطلب إلى yousifdaFFL@gmail.com. سيتواصل معك يوسف خلال يوم عمل واحد.',
      fallbackAction: 'إرسال عبر تطبيق البريد',
      submitError: 'تعذر الإرسال حالياً. يرجى المحاولة مرة أخرى.',
      anotherButton: 'إرسال طلب آخر',
    },
    contact: {
      sectionTitle: '04. اطلب استشارة',
      sectionSubtitle: 'مقارنة مجانية بالإنجليزية أو العربية أو الإسبانية أو الكلدانية (ܣܘܪܝܬ).',
      officeHoursLabel: 'ساعات العمل',
      officeHoursValue: 'الاثنين – السبت · 8:30 ص – 7:30 م PST',
      languagesLabel: 'اللغات',
      languagesValue: 'English · العربية · Español · Chaldean (ܣܘܪܝܬ)',
      directPhoneLabel: 'الهاتف',
      directEmailLabel: 'البريد',
      affiliationValue: 'Family First Life · NPN 22228159',
      fields: {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        state: 'الولاية',
        coverage: 'نوع التغطية',
        preferredLanguage: 'اللغة المفضلة',
        message: 'ملاحظات (اختياري)',
        submit: 'إرسال الطلب',
        submitting: 'جارٍ الإرسال...',
      },
      validation: {
        required: 'مطلوب.',
        invalidEmail: 'أدخل بريداً صحيحاً.',
        invalidPhone: 'أدخل رقم هاتف من 10 أرقام.',
      },
      successTitle: 'تم إرسال الطلب',
      successBody:
        'تم توجيه الطلب إلى yousifdaFFL@gmail.com. سيتواصل معك يوسف خلال يوم عمل واحد.',
      fallbackAction: 'إرسال عبر تطبيق البريد',
      submitError: 'تعذر الإرسال حالياً. يرجى المحاولة مرة أخرى.',
      referenceLabel: 'المرجع',
      resetButton: 'طلب جديد',
    },
    footer: {
      tagline: 'يوسف داود للتأمين · وسيط مستقل منتسب إلى Family First Life',
      compliance: 'تختلف المنتجات والأسعار حسب الولاية وشروط الاكتتاب.',
      copyright: '© 2026 يوسف داود للتأمين',
    },
  },
  es: {
    nav: {
      coverage: 'Cobertura',
      licenses: 'Licencias',
      careers: 'Carreras',
      contact: 'Contacto',
      cta: 'Cotizar',
    },
    hero: {
      affiliation: 'Yousif Dawood · Agente Independiente Family First Life',
      title: 'Seguro de vida claro y directo para su familia.',
      subtitle:
        'Comparamos más de 30 aseguradoras en inglés, árabe, español y caldeo (ܣܘܪܝܬ) sin presiones.',
      primaryCta: 'Cotización Gratis',
      secondaryCta: 'Ver Licencias',
      languageLabel: 'Idioma',
      metrics: {
        statesValue: '30+',
        statesLabel: 'Aseguradoras Líderes',
        languagesValue: '4 Idiomas',
        languagesLabel: 'EN · AR · ES · Caldeo',
        partnerValue: 'NPN 22228159',
        partnerLabel: 'ID Nacional Verificado',
      },
    },
    coverage: {
      sectionTitle: '01. Opciones de Cobertura',
      sectionSubtitle: 'Protección directa para su familia, patrimonio y retiro.',
      toggleEstimator: 'Calcular Cobertura',
      hideEstimator: 'Ocultar Calculadora',
      estimatorTitle: 'Estimador Rápido',
      debtLabel: 'Deudas y Compromisos',
      incomeLabel: 'Ingreso Anual',
      yearsLabel: 'Años',
      finalExpensesLabel: 'Gastos Finales',
      recommendedCoverageLabel: 'Meta Sugerida',
      applyEstimatorCta: 'Usar Estimado',
      requestQuoteCta: 'Elegir Plan',
      plans: {
        whole_life: {
          title: 'Seguro de Vida Entera (Whole Life)',
          summary: 'Protección vitalicia con prima fija y acumulación garantizada de valor en efectivo.',
          typicalTerm: 'Vitalicia',
          coverageRange: '$25K – $1M+',
        },
        final_expense: {
          title: 'Gastos Finales',
          summary: 'Cobertura vitalicia con tarifa fija para gastos funerarios y médicos.',
          typicalTerm: 'Vitalicia',
          coverageRange: '$5K – $50K',
        },
        term_life: {
          title: 'Vida a Término',
          summary: 'Reemplazo de ingresos accesible durante sus años productivos.',
          typicalTerm: '10–30 Años',
          coverageRange: '$250K – $5M+',
        },
        indexed_universal_life: {
          title: 'Vida Universal Indexada (IUL)',
          summary: 'Protección vitalicia con crecimiento indexado y piso del 0% contra caídas.',
          typicalTerm: 'Vitalicia',
          coverageRange: '$100K – $3M+',
        },
        annuities: {
          title: 'Anualidades de Retiro',
          summary: 'Protección de capital para transferencias de 401(k) e IRA con renta vitalicia.',
          typicalTerm: '5–10 Años',
          coverageRange: '$25K – $2M+',
        },
      },
    },
    licenses: {
      sectionTitle: '02. Directorio de Licencias',
      sectionSubtitle: 'Busque o filtre licencias activas por estado.',
      npnLabel: 'Número Nacional (NPN)',
      searchPlaceholder: 'Buscar estado, código (CA, TX) o licencia...',
      statusFilterAll: 'Todos',
      statusFilterActive: 'Solo Activas',
      statusFilterRenewal: 'Renovación Pendiente',
      regions: {
        all: 'Todos',
        midwest: 'Medio Oeste',
        south: 'Sur',
        west: 'Oeste',
      },
      tableHeaders: {
        state: 'Jurisdicción',
        licenseNumber: 'Licencia #',
        lines: 'Líneas',
        status: 'Estado',
        action: 'Verificar',
      },
      statusLabels: {
        active: 'Activa',
        renewal_scheduled: 'Renovación',
      },
      verifyButton: 'Detalles',
      showAllButton: 'Ver Todos ({total})',
      showLessButton: 'Ver Primeros 6',
      emptyTitle: 'Sin licencias coincidentes',
      clearFilters: 'Restablecer',
      modal: {
        title: 'Registro Oficial de Licencia',
        authority: 'Departamento Emisor',
        licenseClass: 'Clase de Licencia',
        licenseNumber: 'Licencia Estatal',
        npn: 'Número Nacional (NPN)',
        lines: 'Líneas Autorizadas',
        issueDate: 'Primer Activo',
        expirationDate: 'Vencimiento',
        status: 'Estatus',
        copyLicense: 'Copiar #',
        copied: 'Copiado',
        officialPortal: 'Portal Estatal DOI',
        close: 'Cerrar',
      },
    },
    careers: {
      sectionTitle: '03. Únase a Nuestra Agencia — Agente Independiente 1099',
      sectionSubtitle:
        'Oportunidad de ventas por cuenta propia, solo comisiones, ingresos sin límite, horario flexible y trabajo remoto.',
      highlights: [
        'Solo comisiones sin límite de ingresos',
        'Horario flexible y trabajo remoto',
        'Renovaciones propias y prospectos',
      ],
      contractorNotice:
        'Aviso de Contratista Independiente (1099): Los solicitantes son contratistas independientes 1099 (no empleados W-2), responsables de sus propios impuestos y gastos comerciales, y deben contar con licencia activa de Vida o estar dispuestos a obtenerla.',
      tracks: {
        independent_1099: {
          label: 'Productor 1099',
          headline: 'Agente de Seguros de Vida Contratista Independiente 1099',
          summary:
            'Puesto por cuenta propia, solo comisiones, con ingresos sin tope, trabajo remoto y contratos directos.',
        },
      },
      applyCta: 'Aplicar Ahora',
      formTitle: 'Solicitud de Agente 1099',
      fields: {
        fullName: 'Nombre Completo',
        email: 'Correo',
        phone: 'Teléfono',
        state: 'Estado de Residencia',
        licenseStatus: 'Estado de Licencia Actual',
        licenseOptions: {
          licensed: 'Licencia Estatal Activa de Vida',
          studying: 'En Curso de Pre-Licenciamiento',
          new_to_industry: 'Sin Licencia — Dispuesto a Obtenerla',
        },
        languagesLabel: 'Idiomas que Habla',
        otherLanguagesPlaceholder: 'Otro(s) idioma(s) (opcional)',
        submit: 'Enviar Solicitud',
        submitting: 'Enviando...',
        cancel: 'Cancelar',
      },
      successTitle: 'Solicitud Enviada',
      successBody:
        'Enviada a yousifdaFFL@gmail.com. Yousif le responderá en un día hábil.',
      fallbackAction: 'Enviar por App de Correo',
      submitError: 'No se pudo enviar ahora. Intente nuevamente.',
      anotherButton: 'Enviar Otra',
    },
    contact: {
      sectionTitle: '04. Solicitar Consulta',
      sectionSubtitle: 'Comparación gratuita en inglés, árabe, español o caldeo (ܣܘܪܝܬ).',
      officeHoursLabel: 'Horario',
      officeHoursValue: 'Lun – Sáb · 8:30 AM – 7:30 PM PST',
      languagesLabel: 'Idiomas',
      languagesValue: 'English · العربية · Español · Chaldean (ܣܘܪܝܬ)',
      directPhoneLabel: 'Teléfono',
      directEmailLabel: 'Correo',
      affiliationValue: 'Family First Life · NPN 22228159',
      fields: {
        fullName: 'Nombre Completo',
        email: 'Correo',
        phone: 'Teléfono',
        state: 'Estado',
        coverage: 'Cobertura',
        preferredLanguage: 'Idioma',
        message: 'Notas (Opcional)',
        submit: 'Enviar Solicitud',
        submitting: 'Enviando...',
      },
      validation: {
        required: 'Requerido.',
        invalidEmail: 'Correo inválido.',
        invalidPhone: 'Teléfono de 10 dígitos.',
      },
      successTitle: 'Consulta Enviada',
      successBody:
        'Enviada a yousifdaFFL@gmail.com. Yousif le contactará en un día hábil.',
      fallbackAction: 'Enviar por App de Correo',
      submitError: 'No se pudo enviar ahora. Intente nuevamente.',
      referenceLabel: 'Referencia',
      resetButton: 'Nueva Solicitud',
    },
    footer: {
      tagline: 'Yousif Dawood Insurance · Agente Independiente Family First Life',
      compliance: 'La disponibilidad y tarifas varían según el estado y la suscripción.',
      copyright: '© 2026 Yousif Dawood Insurance',
    },
  },
};
