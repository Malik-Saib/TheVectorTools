import React from 'react';
import { CountryMeta } from '../types';
import { getEuropeanCountries } from '../data/countries';
import { ShieldCheck, ArrowUpRight, Heart, Code2 } from 'lucide-react';

interface FooterProps {
  onSelectCountry: (country: CountryMeta) => void;
  onSelectTab: (tab: string) => void;
  onOpenDevGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCountry,
  onSelectTab,
  onOpenDevGuide,
}) => {
  const europeanCountries = getEuropeanCountries();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-lg">
                €
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                EuroSalary
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Free, fast, client-side European salary and tax calculator. Estimate your true take-home pay, progressive income tax brackets, and social security contributions across Europe for 2026 and 2025.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>100% Client-Side Engine • Private & Stateless</span>
            </div>
          </div>

          {/* Quick Calculators */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Calculators</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('calculator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Take-Home Salary Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('compare');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  European Salary Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('hourly');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Hourly to Annual Wage
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('employer');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Total Employer Payroll Cost
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('bonus');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Bonus & Pay Raise Tax
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Countries Column 1 */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Top Western Europe</h4>
            <ul className="space-y-2">
              {europeanCountries.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCountry(c);
                      onSelectTab(`country-${c.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name} Tax Calculator</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Countries Column 2 */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Northern & Southern EU</h4>
            <ul className="space-y-2">
              {europeanCountries.slice(5, 10).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCountry(c);
                      onSelectTab(`country-${c.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name} Tax Calculator</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1.5">
          <div className="font-bold text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Informational & Educational Disclaimer</span>
          </div>
          <p>
            EuroSalary is an independent calculation tool designed for informational, educational, and financial planning purposes only. While our tax algorithms and social security thresholds are diligently updated in accordance with published guidelines from European ministries of finance, individual payroll amounts may vary depending on municipal rates, church taxes, sector collective bargaining agreements, family allowances, and specific tax deductions. Nothing on this website constitutes legal, certified tax, or accounting advice. Always consult a certified tax advisor or your local tax administration for official payroll filings.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} EuroSalary. All rights reserved. Built for European workers and expats.
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenDevGuide} 
              className="hover:text-emerald-400 flex items-center gap-1 font-semibold text-slate-400"
            >
              <Code2 className="w-3.5 h-3.5" />
              Tax Rules API & Docs
            </button>
            <span>•</span>
            <button 
              onClick={() => {
                onSelectTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-300"
            >
              Methodology
            </button>
            <span>•</span>
            <span>Privacy-First (No Cookie Wall)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
