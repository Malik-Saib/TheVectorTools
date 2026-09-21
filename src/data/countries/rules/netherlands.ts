import { TaxYearRule } from '../../../types';

export const netherlands2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 0, // In NL, tax credits (heffingskortingen) offset tax rather than a zero-bracket allowance
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 75518, rate: 0.3697, description: 'Schijf 1 (36.97% tax + national insurance)' },
    { threshold: 75518, rate: 0.4950, description: 'Schijf 2 (49.50% top bracket)' },
  ],
  socialContributions: [
    {
      id: 'nl_zvw',
      name: 'Zorgverzekeringswet (Zvw)',
      employeeRate: 0.0532, // Employee / non-employer part if applicable or private nominal premium
      employerRate: 0.0657, // Employer pays Zvw contribution 6.57%
      cap: 71628,
      description: 'Healthcare insurance act statutory employer/employee contribution',
    },
  ],
  customOptions: [
    {
      id: 'ruling30',
      label: '30% Ruling (Expats)',
      type: 'boolean',
      defaultValue: false,
      description: '30% of gross salary is completely exempt from Dutch payroll tax for eligible international hires',
    },
    {
      id: 'holidayAllowanceIncluded',
      label: 'Vacation Allowance (Vakantiegeld)',
      type: 'select',
      defaultValue: 'included',
      description: 'Standard 8% holiday allowance in the Netherlands',
      options: [
        { value: 'included', label: 'Included in entered salary' },
        { value: 'plus8', label: 'Add 8% extra on top of basic' },
      ],
    },
  ],
  calculateCustomDeductions: (gross, options) => {
    const notes: string[] = [];
    let taxableBase = gross;

    if (options.holidayAllowanceIncluded === 'plus8') {
      taxableBase = gross * 1.08;
      notes.push('8% Vakantiegeld added to taxable gross base.');
    }

    // 30% Ruling
    let taxableAdjustment = 0;
    if (options.ruling30) {
      taxableAdjustment = -(taxableBase * 0.30);
      notes.push('30% Ruling applied: 30% of your gross income is exempt from wage tax.');
    }

    // Heffingskortingen (Algemene heffingskorting + Arbeidskorting)
    // Algemene heffingskorting: max ~€3,362, phases out over €24,812
    let algemeen = 0;
    if (taxableBase <= 24812) {
      algemeen = 3362;
    } else if (taxableBase <= 75518) {
      algemeen = Math.max(0, 3362 - 0.0663 * (taxableBase - 24812));
    }

    // Arbeidskorting: max ~€5,532, peaks around €40,000, phases out above
    let arbeid = 0;
    if (taxableBase <= 11490) {
      arbeid = taxableBase * 0.084;
    } else if (taxableBase <= 39957) {
      arbeid = 968 + (taxableBase - 11490) * 0.31;
    } else if (taxableBase <= 124935) {
      arbeid = Math.max(0, 5532 - 0.0651 * (taxableBase - 39957));
    } else {
      arbeid = 0;
    }

    const totalCredits = algemeen + arbeid;
    notes.push(`Dutch Tax Credits applied: Algemene Heffingskorting (~€${Math.round(algemeen)}) + Arbeidskorting (~€${Math.round(arbeid)}).`);

    return {
      taxableIncomeAdjustment: taxableAdjustment,
      taxCredits: totalCredits,
      notes,
    };
  },
};

export const netherlands2025: TaxYearRule = {
  ...netherlands2026,
  taxYear: 2025,
  effectiveDate: '2025-01-01',
};
