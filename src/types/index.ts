export type Language = 'en' | 'ar' | 'es';

export type Region = 'all' | 'midwest' | 'south' | 'west';

export type LicenseStatus = 'active' | 'renewal_scheduled';

export type CoverageKey =
  | 'whole_life'
  | 'final_expense'
  | 'term_life'
  | 'indexed_universal_life'
  | 'annuities';

export interface StateLicense {
  code: string;
  state: string;
  region: Exclude<Region, 'all'>;
  licenseNumber: string;
  licenseClass: string;
  npn: string;
  linesOfAuthority: string[];
  status: LicenseStatus;
  issueDate: string;
  expirationDate: string;
  departmentName: string;
  verificationUrl: string;
}

export type CareerTrackKey = 'independent_1099';
