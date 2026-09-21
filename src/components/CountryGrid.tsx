import React from 'react';
import { ArrowRight, Globe2 } from 'lucide-react';
import { CountryMeta } from '../types';
import { COUNTRIES } from '../data/countries';
import { formatCurrency } from '../engine/currency';

interface CountryGridProps {
  onSelectCountry: (country: CountryMeta) => void;
  onSelectTab?: (tab: string) => void;
}

export const CountryGrid: React.FC<CountryGridProps> = ({ onSelectCountry, onSelectTab }) => {
  const europeanCountries = COUNTRIES.filter(
    (c) => !['us', 'ca', 'au', 'nz'].includes(c.id)
  );

  return (
    <section className="py-12 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              <Globe2 className="w-3.5 h-3.5" />
              European Coverage
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Supported European Tax Calculators
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select any country to calculate local take-home pay, progressive tax brackets, and social insurance.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {europeanCountries.length} European Countries Supported (2026/2025)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {europeanCountries.map((c) => {
            const rule = c.rulesByYear[2026] || Object.values(c.rulesByYear)[0];
            const maxBracket = rule?.incomeTaxBrackets
              ? Math.max(...rule.incomeTaxBrackets.map((b) => b.rate)) * 100
              : 0;

            return (
              <div
                key={c.id}
                onClick={() => {
                  onSelectCountry(c);
                  if (onSelectTab) onSelectTab(`country-${c.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl leading-none">{c.flag}</span>
                    <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {c.currency}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {c.name}
                  </h3>

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <span>Avg Gross:</span>
                      <span className="font-mono text-slate-700 font-medium">
                        {formatCurrency(c.averageSalary, c.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Top Tax Rate:</span>
                      <span className="font-mono text-slate-700 font-medium">
                        {maxBracket.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Calculate Pay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
