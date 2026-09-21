import { TaxYearRule } from '../../../types';

export const spain2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 5550, // Mínimo del contribuyente
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 12450, rate: 0.19, description: 'Hasta 12.450 € (19%)' },
    { threshold: 12450, maxThreshold: 20200, rate: 0.24, description: '12.450 € a 20.200 € (24%)' },
    { threshold: 20200, maxThreshold: 35200, rate: 0.30, description: '20.200 € a 35.200 € (30%)' },
    { threshold: 35200, maxThreshold: 60000, rate: 0.37, description: '35.200 € a 60.000 € (37%)' },
    { threshold: 60000, maxThreshold: 300000, rate: 0.45, description: '60.000 € a 300.000 € (45%)' },
    { threshold: 30000, rate: 0.47, description: 'Más de 300.000 € (47%)' },
  ],
  socialContributions: [
    {
      id: 'es_contingencias',
      name: 'Contingencias Comunes (4.70%)',
      employeeRate: 0.047,
      employerRate: 0.236,
      cap: 56646, // Maximum contribution base 2026 (~€4,720.50/month * 12)
      description: 'Employee common illness and pension contribution',
    },
    {
      id: 'es_desempleo',
      name: 'Desempleo & FP (1.65%)',
      employeeRate: 0.0165, // 1.55% Desempleo + 0.10% Formación Profesional
      employerRate: 0.061,
      cap: 56646,
      description: 'Unemployment & Vocational Training contribution',
    },
  ],
  customOptions: [
    {
      id: 'community',
      label: 'Autonomous Community',
      type: 'select',
      defaultValue: 'madrid',
      description: 'Regional IRPF scale varies by Autonomous Community',
      options: [
        { value: 'madrid', label: 'Comunidad de Madrid (Lowest IRPF rate)' },
        { value: 'catalonia', label: 'Cataluña' },
        { value: 'andalucia', label: 'Andalucía' },
        { value: 'valencia', label: 'Comunidad Valenciana' },
        { value: 'general', label: 'Other / National Average' },
      ],
    },
  ],
  calculateCustomDeductions: (gross) => {
    const notes: string[] = [];
    
    // Gastos deducibles de rendimientos del trabajo (standard €2,000 general allowance)
    let deduction = 2000;
    // Reducción por obtención de rendimientos del trabajo for lower incomes (<€19,747)
    if (gross < 19747) {
      deduction += Math.min(6498, Math.max(0, 6498 - (gross - 14049) * 1.14));
      notes.push('Reducción por rendimientos del trabajo applied for lower salary threshold.');
    }
    notes.push('Mínimo personal y familiar (€5,550 base) applied to progressive tax scale.');

    return {
      taxableIncomeAdjustment: -deduction,
      notes,
    };
  },
};

export const spain2025: TaxYearRule = {
  ...spain2026,
  taxYear: 2025,
  effectiveDate: '2025-01-01',
};
