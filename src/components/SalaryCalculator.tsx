import React, { useState, useEffect, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Coins, 
  RotateCcw, 
  Check,
  Search,
  Building,
  UserCheck
} from 'lucide-react';
import { 
  CountryMeta, 
  CalculationInput, 
  CalculationResult, 
  SalaryFrequency, 
  PersonalStatus 
} from '../types';
import { COUNTRIES, getEuropeanCountries } from '../data/countries';
import { calculateSalary } from '../engine/calculator';
import { trackEvent } from '../engine/analytics';
import { ResultDisplay } from './ResultDisplay';

interface SalaryCalculatorProps {
  initialCountry?: CountryMeta;
  onCountryChange?: (country: CountryMeta) => void;
}

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({
  initialCountry,
  onCountryChange,
}) => {
  const europeanCountries = useMemo(() => getEuropeanCountries(), []);
  
  // Local storage state initialization
  const defaultCountry = initialCountry || europeanCountries[0];
  const [selectedCountry, setSelectedCountry] = useState<CountryMeta>(defaultCountry);
  const [taxYear, setTaxYear] = useState<number>(2026);
  const [grossSalary, setGrossSalary] = useState<number>(defaultCountry.defaultGross);
  const [salaryInputText, setSalaryInputText] = useState<string>(
    defaultCountry.defaultGross.toLocaleString('en-US')
  );
  const [frequency, setFrequency] = useState<SalaryFrequency>('annual');
  const [personalStatus, setPersonalStatus] = useState<PersonalStatus>('single');
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [customOptions, setCustomOptions] = useState<Record<string, any>>({});
  const [countryPickerOpen, setCountryPickerOpen] = useState<boolean>(false);
  const [countrySearch, setCountrySearch] = useState<string>('');

  // Sync if initialCountry changes externally
  useEffect(() => {
    if (initialCountry && initialCountry.id !== selectedCountry.id) {
      setSelectedCountry(initialCountry);
      setGrossSalary(initialCountry.defaultGross);
      setSalaryInputText(initialCountry.defaultGross.toLocaleString('en-US'));
      setCustomOptions({});
    }
  }, [initialCountry]);

  // Load custom options defaults when country changes
  useEffect(() => {
    const currentRule = selectedCountry.rulesByYear[taxYear] || Object.values(selectedCountry.rulesByYear)[0];
    const initialOpts: Record<string, any> = {};
    if (currentRule?.customOptions) {
      currentRule.customOptions.forEach((opt) => {
        initialOpts[opt.id] = opt.defaultValue;
      });
    }
    setCustomOptions(initialOpts);
  }, [selectedCountry, taxYear]);

  // Calculation computation
  const calculationResult: CalculationResult = useMemo(() => {
    return calculateSalary({
      countryId: selectedCountry.id,
      taxYear,
      grossSalary,
      frequency,
      personalStatus,
      childrenCount,
      hoursPerWeek,
      customOptions,
    });
  }, [
    selectedCountry,
    taxYear,
    grossSalary,
    frequency,
    personalStatus,
    childrenCount,
    hoursPerWeek,
    customOptions,
  ]);

  // Handle country switch
  const handleSelectCountry = (country: CountryMeta) => {
    setSelectedCountry(country);
    setGrossSalary(country.defaultGross);
    setSalaryInputText(country.defaultGross.toLocaleString('en-US'));
    setCountryPickerOpen(false);
    setCountrySearch('');
    if (onCountryChange) {
      onCountryChange(country);
    }
    trackEvent('country_selected', { country: country.name });
  };

  // Quick preset chips based on country currency scale
  const presets = useMemo(() => {
    if (selectedCountry.currency === 'PLN') {
      return [45000, 75000, 100000, 140000, 200000];
    } else if (['SEK', 'NOK', 'DKK'].includes(selectedCountry.currency)) {
      return [360000, 480000, 620000, 800000, 1100000];
    } else if (selectedCountry.currency === 'CHF') {
      return [65000, 85000, 110000, 140000, 190000];
    } else if (selectedCountry.currency === 'GBP') {
      return [28000, 40000, 55000, 75000, 110000];
    }
    return [35000, 50000, 65000, 85000, 120000];
  }, [selectedCountry]);

  // Filtered countries for search
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.currency.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  const activeRule = selectedCountry.rulesByYear[taxYear] || Object.values(selectedCountry.rulesByYear)[0];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calculator Form Card (Left Column) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          {/* Header row in form: Country & Tax Year */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">{selectedCountry.flag}</span>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">
                  {selectedCountry.name} Tax Calculator
                </h2>
                <span className="text-xs text-slate-500">
                  Currency: {selectedCountry.currency} ({selectedCountry.currencySymbol})
                </span>
              </div>
            </div>

            {/* Tax Year Selector */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="tax-year-select" className="text-xs font-semibold text-slate-500">
                Year:
              </label>
              <select
                id="tax-year-select"
                value={taxYear}
                onChange={(e) => {
                  const yr = Number(e.target.value);
                  setTaxYear(yr);
                  trackEvent('tax_year_changed', { taxYear: yr });
                }}
                className="text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {selectedCountry.supportedYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* 1. Country Selection Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Country
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="country-selector-btn"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-left text-slate-900 font-medium transition-colors shadow-2xs focus:ring-2 focus:ring-emerald-500"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">{selectedCountry.flag}</span>
                    <span className="font-semibold">{selectedCountry.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                      {selectedCountry.currency}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {countryPickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="relative mb-2">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search European country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {filteredCountries.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectCountry(c)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                            c.id === selectedCountry.id
                              ? 'bg-emerald-50 text-emerald-950 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{c.flag}</span>
                            <span>{c.name}</span>
                          </div>
                          <span className="text-slate-400 font-mono">{c.currencySymbol}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Gross Salary & Frequency */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="gross-salary-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Gross Salary
                </label>
                <div className="text-xs text-slate-500">
                  Avg in {selectedCountry.name}: {selectedCountry.currencySymbol}
                  {selectedCountry.averageSalary.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                {/* Gross Amount Input */}
                <div className="sm:col-span-8 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold font-mono text-base">
                    {selectedCountry.currencySymbol}
                  </span>
                  <input
                    id="gross-salary-input"
                    type="text"
                    inputMode="numeric"
                    value={salaryInputText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const num = Number(raw) || 0;
                      setGrossSalary(num);
                      setSalaryInputText(num ? num.toLocaleString('en-US') : '');
                      trackEvent('calculator_started', { country: selectedCountry.name });
                    }}
                    placeholder="e.g. 60,000"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono font-bold text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden transition-all shadow-2xs"
                  />
                </div>

                {/* Salary Frequency Selector */}
                <div className="sm:col-span-4">
                  <select
                    id="salary-frequency-select"
                    value={frequency}
                    onChange={(e) => {
                      const freq = e.target.value as SalaryFrequency;
                      setFrequency(freq);
                      trackEvent('frequency_changed', { frequency: freq });
                    }}
                    className="w-full h-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden shadow-2xs"
                  >
                    <option value="annual">Per Year</option>
                    <option value="monthly">Per Month</option>
                    <option value="weekly">Per Week</option>
                    <option value="hourly">Per Hour</option>
                  </select>
                </div>
              </div>

              {/* Presets Row */}
              <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-600">Quick presets:</span>
                {presets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setGrossSalary(amt);
                      setSalaryInputText(amt.toLocaleString('en-US'));
                      setFrequency('annual');
                    }}
                    className={`px-2 py-0.5 rounded-md text-xs font-mono font-medium transition-colors ${
                      grossSalary === amt && frequency === 'annual'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selectedCountry.currencySymbol}
                    {amt >= 1000 ? `${amt / 1000}k` : amt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Personal Circumstances (Sensible defaults: Single) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="personal-status-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Personal Status
                </label>
                <select
                  id="personal-status-select"
                  value={personalStatus}
                  onChange={(e) => setPersonalStatus(e.target.value as PersonalStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden shadow-2xs"
                >
                  <option value="single">Single (Individual)</option>
                  <option value="married">Married / Joint</option>
                  <option value="single_parent">Single Parent</option>
                </select>
              </div>

              <div>
                <label htmlFor="children-count-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Children / Dependents
                </label>
                <select
                  id="children-count-select"
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden shadow-2xs"
                >
                  <option value={0}>0 Children</option>
                  <option value={1}>1 Child</option>
                  <option value={2}>2 Children</option>
                  <option value={3}>3+ Children</option>
                </select>
              </div>
            </div>

            {/* If Hourly frequency selected, show hours/week */}
            {frequency === 'hourly' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 animate-in fade-in duration-150">
                <div>
                  <label htmlFor="hours-per-week" className="block text-xs font-semibold text-slate-700 mb-1">
                    Hours per Week
                  </label>
                  <input
                    id="hours-per-week"
                    type="number"
                    min={1}
                    max={80}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Annual Equivalent
                  </label>
                  <div className="text-sm font-bold text-slate-900 pt-1.5 font-mono">
                    {selectedCountry.currencySymbol}
                    {(grossSalary * hoursPerWeek * 52).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Collapsible "More options" */}
            {activeRule?.customOptions && activeRule.customOptions.length > 0 && (
              <div className="border-t border-slate-100 pt-3">
                <button
                  type="button"
                  id="more-options-toggle"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{showMoreOptions ? 'Hide country-specific options' : 'More options (Church tax, benefits, allowances)'}</span>
                  {showMoreOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showMoreOptions && (
                  <div className="mt-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3.5 animate-in fade-in duration-150">
                    <div className="text-xs font-semibold text-slate-600">
                      {selectedCountry.name}-Specific Tax Options:
                    </div>
                    {activeRule.customOptions.map((opt) => (
                      <div key={opt.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`opt-${opt.id}`} className="text-xs font-semibold text-slate-800">
                            {opt.label}
                          </label>
                          {opt.type === 'boolean' && (
                            <input
                              id={`opt-${opt.id}`}
                              type="checkbox"
                              checked={Boolean(customOptions[opt.id])}
                              onChange={(e) => {
                                setCustomOptions((prev) => ({
                                  ...prev,
                                  [opt.id]: e.target.checked,
                                }));
                              }}
                              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                            />
                          )}
                        </div>

                        {opt.type === 'select' && opt.options && (
                          <select
                            id={`opt-${opt.id}`}
                            value={customOptions[opt.id] || opt.defaultValue}
                            onChange={(e) => {
                              setCustomOptions((prev) => ({
                                ...prev,
                                [opt.id]: e.target.value,
                              }));
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                          >
                            {opt.options.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {opt.description && (
                          <p className="text-[11px] text-slate-500 leading-tight">
                            {opt.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                id="calculate-submit-btn"
                onClick={() => {
                  trackEvent('calculator_completed', {
                    country: selectedCountry.name,
                    taxYear,
                  });
                  const el = document.getElementById('calculation-results');
                  if (el && window.innerWidth < 1024) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-99 text-white font-bold text-base transition-all shadow-md hover:shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Take-Home Pay</span>
              </button>
              <p className="text-[11px] text-center text-slate-600 mt-2">
                Instant calculations performed locally. No sign-up or email required.
              </p>
            </div>
          </form>
        </div>

        {/* Dynamic Results Card (Right Column) */}
        <div className="lg:col-span-6">
          <ResultDisplay result={calculationResult} />
        </div>
      </div>
    </div>
  );
};
