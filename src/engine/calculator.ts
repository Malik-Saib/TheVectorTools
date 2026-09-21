import {
  CalculationInput,
  CalculationResult,
  ContributionLineItem,
  CountryMeta,
  BenchmarkSalaryRow,
} from '../types';
import { getCountryById } from '../data/countries';

export function calculateSalary(input: CalculationInput): CalculationResult {
  const country = getCountryById(input.countryId);
  if (!country) {
    throw new Error(`Country with ID "${input.countryId}" not found.`);
  }

  const taxYear = input.taxYear || 2026;
  const rule = country.rulesByYear[taxYear] || country.rulesByYear[2026] || Object.values(country.rulesByYear)[0];
  if (!rule) {
    throw new Error(`Tax rules for year ${taxYear} not found for ${country.name}`);
  }

  // 1. Normalize input to Annual Gross
  let grossAnnual = 0;
  const safeGross = Math.max(0, Number(input.grossSalary) || 0);

  switch (input.frequency) {
    case 'annual':
      grossAnnual = safeGross;
      break;
    case 'monthly':
      grossAnnual = safeGross * 12;
      break;
    case 'weekly':
      grossAnnual = safeGross * 52;
      break;
    case 'hourly': {
      const hours = input.hoursPerWeek || 40;
      const weeks = input.weeksPerYear || 52;
      grossAnnual = safeGross * hours * weeks;
      break;
    }
    default:
      grossAnnual = safeGross;
  }

  // Handle edge case: 0 or negative salary
  if (grossAnnual <= 0) {
    return createZeroResult(country, taxYear, input.frequency);
  }

  // 2. Custom rules & options
  const customOpts = input.customOptions || {};
  let taxableAdjustment = 0;
  let customSocialDeductions = 0;
  let customAdditionalTax = 0;
  let taxCredits = 0;
  const calculationNotes: string[] = [];

  if (rule.calculateCustomDeductions) {
    const customRes = rule.calculateCustomDeductions(
      grossAnnual,
      customOpts,
      input.personalStatus,
      input.childrenCount
    );
    taxableAdjustment = customRes.taxableIncomeAdjustment || 0;
    customSocialDeductions = customRes.additionalSocialDeductions || 0;
    customAdditionalTax = customRes.additionalIncomeTax || 0;
    taxCredits = customRes.taxCredits || 0;
    if (customRes.notes) {
      calculationNotes.push(...customRes.notes);
    }
  }

  // 3. Social Contributions Calculation
  const socialContributionLines: ContributionLineItem[] = [];
  let totalSocialEmployeeAnnual = 0;
  let totalSocialEmployerAnnual = 0;

  for (const contrib of rule.socialContributions) {
    let subjectAmount = grossAnnual;

    // Minimum threshold
    if (contrib.minThreshold && grossAnnual < contrib.minThreshold) {
      subjectAmount = 0;
    } else if (contrib.minThreshold) {
      subjectAmount = grossAnnual - contrib.minThreshold;
    }

    // Upper ceiling / cap
    if (contrib.cap && subjectAmount > contrib.cap) {
      subjectAmount = contrib.cap;
    }

    const empAmount = Math.max(0, subjectAmount * contrib.employeeRate);
    const empyrRate = contrib.employerRate || 0;
    const empyrAmount = Math.max(0, (contrib.cap ? Math.min(grossAnnual, contrib.cap) : grossAnnual) * empyrRate);

    totalSocialEmployeeAnnual += empAmount;
    totalSocialEmployerAnnual += empyrAmount;

    socialContributionLines.push({
      id: contrib.id,
      name: contrib.name,
      employeeAmount: Math.round(empAmount),
      employerAmount: Math.round(empyrAmount),
      ratePercent: Number((contrib.employeeRate * 100).toFixed(2)),
    });
  }

  // Add custom social deductions (e.g. Student Loan, Cadre additional)
  totalSocialEmployeeAnnual += customSocialDeductions;

  // 4. Taxable Income Calculation
  // In most European jurisdictions, employee social security is deducted before income tax
  // In NL and DK, social contributions are partly unified into the tax scale
  let taxableIncome = grossAnnual;
  if (['de', 'fr', 'es', 'it', 'be', 'at', 'pl', 'fi', 'no', 'ch'].includes(country.id)) {
    taxableIncome = Math.max(0, grossAnnual - totalSocialEmployeeAnnual);
  }
  taxableIncome = Math.max(0, taxableIncome + taxableAdjustment);

  // 5. Progressive Income Tax Calculation
  let totalIncomeTaxAnnual = 0;
  const incomeTaxLines: { bracket: string; rate: number; amount: number }[] = [];

  const brackets = [...rule.incomeTaxBrackets].sort((a, b) => a.threshold - b.threshold);

  for (let i = 0; i < brackets.length; i++) {
    const b = brackets[i];
    if (taxableIncome <= b.threshold) {
      continue;
    }

    const bracketFloor = b.threshold;
    const bracketCeil = b.maxThreshold !== undefined ? b.maxThreshold : Infinity;
    const taxableInThisBracket = Math.max(0, Math.min(taxableIncome, bracketCeil) - bracketFloor);

    if (taxableInThisBracket > 0 && b.rate > 0) {
      const taxForBracket = taxableInThisBracket * b.rate;
      totalIncomeTaxAnnual += taxForBracket;

      incomeTaxLines.push({
        bracket: b.maxThreshold
          ? `${country.currencySymbol}${b.threshold.toLocaleString()} - ${country.currencySymbol}${b.maxThreshold.toLocaleString()}`
          : `Over ${country.currencySymbol}${b.threshold.toLocaleString()}`,
        rate: Number((b.rate * 100).toFixed(1)),
        amount: Math.round(taxForBracket),
      });
    }
  }

  totalIncomeTaxAnnual += customAdditionalTax;

  // Subtract tax credits (e.g. Ireland, Netherlands, Italy)
  if (taxCredits > 0) {
    totalIncomeTaxAnnual = Math.max(0, totalIncomeTaxAnnual - taxCredits);
  }

  // 6. Net Salary & Breakdowns
  const totalDeductionsAnnual = totalIncomeTaxAnnual + totalSocialEmployeeAnnual;
  const netSalaryAnnual = Math.max(0, grossAnnual - totalDeductionsAnnual);

  const grossSalaryMonthly = grossAnnual / 12;
  const grossSalaryWeekly = grossAnnual / 52;
  const grossSalaryHourly = grossAnnual / ((input.hoursPerWeek || 40) * (input.weeksPerYear || 52));

  const netSalaryMonthly = netSalaryAnnual / 12;
  const netSalaryWeekly = netSalaryAnnual / 52;

  const incomeTaxMonthly = totalIncomeTaxAnnual / 12;
  const socialContributionsMonthly = totalSocialEmployeeAnnual / 12;

  // Percentage calculations
  const effectiveTaxRate = grossAnnual > 0 ? (totalIncomeTaxAnnual / grossAnnual) * 100 : 0;
  const effectiveSocialRate = grossAnnual > 0 ? (totalSocialEmployeeAnnual / grossAnnual) * 100 : 0;
  const effectiveTotalDeductionRate = grossAnnual > 0 ? (totalDeductionsAnnual / grossAnnual) * 100 : 0;
  const takeHomePercentage = grossAnnual > 0 ? (netSalaryAnnual / grossAnnual) * 100 : 0;

  // Employer cost
  const employerCostAnnual = grossAnnual + totalSocialEmployerAnnual;

  return {
    country,
    taxYear,
    frequency: input.frequency,
    grossSalaryAnnual: Math.round(grossAnnual),
    grossSalaryMonthly: Math.round(grossSalaryMonthly),
    grossSalaryWeekly: Math.round(grossSalaryWeekly),
    grossSalaryHourly: Number(grossSalaryHourly.toFixed(2)),
    taxableIncome: Math.round(taxableIncome),
    incomeTaxAnnual: Math.round(totalIncomeTaxAnnual),
    socialContributionsAnnual: Math.round(totalSocialEmployeeAnnual),
    otherDeductionsAnnual: Math.round(customSocialDeductions),
    netSalaryAnnual: Math.round(netSalaryAnnual),
    incomeTaxMonthly: Math.round(incomeTaxMonthly),
    socialContributionsMonthly: Math.round(socialContributionsMonthly),
    otherDeductionsMonthly: Math.round(customSocialDeductions / 12),
    netSalaryMonthly: Math.round(netSalaryMonthly),
    netSalaryWeekly: Math.round(netSalaryWeekly),
    effectiveTaxRate: Number(effectiveTaxRate.toFixed(1)),
    effectiveSocialRate: Number(effectiveSocialRate.toFixed(1)),
    effectiveTotalDeductionRate: Number(effectiveTotalDeductionRate.toFixed(1)),
    takeHomePercentage: Number(takeHomePercentage.toFixed(1)),
    incomeTaxLines,
    socialContributionLines,
    employerCostAnnual: Math.round(employerCostAnnual),
    employerSocialAnnual: Math.round(totalSocialEmployerAnnual),
    calculationNotes,
    lastUpdated: country.lastUpdated,
  };
}

function createZeroResult(
  country: CountryMeta,
  taxYear: number,
  frequency: CalculationInput['frequency']
): CalculationResult {
  return {
    country,
    taxYear,
    frequency,
    grossSalaryAnnual: 0,
    grossSalaryMonthly: 0,
    grossSalaryWeekly: 0,
    grossSalaryHourly: 0,
    taxableIncome: 0,
    incomeTaxAnnual: 0,
    socialContributionsAnnual: 0,
    otherDeductionsAnnual: 0,
    netSalaryAnnual: 0,
    incomeTaxMonthly: 0,
    socialContributionsMonthly: 0,
    otherDeductionsMonthly: 0,
    netSalaryMonthly: 0,
    netSalaryWeekly: 0,
    effectiveTaxRate: 0,
    effectiveSocialRate: 0,
    effectiveTotalDeductionRate: 0,
    takeHomePercentage: 0,
    incomeTaxLines: [],
    socialContributionLines: [],
    employerCostAnnual: 0,
    employerSocialAnnual: 0,
    calculationNotes: ['Enter a gross salary amount to see your estimated take-home pay.'],
    lastUpdated: country.lastUpdated,
  };
}

export function generateBenchmarkSalaries(
  countryId: string,
  taxYear: number = 2026,
  amounts?: number[]
): BenchmarkSalaryRow[] {
  const country = getCountryById(countryId);
  if (!country) return [];

  const defaultTiers = [30000, 45000, 60000, 75000, 100000, 150000];
  // Adjust currency scale for countries like Sweden, Denmark, Norway, Poland
  let tiers = amounts || defaultTiers;
  if (country.currency === 'PLN') {
    tiers = [40000, 60000, 90000, 120000, 160000, 240000];
  } else if (['SEK', 'NOK', 'DKK'].includes(country.currency)) {
    tiers = [350000, 480000, 600000, 750000, 950000, 1200000];
  } else if (country.currency === 'CHF') {
    tiers = [55000, 75000, 95000, 120000, 150000, 200000];
  } else if (country.currency === 'GBP') {
    tiers = [25000, 35000, 50000, 70000, 95000, 130000];
  }

  return tiers.map((gross) => {
    const res = calculateSalary({
      countryId,
      taxYear,
      grossSalary: gross,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
    });
    return {
      grossAnnual: gross,
      netAnnual: res.netSalaryAnnual,
      netMonthly: res.netSalaryMonthly,
      effectiveTaxRate: res.effectiveTotalDeductionRate,
      takeHomePercentage: res.takeHomePercentage,
    };
  });
}
