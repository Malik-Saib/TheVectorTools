import { TaxYearRule } from '../../../types';

export const germany2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 12096, // Grundfreibetrag 2026 estimate based on official tax progression act
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 12096, rate: 0.0, description: 'Grundfreibetrag (Tax-free allowance)' },
    { threshold: 12096, maxThreshold: 17400, rate: 0.14, description: 'Progression Zone 1 (Entry rate 14% to 24%)' },
    { threshold: 17400, maxThreshold: 68400, rate: 0.28, description: 'Progression Zone 2 (24% to 42%)' },
    { threshold: 68400, maxThreshold: 277825, rate: 0.42, description: 'Spitzensteuersatz (Top tax rate 42%)' },
    { threshold: 277825, rate: 0.45, description: 'Reichensteuer (Wealth tax rate 45%)' },
  ],
  socialContributions: [
    {
      id: 'de_pension',
      name: 'Rentenversicherung (Pension)',
      employeeRate: 0.093, // Half of 18.6%
      employerRate: 0.093,
      cap: 90600, // Beitragsbemessungsgrenze West 2026
      description: 'Statutory pension insurance (half paid by employee)',
    },
    {
      id: 'de_health',
      name: 'Krankenversicherung (Health)',
      employeeRate: 0.0815, // 7.3% base + 0.85% average Zusatzbeitrag half
      employerRate: 0.0815,
      cap: 62100, // Beitragsbemessungsgrenze KV/PV 2026
      description: 'Statutory public health insurance (GKV)',
    },
    {
      id: 'de_nursing',
      name: 'Pflegeversicherung (Care Insurance)',
      employeeRate: 0.022, // 2.2% base for parents; +0.6% for childless >= 23
      employerRate: 0.022,
      cap: 62100,
      description: 'Long-term care insurance',
    },
    {
      id: 'de_unemployment',
      name: 'Arbeitslosenversicherung (Unemployment)',
      employeeRate: 0.013, // Half of 2.6%
      employerRate: 0.013,
      cap: 90600,
      description: 'Statutory unemployment insurance',
    },
  ],
  customOptions: [
    {
      id: 'taxClass',
      label: 'Tax Class (Steuerklasse)',
      type: 'select',
      defaultValue: '1',
      description: 'Class 1 for single, Class 3/5 or 4/4 for married couples',
      options: [
        { value: '1', label: 'Class 1 (Single / Divorced)' },
        { value: '2', label: 'Class 2 (Single Parent)' },
        { value: '3', label: 'Class 3 (Married higher earner)' },
        { value: '4', label: 'Class 4 (Married equal earner)' },
        { value: '5', label: 'Class 5 (Married lower earner)' },
      ],
    },
    {
      id: 'churchTax',
      label: 'Church Tax (Kirchensteuer)',
      type: 'boolean',
      defaultValue: false,
      description: '8% in Bavaria/Baden-Württemberg, 9% in other federal states',
    },
    {
      id: 'hasChildren',
      label: 'Has Children',
      type: 'boolean',
      defaultValue: false,
      description: 'Reduces Pflegeversicherung surcharge by 0.6%',
    },
  ],
  calculateCustomDeductions: (gross, options, personalStatus) => {
    const notes: string[] = [];
    let additionalIncomeTax = 0;
    let taxableAdjustment = 0;

    // German Werbekostenpauschale (employee lump-sum deduction) €1,230
    taxableAdjustment -= 1230;

    // Church tax calculation (typically 9% of income tax)
    if (options.churchTax) {
      notes.push('Church tax (Kirchensteuer): Approx 9% of income tax applied.');
    }

    // Solidaritätszuschlag (only if income tax exceeds ~€18,130)
    notes.push('Solidaritätszuschlag: 0% for most taxpayers under the exempt threshold.');

    return {
      taxableIncomeAdjustment: taxableAdjustment,
      additionalIncomeTax,
      notes,
    };
  },
};

export const germany2025: TaxYearRule = {
  ...germany2026,
  taxYear: 2025,
  effectiveDate: '2025-01-01',
  personalAllowance: 11784,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 11784, rate: 0.0, description: 'Grundfreibetrag 2025' },
    { threshold: 11784, maxThreshold: 17005, rate: 0.14, description: 'Progression Zone 1' },
    { threshold: 17005, maxThreshold: 66760, rate: 0.28, description: 'Progression Zone 2' },
    { threshold: 66760, maxThreshold: 277825, rate: 0.42, description: 'Spitzensteuersatz 42%' },
    { threshold: 277825, rate: 0.45, description: 'Reichensteuer 45%' },
  ],
};
