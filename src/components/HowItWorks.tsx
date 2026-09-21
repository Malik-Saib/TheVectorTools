import React from 'react';
import { FileInput, Cpu, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md">
            Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            How EuroSalary Calculates Your Pay
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Simple input, fast calculation, clear result. We evaluate progressive tax tiers and statutory contributions without sending your data to any server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs relative">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Select Country & Frequency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enter your annual, monthly, or hourly gross wage. The engine normalizes your salary to statutory tax periods based on local collective labor norms.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Social Security & Bracket Deduction
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Deductions are computed: social insurance contributions (pension, healthcare, unemployment) with statutory caps, followed by progressive progressive tax brackets.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs relative">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Clear Take-Home Result
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Get your estimated net salary per month and year, total effective tax rate, percentage visualization, and full line-by-line itemization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
