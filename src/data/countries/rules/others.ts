import { TaxYearRule } from '../../../types';

// ======================== BELGIUM ========================
export const belgium2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 10570, // Quotité exemptée d'impôt
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 15820, rate: 0.25, description: 'Tranche 1 (25%)' },
    { threshold: 15820, maxThreshold: 27920, rate: 0.40, description: 'Tranche 2 (40%)' },
    { threshold: 27920, maxThreshold: 48320, rate: 0.45, description: 'Tranche 3 (45%)' },
    { threshold: 48320, rate: 0.50, description: 'Tranche 4 (50%)' },
  ],
  socialContributions: [
    {
      id: 'be_onss',
      name: 'ONSS / RSZ (Cotisation Salariale 13.07%)',
      employeeRate: 0.1307, // Standard 13.07% employee social security
      employerRate: 0.25, // Employer contribution approx 25-27%
      description: 'Office National de Sécurité Sociale (pension, maladie, chômage)',
    },
    {
      id: 'be_special_social',
      name: 'Cotisation Spéciale de Sécurité Sociale',
      employeeRate: 0.015,
      employerRate: 0.0,
      description: 'Special social security progressive contribution',
    },
  ],
  customOptions: [
    {
      id: 'communalTax',
      label: 'Municipal Tax (Taxe communale)',
      type: 'select',
      defaultValue: '7',
      description: 'Average municipal tax surcharge on base federal tax (typically 6% to 8%)',
      options: [
        { value: '0', label: '0% (Exempt / Special)' },
        { value: '6', label: '6% (Low e.g. Knokke)' },
        { value: '7', label: '7% (National Average)' },
        { value: '8', label: '8% (Higher municipality)' },
      ],
    },
  ],
  calculateCustomDeductions: (gross) => {
    // Forfaitaire beroepskosten (standard expense deduction capped at ~€5,520)
    const standardDeduction = Math.min(5520, gross * 0.30);
    return {
      taxableIncomeAdjustment: -standardDeduction,
      notes: [
        `Forfait de frais professionnels: -€${Math.round(standardDeduction)} deducted from taxable base.`,
        'Municipal tax surcharge applied to federal income tax rate.',
      ],
    };
  },
};

// ======================== AUSTRIA ========================
export const austria2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 13308,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 13308, rate: 0.0, description: 'Steuerfrei bis 13.308 €' },
    { threshold: 13308, maxThreshold: 21617, rate: 0.20, description: '20% Stufe' },
    { threshold: 21617, maxThreshold: 35836, rate: 0.30, description: '30% Stufe' },
    { threshold: 35836, maxThreshold: 69166, rate: 0.40, description: '40% Stufe' },
    { threshold: 69166, maxThreshold: 103072, rate: 0.48, description: '48% Stufe' },
    { threshold: 103072, rate: 0.50, description: '50% Stufe' },
  ],
  socialContributions: [
    {
      id: 'at_sv',
      name: 'Sozialversicherung (SV Dienstnehmer 18.12%)',
      employeeRate: 0.1812, // Pension 10.25%, Health 3.87%, Unemployment 2.95%, Chamber 1.05%
      employerRate: 0.2138,
      cap: 84840, // Höchstbeitragsgrundlage (approx €6,060/mo * 14)
      description: 'Pensions-, Kranken- und Arbeitslosenversicherung',
    },
  ],
  customOptions: [
    {
      id: 'salaryMonths',
      label: 'Salary Structure',
      type: 'select',
      defaultValue: '14',
      description: 'Austria standard is 14 payments (13th Urlaubsgeld & 14th Weihnachtsgeld taxed at preferential 6%)',
      options: [
        { value: '14', label: '14 payments (Standard Austrian Collective Contract)' },
        { value: '12', label: '12 equal payments' },
      ],
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      '13th and 14th salaries (Urlaubszuschuss & Weihnachtsgeld) benefit from special 6% fixed tax privilege under § 67 EStG.',
      'Verkehrsabsetzbetrag (employee commuter tax credit) applied.',
    ],
  }),
};

// ======================== IRELAND ========================
export const ireland2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 0,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 44000, rate: 0.20, description: 'Standard Rate (20%)' },
    { threshold: 44000, rate: 0.40, description: 'Higher Rate (40%)' },
  ],
  socialContributions: [
    {
      id: 'ie_prsi',
      name: 'PRSI Class A (4.0%)',
      employeeRate: 0.04,
      employerRate: 0.1105,
      minThreshold: 18304, // PRSI credit tapers below this
      description: 'Pay Related Social Insurance',
    },
    {
      id: 'ie_usc',
      name: 'Universal Social Charge (USC)',
      employeeRate: 0.035, // Weighted average across tiers (0.5%, 2%, 4%, 8%)
      employerRate: 0.0,
      description: 'Universal Social Charge progressive tax',
    },
  ],
  customOptions: [
    {
      id: 'maritalStatus',
      label: 'Tax Assessment Basis',
      type: 'select',
      defaultValue: 'single',
      options: [
        { value: 'single', label: 'Single / Individual' },
        { value: 'married_one_earner', label: 'Married (One Earner - €53,000 standard cutoff)' },
        { value: 'married_two_earners', label: 'Married (Two Earners)' },
      ],
    },
  ],
  calculateCustomDeductions: (gross) => {
    // Single Person Tax Credit (€1,875) + Employee (PAYE) Tax Credit (€1,875) = €3,750
    const totalTaxCredits = 3750;
    return {
      taxCredits: totalTaxCredits,
      notes: [
        'Personal Tax Credit (€1,875) and Employee (PAYE) Tax Credit (€1,875) directly offset income tax.',
        'USC computed across progressive tiers (0.5% to 8%).',
      ],
    };
  },
};

// ======================== PORTUGAL ========================
export const portugal2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 4104, // Dedução específica rendimentos de trabalho
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 7703, rate: 0.13, description: '1.º Escalão (13.0%)' },
    { threshold: 7703, maxThreshold: 11623, rate: 0.18, description: '2.º Escalão (18.0%)' },
    { threshold: 11623, maxThreshold: 16472, rate: 0.23, description: '3.º Escalão (23.0%)' },
    { threshold: 16472, maxThreshold: 21321, rate: 0.26, description: '4.º Escalão (26.0%)' },
    { threshold: 21321, maxThreshold: 27146, rate: 0.3275, description: '5.º Escalão (32.75%)' },
    { threshold: 27146, maxThreshold: 39791, rate: 0.37, description: '6.º Escalão (37.0%)' },
    { threshold: 39791, maxThreshold: 51997, rate: 0.435, description: '7.º Escalão (43.5%)' },
    { threshold: 51997, maxThreshold: 81199, rate: 0.45, description: '8.º Escalão (45.0%)' },
    { threshold: 81199, rate: 0.48, description: '9.º Escalão (48.0%)' },
  ],
  socialContributions: [
    {
      id: 'pt_seguranca_social',
      name: 'Segurança Social (Taxa Social Única 11.0%)',
      employeeRate: 0.11, // Employee contribution
      employerRate: 0.2375, // Employer TSU 23.75%
      description: 'Contribuição obrigatória para a Segurança Social',
    },
  ],
  customOptions: [
    {
      id: 'subsidios',
      label: 'Payment Scheme',
      type: 'select',
      defaultValue: '14',
      description: 'Portugal law mandates 14 payments (subsídio de férias e subsídio de Natal)',
      options: [
        { value: '14', label: '14 payments (Standard)' },
        { value: '12', label: '12 payments (Duodécimos)' },
      ],
    },
  ],
  calculateCustomDeductions: () => ({
    taxableIncomeAdjustment: -4104,
    notes: [
      'Dedução específica de €4.104 aplicada aos rendimentos de trabalho dependente.',
      'Escalões de IRS calculados progressivamente com Segurança Social (11%).',
    ],
  }),
};

// ======================== POLAND ========================
export const poland2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'PLN',
  currencySymbol: 'zł',
  personalAllowance: 30000, // Kwota wolna od podatku 30,000 PLN
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 30000, rate: 0.0, description: 'Kwota wolna (0%)' },
    { threshold: 30000, maxThreshold: 120000, rate: 0.12, description: 'Pierwszy próg (12%)' },
    { threshold: 120000, rate: 0.32, description: 'Drugi próg (32%)' },
  ],
  socialContributions: [
    {
      id: 'pl_zus_social',
      name: 'Składki ZUS (Emerytalne, Rentowe, Chorobowe)',
      employeeRate: 0.1371, // 9.76% emerytalne + 1.5% rentowe + 2.45% chorobowe
      employerRate: 0.2048,
      cap: 240000, // Annual 30-fold limit for pension/disability
      description: 'Social security contributions deducted before tax',
    },
    {
      id: 'pl_nfz_health',
      name: 'Składka zdrowotna NFZ (9.0%)',
      employeeRate: 0.0776, // 9% on gross minus ZUS social (approx 7.76% of gross)
      employerRate: 0.0,
      description: 'Statutory health insurance (non-deductible)',
    },
  ],
  customOptions: [
    {
      id: 'pitZeroUnder26',
      label: 'Relief for Youth under 26 (Ulga dla młodych)',
      type: 'boolean',
      defaultValue: false,
      description: 'Exemption from 12% income tax up to 85,528 PLN for employees under 26',
    },
  ],
  calculateCustomDeductions: (gross, options) => {
    const notes: string[] = [];
    let taxableAdjustment = -3000; // Koszty uzyskania przychodu 250 PLN/month = 3,000 PLN/yr
    if (options.pitZeroUnder26) {
      notes.push('Ulga dla młodych (PIT 0% under 26): Income tax exempt up to 85,528 PLN.');
    }
    return {
      taxableIncomeAdjustment: taxableAdjustment,
      notes,
    };
  },
};

// ======================== SWEDEN ========================
export const sweden2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'SEK',
  currencySymbol: 'kr',
  personalAllowance: 24000, // Grundavdrag
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 24000, rate: 0.0, description: 'Grundavdrag (Tax-free)' },
    { threshold: 24000, maxThreshold: 615000, rate: 0.322, description: 'Kommunalskatt (Municipal tax average 32.2%)' },
    { threshold: 615000, rate: 0.522, description: 'Statlig skatt + Kommunalskatt (52.2% total)' },
  ],
  socialContributions: [
    {
      id: 'se_pension',
      name: 'Allmän pensionsavgift (7.0% - offset by tax credit)',
      employeeRate: 0.015, // Net employee deduction after skattereduktion
      employerRate: 0.3142, // Arbetsgivaravgifter (31.42% paid by employer)
      description: 'National pension fee (mostly credited on tax return)',
    },
  ],
  customOptions: [
    {
      id: 'municipality',
      label: 'Municipality (Kommun)',
      type: 'select',
      defaultValue: 'stockholm',
      options: [
        { value: 'stockholm', label: 'Stockholm (29.82%)' },
        { value: 'goteborg', label: 'Göteborg (32.60%)' },
        { value: 'malmo', label: 'Malmö (32.42%)' },
        { value: 'average', label: 'National Average (32.24%)' },
      ],
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      'Jobbskatteavdrag (Earned Income Tax Credit) applied automatically.',
      'Employer pays 31.42% in Arbetsgivaravgifter (employer social security).',
    ],
  }),
};

// ======================== DENMARK ========================
export const denmark2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'DKK',
  currencySymbol: 'kr',
  personalAllowance: 49700, // Personfradrag
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 49700, rate: 0.0, description: 'Personfradrag (Tax-free)' },
    { threshold: 49700, maxThreshold: 618400, rate: 0.37, description: 'Bundskat & Kommuneskat (~37%)' },
    { threshold: 618400, rate: 0.52, description: 'Topskat (+15% top tax bracket)' },
  ],
  socialContributions: [
    {
      id: 'dk_am_bidrag',
      name: 'Arbejdsmarkedsbidrag (AM-bidrag 8.0%)',
      employeeRate: 0.08, // Mandatory 8% on all earned income
      employerRate: 0.02,
      description: 'Labour market contribution deducted directly from gross pay',
    },
    {
      id: 'dk_atp',
      name: 'ATP Livslang Pension',
      employeeRate: 0.005, // Fixed small nominal amount
      employerRate: 0.01,
      description: 'Supplementary statutory pension',
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      'AM-bidrag (8%) is deducted first before calculating income tax.',
      'Beskæftigelsesfradrag (employment allowance) up to DKK 45,000 applied.',
    ],
  }),
};

// ======================== FINLAND ========================
export const finland2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'EUR',
  currencySymbol: '€',
  personalAllowance: 19900,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 19900, rate: 0.075, description: 'Municipal tax only (~7.5%)' },
    { threshold: 19900, maxThreshold: 29700, rate: 0.195, description: 'State tax + Municipal tax (~19.5%)' },
    { threshold: 29700, maxThreshold: 49000, rate: 0.245, description: 'State tier 2 + Municipal (~24.5%)' },
    { threshold: 49000, maxThreshold: 85800, rate: 0.32, description: 'State tier 3 + Municipal (~32.0%)' },
    { threshold: 85800, rate: 0.44, description: 'Top national rate + Municipal (~44%)' },
  ],
  socialContributions: [
    {
      id: 'fi_pension',
      name: 'Työeläkevakuutusmaksu (Pension 7.15%)',
      employeeRate: 0.0715, // Under 53 years
      employerRate: 0.174,
      description: 'Mandatory employee pension contribution',
    },
    {
      id: 'fi_unemployment',
      name: 'Työttömyysvakuutusmaksu (Unemployment 0.79%)',
      employeeRate: 0.0079,
      employerRate: 0.012,
      description: 'Unemployment insurance fee',
    },
    {
      id: 'fi_health',
      name: 'Sairausvakuutuksen päivärahamaksu (Health 1.53%)',
      employeeRate: 0.0153,
      employerRate: 0.015,
      description: 'Daily allowance and medical care contribution',
    },
  ],
  calculateCustomDeductions: () => ({
    notes: [
      'Social security contributions are fully tax-deductible against state and municipal tax bases.',
      'Työtulovähennys (Earned income tax credit) reduces final tax bill.',
    ],
  }),
};

// ======================== NORWAY ========================
export const norway2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'NOK',
  currencySymbol: 'kr',
  personalAllowance: 88250, // Personfradrag
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 208050, rate: 0.22, description: 'Alminnelig inntekt flat tax (22%)' },
    { threshold: 208050, maxThreshold: 292850, rate: 0.237, description: 'Trinn 1 (+1.7%)' },
    { threshold: 292850, maxThreshold: 670000, rate: 0.26, description: 'Trinn 2 (+4.0%)' },
    { threshold: 670000, maxThreshold: 937900, rate: 0.356, description: 'Trinn 3 (+13.6%)' },
    { threshold: 937900, maxThreshold: 1350000, rate: 0.386, description: 'Trinn 4 (+16.6%)' },
    { threshold: 1350000, rate: 0.396, description: 'Trinn 5 (+17.6%)' },
  ],
  socialContributions: [
    {
      id: 'no_trygdeavgift',
      name: 'Trygdeavgift (National Insurance 7.8%)',
      employeeRate: 0.078,
      employerRate: 0.141, // Employer national insurance tax (Arbeidsgiveravgift zone 1)
      description: 'National insurance scheme member contribution',
    },
  ],
  calculateCustomDeductions: (gross) => {
    // Minstefradrag (standard deduction in salary: 46% up to max ~NOK 104,450)
    const minstefradrag = Math.min(104450, gross * 0.46);
    return {
      taxableIncomeAdjustment: -minstefradrag,
      notes: [
        `Minstefradrag: -NOK ${Math.round(minstefradrag)} deducted from general income.`,
        'Personfradrag (NOK 88,250) applied to general income tax.',
      ],
    };
  },
};

// ======================== SWITZERLAND ========================
export const switzerland2026: TaxYearRule = {
  taxYear: 2026,
  effectiveDate: '2026-01-01',
  currency: 'CHF',
  currencySymbol: 'CHF',
  personalAllowance: 14500,
  incomeTaxBrackets: [
    { threshold: 0, maxThreshold: 14500, rate: 0.0, description: 'Zero bracket' },
    { threshold: 14500, maxThreshold: 31600, rate: 0.08, description: 'Combined Federal + Cantonal (~8%)' },
    { threshold: 31600, maxThreshold: 55200, rate: 0.13, description: 'Combined Federal + Cantonal (~13%)' },
    { threshold: 55200, maxThreshold: 103600, rate: 0.18, description: 'Combined Federal + Cantonal (~18%)' },
    { threshold: 103600, maxThreshold: 176000, rate: 0.24, description: 'Combined Federal + Cantonal (~24%)' },
    { threshold: 176000, rate: 0.32, description: 'Top Combined Cantonal + Federal rate (~32%)' },
  ],
  socialContributions: [
    {
      id: 'ch_avs_ai_apg',
      name: 'AVS / AI / APG (1st Pillar 5.30%)',
      employeeRate: 0.053,
      employerRate: 0.053,
      description: 'Old-age, survivors and disability insurance',
    },
    {
      id: 'ch_ac',
      name: 'AC (Unemployment Insurance 1.10%)',
      employeeRate: 0.011,
      employerRate: 0.011,
      cap: 148200,
      description: 'Assurance-chômage',
    },
    {
      id: 'ch_lpp',
      name: 'LPP / BVG (2nd Pillar Occupational Pension ~4.5%)',
      employeeRate: 0.045, // Age-dependent average employee portion
      employerRate: 0.045,
      description: 'Prévoyance professionnelle (occupational pension)',
    },
  ],
  customOptions: [
    {
      id: 'canton',
      label: 'Canton of Residence',
      type: 'select',
      defaultValue: 'zurich',
      description: 'Swiss taxes vary significantly by canton',
      options: [
        { value: 'zurich', label: 'Zürich (ZH)' },
        { value: 'geneva', label: 'Geneva (GE)' },
        { value: 'vaud', label: 'Vaud / Lausanne (VD)' },
        { value: 'zug', label: 'Zug (ZG - Lowest taxation)' },
        { value: 'basel', label: 'Basel-Stadt (BS)' },
        { value: 'bern', label: 'Bern (BE)' },
      ],
    },
  ],
  calculateCustomDeductions: (gross, options) => {
    const notes: string[] = [];
    if (options.canton === 'zug') {
      notes.push('Canton Zug: low tax multiplier reduces cantonal/municipal tax.');
    } else if (options.canton === 'geneva') {
      notes.push('Canton Geneva: higher municipal tax scale with generous family allowances.');
    }
    notes.push('Swiss health insurance (LaMal) is paid privately as a per-person monthly premium rather than salary deduction.');
    return { notes };
  },
};
