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
      carriersValue: string;
      carriersLabel: string;
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
    mortgageLabel: string;
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
    showingCount: string;
    modal: {
      title: string;
      authority: string;
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
      title: 'Life insurance and mortgage protection made clear.',
      subtitle:
        'Comparing 30+ top-rated carriers in English, Arabic, and Spanish with zero pressure.',
      primaryCta: 'Get a Free Quote',
      secondaryCta: 'Verify Licenses',
      languageLabel: 'Language',
      metrics: {
        statesValue: '24 States',
        statesLabel: 'Active Licenses',
        carriersValue: '30+ Carriers',
        carriersLabel: 'Market Comparison',
        languagesValue: '3 Languages',
        languagesLabel: 'EN · AR · ES',
        partnerValue: 'NPN 20849173',
        partnerLabel: 'Verified Producer ID',
      },
    },
    coverage: {
      sectionTitle: '01. Coverage Options',
      sectionSubtitle: 'Straightforward protection tailored to your home, family, and retirement.',
      toggleEstimator: 'Estimate Coverage Needs',
      hideEstimator: 'Hide Estimator',
      estimatorTitle: 'Quick Coverage Estimator',
      mortgageLabel: 'Mortgage Balance',
      incomeLabel: 'Annual Income',
      yearsLabel: 'Years',
      finalExpensesLabel: 'Final Expenses',
      recommendedCoverageLabel: 'Suggested Target',
      applyEstimatorCta: 'Use This Estimate',
      requestQuoteCta: 'Select Plan',
      plans: {
        mortgage_protection: {
          title: 'Mortgage Protection',
          summary: 'Covers your home loan in case of death, critical illness, or disability.',
          typicalTerm: '15–30 Years',
          coverageRange: '$100K – $2M',
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
      sectionSubtitle: 'Search or filter active U.S. producer licenses by state.',
      npnLabel: 'National Producer Number',
      searchPlaceholder: 'Search state, code (MI, TX), or license #...',
      statusFilterAll: 'All Statuses',
      statusFilterActive: 'Active Only',
      statusFilterRenewal: 'Renewal Scheduled',
      regions: {
        all: 'All',
        midwest: 'Midwest',
        south: 'South',
        west: 'West',
        northeast: 'Northeast',
      },
      tableHeaders: {
        state: 'State',
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
      showAllButton: 'Show All {total} States',
      showLessButton: 'Show Top 6',
      emptyTitle: 'No matching licenses found',
      clearFilters: 'Reset Filters',
      showingCount: 'Showing {count} of {total} states',
      modal: {
        title: 'Producer License Record',
        authority: 'Issuing Department',
        licenseNumber: 'License Number',
        npn: 'National Producer #',
        lines: 'Authorized Lines',
        issueDate: 'Issued',
        expirationDate: 'Expires',
        status: 'Status',
        copyLicense: 'Copy #',
        copied: 'Copied',
        officialPortal: 'State DOI Portal',
        close: 'Close',
      },
    },
    careers: {
      sectionTitle: '03. Join Our Agency',
      sectionSubtitle:
        'Build an independent insurance career with Yousif Dawood and Family First Life.',
      highlights: [
        'Vested renewals from day one',
        'Exclusive leads — zero cold calling',
        'Direct mentorship & bilingual scripts',
      ],
      tracks: {
        part_time: {
          label: 'Part-Time',
          headline: '10–15 hrs/week alongside your current job',
          summary: 'Flexible evening/weekend schedule with guided training on your first 10 policies.',
        },
        full_time: {
          label: 'Full-Time',
          headline: '35+ hrs/week independent practice',
          summary: 'Consistent weekly appointments across multiple states with top-tier commissions.',
        },
        agency_builder: {
          label: 'Agency Builder',
          headline: 'Recruit and lead your own regional team',
          summary: 'Override equity on team production with CRM playbooks and leadership coaching.',
        },
      },
      applyCta: 'Apply to Join',
      formTitle: 'Agent Inquiry',
      fields: {
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        state: 'Home State',
        licenseStatus: 'License Status',
        licenseOptions: {
          licensed: 'Actively Licensed',
          studying: 'In Pre-Licensing',
          new_to_industry: 'New to Insurance',
        },
        submit: 'Submit Application',
        submitting: 'Sending...',
        cancel: 'Cancel',
      },
      successTitle: 'Application Sent',
      successBody: 'Sent to FamilyFirstLifeBusiness@gmail.com. Yousif will respond within one business day.',
      fallbackAction: 'Send via Email App',
      submitError: 'Could not submit right now. Please try again.',
      anotherButton: 'Submit Another',
    },
    contact: {
      sectionTitle: '04. Request a Consultation',
      sectionSubtitle: 'Free coverage comparison in English, Arabic, or Spanish.',
      officeHoursLabel: 'Hours',
      officeHoursValue: 'Mon – Sat · 8:30 AM – 7:30 PM EST',
      languagesLabel: 'Languages',
      languagesValue: 'English · العربية · Español',
      directPhoneLabel: 'Phone',
      directEmailLabel: 'Email',
      affiliationValue: 'Family First Life · NPN 20849173',
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
      successBody: 'Sent to FamilyFirstLifeBusiness@gmail.com. Yousif will reply within one business day.',
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
      title: 'تأمين على الحياة وحماية الرهن العقاري بكل وضوح.',
      subtitle: 'نقارن أكثر من 30 شركة تأمين رائدة بالإنجليزية والعربية والإسبانية دون أي ضغط.',
      primaryCta: 'طلب استشارة مجانية',
      secondaryCta: 'التحقق من التراخيص',
      languageLabel: 'اللغة',
      metrics: {
        statesValue: '24 ولاية',
        statesLabel: 'تراخيص نشطة',
        carriersValue: '+30 شركة',
        carriersLabel: 'مقارنة مستقلة',
        languagesValue: '3 لغات',
        languagesLabel: 'EN · AR · ES',
        partnerValue: 'NPN 20849173',
        partnerLabel: 'الرقم الوطني المعتمد',
      },
    },
    coverage: {
      sectionTitle: '01. خيارات التغطية',
      sectionSubtitle: 'حماية مباشرة لمنزلك وعائلتك وتقاعدك.',
      toggleEstimator: 'حاسبة التغطية السريعة',
      hideEstimator: 'إخفاء الحاسبة',
      estimatorTitle: 'تقدير سريع للتغطية',
      mortgageLabel: 'رصيد الرهن العقاري',
      incomeLabel: 'الدخل السنوي',
      yearsLabel: 'السنوات',
      finalExpensesLabel: 'المصاريف النهائية',
      recommendedCoverageLabel: 'التغطية المقترحة',
      applyEstimatorCta: 'اعتماد التقدير',
      requestQuoteCta: 'اختر الخطة',
      plans: {
        mortgage_protection: {
          title: 'حماية الرهن العقاري',
          summary: 'تغطي قرض المنزل في حالات الوفاة أو المرض الحرج أو العجز.',
          typicalTerm: '15–30 سنة',
          coverageRange: '$100K – $2M',
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
      sectionSubtitle: 'ابحث أو صفِّ التراخيص النشطة حسب الولاية.',
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
        northeast: 'الشمال الشرقي',
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
      showAllButton: 'عرض كل الولايات ({total})',
      showLessButton: 'عرض أول 6 ولايات',
      emptyTitle: 'لا توجد نتائج مطابقة',
      clearFilters: 'إعادة ضبط',
      showingCount: 'عرض {count} من {total} ولاية',
      modal: {
        title: 'سجل ترخيص الوسيط',
        authority: 'الجهة المصدرة',
        licenseNumber: 'رقم الترخيص',
        npn: 'الرقم الوطني (NPN)',
        lines: 'الفئات المصرح بها',
        issueDate: 'الإصدار',
        expirationDate: 'الانتهاء',
        status: 'الحالة',
        copyLicense: 'نسخ الرقم',
        copied: 'تم النسخ',
        officialPortal: 'البوابة الرسمية للولاية',
        close: 'إغلاق',
      },
    },
    careers: {
      sectionTitle: '03. انضم إلى فريقنا',
      sectionSubtitle: 'ابنِ مسارك المهني المستقل مع يوسف داود وFamily First Life.',
      highlights: [
        'ملكية التجديدات من اليوم الأول',
        'عملاء مهتمون دون مكالمات عشوائية',
        'تدريب مباشر ونصوص متعددة اللغات',
      ],
      tracks: {
        part_time: {
          label: 'دوام جزئي',
          headline: '10–15 ساعة أسبوعياً بجانب عملك',
          summary: 'مواعيد مرنة مع متابعة عملية لأول 10 وثائق.',
        },
        full_time: {
          label: 'دوام كامل',
          headline: '+35 ساعة أسبوعياً لممارسة متفرغة',
          summary: 'مواعيد أسبوعية منتظمة عبر عدة ولايات بمستويات عمولة عالية.',
        },
        agency_builder: {
          label: 'بناء وكالة',
          headline: 'استقطب ودرّب فريقك الإقليمي',
          summary: 'حصة إدارية من إنتاج الفريق مع أدوات CRM وتوجيه قيادي.',
        },
      },
      applyCta: 'تقدم للانضمام',
      formTitle: 'طلب الانضمام للوكلاء',
      fields: {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        state: 'الولاية',
        licenseStatus: 'حالة الترخيص',
        licenseOptions: {
          licensed: 'مرخص حالياً',
          studying: 'أستعد للاختبار',
          new_to_industry: 'جديد في المجال',
        },
        submit: 'إرسال الطلب',
        submitting: 'جارٍ الإرسال...',
        cancel: 'إلغاء',
      },
      successTitle: 'تم إرسال الطلب',
      successBody: 'تم توجيه الطلب إلى FamilyFirstLifeBusiness@gmail.com. سيتواصل معك يوسف خلال يوم عمل واحد.',
      fallbackAction: 'إرسال عبر تطبيق البريد',
      submitError: 'تعذر الإرسال حالياً. يرجى المحاولة مرة أخرى.',
      anotherButton: 'إرسال طلب آخر',
    },
    contact: {
      sectionTitle: '04. اطلب استشارة',
      sectionSubtitle: 'مقارنة مجانية بالإنجليزية أو العربية أو الإسبانية.',
      officeHoursLabel: 'ساعات العمل',
      officeHoursValue: 'الاثنين – السبت · 8:30 ص – 7:30 م EST',
      languagesLabel: 'اللغات',
      languagesValue: 'English · العربية · Español',
      directPhoneLabel: 'الهاتف',
      directEmailLabel: 'البريد',
      affiliationValue: 'Family First Life · NPN 20849173',
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
      successBody: 'تم توجيه الطلب إلى FamilyFirstLifeBusiness@gmail.com. سيتواصل معك يوسف خلال يوم عمل واحد.',
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
      title: 'Seguro de vida y protección hipotecaria sin complicaciones.',
      subtitle:
        'Comparamos más de 30 aseguradoras en inglés, árabe y español para darle claridad total.',
      primaryCta: 'Cotización Gratis',
      secondaryCta: 'Ver Licencias',
      languageLabel: 'Idioma',
      metrics: {
        statesValue: '24 Estados',
        statesLabel: 'Licencias Activas',
        carriersValue: '30+ Aseguradoras',
        carriersLabel: 'Comparación Directa',
        languagesValue: '3 Idiomas',
        languagesLabel: 'EN · AR · ES',
        partnerValue: 'NPN 20849173',
        partnerLabel: 'ID Nacional Verificado',
      },
    },
    coverage: {
      sectionTitle: '01. Opciones de Cobertura',
      sectionSubtitle: 'Protección directa para su hogar, familia y retiro.',
      toggleEstimator: 'Calcular Cobertura',
      hideEstimator: 'Ocultar Calculadora',
      estimatorTitle: 'Estimador Rápido',
      mortgageLabel: 'Saldo Hipotecario',
      incomeLabel: 'Ingreso Anual',
      yearsLabel: 'Años',
      finalExpensesLabel: 'Gastos Finales',
      recommendedCoverageLabel: 'Meta Sugerida',
      applyEstimatorCta: 'Usar Estimado',
      requestQuoteCta: 'Elegir Plan',
      plans: {
        mortgage_protection: {
          title: 'Protección Hipotecaria',
          summary: 'Cubre su hipoteca en caso de fallecimiento, enfermedad crítica o discapacidad.',
          typicalTerm: '15–30 Años',
          coverageRange: '$100K – $2M',
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
      searchPlaceholder: 'Buscar estado, código (TX) o licencia...',
      statusFilterAll: 'Todos',
      statusFilterActive: 'Solo Activas',
      statusFilterRenewal: 'Renovación Pendiente',
      regions: {
        all: 'Todos',
        midwest: 'Medio Oeste',
        south: 'Sur',
        west: 'Oeste',
        northeast: 'Noreste',
      },
      tableHeaders: {
        state: 'Estado',
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
      showAllButton: 'Ver los {total} Estados',
      showLessButton: 'Ver Primeros 6',
      emptyTitle: 'Sin licencias coincidentes',
      clearFilters: 'Restablecer',
      showingCount: 'Mostrando {count} de {total} estados',
      modal: {
        title: 'Registro Oficial de Licencia',
        authority: 'Departamento Emisor',
        licenseNumber: 'Licencia Estatal',
        npn: 'Número Nacional (NPN)',
        lines: 'Líneas Autorizadas',
        issueDate: 'Emisión',
        expirationDate: 'Vencimiento',
        status: 'Estatus',
        copyLicense: 'Copiar #',
        copied: 'Copiado',
        officialPortal: 'Portal Estatal DOI',
        close: 'Cerrar',
      },
    },
    careers: {
      sectionTitle: '03. Únase a Nuestra Agencia',
      sectionSubtitle: 'Desarrolle una carrera independiente con Yousif Dawood y Family First Life.',
      highlights: [
        'Renovaciones propias desde el día 1',
        'Prospectos exclusivos sin llamadas en frío',
        'Mentoría directa y guiones multilingües',
      ],
      tracks: {
        part_time: {
          label: 'Medio Tiempo',
          headline: '10–15 hrs/semana junto a su empleo',
          summary: 'Horario flexible con acompañamiento práctico en sus primeras 10 pólizas.',
        },
        full_time: {
          label: 'Tiempo Completo',
          headline: '35+ hrs/semana práctica independiente',
          summary: 'Citas semanales constantes en múltiples estados y comisiones competitivas.',
        },
        agency_builder: {
          label: 'Líder de Agencia',
          headline: 'Reclute y dirija su equipo regional',
          summary: 'Participación sobre producción de equipo con sistemas CRM y mentoría.',
        },
      },
      applyCta: 'Aplicar Ahora',
      formTitle: 'Solicitud de Agente',
      fields: {
        fullName: 'Nombre Completo',
        email: 'Correo',
        phone: 'Teléfono',
        state: 'Estado',
        licenseStatus: 'Estado de Licencia',
        licenseOptions: {
          licensed: 'Licencia Activa',
          studying: 'En Pre-Licenciamiento',
          new_to_industry: 'Nuevo en Seguros',
        },
        submit: 'Enviar Solicitud',
        submitting: 'Enviando...',
        cancel: 'Cancelar',
      },
      successTitle: 'Solicitud Enviada',
      successBody: 'Enviada a FamilyFirstLifeBusiness@gmail.com. Yousif le responderá en un día hábil.',
      fallbackAction: 'Enviar por App de Correo',
      submitError: 'No se pudo enviar ahora. Intente nuevamente.',
      anotherButton: 'Enviar Otra',
    },
    contact: {
      sectionTitle: '04. Solicitar Consulta',
      sectionSubtitle: 'Comparación gratuita en inglés, árabe o español.',
      officeHoursLabel: 'Horario',
      officeHoursValue: 'Lun – Sáb · 8:30 AM – 7:30 PM EST',
      languagesLabel: 'Idiomas',
      languagesValue: 'English · العربية · Español',
      directPhoneLabel: 'Teléfono',
      directEmailLabel: 'Correo',
      affiliationValue: 'Family First Life · NPN 20849173',
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
      successBody: 'Enviada a FamilyFirstLifeBusiness@gmail.com. Yousif le contactará en un día hábil.',
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
