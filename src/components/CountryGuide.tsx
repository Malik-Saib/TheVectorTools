import React, { useMemo } from 'react';
import { 
  Building2, 
  HelpCircle, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Percent, 
  Coins, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { CountryMeta } from '../types';
import { generateBenchmarkSalaries } from '../engine/calculator';
import { formatCurrency } from '../engine/currency';
import { COUNTRIES } from '../data/countries';
import { SalaryCalculator } from './SalaryCalculator';

interface CountryGuideProps {
  country: CountryMeta;
  onSelectOtherCountry: (country: CountryMeta) => void;
  onSelectCalculatorTab: (tab: string) => void;
}

export const CountryGuide: React.FC<CountryGuideProps> = ({
  country,
  onSelectOtherCountry,
  onSelectCalculatorTab,
}) => {
  const taxYear = 2026;
  const rule = country.rulesByYear[taxYear] || Object.values(country.rulesByYear)[0];
  const benchmarks = useMemo(() => generateBenchmarkSalaries(country.id, taxYear), [country.id, taxYear]);

  // Related other countries
  const otherCountries = useMemo(() => {
    return COUNTRIES.filter((c) => c.id !== country.id && !['us', 'ca', 'au', 'nz'].includes(c.id)).slice(0, 6);
  }, [country.id]);

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button 
          onClick={() => onSelectCalculatorTab('calculator')} 
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button 
          onClick={() => onSelectCalculatorTab('countries')} 
          className="hover:text-slate-900 transition-colors"
        >
          Countries
        </button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{country.name} Salary & Tax</span>
      </nav>

      {/* Country Header */}
      <div className="bg-linear-to-b from-white to-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl leading-none">{country.flag}</span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {country.name} Salary & Tax Calculator
              </h1>
            </div>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed mt-2">
              {country.overview}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shrink-0 space-y-1 text-xs text-slate-600 shadow-2xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Tax Year:</span>
              <span className="font-bold text-slate-900">{taxYear}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Currency:</span>
              <span className="font-bold text-slate-900 font-mono">{country.currency} ({country.currencySymbol})</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Avg. Salary:</span>
              <span className="font-bold text-slate-900 font-mono">
                {formatCurrency(country.averageSalary, country.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100">
              <span className="text-slate-500">Last updated:</span>
              <span className="font-medium text-emerald-700">{country.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Interactive Calculator for this Country */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Calculate Take-Home Pay in {country.name}
          </h2>
          <p className="text-xs text-slate-500">
            Instant estimate updated for {taxYear} regulations.
          </p>
        </div>
        <SalaryCalculator initialCountry={country} onCountryChange={onSelectOtherCountry} />
      </div>

      {/* Salary Examples Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {country.name} Salary After Tax Examples ({taxYear})
            </h3>
            <p className="text-xs text-slate-500">
              Benchmark estimates for full-time single employee with standard deductions.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            {country.currency} Annual Figures
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50/70">
                <th className="py-3 px-4">Gross Annual</th>
                <th className="py-3 px-4">Net Annual</th>
                <th className="py-3 px-4">Net Monthly</th>
                <th className="py-3 px-4">Total Deductions %</th>
                <th className="py-3 px-4">Take-Home %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {benchmarks.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 font-mono">
                    {formatCurrency(row.grossAnnual, country.currency)}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-700 font-mono">
                    {formatCurrency(row.netAnnual, country.currency)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 font-mono">
                    {formatCurrency(row.netMonthly, country.currency)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono">
                    {row.effectiveTaxRate}%
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono">
                      {row.takeHomePercentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax System Explanation & Social Security Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income Tax Breakdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                How Income Tax Works in {country.name}
              </h3>
              <span className="text-xs text-slate-500">Progressive tax system</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {country.taxSystemSummary}
          </p>

          {rule?.incomeTaxBrackets && (
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Official Tax Brackets ({taxYear})
              </div>
              <div className="space-y-1.5 text-xs">
                {rule.incomeTaxBrackets.map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-mono text-slate-700">
                      {b.maxThreshold !== undefined
                        ? `${country.currencySymbol}${b.threshold.toLocaleString()} – ${country.currencySymbol}${b.maxThreshold.toLocaleString()}`
                        : `Over ${country.currencySymbol}${b.threshold.toLocaleString()}`}
                    </span>
                    <span className="font-bold text-rose-600 font-mono">
                      {(b.rate * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Social Security Breakdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Social Security in {country.name}
              </h3>
              <span className="text-xs text-slate-500">Pension, healthcare & insurance</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {country.socialSecuritySummary}
          </p>

          {rule?.socialContributions && (
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Statutory Employee Contributions
              </div>
              <div className="space-y-1.5 text-xs">
                {rule.socialContributions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-800">{s.name}</span>
                      {s.cap && (
                        <span className="block text-[10px] text-slate-400">
                          Ceiling: {country.currencySymbol}{s.cap.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-amber-700 font-mono">
                      {(s.employeeRate * 100).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Tax Authority Sources & References */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Data Accuracy & Methodology
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Official Tax Authority Sources for {country.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              All tax formulas, progressive brackets, and social security ceilings are grounded in official documentation published by <strong>{country.officialAuthority.name}</strong>.
            </p>
          </div>

          <a
            href={country.officialAuthority.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors self-start sm:self-auto shrink-0 shadow-xs"
          >
            <span>Visit {country.officialAuthority.portalName}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Country FAQs */}
      {country.faq && country.faq.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Frequently Asked Questions: {country.name} Taxes
          </h3>
          <div className="space-y-4">
            {country.faq.map((item, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {item.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Country Pages */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3">
          Explore Other European Salary Calculators
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {otherCountries.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelectOtherCountry(c);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left group"
            >
              <span className="text-2xl block mb-1.5">{c.flag}</span>
              <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 block truncate">
                {c.name}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {c.currency}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
