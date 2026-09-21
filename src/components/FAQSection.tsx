import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is take-home (net) salary calculated across European countries?',
      a: 'Take-home pay equals your agreed gross salary minus two main components: employee social security contributions (such as statutory pension, public health insurance, unemployment fund, long-term nursing care) and progressive personal income tax. In most European systems (Germany, France, Spain, Italy), social contributions are deducted first to determine your taxable base.',
    },
    {
      q: 'Why does the same gross salary result in different net pay in Germany vs UK vs France?',
      a: 'Each European country finances its social safety net and public services differently. For instance, the UK has relatively lower mandatory social insurance (National Insurance) compared to Germany or France, but higher personal allowances. France has substantial social contributions (~20-22%) with family quotient tax systems. Germany splits high social insurance 50/50 between employer and employee.',
    },
    {
      q: 'What is the "tax wedge" in Europe?',
      a: 'The tax wedge measures the total gap between what an employer pays to employ someone (gross salary + employer payroll taxes) and what the employee actually takes home in cash after all employee taxes and contributions. In high-tax countries (like Belgium or Germany), the total tax wedge for an average earner can exceed 40–48%.',
    },
    {
      q: 'What about 13th and 14th-month salaries in Spain, Italy, Austria, and Portugal?',
      a: 'In countries like Spain (pagas extraordinarias), Italy (tredicesima/quattordicesima), Austria (Urlaubsgeld/Weihnachtsgeld), and Portugal (subsídio de férias e de Natal), annual salaries are traditionally paid in 14 instalments rather than 12. Our calculator converts these to true 12-month calendar equivalents so you can easily compare your standard monthly cash flow across borders.',
    },
    {
      q: 'Are bonuses, overtime, and stock grants taxed at the same rate as base salary?',
      a: 'In progressive tax jurisdictions, bonuses and overtime pay are added to your existing income bracket and therefore get taxed at your marginal rate (your highest applicable bracket). As a result, bonuses may feel taxed more heavily than your regular monthly paycheck.',
    },
    {
      q: 'Does EuroSalary store my salary figures or personal information?',
      a: 'No. EuroSalary is completely stateless and client-side. The tax math runs directly in your browser JavaScript engine. We never store, log, or sell your input data, keeping your compensation details 100% private.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Understanding European tax systems, social contributions, and net take-home pay.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 focus:outline-hidden"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
