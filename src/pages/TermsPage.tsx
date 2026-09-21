import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

interface TermsPageProps {
  onNavigate: (route: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Terms of Service' }
        ]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Legal Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-slate-400">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>The Vector Tools</strong> (thevectortools.online), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">2. Description of Service</h2>
          <p>
            The Vector Tools provides free, web-based digital utilities including mathematical calculators, tax estimators, measurement converters, and client-side document utilities. All services are provided &quot;as is&quot; and &quot;as available&quot;.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">3. Permitted & Acceptable Use</h2>
          <p>
            You may use our tools for personal, academic, or commercial calculation purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-xs sm:text-sm">
            <li>Engage in automated scraping or denial-of-service attempts that degrade service for other users.</li>
            <li>Attempt to reverse-engineer proprietary delivery assets or bypass platform limits.</li>
            <li>Use the website for any unlawful purpose.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-2">4. Disclaimer of Warranties</h2>
          <p>
            While we strive for extreme mathematical precision and keep regulatory datasets updated, we provide no warranty or guarantee regarding the completeness, accuracy, or suitability of results for any specific legal or financial filing.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">5. Limitation of Liability</h2>
          <p>
            In no event shall The Vector Tools, its creators, or contributors be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the tools.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the website following modifications constitutes acceptance of updated terms.
          </p>
        </div>
      </div>
    </div>
  );
};
