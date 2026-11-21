export type Language = 'en' | 'ar' | 'es';

export type Region = 'all' | 'midwest' | 'south' | 'west' | 'northeast';

export type LicenseStatus = 'active' | 'renewal_scheduled';

export type CoverageKey =
  | 'mortgage_protection'
  | 'final_expense'
  | 'term_life'
  | 'indexed_universal_life'
  | 'annuities';

export interface StateLicense {
  code: string;
  state: string;
  region: Exclude<Region, 'all'>;
  licenseNumber: string;
  npn: string;
  linesOfAuthority: string[];
  status: LicenseStatus;
  issueDate: string;
  expirationDate: string;
  departmentName: string;
  verificationUrl: string;
}

export interface CoveragePlan {
  key: CoverageKey;
  number: string;
  featured?: boolean;
  typicalTerm: string;
  coverageRange: string;
  idealFor: string[];
}

export type CareerTrackKey = 'part_time' | 'full_time' | 'agency_builder';
