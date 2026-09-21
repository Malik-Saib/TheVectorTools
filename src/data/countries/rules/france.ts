import { TaxYearRule } from '../../../types';

export const france2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 11294, // 0% bracket up to €11,294
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 11294, rate: 0.0, description: 'Tranche à 0%' },
    { threshold: 11294, maxThreshold: 28797, rate: 0.11, description: 'Tranche à 11%' },
    { threshold: 28797, maxThreshold: 82341, rate: 0.30, description: 'Tranche à 30%' },
    { threshold: 82341, maxThreshold: 177106, rate: 0.41, description: 'Tranche à 41%' },
    { threshold: 177106, rate: 0.45, description: 'Tranche à 45%' },
  ],
  socialContributions: [
    {
      id: 'fr_csg_crds',
      name: 'CSG & CRDS (9.7% on 98.25% gross)',
      employeeRate: 0.0953, // 9.7% of 98.25%
      employerRate: 0.0,
      description: 'Contribution Sociale Généralisée & Remboursement Dette Sociale',
    },
    {
      id: 'fr_pension_health',
      name: 'Cotisations Retraite & Santé (Social Security)',
      employeeRate: 0.115, // Base + Agirc-Arrco Tranche 1 & 2 avg employee share
      employerRate: 0.30, // Employer social charges ~30-40%
      description: 'Assurance vieillesse, prévoyance et cotisations obligatoires',
    },
  ],
  customOptions: [
    {
      id: 'isCadre',
      label: 'Cadre Status (Executive)',
      type: 'boolean',
      defaultValue: false,
      description: 'Cadres pay slightly higher retirement (APEC, Agirc-Arrco) and death insurance charges (~22-24% total social contributions)',
    },
    {
      id: 'mutuelle',
      label: 'Company Health Insurance (Mutuelle)',
      type: 'boolean',
      defaultValue: true,
      description: 'Employer pays at least 50% of standard complementary health insurance',
    },
  ],
  calculateCustomDeductions: (gross, options, personalStatus, childrenCount) => {
    const notes: string[] = [];
    let additionalSocialDeductions = 0;
    
    // Cadre addition
    if (options.isCadre) {
      additionalSocialDeductions += gross * 0.018; // approx ~1.8% extra cadre contribution
      notes.push('Cadre status: includes APEC and supplementary executive pension scheme.');
    }

    // 10% standard professional expenses deduction (abattement forfaitaire pour frais professionnels, min €495, max ~€14,171)
    const deduction = Math.min(14171, Math.max(495, gross * 0.10));
    notes.push(`Abattement 10% frais professionnels: -€${Math.round(deduction)} applied to taxable base.`);

    // Quotient familial parts calculation
    let parts = 1;
    if (personalStatus === 'married') parts += 1;
    if (personalStatus === 'single_parent') parts += 0.5;
    if (childrenCount > 0) {
      parts += childrenCount <= 2 ? childrenCount * 0.5 : 1 + (childrenCount - 2) * 1.0;
    }
    notes.push(`Quotient familial: ${parts} part(s) applied for income tax calculation.`);

    return {
      taxableIncomeAdjustment: -deduction,
      additionalSocialDeductions,
      notes,
    };
  },
};

export const france2025: TaxYearRule = {
  ...france2026,
  taxYear: 2025,
  effectiveDate: '2025-01-01',
};
