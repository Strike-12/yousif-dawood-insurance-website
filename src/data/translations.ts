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
    requestQuoteCta: string;
    plans: Record<
      CoverageKey,
      {
        title: string;
        summary: string;
        typicalTerm: string;
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
      coverage: 'Policies',
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
      sectionTitle: '01. Life Insurance Policies',
      sectionSubtitle: 'A quick, plain-English guide to each policy type and how it works.',
      requestQuoteCta: 'Select Policy',
      plans: {
        whole_life: {
          title: 'Whole Life Insurance',
          summary:
            'Permanent coverage that never expires as long as you pay. Your monthly rate is locked for life, and part of each payment builds cash value you can access later.',
          typicalTerm: 'Lifetime',
        },
        final_expense: {
          title: 'Final Expense Insurance',
          summary:
            'A smaller whole life policy made to cover funeral, burial, and end-of-life bills. Rates stay fixed forever and most people qualify with simple health questions.',
          typicalTerm: 'Lifetime',
        },
        term_life: {
          title: 'Term Life Insurance',
          summary:
            'Simple, budget-friendly protection for a set window—from 10 to 50 years. If you pass away during that term, it pays your family tax-free cash to cover living costs or a mortgage.',
          typicalTerm: '10–50 Years',
        },
        indexed_universal_life: {
          title: 'Indexed Universal Life (IUL)',
          summary:
            'Lifelong protection plus a flexible savings account linked to a market index. Your cash can grow tax-free when the market rises, with a 0% floor so market drops never reduce it.',
          typicalTerm: 'Lifetime',
        },
        guaranteed_whole_life: {
          title: 'Guaranteed Whole Life',
          summary:
            'Lifetime coverage with guaranteed approval—no medical exam and no health questions required. Your monthly rate never goes up, and your protection stays locked in for life.',
          typicalTerm: 'Lifetime',
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
      coverage: 'البوالص',
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
      sectionTitle: '01. بوالص التأمين على الحياة',
      sectionSubtitle: 'دليل سريع ومبسط لكل نوع بوليصة وكيف تعمل.',
      requestQuoteCta: 'اختر البوليصة',
      plans: {
        whole_life: {
          title: 'التأمين الدائم على الحياة (Whole Life)',
          summary:
            'تغطية دائمة لا تنتهي ما دمت تسدد الأقساط. قسطك الشهري يثبت مدى الحياة، وجزء منه يبني قيمة نقدية يمكنك الاستفادة منها لاحقاً.',
          typicalTerm: 'مدى الحياة',
        },
        final_expense: {
          title: 'تأمين المصاريف النهائية (Final Expense)',
          summary:
            'بوليصة دائمة بمبالغ مناسبة لتغطية تكاليف الجنازة والدفن والفواتير النهائية. أقساطها ثابتة ولا تزيد، ويسهل التأهل لها بأسئلة صحية بسيطة.',
          typicalTerm: 'مدى الحياة',
        },
        term_life: {
          title: 'التأمين المؤقت على الحياة (Term Life)',
          summary:
            'حماية اقتصادية لفترة محددة من 10 إلى 50 سنة. إذا توفي المؤمَّن عليه خلال المدة، تحصل العائلة على مبلغ معفى من الضرائب لتغطية المعيشة أو الرهن.',
          typicalTerm: '10–50 سنة',
        },
        indexed_universal_life: {
          title: 'التأمين الشامل المرتبط بالمؤشر (IUL)',
          summary:
            'تغطية مدى الحياة مع حساب ادخار مرن مرتبط بمؤشر السوق. ينمو رصيدك معفى من الضرائب عند صعود السوق، مع حماية 0% تمنع خسارة رصيدك عند الهبوط.',
          typicalTerm: 'مدى الحياة',
        },
        guaranteed_whole_life: {
          title: 'التأمين الدائم المضمون (Guaranteed Whole Life)',
          summary:
            'تغطية مدى الحياة بموافقة مضمونة دون فحص طبي أو أسئلة صحية. قسطك الشهري ثابت لا يرتفع، والتغطية تستمر معك مدى الحياة.',
          typicalTerm: 'مدى الحياة',
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
      coverage: 'Pólizas',
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
      sectionTitle: '01. Pólizas de Seguro de Vida',
      sectionSubtitle: 'Guía rápida y sencilla de cada tipo de póliza y cómo funciona.',
      requestQuoteCta: 'Elegir Póliza',
      plans: {
        whole_life: {
          title: 'Seguro de Vida Entera (Whole Life)',
          summary:
            'Cobertura permanente que nunca vence mientras pague su prima. Su pago mensual queda fijo de por vida y acumula valor en efectivo disponible más adelante.',
          typicalTerm: 'Vitalicia',
        },
        final_expense: {
          title: 'Seguro de Gastos Finales',
          summary:
            'Una póliza de vida entera más pequeña diseñada para cubrir funeral, entierro y cuentas finales. La tarifa nunca sube y califica con preguntas simples de salud.',
          typicalTerm: 'Vitalicia',
        },
        term_life: {
          title: 'Seguro de Vida a Término (Term Life)',
          summary:
            'Protección sencilla y económica por un plazo fijo de 10 a 50 años. Si fallece durante ese plazo, su familia recibe dinero libre de impuestos para gastos o hipoteca.',
          typicalTerm: '10–50 Años',
        },
        indexed_universal_life: {
          title: 'Vida Universal Indexada (IUL)',
          summary:
            'Protección vitalicia combinada con una cuenta flexible ligada a un índice bursátil. Su dinero crece libre de impuestos cuando sube el mercado, con piso del 0% contra caídas.',
          typicalTerm: 'Vitalicia',
        },
        guaranteed_whole_life: {
          title: 'Vida Entera Garantizada (Guaranteed Whole Life)',
          summary:
            'Cobertura de por vida con aprobación garantizada, sin examen médico ni preguntas de salud. Su pago mensual nunca sube y su protección permanece fija de por vida.',
          typicalTerm: 'Vitalicia',
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
