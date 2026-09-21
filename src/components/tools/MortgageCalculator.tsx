import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Home, Shield, Landmark } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const [homePriceStr, setHomePriceStr] = useState<string>('400000');
  const [downPaymentPercentStr, setDownPaymentPercentStr] = useState<string>('20');
  const [interestRateStr, setInterestRateStr] = useState<string>('6.25');
  const [termYearsStr, setTermYearsStr] = useState<string>('30');
  const [annualPropertyTaxStr, setAnnualPropertyTaxStr] = useState<string>('4800');
  const [annualHomeInsuranceStr, setAnnualHomeInsuranceStr] = useState<string>('1200');
  const [copied, setCopied] = useState(false);

  const homePrice = Math.max(0, parseFloat(homePriceStr) || 0);
  const downPaymentPercent = Math.max(0, Math.min(100, parseFloat(downPaymentPercentStr) || 0));
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);

  const annualInterestRate = Math.max(0, parseFloat(interestRateStr) || 0) / 100;
  const monthlyRate = annualInterestRate / 12;
  const termYears = Math.max(1, parseFloat(termYearsStr) || 30);
  const totalMonths = termYears * 12;

  // Monthly Principal & Interest
  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = totalMonths > 0 ? loanAmount / totalMonths : 0;
  } else {
    monthlyPI =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const monthlyPropertyTax = (Math.max(0, parseFloat(annualPropertyTaxStr) || 0)) / 12;
  const monthlyInsurance = (Math.max(0, parseFloat(annualHomeInsuranceStr) || 0)) / 12;
  const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance;

  const totalPIPaid = monthlyPI * totalMonths;
  const totalInterest = Math.max(0, totalPIPaid - loanAmount);
  const totalOverallCost = totalPIPaid + (monthlyPropertyTax + monthlyInsurance) * totalMonths;

  const format = (n: number) => {
    return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCopy = () => {
    const text = `Home: ${format(homePrice)} | Loan: ${format(loanAmount)} | Monthly Payment: ${format(totalMonthlyPayment)} (P&I: ${format(monthlyPI)}, Tax: ${format(monthlyPropertyTax)}, Ins: ${format(monthlyInsurance)}) | Total Interest: ${format(totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHomePriceStr('400000');
    setDownPaymentPercentStr('20');
    setInterestRateStr('6.25');
    setTermYearsStr('30');
    setAnnualPropertyTaxStr('4800');
    setAnnualHomeInsuranceStr('1200');
  };

  return (
    <div className="space-y-6">
      {/* Inputs Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Home Purchase Price ($)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={homePriceStr}
            onChange={(e) => setHomePriceStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Down Payment (%)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={downPaymentPercentStr}
              onChange={(e) => setDownPaymentPercentStr(e.target.value)}
              className="w-full px-3 py-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Equals {format(downPaymentAmount)}
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Interest Rate (%)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="25"
              step="0.05"
              value={interestRateStr}
              onChange={(e) => setInterestRateStr(e.target.value)}
              className="w-full px-3 py-2.5 pr-8 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Loan Term
          </label>
          <select
            value={termYearsStr}
            onChange={(e) => setTermYearsStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="30">30 Years Fixed</option>
            <option value="25">25 Years Fixed</option>
            <option value="20">20 Years Fixed</option>
            <option value="15">15 Years Fixed</option>
            <option value="10">10 Years Fixed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Annual Property Taxes ($/yr)
          </label>
          <input
            type="number"
            min="0"
            step="100"
            value={annualPropertyTaxStr}
            onChange={(e) => setAnnualPropertyTaxStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">
            ~{format(monthlyPropertyTax)}/mo
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Home Insurance ($/yr)
          </label>
          <input
            type="number"
            min="0"
            step="50"
            value={annualHomeInsuranceStr}
            onChange={(e) => setAnnualHomeInsuranceStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">
            ~{format(monthlyInsurance)}/mo
          </span>
        </div>
      </div>

      {/* Hero Monthly Total Payment Card */}
      <div className="p-6 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Estimated Total Monthly Payment
            </span>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
              {format(totalMonthlyPayment)}
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              Principal, Interest, Property Taxes & Homeowners Insurance
            </span>
          </div>

          <div className="flex flex-col items-end text-xs text-slate-300 space-y-1">
            <div>Loan Principal: <strong className="text-white font-mono">{format(loanAmount)}</strong></div>
            <div>Down Payment: <strong className="text-emerald-300 font-mono">{format(downPaymentAmount)} ({downPaymentPercent}%)</strong></div>
            <div>Term: <strong className="text-white">{termYears} years ({totalMonths} payments)</strong></div>
          </div>
        </div>

        {/* Monthly Breakdown Segmented Bar */}
        <div className="mt-6 pt-4 border-t border-slate-700/80">
          <div className="grid grid-cols-3 gap-2 text-center text-xs mb-2">
            <div className="text-left">
              <span className="text-slate-400 block text-[11px]">Principal & Interest</span>
              <span className="font-bold text-white text-sm">{format(monthlyPI)}</span>
            </div>
            <div className="text-center">
              <span className="text-slate-400 block text-[11px]">Property Tax</span>
              <span className="font-bold text-amber-300 text-sm">{format(monthlyPropertyTax)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[11px]">Home Insurance</span>
              <span className="font-bold text-blue-300 text-sm">{format(monthlyInsurance)}</span>
            </div>
          </div>

          <div className="h-2.5 w-full rounded-full bg-slate-700 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${totalMonthlyPayment > 0 ? (monthlyPI / totalMonthlyPayment) * 100 : 70}%` }}
            />
            <div
              className="bg-amber-400 h-full"
              style={{ width: `${totalMonthlyPayment > 0 ? (monthlyPropertyTax / totalMonthlyPayment) * 100 : 20}%` }}
            />
            <div
              className="bg-blue-400 h-full"
              style={{ width: `${totalMonthlyPayment > 0 ? (monthlyInsurance / totalMonthlyPayment) * 100 : 10}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lifetime Loan Cost Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total 30-Yr Interest</span>
          <div className="text-xl font-bold text-amber-900 mt-1">{format(totalInterest)}</div>
          <span className="text-[11px] text-slate-400">Total finance charges</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total P&I Repaid</span>
          <div className="text-xl font-bold text-slate-900 mt-1">{format(totalPIPaid)}</div>
          <span className="text-[11px] text-slate-400">Principal + loan interest</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Overall Home Cost</span>
          <div className="text-xl font-bold text-slate-900 mt-1">{format(totalOverallCost + downPaymentAmount)}</div>
          <span className="text-[11px] text-slate-400">Down pmt + all 30yr expenses</span>
        </div>
      </div>

      {/* Actions */}
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
          <span>{copied ? 'Copied' : 'Copy Estimate'}</span>
        </button>
      </div>
    </div>
  );
};
