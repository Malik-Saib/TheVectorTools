import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Share2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  Info,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { CalculationResult, SalaryFrequency } from '../types';
import { formatCurrency } from '../engine/currency';

interface ResultDisplayProps {
  result: CalculationResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [displayFrequency, setDisplayFrequency] = useState<'monthly' | 'annual' | 'weekly'>('monthly');
  const [showHowCalculated, setShowHowCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  const { country, currency, currencySymbol } = {
    country: result.country,
    currency: result.country.currency,
    currencySymbol: result.country.currencySymbol,
  };

  // Values based on active display toggle
  const currentGross = displayFrequency === 'monthly'
    ? result.grossSalaryMonthly
    : displayFrequency === 'annual'
    ? result.grossSalaryAnnual
    : result.grossSalaryWeekly;

  const currentNet = displayFrequency === 'monthly'
    ? result.netSalaryMonthly
    : displayFrequency === 'annual'
    ? result.netSalaryAnnual
    : result.netSalaryWeekly;

  const currentTax = displayFrequency === 'monthly'
    ? result.incomeTaxMonthly
    : displayFrequency === 'annual'
    ? result.incomeTaxAnnual
    : result.incomeTaxAnnual / 52;

  const currentSocial = displayFrequency === 'monthly'
    ? result.socialContributionsMonthly
    : displayFrequency === 'annual'
    ? result.socialContributionsAnnual
    : result.socialContributionsAnnual / 52;

  const currentOther = displayFrequency === 'monthly'
    ? result.otherDeductionsMonthly
    : displayFrequency === 'annual'
    ? result.otherDeductionsAnnual
    : result.otherDeductionsAnnual / 52;

  // Copy breakdown summary
  const handleCopyBreakdown = () => {
    const text = `EuroSalary Take-Home Pay Estimate (${result.country.name} - ${result.taxYear}):
Gross Salary: ${formatCurrency(result.grossSalaryAnnual, currency)} / yr (${formatCurrency(result.grossSalaryMonthly, currency)} / mo)
Net Salary: ${formatCurrency(result.netSalaryAnnual, currency)} / yr (${formatCurrency(result.netSalaryMonthly, currency)} / mo)
Income Tax: -${formatCurrency(result.incomeTaxAnnual, currency)} (${result.effectiveTaxRate}%)
Social Security: -${formatCurrency(result.socialContributionsAnnual, currency)} (${result.effectiveSocialRate}%)
Take-Home Percentage: ${result.takeHomePercentage}%
Calculated via EuroSalary.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (result.grossSalaryAnnual <= 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 shadow-xs">
        <Info className="w-10 h-10 mx-auto text-slate-400 mb-3" />
        <p className="font-medium text-slate-700">Enter your gross salary above</p>
        <p className="text-sm text-slate-500 mt-1">Your exact net pay and tax deductions will appear here in seconds.</p>
      </div>
    );
  }

  return (
    <div id="calculation-results" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
      {/* Top Banner with Take-Home Number */}
      <div className="bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Your Estimated Take-Home Pay
            </span>
            <div className="text-xs text-slate-400 mt-0.5">
              Based on {result.country.name} {result.taxYear} tax rules
            </div>
          </div>

          {/* Monthly / Annual / Weekly Toggle */}
          <div className="inline-flex rounded-xl bg-slate-800/90 p-1 border border-slate-700/60 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setDisplayFrequency('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                displayFrequency === 'monthly'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setDisplayFrequency('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                displayFrequency === 'annual'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Yearly
            </button>
            <button
              type="button"
              onClick={() => setDisplayFrequency('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                displayFrequency === 'weekly'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Hero Numbers */}
        <div className="mt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono flex items-baseline gap-2">
              <span>{formatCurrency(currentNet, currency)}</span>
              <span className="text-base sm:text-lg font-normal text-slate-400 tracking-normal font-sans">
                / {displayFrequency === 'monthly' ? 'month' : displayFrequency === 'annual' ? 'year' : 'week'}
              </span>
            </div>

            <div className="mt-2 text-sm text-slate-300 flex items-center gap-3">
              <span>
                Annual: <strong className="text-white font-mono">{formatCurrency(result.netSalaryAnnual, currency)}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span>
                Monthly: <strong className="text-white font-mono">{formatCurrency(result.netSalaryMonthly, currency)}</strong>
              </span>
            </div>
          </div>

          {/* Badge: You keep X% */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl px-4 py-2.5 flex items-center gap-3 self-start md:self-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              {result.takeHomePercentage}%
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 font-medium">Take-Home Rate</div>
              <div className="text-sm font-bold text-white">You keep {result.takeHomePercentage}%</div>
            </div>
          </div>
        </div>

        {/* Percentage Visualization Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Pay Distribution</span>
            <span>Total deductions: {result.effectiveTotalDeductionRate}%</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${Math.max(2, result.takeHomePercentage)}%` }} 
              className="bg-emerald-400 transition-all duration-500"
              title={`Net Pay: ${result.takeHomePercentage}%`}
            />
            <div 
              style={{ width: `${Math.max(0, result.effectiveTaxRate)}%` }} 
              className="bg-rose-400 transition-all duration-500"
              title={`Income Tax: ${result.effectiveTaxRate}%`}
            />
            <div 
              style={{ width: `${Math.max(0, result.effectiveSocialRate)}%` }} 
              className="bg-amber-400 transition-all duration-500"
              title={`Social Security: ${result.effectiveSocialRate}%`}
            />
          </div>

          {/* Bar Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Take-Home Pay ({result.takeHomePercentage}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>Income Tax ({result.effectiveTaxRate}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Social Security ({result.effectiveSocialRate}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>Salary Breakdown ({displayFrequency})</span>
          <span className="text-xs font-normal text-slate-500">Official {result.country.name} {result.taxYear} Rules</span>
        </h3>

        <div className="space-y-3">
          {/* Gross Salary */}
          <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
            <span className="text-sm font-semibold text-slate-800">Gross Salary</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {formatCurrency(currentGross, currency)}
            </span>
          </div>

          {/* Income Tax */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span className="text-slate-700">Income Tax (Est.)</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                {result.effectiveTaxRate}%
              </span>
            </div>
            <span className="font-semibold text-rose-600 font-mono">
              -{formatCurrency(currentTax, currency)}
            </span>
          </div>

          {/* Social Contributions */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-slate-700">Social Security Contributions</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                {result.effectiveSocialRate}%
              </span>
            </div>
            <span className="font-semibold text-amber-700 font-mono">
              -{formatCurrency(currentSocial, currency)}
            </span>
          </div>

          {/* Other Deductions if any */}
          {currentOther > 0 && (
            <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-slate-700">Other Deductions (e.g. Student Loan / Specific)</span>
              </div>
              <span className="font-semibold text-indigo-700 font-mono">
                -{formatCurrency(currentOther, currency)}
              </span>
            </div>
          )}

          {/* Net Salary Highlight */}
          <div className="flex items-center justify-between pt-3 pb-1 text-slate-900 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
            <div>
              <div className="text-sm font-extrabold text-emerald-950">Estimated Net Take-Home Salary</div>
              <div className="text-xs text-emerald-700 font-medium">Deposited into bank account</div>
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-900 font-mono">
              {formatCurrency(currentNet, currency)}
            </span>
          </div>
        </div>

        {/* Employer Cost Preview Pill */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-slate-800">Total Employer Cost:</span>{' '}
            <span className="font-mono font-bold text-slate-900">
              {formatCurrency(displayFrequency === 'monthly' ? result.employerCostAnnual / 12 : result.employerCostAnnual, currency)}
            </span>
            <span className="text-slate-500 ml-1">
              (includes ~{formatCurrency(displayFrequency === 'monthly' ? result.employerSocialAnnual / 12 : result.employerSocialAnnual, currency)} employer payroll taxes)
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">Gross + Employer Social Security</span>
        </div>

        {/* Action Buttons: Copy, Share */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCopyBreakdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${result.country.name} Salary Calculator`,
                  text: `Estimated Take-Home for ${result.country.name}: ${formatCurrency(result.netSalaryMonthly, currency)}/mo (${result.takeHomePercentage}%)`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                handleCopyBreakdown();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share Calculation</span>
          </button>
        </div>

        {/* Mandatory Disclaimer Box */}
        <div className="mt-5 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Important Calculation Disclaimer:</strong> Estimated calculation. Actual tax and deductions may vary depending on your personal circumstances, municipality, collective labor agreement, and current official tax regulations. This tool provides estimates for informational planning and does not constitute formal tax advice or guaranteed payroll paystubs.
          </div>
        </div>

        {/* Expandable: "How is this calculated?" */}
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowHowCalculated(!showHowCalculated)}
            className="w-full flex items-center justify-between p-3.5 text-left bg-slate-50/70 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>How is this calculated? Step-by-Step Methodology</span>
            </div>
            {showHowCalculated ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showHowCalculated && (
            <div className="p-4 bg-white text-xs text-slate-700 space-y-3.5 border-t border-slate-200">
              <div>
                <strong className="text-slate-900 block mb-1">1. Gross Salary Conversion</strong>
                <p className="text-slate-600">
                  Your gross earnings are normalized to an annual base of <strong>{formatCurrency(result.grossSalaryAnnual, currency)}</strong>.
                </p>
              </div>

              {result.socialContributionLines.length > 0 && (
                <div>
                  <strong className="text-slate-900 block mb-1">2. Social Security Contributions</strong>
                  <p className="text-slate-600 mb-1.5">
                    Statutory social insurance contributions are calculated according to {result.country.name} thresholds:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    {result.socialContributionLines.map((line) => (
                      <li key={line.id}>
                        <strong>{line.name}:</strong> -{formatCurrency(line.employeeAmount, currency)} / yr ({line.ratePercent}%)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.incomeTaxLines.length > 0 && (
                <div>
                  <strong className="text-slate-900 block mb-1">3. Income Tax Brackets (Progressive Scale)</strong>
                  <p className="text-slate-600 mb-1.5">
                    Taxable income of <strong>{formatCurrency(result.taxableIncome, currency)}</strong> is taxed progressively through each applicable tax bracket:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    {result.incomeTaxLines.map((t, idx) => (
                      <li key={idx}>
                        Bracket <em>{t.bracket}</em> @ {t.rate}%: <strong>{formatCurrency(t.amount, currency)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.calculationNotes.length > 0 && (
                <div>
                  <strong className="text-slate-900 block mb-1">4. Country Allowances & Specifics</strong>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    {result.calculationNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <span>Data source: {result.country.officialAuthority.name}</span>
                <a
                  href={result.country.officialAuthority.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  Official Authority Portal <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
