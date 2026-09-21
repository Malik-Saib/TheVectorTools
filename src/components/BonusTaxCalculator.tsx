import React, { useState, useMemo } from 'react';
import { Gift, TrendingUp, Percent, ArrowRight, Info } from 'lucide-react';
import { COUNTRIES, getEuropeanCountries } from '../data/countries';
import { calculateSalary } from '../engine/calculator';
import { formatCurrency } from '../engine/currency';

export const BonusTaxCalculator: React.FC = () => {
  const europeanCountries = useMemo(() => getEuropeanCountries(), []);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('de');
  const [baseSalary, setBaseSalary] = useState<number>(60000);
  const [bonusAmount, setBonusAmount] = useState<number>(10000);

  const country = COUNTRIES.find((c) => c.id === selectedCountryId) || europeanCountries[0];

  // Base calculation without bonus
  const baseResult = useMemo(() => {
    return calculateSalary({
      countryId: country.id,
      taxYear: 2026,
      grossSalary: baseSalary,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
    });
  }, [country.id, baseSalary]);

  // Combined calculation with bonus
  const totalWithBonusResult = useMemo(() => {
    return calculateSalary({
      countryId: country.id,
      taxYear: 2026,
      grossSalary: baseSalary + bonusAmount,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
    });
  }, [country.id, baseSalary, bonusAmount]);

  // Marginal net bonus received
  const netBonus = Math.max(0, totalWithBonusResult.netSalaryAnnual - baseResult.netSalaryAnnual);
  const bonusDeductions = Math.max(0, bonusAmount - netBonus);
  const marginalTaxRate = bonusAmount > 0 ? (bonusDeductions / bonusAmount) * 100 : 0;
  const bonusTakeHomeRate = 100 - marginalTaxRate;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
          <Gift className="w-3.5 h-3.5" />
          Bonus & Pay Raise Tax
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Bonus Take-Home Tax Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Find out how much of your bonus or salary increase you actually keep after marginal income tax and social security contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Country
            </label>
            <select
              value={selectedCountryId}
              onChange={(e) => {
                setSelectedCountryId(e.target.value);
                const c = COUNTRIES.find((x) => x.id === e.target.value);
                if (c) setBaseSalary(c.defaultGross);
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
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Current Base Annual Salary ({country.currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">
                {country.currencySymbol}
              </span>
              <input
                type="number"
                value={baseSalary}
                onChange={(e) => setBaseSalary(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Gross Bonus / Raise Amount ({country.currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">
                {country.currencySymbol}
              </span>
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-base text-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Your Net Bonus Take-Home
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 mt-1">
              {formatCurrency(netBonus, country.currency)}
            </div>
            <div className="text-xs text-slate-300 mt-2 flex items-center gap-2">
              <span>You keep <strong className="text-white">{bonusTakeHomeRate.toFixed(1)}%</strong> of this bonus</span>
              <span>•</span>
              <span className="text-rose-300">{marginalTaxRate.toFixed(1)}% marginal deductions</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-700">Gross Bonus Offered:</span>
              <span className="font-mono font-bold text-slate-900">
                {formatCurrency(bonusAmount, country.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-700">Marginal Tax & Social Security:</span>
              <span className="font-mono font-bold text-rose-600">
                -{formatCurrency(bonusDeductions, country.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 bg-emerald-50 px-3 rounded-lg font-bold text-emerald-950">
              <span>Net Bonus Deposited:</span>
              <span className="font-mono text-emerald-900 text-base">
                {formatCurrency(netBonus, country.currency)}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200 leading-relaxed">
            <strong>Why are bonuses taxed higher?</strong> In progressive European tax systems, bonuses sit on top of your existing base salary. They are taxed at your <em>marginal tax bracket</em> (your highest applicable tax rate), rather than your lower average effective tax rate.
          </div>
        </div>
      </div>
    </div>
  );
};
