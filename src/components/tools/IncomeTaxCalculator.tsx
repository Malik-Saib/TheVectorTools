import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Calculator, Info } from 'lucide-react';

interface TaxBracketItem {
  threshold: number;
  rate: number;
  name: string;
}

const COUNTRY_TAX_PRESETS: Record<string, { name: string; currency: string; currencySymbol: string; allowance: number; brackets: TaxBracketItem[] }> = {
  us: {
    name: 'United States (Federal 2026 Single)',
    currency: 'USD',
    currencySymbol: '$',
    allowance: 14600,
    brackets: [
      { threshold: 0, rate: 0.10, name: '10% Bracket ($0 - $11,600)' },
      { threshold: 11600, rate: 0.12, name: '12% Bracket ($11,600 - $47,150)' },
      { threshold: 47150, rate: 0.22, name: '22% Bracket ($47,150 - $100,525)' },
      { threshold: 100525, rate: 0.24, name: '24% Bracket ($100,525 - $191,950)' },
      { threshold: 191950, rate: 0.32, name: '32% Bracket ($191,950 - $243,725)' },
      { threshold: 243725, rate: 0.35, name: '35% Bracket ($243,725 - $609,350)' },
      { threshold: 609350, rate: 0.37, name: '37% Bracket (Over $609,350)' }
    ]
  },
  uk: {
    name: 'United Kingdom (HMRC 2025/2026)',
    currency: 'GBP',
    currencySymbol: '£',
    allowance: 12570,
    brackets: [
      { threshold: 12570, rate: 0.20, name: 'Basic Rate 20% (£12,570 - £50,270)' },
      { threshold: 50270, rate: 0.40, name: 'Higher Rate 40% (£50,270 - £125,140)' },
      { threshold: 125140, rate: 0.45, name: 'Additional Rate 45% (Over £125,140)' }
    ]
  },
  de: {
    name: 'Germany (Grundfreibetrag 2026)',
    currency: 'EUR',
    currencySymbol: '€',
    allowance: 11784,
    brackets: [
      { threshold: 11784, rate: 0.14, name: 'Initial Bracket 14% (€11,784 - €17,005)' },
      { threshold: 17005, rate: 0.24, name: 'Progressive Zone 1 (~24%)' },
      { threshold: 66760, rate: 0.42, name: 'Top Rate 42% (€66,760 - €277,825)' },
      { threshold: 277825, rate: 0.45, name: 'Reichensteuer 45% (Over €277,825)' }
    ]
  },
  fr: {
    name: 'France (Barème Impôt 2025/2026)',
    currency: 'EUR',
    currencySymbol: '€',
    allowance: 11294,
    brackets: [
      { threshold: 11294, rate: 0.11, name: 'Tranche 1: 11% (€11,294 - €28,797)' },
      { threshold: 28797, rate: 0.30, name: 'Tranche 2: 30% (€28,797 - €82,341)' },
      { threshold: 82341, rate: 0.41, name: 'Tranche 3: 41% (€82,341 - €177,106)' },
      { threshold: 177106, rate: 0.45, name: 'Tranche 4: 45% (Over €177,106)' }
    ]
  },
  custom: {
    name: 'Custom Flat / Simplified Rate',
    currency: 'USD',
    currencySymbol: '$',
    allowance: 0,
    brackets: [
      { threshold: 0, rate: 0.20, name: 'Custom Rate 20%' }
    ]
  }
};

export const IncomeTaxCalculator: React.FC = () => {
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('us');
  const [grossIncomeStr, setGrossIncomeStr] = useState<string>('75000');
  const [customDeductionStr, setCustomDeductionStr] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const preset = COUNTRY_TAX_PRESETS[selectedCountryKey] || COUNTRY_TAX_PRESETS.us;
  const sym = preset.currencySymbol;

  const grossIncome = Math.max(0, parseFloat(grossIncomeStr) || 0);
  const userDeductions = Math.max(0, parseFloat(customDeductionStr) || 0);
  const totalAllowance = preset.allowance + userDeductions;
  const taxableIncome = Math.max(0, grossIncome - totalAllowance);

  // Compute tax through brackets
  let totalTax = 0;
  const bracketLines: { name: string; taxableAmount: number; rate: number; tax: number }[] = [];

  const brackets = preset.brackets;
  for (let i = 0; i < brackets.length; i++) {
    const b = brackets[i];
    const nextThreshold = brackets[i + 1] ? brackets[i + 1].threshold : Infinity;

    if (grossIncome > b.threshold) {
      const taxableSlice = Math.min(grossIncome, nextThreshold) - b.threshold;
      if (taxableSlice > 0) {
        const taxOnSlice = taxableSlice * b.rate;
        totalTax += taxOnSlice;
        bracketLines.push({
          name: b.name,
          taxableAmount: taxableSlice,
          rate: b.rate,
          tax: taxOnSlice
        });
      }
    }
  }

  // Adjust for tax allowance if applicable
  if (selectedCountryKey === 'us' && grossIncome <= totalAllowance) {
    totalTax = 0;
  }

  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const netIncome = Math.max(0, grossIncome - totalTax);
  const monthlyNet = netIncome / 12;

  const formatMoney = (n: number) => {
    return `${sym}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCopy = () => {
    const text = `Gross: ${formatMoney(grossIncome)} | Estimated Tax: ${formatMoney(totalTax)} (${effectiveRate.toFixed(1)}%) | Net Remaining: ${formatMoney(netIncome)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGrossIncomeStr('75000');
    setCustomDeductionStr('');
  };

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Jurisdiction / Tax Model
          </label>
          <select
            value={selectedCountryKey}
            onChange={(e) => setSelectedCountryKey(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            {Object.entries(COUNTRY_TAX_PRESETS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Annual Gross Income ({sym})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">{sym}</span>
            <input
              type="number"
              min="0"
              step="500"
              value={grossIncomeStr}
              onChange={(e) => setGrossIncomeStr(e.target.value)}
              placeholder="e.g. 75000"
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Additional Deductions ({sym})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">{sym}</span>
            <input
              type="number"
              min="0"
              value={customDeductionStr}
              onChange={(e) => setCustomDeductionStr(e.target.value)}
              placeholder="Optional deductions"
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Results Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Income</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{formatMoney(grossIncome)}</div>
          <span className="text-[11px] text-slate-400">Total yearly earnings</span>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">Estimated Income Tax</span>
          <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1">{formatMoney(totalTax)}</div>
          <span className="text-[11px] text-rose-600 font-semibold">Effective Rate: {effectiveRate.toFixed(2)}%</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Net Remaining (Yearly)</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">{formatMoney(netIncome)}</div>
          <span className="text-[11px] text-emerald-700 font-semibold">Take-Home: {(100 - effectiveRate).toFixed(1)}%</span>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
          <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Estimated Monthly Net</span>
          <div className="text-xl sm:text-2xl font-black text-blue-800 mt-1">{formatMoney(monthlyNet)}</div>
          <span className="text-[11px] text-blue-600 font-medium">After tax per month</span>
        </div>
      </div>

      {/* Progressive Bracket Breakdown Table */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Progressive Tax Bracket Breakdown
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2">Tax Band</th>
                <th className="py-2 text-right">Taxable Slice</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Tax Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bracketLines.length > 0 ? (
                bracketLines.map((line, i) => (
                  <tr key={i} className="text-slate-800">
                    <td className="py-2 font-medium">{line.name}</td>
                    <td className="py-2 text-right font-mono">{formatMoney(line.taxableAmount)}</td>
                    <td className="py-2 text-right font-mono">{(line.rate * 100).toFixed(0)}%</td>
                    <td className="py-2 text-right font-mono font-bold text-rose-700">{formatMoney(line.tax)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 text-center text-slate-500">
                    Income is below taxable threshold ({formatMoney(totalAllowance)})
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 font-bold text-slate-900">
                <td className="py-2">Total Tax Liability</td>
                <td className="py-2 text-right" colSpan={2}>Effective Rate: {effectiveRate.toFixed(2)}%</td>
                <td className="py-2 text-right font-mono text-rose-800">{formatMoney(totalTax)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Summary' : 'Copy Result'}</span>
        </button>
      </div>
    </div>
  );
};
