import { TaxYearRule } from '../../../types';

// Future expansion countries: United States, Canada, Australia, New Zealand
export const usa2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'USD',
  currencySymbol: '$',
  personalAllowance: 15000, // Standard deduction for single filer
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 11925, rate: 0.10, description: '10% Federal Bracket' },
    { threshold: 11925, maxThreshold: 48475, rate: 0.12, description: '12% Federal Bracket' },
    { threshold: 48475, maxThreshold: 103350, rate: 0.22, description: '22% Federal Bracket' },
    { threshold: 103350, maxThreshold: 197300, rate: 0.24, description: '24% Federal Bracket' },
    { threshold: 197300, maxThreshold: 250525, rate: 0.32, description: '32% Federal Bracket' },
    { threshold: 250525, maxThreshold: 626350, rate: 0.35, description: '35% Federal Bracket' },
    { threshold: 626350, rate: 0.37, description: '37% Federal Bracket' },
  ],
  socialContributions: [
    {
      id: 'us_social_security',
      name: 'Social Security (OASDI 6.2%)',
      employeeRate: 0.062,
      employerRate: 0.062,
      cap: 176100, // Wage base limit 2026
      description: 'Federal Old-Age, Survivors, and Disability Insurance',
    },
    {
      id: 'us_medicare',
      name: 'Medicare (HI 1.45%)',
      employeeRate: 0.0145,
      employerRate: 0.0145,
      description: 'Hospital Insurance (plus 0.9% additional over $200,000)',
    },
  ],
  customOptions: [
    {
      id: 'state',
      label: 'State Income Tax',
      type: 'select',
      defaultValue: 'no_state',
      description: 'State tax rates vary from 0% (TX, FL, WA) to ~13.3% (CA)',
      options: [
        { value: 'no_state', label: 'No State Tax (e.g. TX, FL, WA, NV)' },
        { value: 'california', label: 'California (~1% to 13.3%)' },
        { value: 'new_york', label: 'New York (~4% to 10.9%)' },
        { value: 'average', label: 'Average State Tax (~5%)' },
      ],
    },
  ],
  calculateCustomDeductions: () => ({
    taxableIncomeAdjustment: -15000,
    notes: [
      'Federal Standard Deduction of $15,000 applied for single taxpayer.',
      'State taxes vary depending on selected state.',
    ],
  }),
};

export const canada2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'CAD',
  currencySymbol: 'CA$',
  personalAllowance: 15705, // Basic Personal Amount
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 57375, rate: 0.15, description: 'Federal 15%' },
    { threshold: 57375, maxThreshold: 114750, rate: 0.205, description: 'Federal 20.5%' },
    { threshold: 114750, maxThreshold: 177882, rate: 0.26, description: 'Federal 26%' },
    { threshold: 177882, maxThreshold: 253414, rate: 0.29, description: 'Federal 29%' },
    { threshold: 253414, rate: 0.33, description: 'Federal 33%' },
  ],
  socialContributions: [
    {
      id: 'ca_cpp',
      name: 'Canada Pension Plan (CPP 5.95%)',
      employeeRate: 0.0595,
      employerRate: 0.0595,
      cap: 73200,
      description: 'CPP base and enhanced contribution',
    },
    {
      id: 'ca_ei',
      name: 'Employment Insurance (EI 1.66%)',
      employeeRate: 0.0166,
      employerRate: 0.0232,
      cap: 65700,
      description: 'EI employee premiums',
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      'Federal Basic Personal Amount applied.',
      'Provincial income taxes (Ontario, British Columbia, Quebec, etc.) apply in addition to federal rates.',
    ],
  }),
};

export const australia2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-07-01',
  currency: 'AUD',
  currencySymbol: 'A$',
  personalAllowance: 18200, // Tax-free threshold
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 18200, rate: 0.0, description: 'Tax-free threshold' },
    { threshold: 18200, maxThreshold: 45000, rate: 0.16, description: 'Stage 3 amended rate (16%)' },
    { threshold: 45000, maxThreshold: 135000, rate: 0.30, description: 'Middle bracket (30%)' },
    { threshold: 135000, maxThreshold: 190000, rate: 0.37, description: 'High bracket (37%)' },
    { threshold: 190000, rate: 0.45, description: 'Top marginal rate (45%)' },
  ],
  socialContributions: [
    {
      id: 'au_medicare',
      name: 'Medicare Levy (2.0%)',
      employeeRate: 0.02,
      description: 'Medicare levy on taxable income',
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      'Employer Superannuation Guarantee (11.5% - 12%) is paid on top of ordinary times earnings.',
      'Low Income Tax Offset (LITO) applies for lower income earners.',
    ],
  }),
};

export const newZealand2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-04-01',
  currency: 'NZD',
  currencySymbol: 'NZ$',
  personalAllowance: 0,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 15600, rate: 0.105, description: '10.5% Bracket' },
    { threshold: 15600, maxThreshold: 53500, rate: 0.175, description: '17.5% Bracket' },
    { threshold: 53500, maxThreshold: 78100, rate: 0.30, description: '30% Bracket' },
    { threshold: 78100, maxThreshold: 180000, rate: 0.33, description: '33% Bracket' },
    { threshold: 180000, rate: 0.39, description: 'Top 39% Bracket' },
  ],
  socialContributions: [
    {
      id: 'nz_acc',
      name: 'ACC Earner’s Levy (1.60%)',
      employeeRate: 0.016,
      cap: 142283,
      description: 'Accident Compensation Corporation levy',
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      'KiwiSaver contributions (typically 3%, 4%, or 8%) are voluntary deductions.',
      'Independent Earner Tax Credit (IETC) applies for qualifying middle incomes.',
    ],
  }),
};
