import React, { useState } from 'react';
import { X, Code2, PlusCircle, Calendar, CheckSquare, Layers, FileCode, ArrowRight } from 'lucide-react';

interface DevAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevAdminModal: React.FC<DevAdminModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'add_country' | 'update_year' | 'architecture'>('add_country');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">Tax System Architecture & Maintenance Guide</h2>
              <p className="text-xs text-slate-400">Step-by-step developer guide for adding countries and updating tax years</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('add_country')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'add_country'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            How to Add a New Country
          </button>
          <button
            onClick={() => setActiveTab('update_year')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'update_year'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            How to Update a Tax Year
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'architecture'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Engine File Structure
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed font-sans">
          {activeTab === 'add_country' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  15-Minute Checklist to Add Any Country
                </h3>
                <p className="text-slate-600">
                  The data-driven design allows adding any country without altering the UI or calculator engine.
                </p>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-[11px]">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">Step 1:</span>
                  <span>Create rule file in <code>src/data/countries/rules/[countryId].ts</code> exporting <code>TaxYearRule</code> for 2026 & 2025.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">Step 2:</span>
                  <span>Define <code>incomeTaxBrackets: TaxBracket[]</code> with progressive rates and thresholds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">Step 3:</span>
                  <span>Define <code>socialContributions: SocialContributionRule[]</code> with statutory caps and employee/employer percentages.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">Step 4:</span>
                  <span>Register country metadata in <code>src/data/countries/index.ts</code> in the <code>COUNTRIES</code> array.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">Step 5:</span>
                  <span>Verify with <code>npm run build</code> or <code>tsc --noEmit</code>. The new country immediately appears in dropdowns, directory, and URL routes!</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                <strong>Standardized Schema Guarantee:</strong> Every country conforms to the strict TypeScript interface <code>CountryMeta</code> and <code>TaxYearRule</code>, ensuring total consistency across formatting, charts, and comparison tools.
              </div>
            </div>
          )}

          {activeTab === 'update_year' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  How to Roll Out a New Tax Year (e.g. 2027)
                </h3>
                <p className="text-slate-600">
                  When new budgets are voted by parliaments, follow this simple procedure:
                </p>
              </div>

              <ol className="list-decimal pl-5 space-y-2 text-slate-600">
                <li>
                  Open the target country rule file (e.g. <code>src/data/countries/rules/germany.ts</code>).
                </li>
                <li>
                  Duplicate the latest rule object (e.g. <code>germany2026Rule</code>) to <code>germany2027Rule</code>.
                </li>
                <li>
                  Adjust updated Grundfreibetrag, Beitragsbemessungsgrenze caps, or healthcare percentage rates.
                </li>
                <li>
                  In <code>src/data/countries/index.ts</code>, add <code>2027</code> to the country's <code>supportedYears: [2027, 2026, 2025]</code>.
                </li>
                <li>
                  The calculator's year dropdown and benchmarking tables will automatically detect and compute the new year!
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Modular Architecture Structure
              </h3>
              <div className="font-mono text-[11px] bg-slate-900 text-slate-200 p-4 rounded-xl space-y-1">
                <div>📁 src/</div>
                <div className="pl-4">📁 data/countries/</div>
                <div className="pl-8 text-emerald-400">📄 index.ts (Country registry & single source of truth)</div>
                <div className="pl-8 text-emerald-400">📁 rules/ (germany.ts, uk.ts, france.ts, etc.)</div>
                <div className="pl-4">📁 engine/</div>
                <div className="pl-8 text-amber-300">📄 calculator.ts (Pure math calculation engine)</div>
                <div className="pl-8 text-amber-300">📄 currency.ts (Currency formatting & benchmark FX)</div>
                <div className="pl-8 text-amber-300">📄 analytics.ts (Privacy-conscious anonymous event telemetry)</div>
                <div className="pl-4">📁 components/</div>
                <div className="pl-8 text-blue-300">📄 SalaryCalculator.tsx (Main interactive Hero calculator)</div>
                <div className="pl-8 text-blue-300">📄 ResultDisplay.tsx (Take-home visual breakdown & percentages)</div>
                <div className="pl-8 text-blue-300">📄 CountryGuide.tsx (SEO rich country pages)</div>
                <div className="pl-8 text-blue-300">📄 ComparisonCalculator.tsx (Side-by-side European compare)</div>
                <div className="pl-8 text-blue-300">📄 HourlyCalculator.tsx (Hourly to Annual converter)</div>
                <div className="pl-8 text-blue-300">📄 EmployerCostCalculator.tsx (Payroll tax overhead)</div>
                <div className="pl-8 text-blue-300">📄 BonusTaxCalculator.tsx (Marginal bonus tax rate)</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">EuroSalary Tax Engine Specification v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
