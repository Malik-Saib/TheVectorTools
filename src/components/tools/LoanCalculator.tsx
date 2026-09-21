import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [loanAmountStr, setLoanAmountStr] = useState<string>('25000');
  const [interestRateStr, setInterestRateStr] = useState<string>('6.5');
  const [termYearsStr, setTermYearsStr] = useState<string>('5');
  const [frequency, setFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly');
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const principal = Math.max(0, parseFloat(loanAmountStr) || 0);
  const annualRate = Math.max(0, parseFloat(interestRateStr) || 0) / 100;
  const years = Math.max(0.1, parseFloat(termYearsStr) || 1);

  let paymentsPerYear = 12;
  if (frequency === 'biweekly') paymentsPerYear = 26;
  if (frequency === 'weekly') paymentsPerYear = 52;

  const totalPaymentsCount = Math.round(years * paymentsPerYear);
  const periodicRate = annualRate / paymentsPerYear;

  let paymentPerPeriod = 0;
  if (periodicRate === 0) {
    paymentPerPeriod = totalPaymentsCount > 0 ? principal / totalPaymentsCount : 0;
  } else {
    paymentPerPeriod =
      (principal * periodicRate * Math.pow(1 + periodicRate, totalPaymentsCount)) /
      (Math.pow(1 + periodicRate, totalPaymentsCount) - 1);
  }

  const totalRepayment = paymentPerPeriod * totalPaymentsCount;
  const totalInterest = Math.max(0, totalRepayment - principal);

  // Generate annual amortization summary (first 10 periods or years)
  const annualSchedule: { year: number; balance: number; interestPaid: number; principalPaid: number }[] = [];
  let currentBalance = principal;
  const periodsInYear = paymentsPerYear;

  for (let yr = 1; yr <= Math.min(Math.ceil(years), 30); yr++) {
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let p = 1; p <= periodsInYear && currentBalance > 0.01; p++) {
      const interestForPeriod = currentBalance * periodicRate;
      const principalForPeriod = Math.min(currentBalance, paymentPerPeriod - interestForPeriod);
      yearInterest += interestForPeriod;
      yearPrincipal += principalForPeriod;
      currentBalance = Math.max(0, currentBalance - principalForPeriod);
    }

    annualSchedule.push({
      year: yr,
      balance: currentBalance,
      interestPaid: yearInterest,
      principalPaid: yearPrincipal
    });

    if (currentBalance <= 0) break;
  }

  const format = (n: number) => {
    return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCopy = () => {
    const text = `Loan: ${format(principal)} at ${interestRateStr}% over ${years} yrs | Payment: ${format(paymentPerPeriod)} / ${frequency} | Total Interest: ${format(totalInterest)} | Total Cost: ${format(totalRepayment)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLoanAmountStr('25000');
    setInterestRateStr('6.5');
    setTermYearsStr('5');
    setFrequency('monthly');
  };

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Loan Amount ($)
          </label>
          <input
            type="number"
            min="0"
            step="500"
            value={loanAmountStr}
            onChange={(e) => setLoanAmountStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Interest Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={interestRateStr}
            onChange={(e) => setInterestRateStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Loan Term (Years)
          </label>
          <input
            type="number"
            min="0.5"
            max="40"
            step="0.5"
            value={termYearsStr}
            onChange={(e) => setTermYearsStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Payment Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as any)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="monthly">Monthly (12/yr)</option>
            <option value="biweekly">Bi-weekly (26/yr)</option>
            <option value="weekly">Weekly (52/yr)</option>
          </select>
        </div>
      </div>

      {/* Primary Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Payment per {frequency.replace('ly', '')}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">
            {format(paymentPerPeriod)}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            {totalPaymentsCount} total installments
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Original Principal
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {format(principal)}
          </div>
          <span className="text-[11px] text-slate-400">Total borrowed sum</span>
        </div>

        <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Total Interest Paid
          </span>
          <div className="text-2xl font-black text-amber-900 mt-1">
            {format(totalInterest)}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">
            Cost of borrowing ({((totalInterest / (principal || 1)) * 100).toFixed(1)}%)
          </span>
        </div>

        <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Total Repayment Cost
          </span>
          <div className="text-2xl font-black text-blue-900 mt-1">
            {format(totalRepayment)}
          </div>
          <span className="text-[11px] text-blue-700 font-medium">Principal + interest</span>
        </div>
      </div>

      {/* Visual Principal vs Interest Bar */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>Principal: {format(principal)} ({totalRepayment > 0 ? ((principal / totalRepayment) * 100).toFixed(1) : 100}%)</span>
          <span className="text-amber-700">Interest: {format(totalInterest)} ({totalRepayment > 0 ? ((totalInterest / totalRepayment) * 100).toFixed(1) : 0}%)</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden flex">
          <div
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${totalRepayment > 0 ? (principal / totalRepayment) * 100 : 100}%` }}
          />
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Amortization Schedule Accordion */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <span>Yearly Amortization Schedule ({annualSchedule.length} years)</span>
          {showAmortization ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showAmortization && (
          <div className="p-4 border-t border-slate-200 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2">Year</th>
                  <th className="py-2 text-right">Principal Paid</th>
                  <th className="py-2 text-right">Interest Paid</th>
                  <th className="py-2 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {annualSchedule.map((row) => (
                  <tr key={row.year} className="text-slate-800">
                    <td className="py-1.5 font-sans font-medium">Year {row.year}</td>
                    <td className="py-1.5 text-right text-emerald-700">{format(row.principalPaid)}</td>
                    <td className="py-1.5 text-right text-amber-700">{format(row.interestPaid)}</td>
                    <td className="py-1.5 text-right font-bold text-slate-900">{format(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
          <span>{copied ? 'Copied Schedule' : 'Copy Result'}</span>
        </button>
      </div>
    </div>
  );
};
