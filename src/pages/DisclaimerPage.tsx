import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface DisclaimerPageProps {
  onNavigate: (route: string) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Financial & Calculation Disclaimer' }
        ]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Notice</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Disclaimer
          </h1>
          <p className="mt-2 text-xs text-slate-400">Last updated: 2026</p>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Important Notice:</strong> The calculations, currency conversions, loan schedules, tax models, and salary breakdowns provided across The Vector Tools are for <strong>informational and educational purposes only</strong>. They do not constitute certified tax advice, financial counseling, legal counsel, or lending commitments.
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. Salary & Tax Estimates</h2>
          <p>
            Taxation frameworks are inherently complex and change frequently. While our European and global tax calculators incorporate progressive brackets, social contribution ceilings, and basic allowances according to published statutes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-xs sm:text-sm">
            <li>Individual exemptions, church taxes, health insurance surcharges, private pension contributions, and municipal surtaxes vary by locality.</li>
            <li>Actual net pay is determined by your employer&apos;s payroll department and official tax statements.</li>
            <li>Always verify final figures with a certified tax advisor, chartered accountant, or relevant revenue authority before making career, relocation, or legal commitments.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-2">2. Mortgages & Loan Calculations</h2>
          <p>
            Loan and mortgage payment results assume fixed compounding and standardized payment schedules. Actual bank financing depends on underwriting approval, credit scoring, escrow requirements, private mortgage insurance (PMI), title fees, and origination charges.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">3. Currency & Exchange Rates</h2>
          <p>
            Currency exchange rates displayed on the platform are benchmark indicators derived from public central bank releases. Retail foreign exchange providers, credit card issuers, and wire transfer services typically add administrative fees and markup spreads.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">4. Technical & File Operations</h2>
          <p>
            Our document utilities (PDF to JPG, JPG to PDF) process files locally. While built for reliability, you should always retain backup copies of critical documents. We accept no liability for data loss or formatting variations resulting from browser memory limits.
          </p>
        </div>
      </div>
    </div>
  );
};
