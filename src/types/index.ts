export type CurrencyCode = 'EUR' | 'GBP' | 'CHF' | 'PLN' | 'SEK' | 'DKK' | 'NOK' | 'USD' | 'CAD' | 'AUD' | 'NZD';

export type SalaryFrequency = 'annual' | 'monthly' | 'weekly' | 'hourly';

export type PersonalStatus = 'single' | 'married' | 'single_parent';

export interface TaxBracket {
  threshold: number; // minimum amount for this bracket
  maxThreshold?: number; // optional upper bound
  rate: number; // e.g. 0.20 for 20%
  description?: string;
}

export interface SocialContributionRate {
  id: string;
  name: string;
  employeeRate: number; // fraction, e.g. 0.093 for 9.3%
  employerRate?: number; // employer portion
  cap?: number; // annual ceiling if any
  minThreshold?: number; // exempt amount under threshold
  description?: string;
}

export interface TaxOptionField {
  id: string;
  label: string;
  type: 'select' | 'boolean' | 'number';
  defaultValue: string | boolean | number;
  description?: string;
  options?: { value: string; label: string }[];
}

export interface TaxYearRule {
  taxYear: number;
  effectiveDate: string;
  currency: CurrencyCode;
  currencySymbol: string;
  personalAllowance: number;
  incomeTaxBrackets: TaxBracket[];
  socialContributions: SocialContributionRate[];
  employerContributions?: SocialContributionRate[];
  customOptions?: TaxOptionField[];
  calculateCustomDeductions?: (
    gross: number,
    options: Record<string, any>,
    personalStatus: PersonalStatus,
    childrenCount: number
  ) => {
    taxableIncomeAdjustment?: number;
    additionalIncomeTax?: number;
    additionalSocialDeductions?: number;
    taxCredits?: number;
    notes?: string[];
  };
}

export interface CountryMeta {
  id: string;
  slug: string;
  name: string;
  flag: string;
  currency: CurrencyCode;
  currencySymbol: string;
  defaultGross: number;
  averageSalary: number;
  officialAuthority: {
    name: string;
    url: string;
    portalName: string;
  };
  lastUpdated: string;
  supportedYears: number[];
  rulesByYear: Record<number, TaxYearRule>;
  overview: string;
  taxSystemSummary: string;
  socialSecuritySummary: string;
  faq: { question: string; answer: string }[];
}

export interface CalculationInput {
  countryId: string;
  taxYear: number;
  grossSalary: number;
  frequency: SalaryFrequency;
  personalStatus: PersonalStatus;
  childrenCount: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
  customOptions?: Record<string, any>;
}

export interface ContributionLineItem {
  id: string;
  name: string;
  employeeAmount: number;
  employerAmount?: number;
  ratePercent: number;
}

export interface CalculationResult {
  country: CountryMeta;
  taxYear: number;
  frequency: SalaryFrequency;
  grossSalaryAnnual: number;
  grossSalaryMonthly: number;
  grossSalaryWeekly: number;
  grossSalaryHourly: number;
  
  // Annual breakdown
  taxableIncome: number;
  incomeTaxAnnual: number;
  socialContributionsAnnual: number;
  otherDeductionsAnnual: number;
  netSalaryAnnual: number;
  
  // Monthly breakdown
  incomeTaxMonthly: number;
  socialContributionsMonthly: number;
  otherDeductionsMonthly: number;
  netSalaryMonthly: number;
  
  // Weekly breakdown
  netSalaryWeekly: number;
  
  // Percentages
  effectiveTaxRate: number; // 0 to 100
  effectiveSocialRate: number; // 0 to 100
  effectiveTotalDeductionRate: number; // 0 to 100
  takeHomePercentage: number; // 0 to 100
  
  // Detailed items
  incomeTaxLines: { bracket: string; rate: number; amount: number }[];
  socialContributionLines: ContributionLineItem[];
  employerCostAnnual: number;
  employerSocialAnnual: number;
  
  // Notes / Explanations
  calculationNotes: string[];
  lastUpdated: string;
}

export interface BenchmarkSalaryRow {
  grossAnnual: number;
  netAnnual: number;
  netMonthly: number;
  effectiveTaxRate: number;
  takeHomePercentage: number;
}

// ----------------------------------------------------
// THE VECTOR TOOLS Platform Types
// ----------------------------------------------------

export type ToolCategory = 
  | 'calculators' 
  | 'converters' 
  | 'text-file'
  | 'text-tools'
  | 'pdf'
  | 'finance'
  | 'developer'
  | 'business';

export type BusinessSubcategory =
  | 'documents-data'
  | 'spreadsheet-tools'
  | 'business-documents'
  | 'business-calculators'
  | 'product-marketing';

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ToolCategory;
  categoryLabel: string;
  subcategory?: BusinessSubcategory | string;
  subcategoryLabel?: string;
  iconName: string;
  badge?: string;
  popular?: boolean;
  keywords: string[];
  relatedToolSlugs: string[];
  howToUse: string[];
  howItWorks: string;
  example: {
    title: string;
    scenario: string;
    calculation: string;
    result: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
  };
  sources?: {
    name: string;
    url?: string;
    description?: string;
  }[];
}

