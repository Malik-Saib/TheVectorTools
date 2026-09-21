import React, { useState, useMemo } from 'react';
import { Building2, PieChart, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { COUNTRIES, getEuropeanCountries } from '../data/countries';
import { calculateSalary } from '../engine/calculator';
import { formatCurrency } from '../engine/currency';

export const EmployerCostCalculator: React.FC = () => {
  const europeanCountries = useMemo(() => getEuropeanCountries(), []);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('de');
  const [grossSalary, setGrossSalary] = useState<number>(65000);

  const country = COUNTRIES.find((c) => c.id === selectedCountryId) || europeanCountries[0];

  const result = useMemo(() => {
    return calculateSalary({
      countryId: country.id,
      taxYear: 2026,
      grossSalary,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
    });
  }, [country.id, grossSalary]);

  const totalEmployerCost = result.employerCostAnnual;
  const employerSocial = result.employerSocialAnnual;
  const employerTaxWedgePercent = grossSalary > 0 ? (employerSocial / grossSalary) * 100 : 0;
  const totalWedgeCost = totalEmployerCost - result.netSalaryAnnual;
  const totalTaxWedgeRatio = totalEmployerCost > 0 ? (totalWedgeCost / totalEmployerCost) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
          <Building2 className="w-3.5 h-3.5" />
          Employer Payroll Cost
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Employer Cost & Total Payroll Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Calculate the actual total cost of employment in Europe, including employer social security contributions, statutory pension, health insurance, and payroll taxes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Input Card */}
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
                if (c) setGrossSalary(c.defaultGross);
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
              Agreed Employee Gross Salary ({country.currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">
                {country.currencySymbol}
              </span>
              <input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-lg"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              The salary amount written in the job offer or employment contract.
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Total Annual Cost to Employer
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
              {formatCurrency(totalEmployerCost, country.currency)}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Monthly cost: <strong className="font-mono text-white">{formatCurrency(totalEmployerCost / 12, country.currency)} / mo</strong>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-700 font-medium">1. Gross Salary (Employee Base)</span>
              <span className="font-mono font-bold text-slate-900">
                {formatCurrency(grossSalary, country.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div>
                <span className="text-slate-700 font-medium">2. Employer Social Contributions</span>
                <span className="block text-xs text-slate-400">
                  Approx. +{employerTaxWedgePercent.toFixed(1)}% on top of gross
                </span>
              </div>
              <span className="font-mono font-bold text-amber-700">
                +{formatCurrency(employerSocial, country.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 bg-slate-50 px-3 rounded-lg font-bold">
              <span className="text-slate-900">Total Employer Outlay</span>
              <span className="font-mono text-slate-900 text-base">
                {formatCurrency(totalEmployerCost, country.currency)}
              </span>
            </div>
          </div>

          {/* Comparison with what employee actually receives */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-semibold text-emerald-950">
              <span>What Employee Takes Home (Net Pay):</span>
              <span className="font-mono font-bold text-base text-emerald-800">
                {formatCurrency(result.netSalaryAnnual, country.currency)}
              </span>
            </div>
            <div className="text-emerald-800 leading-relaxed">
              Out of the total <strong>{formatCurrency(totalEmployerCost, country.currency)}</strong> cost to the company, the employee receives <strong>{formatCurrency(result.netSalaryAnnual, country.currency)}</strong> in take-home pay. The total government tax wedge (taxes + combined social security) is <strong>{totalTaxWedgeRatio.toFixed(1)}%</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
