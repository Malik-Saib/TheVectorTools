import React, { useState } from 'react';
import { RotateCcw, Copy, Check, TrendingUp, DollarSign } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [initialPrincipalStr, setInitialPrincipalStr] = useState<string>('10000');
  const [monthlyDepositStr, setMonthlyDepositStr] = useState<string>('300');
  const [annualRateStr, setAnnualRateStr] = useState<string>('8');
  const [yearsStr, setYearsStr] = useState<string>('20');
  const [compoundFreq, setCompoundFreq] = useState<'daily' | 'monthly' | 'quarterly' | 'annually'>('monthly');
  const [copied, setCopied] = useState(false);

  const initialPrincipal = Math.max(0, parseFloat(initialPrincipalStr) || 0);
  const monthlyDeposit = Math.max(0, parseFloat(monthlyDepositStr) || 0);
  const annualRate = Math.max(0, parseFloat(annualRateStr) || 0) / 100;
  const years = Math.max(1, Math.min(60, parseInt(yearsStr, 10) || 1));

  let n = 12; // compounding per year
  if (compoundFreq === 'daily') n = 365;
  if (compoundFreq === 'quarterly') n = 4;
  if (compoundFreq === 'annually') n = 1;

  // Year-by-year trajectory
  const yearlyData: { year: number; balance: number; principalTotal: number; interestTotal: number }[] = [];
  let currentBalance = initialPrincipal;
  let cumulativeDeposits = initialPrincipal;

  for (let yr = 1; yr <= years; yr++) {
    // 12 monthly deposits during the year
    for (let m = 1; m <= 12; m++) {
      currentBalance += monthlyDeposit;
      cumulativeDeposits += monthlyDeposit;
      // apply periodic compounding
      const periodicRate = annualRate / 12;
      currentBalance += currentBalance * periodicRate;
    }

    const interestTotal = Math.max(0, currentBalance - cumulativeDeposits);
    yearlyData.push({
      year: yr,
      balance: currentBalance,
      principalTotal: cumulativeDeposits,
      interestTotal: interestTotal
    });
  }

  const finalBalance = currentBalance;
  const totalPrincipal = cumulativeDeposits;
  const totalInterestEarned = Math.max(0, finalBalance - totalPrincipal);

  const format = (v: number) => {
    return `$${Math.round(v).toLocaleString('en-US')}`;
  };

  const handleCopy = () => {
    const text = `Initial: ${format(initialPrincipal)} + ${format(monthlyDeposit)}/mo at ${annualRateStr}% for ${years} yrs | Future Balance: ${format(finalBalance)} | Deposits: ${format(totalPrincipal)} | Interest: ${format(totalInterestEarned)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInitialPrincipalStr('10000');
    setMonthlyDepositStr('300');
    setAnnualRateStr('8');
    setYearsStr('20');
    setCompoundFreq('monthly');
  };

  // Simple SVG Chart coordinates
  const maxBalance = finalBalance || 1;
  const chartHeight = 160;
  const chartWidth = 500;
  const points = yearlyData.map((d, index) => {
    const x = (index / (yearlyData.length - 1 || 1)) * chartWidth;
    const y = chartHeight - (d.balance / maxBalance) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  const depositPoints = yearlyData.map((d, index) => {
    const x = (index / (yearlyData.length - 1 || 1)) * chartWidth;
    const y = chartHeight - (d.principalTotal / maxBalance) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Initial Principal ($)
          </label>
          <input
            type="number"
            min="0"
            step="500"
            value={initialPrincipalStr}
            onChange={(e) => setInitialPrincipalStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            min="0"
            step="50"
            value={monthlyDepositStr}
            onChange={(e) => setMonthlyDepositStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.25"
            value={annualRateStr}
            onChange={(e) => setAnnualRateStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Investment Duration
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="50"
              value={yearsStr}
              onChange={(e) => setYearsStr(e.target.value)}
              className="w-full px-3 py-2.5 pr-14 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">years</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Compounding Frequency
          </label>
          <select
            value={compoundFreq}
            onChange={(e) => setCompoundFreq(e.target.value as any)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      </div>

      {/* Hero Balance Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Future Portfolio Value
          </span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-1">
            {format(finalBalance)}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            Total accumulated after {years} years
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Principal Invested
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {format(totalPrincipal)}
          </div>
          <span className="text-[11px] text-slate-500">
            {format(initialPrincipal)} initial + {format(totalPrincipal - initialPrincipal)} deposits
          </span>
        </div>

        <div className="p-5 rounded-xl bg-blue-50 border border-blue-200">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Total Compound Interest
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">
            {format(totalInterestEarned)}
          </div>
          <span className="text-[11px] text-blue-700 font-semibold">
            {((totalInterestEarned / (finalBalance || 1)) * 100).toFixed(1)}% of total portfolio!
          </span>
        </div>
      </div>

      {/* Visual SVG Growth Curve */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white">
        <div className="flex items-center justify-between mb-4 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="font-semibold text-emerald-200">Total Balance (with Compound Growth)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-slate-300">Deposits Only</span>
            </div>
          </div>
          <span className="font-mono text-slate-400">0 → {years} Years</span>
        </div>

        <div className="w-full h-40 overflow-hidden">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Guide lines */}
            <line x1="0" y1={chartHeight - 10} x2={chartWidth} y2={chartHeight - 10} stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="#334155" strokeWidth="1" strokeDasharray="4" />

            {/* Deposits path */}
            <polyline
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeDasharray="4"
              points={depositPoints}
            />

            {/* Growth path */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              points={points}
            />
          </svg>
        </div>

        <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
          <span>Start ({format(initialPrincipal)})</span>
          <span>Year {Math.round(years / 2)}</span>
          <span className="text-emerald-300 font-bold">End ({format(finalBalance)})</span>
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
          <span>{copied ? 'Copied' : 'Copy Portfolio Growth'}</span>
        </button>
      </div>
    </div>
  );
};
