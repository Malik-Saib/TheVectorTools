import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, ArrowRight, TrendingUp, CheckCircle, Scale, Sparkles } from 'lucide-react';
import { CountryMeta } from '../types';
import { COUNTRIES, getEuropeanCountries } from '../data/countries';
import { calculateSalary } from '../engine/calculator';
import { formatCurrency, convertCurrency } from '../engine/currency';
import { trackEvent } from '../engine/analytics';

export const ComparisonCalculator: React.FC = () => {
  const europeanCountries = useMemo(() => getEuropeanCountries(), []);

  const [countryAId, setCountryAId] = useState<string>('de');
  const [countryBId, setCountryBId] = useState<string>('uk');
  const [grossA, setGrossA] = useState<number>(65000);
  const [grossB, setGrossB] = useState<number>(55000);

  const countryA = COUNTRIES.find((c) => c.id === countryAId) || europeanCountries[0];
  const countryB = COUNTRIES.find((c) => c.id === countryBId) || europeanCountries[1];

  const resA = useMemo(() => {
    return calculateSalary({
      countryId: countryA.id,
      taxYear: 2026,
      grossSalary: grossA,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
    });
  }, [countryA.id, grossA]);

  const resB = useMemo(() => {
    return calculateSalary({
      countryId: countryB.id,
      taxYear: 2026,
      grossSalary: grossB,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
    });
  }, [countryB.id, grossB]);

  // Converted Net in EUR for direct comparison
  const netInEURA = convertCurrency(resA.netSalaryAnnual, countryA.currency, 'EUR');
  const netInEURB = convertCurrency(resB.netSalaryAnnual, countryB.currency, 'EUR');
  const netDiffEUR = netInEURB - netInEURA;

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Cross-Border Comparison
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Compare Take-Home Salaries in Europe
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Compare net earnings, income tax brackets, and social security deductions across two countries side-by-side with real-time currency conversion.
        </p>
      </div>

      {/* Side-by-Side Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country A */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Option 1 (Base Country)
            </span>
            <span className="text-2xl">{countryA.flag}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Country</label>
            <select
              value={countryAId}
              onChange={(e) => {
                setCountryAId(e.target.value);
                const c = COUNTRIES.find((x) => x.id === e.target.value);
                if (c) setGrossA(c.defaultGross);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-sm"
            >
              {europeanCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Gross Annual Salary ({countryA.currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                {countryA.currencySymbol}
              </span>
              <input
                type="number"
                value={grossA}
                onChange={(e) => setGrossA(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-base"
              />
            </div>
          </div>

          {/* Mini Summary A */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Net Take-Home Pay
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              {formatCurrency(resA.netSalaryMonthly, countryA.currency)} / mo
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Annual Net: {formatCurrency(resA.netSalaryAnnual, countryA.currency)}</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-bold">
                {resA.takeHomePercentage}% kept
              </span>
            </div>
            {countryA.currency !== 'EUR' && (
              <div className="text-[11px] text-slate-400 pt-1 font-mono">
                ≈ €{Math.round(netInEURA).toLocaleString()} / yr in EUR
              </div>
            )}
          </div>
        </div>

        {/* Country B */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Option 2 (Comparison Country)
            </span>
            <span className="text-2xl">{countryB.flag}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Country</label>
            <select
              value={countryBId}
              onChange={(e) => {
                setCountryBId(e.target.value);
                const c = COUNTRIES.find((x) => x.id === e.target.value);
                if (c) setGrossB(c.defaultGross);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-sm"
            >
              {europeanCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Gross Annual Salary ({countryB.currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                {countryB.currencySymbol}
              </span>
              <input
                type="number"
                value={grossB}
                onChange={(e) => setGrossB(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-base"
              />
            </div>
          </div>

          {/* Mini Summary B */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Net Take-Home Pay
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              {formatCurrency(resB.netSalaryMonthly, countryB.currency)} / mo
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Annual Net: {formatCurrency(resB.netSalaryAnnual, countryB.currency)}</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-bold">
                {resB.takeHomePercentage}% kept
              </span>
            </div>
            {countryB.currency !== 'EUR' && (
              <div className="text-[11px] text-slate-400 pt-1 font-mono">
                ≈ €{Math.round(netInEURB).toLocaleString()} / yr in EUR
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Analysis Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600" />
          Side-by-Side Detailed Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="py-3 px-4">Metric</th>
                <th className="py-3 px-4">{countryA.flag} {countryA.name}</th>
                <th className="py-3 px-4">{countryB.flag} {countryB.name}</th>
                <th className="py-3 px-4">Difference (EUR Base)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Gross Salary</td>
                <td className="py-3 px-4 font-mono">{formatCurrency(grossA, countryA.currency)}</td>
                <td className="py-3 px-4 font-mono">{formatCurrency(grossB, countryB.currency)}</td>
                <td className="py-3 px-4 text-xs text-slate-500 font-mono">—</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Income Tax</td>
                <td className="py-3 px-4 font-mono text-rose-600">
                  -{formatCurrency(resA.incomeTaxAnnual, countryA.currency)} ({resA.effectiveTaxRate}%)
                </td>
                <td className="py-3 px-4 font-mono text-rose-600">
                  -{formatCurrency(resB.incomeTaxAnnual, countryB.currency)} ({resB.effectiveTaxRate}%)
                </td>
                <td className="py-3 px-4 text-xs font-mono">
                  {(resB.effectiveTaxRate - resA.effectiveTaxRate).toFixed(1)}% difference
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Social Contributions</td>
                <td className="py-3 px-4 font-mono text-amber-700">
                  -{formatCurrency(resA.socialContributionsAnnual, countryA.currency)} ({resA.effectiveSocialRate}%)
                </td>
                <td className="py-3 px-4 font-mono text-amber-700">
                  -{formatCurrency(resB.socialContributionsAnnual, countryB.currency)} ({resB.effectiveSocialRate}%)
                </td>
                <td className="py-3 px-4 text-xs font-mono">
                  {(resB.effectiveSocialRate - resA.effectiveSocialRate).toFixed(1)}% difference
                </td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">Net Take-Home Rate</td>
                <td className="py-3 px-4 font-bold font-mono text-emerald-800">{resA.takeHomePercentage}%</td>
                <td className="py-3 px-4 font-bold font-mono text-emerald-800">{resB.takeHomePercentage}%</td>
                <td className="py-3 px-4 font-bold text-xs font-mono text-slate-900">
                  {resB.takeHomePercentage >= resA.takeHomePercentage ? '+' : ''}
                  {(resB.takeHomePercentage - resA.takeHomePercentage).toFixed(1)}%
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="py-3 px-4 text-slate-900">Annual Net (Normalized in EUR)</td>
                <td className="py-3 px-4 font-mono text-slate-900">€{Math.round(netInEURA).toLocaleString()}</td>
                <td className="py-3 px-4 font-mono text-slate-900">€{Math.round(netInEURB).toLocaleString()}</td>
                <td className="py-3 px-4 font-mono text-emerald-700">
                  {netDiffEUR >= 0 ? '+' : '-'}€{Math.abs(Math.round(netDiffEUR)).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
