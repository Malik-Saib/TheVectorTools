import { TaxYearRule } from '../../../types';

export const italy2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 8500, // No tax area for employees
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 28000, rate: 0.23, description: 'Fino a 28.000 € (23%)' },
    { threshold: 28000, maxThreshold: 50000, rate: 0.35, description: 'Da 28.000 € a 50.000 € (35%)' },
    { threshold: 50000, rate: 0.43, description: 'Oltre 50.000 € (43%)' },
  ],
  socialContributions: [
    {
      id: 'it_inps',
      name: 'INPS Contributi IVS (9.19%)',
      employeeRate: 0.0919, // Employee portion of INPS
      employerRate: 0.28, // Employer INPS & INAIL (~28-30%)
      description: 'Istituto Nazionale della Previdenza Sociale (pension & disability)',
    },
    {
      id: 'it_addizionale',
      name: 'Addizionale Regionale e Comunale (~2.0%)',
      employeeRate: 0.02,
      employerRate: 0.0,
      description: 'Average regional and municipal surcharges',
    },
  ],
  customOptions: [
    {
      id: 'mensilita',
      label: 'Number of Monthly Salaries',
      type: 'select',
      defaultValue: '13',
      description: 'Italian employment contracts usually pay 13 (Tredicesima) or 14 months',
      options: [
        { value: '12', label: '12 months' },
        { value: '13', label: '13 months (with Tredicesima)' },
        { value: '14', label: '14 months (with Quattordicesima)' },
      ],
    },
  ],
  calculateCustomDeductions: (gross) => {
    const notes: string[] = [];
    
    // Detrazione da lavoro dipendente (decreases as income rises up to €50,000)
    let detrazione = 0;
    if (gross <= 15000) {
      detrazione = 1955;
    } else if (gross <= 28000) {
      detrazione = 1910 + 1190 * ((28000 - gross) / 13000);
    } else if (gross <= 50000) {
      detrazione = 1910 * ((50000 - gross) / 22000);
    }
    
    // Cuneo fiscale reduction for gross under €35k
    if (gross <= 25000) {
      notes.push('Taglio cuneo fiscale: 7% reduction applied to employee social security contribution.');
    } else if (gross <= 35000) {
      notes.push('Taglio cuneo fiscale: 6% reduction applied to employee social security contribution.');
    }
    
    notes.push(`Detrazione lavoro dipendente: -€${Math.round(detrazione)} tax credit deducted from gross IRPEF.`);

    return {
      taxCredits: detrazione,
      notes,
    };
  },
};

export const italy2025: TaxYearRule = {
  ...italy2026,
  taxYear: 2025,
  effectiveDate: '2025-01-01',
};
