import { TaxYearRule } from '../../../types';

export const uk2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-04-06',
  currency: 'GBP',
  currencySymbol: '£',
  personalAllowance: 12570,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 12570, rate: 0.0, description: 'Personal Allowance (Tax-free)' },
    { threshold: 12570, maxThreshold: 50270, rate: 0.20, description: 'Basic rate (20%)' },
    { threshold: 50270, maxThreshold: 125140, rate: 0.40, description: 'Higher rate (40%)' },
    { threshold: 125140, rate: 0.45, description: 'Additional rate (45%)' },
  ],
  socialContributions: [
    {
      id: 'uk_ni_main',
      name: 'National Insurance (Primary 8%)',
      employeeRate: 0.08, // Class 1 Employee NI reduced to 8%
      employerRate: 0.138, // Employer NI (13.8% or 15% under newer budget reforms)
      minThreshold: 12570,
      cap: 50270,
      description: 'Employee Class 1 National Insurance between Primary Threshold and UEL',
    },
    {
      id: 'uk_ni_upper',
      name: 'National Insurance (Upper 2%)',
      employeeRate: 0.02,
      employerRate: 0.138,
      minThreshold: 50270,
      description: 'Employee Class 1 National Insurance above Upper Earnings Limit (£50,270)',
    },
  ],
  customOptions: [
    {
      id: 'scotlandTax',
      label: 'Resident in Scotland',
      type: 'boolean',
      defaultValue: false,
      description: 'Scottish Income Tax rates (Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Advanced 45%, Top 48%)',
    },
    {
      id: 'studentLoan',
      label: 'Student Loan Repayment',
      type: 'select',
      defaultValue: 'none',
      description: 'Deducted directly from salary via PAYE',
      options: [
        { value: 'none', label: 'No student loan' },
        { value: 'plan1', label: 'Plan 1 (9% over £24,990)' },
        { value: 'plan2', label: 'Plan 2 (9% over £27,295)' },
        { value: 'postgrad', label: 'Postgraduate (6% over £21,000)' },
      ],
    },
  ],
  calculateCustomDeductions: (gross, options) => {
    const notes: string[] = [];
    let additionalSocialDeductions = 0;
    let taxableAdjustment = 0;

    // UK Personal Allowance Tapering: reduces by £1 for every £2 of income above £100,000
    if (gross > 100000) {
      const taper = Math.min(12570, (gross - 100000) / 2);
      taxableAdjustment += taper; // effectively adds to taxable income by removing allowance
      notes.push(`Personal Allowance taper: reduced by £${Math.round(taper)} because gross earnings exceed £100,000.`);
    }

    // Student loan calculation
    if (options.studentLoan === 'plan2' && gross > 27295) {
      const loan = (gross - 27295) * 0.09;
      additionalSocialDeductions += loan;
      notes.push(`Plan 2 Student Loan: £${Math.round(loan)} deducted at 9% above £27,295 threshold.`);
    } else if (options.studentLoan === 'plan1' && gross > 24990) {
      const loan = (gross - 24990) * 0.09;
      additionalSocialDeductions += loan;
      notes.push(`Plan 1 Student Loan: £${Math.round(loan)} deducted at 9% above £24,990 threshold.`);
    }

    return {
      taxableIncomeAdjustment: taxableAdjustment,
      additionalSocialDeductions,
      notes,
    };
  },
};

export const uk2025: TaxYearRule = {
  ...uk2026,
  taxYear: 2025,
  effectiveDate: '2025-04-06',
};
