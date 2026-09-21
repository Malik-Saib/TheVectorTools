import React from 'react';
import { ShieldCheck, BookOpen, Layers, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface AboutMethodologyProps {
  onBackToCalculator: () => void;
  onOpenDevGuide: () => void;
}

export const AboutMethodology: React.FC<AboutMethodologyProps> = ({
  onBackToCalculator,
  onOpenDevGuide,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button onClick={onBackToCalculator} className="hover:text-slate-900">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">About & Calculation Methodology</span>
      </nav>

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          Transparency & Sources
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
          EuroSalary Calculation Methodology
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
          How we calculate take-home pay, progressive tax brackets, and social insurance deductions across 16+ European jurisdictions for tax years 2026 and 2025.
        </p>
      </div>

      {/* Principle 1: The Core Formula */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>The Core Gross-to-Net Formulation</span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          In European payroll accounting, net salary is calculated sequentially according to local statutory law:
        </p>

        <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs sm:text-sm space-y-1.5 overflow-x-auto">
          <div>1. Annual Gross = Base Salary + Bonuses + Contractual Stipends</div>
          <div>2. Social Contributions = ∑ (Applicable Gross Base × Statutory Employee Insurance Rate)</div>
          <div>3. Taxable Income = Annual Gross - Deductible Social Contributions - Standard Allowances</div>
          <div>4. Gross Income Tax = Progressive Bracket Calculation(Taxable Income)</div>
          <div>5. Net Income Tax = Gross Income Tax - Applicable Non-Refundable Tax Credits</div>
          <div className="text-white font-bold pt-1 border-t border-slate-800">
            6. Take-Home Net = Annual Gross - Social Contributions - Net Income Tax
          </div>
        </div>
      </div>

      {/* Principle 2: Statutory Authorities */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Official Government Data Sources
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          We do not guess tax rules. All tax brackets, contribution caps (Beitragsbemessungsgrenzen, Plafonds de la sécurité sociale, Top contribution limits), and personal allowances are compiled directly from the published gazettes of European tax administrations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {COUNTRIES.filter((c) => !['us', 'ca', 'au', 'nz'].includes(c.id)).map((c) => (
            <a
              key={c.id}
              href={c.officialAuthority.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-500 transition-colors flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.flag}</span>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-700">{c.name}</div>
                  <div className="text-slate-400 text-[11px]">{c.officialAuthority.name}</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700" />
            </a>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 rounded-2xl text-white">
        <div>
          <h3 className="font-bold text-base">Ready to calculate your salary?</h3>
          <p className="text-xs text-slate-300">Select any country and get an instant take-home estimate.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDevGuide}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
          >
            Developer Architecture
          </button>
          <button
            onClick={onBackToCalculator}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Go to Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
