import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

interface SourcesPageProps {
  onNavigate: (route: string) => void;
}

interface SourceEntry {
  title: string;
  category: string;
  agency: string;
  url?: string;
  description: string;
}

const SOURCES: SourceEntry[] = [
  {
    title: 'European Central Bank (ECB) Reference Rates',
    category: 'Currency Rates',
    agency: 'European Central Bank (Frankfurt)',
    url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html',
    description: 'Official Euro foreign exchange reference rates published daily around 16:00 CET.'
  },
  {
    title: 'HMRC Income Tax Rates & Thresholds',
    category: 'Tax & Salary',
    agency: 'HM Revenue & Customs (United Kingdom)',
    url: 'https://www.gov.uk/income-tax-rates',
    description: 'Basic, higher, and additional tax bands and Personal Allowance thresholds for the UK tax year.'
  },
  {
    title: 'Bundesministerium der Finanzen (BMF)',
    category: 'Tax & Salary',
    agency: 'Federal Ministry of Finance (Germany)',
    url: 'https://www.bundesfinanzministerium.de',
    description: 'German income tax tariff (Einkommensteuertarif), solidarity surcharge regulations, and basic tax-free allowance (Grundfreibetrag).'
  },
  {
    title: 'Direction Générale des Finances Publiques (DGFiP)',
    category: 'Tax & Salary',
    agency: 'Ministry of Economy and Finance (France)',
    url: 'https://www.impots.gouv.fr',
    description: 'French progressive income tax brackets (barème progressif de l’impôt sur le revenu) and statutory contributions (CSG/CRDS).'
  },
  {
    title: 'Internal Revenue Service (IRS)',
    category: 'Tax & Salary',
    agency: 'Department of the Treasury (United States)',
    url: 'https://www.irs.gov',
    description: 'Federal income tax brackets, Standard Deduction rates, and payroll tax limits.'
  },
  {
    title: 'National Institute of Standards and Technology (NIST)',
    category: 'Units of Measure',
    agency: 'U.S. Department of Commerce',
    url: 'https://www.nist.gov/pml/weights-and-measures',
    description: 'International System of Units (SI) conversions, physical constants, and metric/customary unit conversion factors.'
  },
  {
    title: 'Bureau International des Poids et Mesures (BIPM)',
    category: 'Units of Measure',
    agency: 'International Committee for Weights and Measures',
    url: 'https://www.bipm.org',
    description: 'The definitive international standards for length, mass, temperature, time, and derived physical quantities.'
  },
  {
    title: 'IANA Time Zone Database (tzdb)',
    category: 'Time & Geography',
    agency: 'Internet Assigned Numbers Authority',
    url: 'https://www.iana.org/time-zones',
    description: 'The global standard repository of historical and current time zone rules, daylight saving transitions, and UTC offsets.'
  }
];

export const SourcesPage: React.FC<SourcesPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Sources & Methodology' }
        ]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Verification</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Official Data Sources & Methodology
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Transparency is central to The Vector Tools. Below are the official statutory authorities, central banks, and standards organizations referenced across our calculation engines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {SOURCES.map((s, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {s.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{s.title}</h3>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">{s.agency}</div>
                </div>

                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-300 transition-colors shrink-0"
                    title="Visit official authority"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
