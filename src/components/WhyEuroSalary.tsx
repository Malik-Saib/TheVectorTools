import React from 'react';
import { ShieldCheck, Zap, Layers, RefreshCw, Smartphone, EyeOff } from 'lucide-react';

export const WhyEuroSalary: React.FC = () => {
  const features = [
    {
      icon: <EyeOff className="w-5 h-5 text-emerald-600" />,
      title: '100% Client-Side Privacy',
      description: 'Your salary is private. Calculations happen entirely in your browser without saving, tracking, or transmitting your personal earnings data to any remote server.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      title: 'Instant & Frictionless',
      description: 'Zero registration barriers, zero emails required, and no 15-field questionnaires. Get your accurate take-home figure in under 5 seconds.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
      title: 'Up-to-Date 2026 Tax Rules',
      description: 'Configured with official 2026/2025 tax bracket thresholds, updated social contribution ceilings, and statutory allowances from official finance ministries.',
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-600" />,
      title: 'Transparent Breakdown',
      description: 'See every euro accounted for: progressive income tax brackets, healthcare, pension, unemployment, and employer payroll overhead.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-indigo-600" />,
      title: 'Fast Mobile Experience',
      description: 'Designed mobile-first with high contrast, tactile keypads, and instant responsiveness on any smartphone or tablet.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: 'Official Authority Sources',
      description: 'Every calculation references published documentation from official tax authorities (BMF, HMRC, DGFiP, Belastingdienst, AEAT, Agenzia Entrate, etc.).',
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Professionals & Expats Use EuroSalary
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Built to provide the cleanest, fastest, and most transparent salary estimation experience across the European Union and EEA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-2xs">
                {f.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
