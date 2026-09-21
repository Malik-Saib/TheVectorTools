import React, { useState, useMemo } from 'react';
import { Clock, Calculator, ArrowDownUp, Info } from 'lucide-react';
import { COUNTRIES, getEuropeanCountries } from '../data/countries';
import { calculateSalary } from '../engine/calculator';
import { formatCurrency } from '../engine/currency';

export const HourlyCalculator: React.FC = () => {
  const europeanCountries = useMemo(() => getEuropeanCountries(), []);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('de');
  const [mode, setMode] = useState<'hourly_to_annual' | 'annual_to_hourly'>('hourly_to_annual');
  
  const [hourlyRate, setHourlyRate] = useState<number>(32);
  const [annualSalary, setAnnualSalary] = useState<number>(65000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [paidVacationWeeks, setPaidVacationWeeks] = useState<number>(5);

  const country = COUNTRIES.find((c) => c.id === selectedCountryId) || europeanCountries[0];

  // Derived figures
  const effectiveWorkingWeeks = weeksPerYear; // European employment contracts usually have paid holiday
  const totalAnnualHours = hoursPerWeek * effectiveWorkingWeeks;

  const calculatedAnnual = mode === 'hourly_to_annual' ? hourlyRate * totalAnnualHours : annualSalary;
  const calculatedHourly = mode === 'annual_to_hourly' 
    ? (totalAnnualHours > 0 ? annualSalary / totalAnnualHours : 0) 
    : hourlyRate;

  // Run take-home tax calculation on resulting annual salary
  const taxResult = useMemo(() => {
    return calculateSalary({
      countryId: country.id,
      taxYear: 2026,
      grossSalary: calculatedAnnual,
      frequency: 'annual',
      personalStatus: 'single',
      childrenCount: 0,
      hoursPerWeek,
      weeksPerYear,
    });
  }, [country.id, calculatedAnnual, hoursPerWeek, weeksPerYear]);

  const netHourly = totalAnnualHours > 0 ? taxResult.netSalaryAnnual / totalAnnualHours : 0;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
          <Clock className="w-3.5 h-3.5" />
          Hourly & Annual Conversion
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hourly to Annual Salary Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Convert hourly wages into gross annual pay and estimated take-home pay, or calculate your exact hourly rate from an annual salary offer.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setMode('hourly_to_annual')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'hourly_to_annual' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hourly to Annual Salary
          </button>
          <button
            type="button"
            onClick={() => setMode('annual_to_hourly')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'annual_to_hourly' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annual to Hourly Wage
          </button>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Country & Tax Rules
            </label>
            <select
              value={selectedCountryId}
              onChange={(e) => setSelectedCountryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-sm"
            >
              {europeanCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          {mode === 'hourly_to_annual' ? (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Hourly Rate ({country.currencySymbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">
                  {country.currencySymbol}
                </span>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-lg"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Annual Gross Salary ({country.currencySymbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">
                  {country.currencySymbol}
                </span>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-lg"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Hours / Week
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Weeks / Year
              </label>
              <input
                type="number"
                min={1}
                max={52}
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(Number(e.target.value) || 52)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Equivalent Compensation
            </div>
            <div className="mt-3 flex items-baseline justify-between border-b border-slate-800 pb-4">
              <span className="text-sm text-slate-300">Gross Annual:</span>
              <span className="text-2xl font-mono font-bold text-white">
                {formatCurrency(calculatedAnnual, country.currency)}
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-b border-slate-800 pb-4">
              <span className="text-sm text-slate-300">Gross Hourly:</span>
              <span className="text-2xl font-mono font-bold text-white">
                {formatCurrency(calculatedHourly, country.currency, { decimals: 2 })} / hr
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-b border-slate-800 pb-4">
              <span className="text-sm text-slate-300">Net Take-Home Hourly:</span>
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {formatCurrency(netHourly, country.currency, { decimals: 2 })} / hr
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between pt-1">
              <span className="text-sm text-slate-300">Estimated Net Monthly:</span>
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {formatCurrency(taxResult.netSalaryMonthly, country.currency)} / mo
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl text-xs text-slate-300 leading-relaxed">
            Based on {totalAnnualHours.toLocaleString()} working hours per year ({hoursPerWeek} hrs/week × {weeksPerYear} weeks) in {country.name}. Deductions include income tax ({taxResult.effectiveTaxRate}%) and statutory social contributions ({taxResult.effectiveSocialRate}%).
          </div>
        </div>
      </div>
    </div>
  );
};
