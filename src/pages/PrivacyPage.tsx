import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Privacy Policy' }
        ]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Privacy First</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-400">Effective Date: January 1, 2026 • Last updated: March 2026</p>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Summary:</strong> We believe utility websites should not spy on their users. The Vector Tools does not require registration, does not save your file uploads on any server, and calculates your personal tax and salary data strictly in your local browser memory.
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. Client-Side Processing Architecture</h2>
          <p>
            Unlike traditional online conversion websites that upload your files to remote cloud servers to process them, our utilities (including <strong>PDF to JPG</strong>, <strong>JPG to PDF</strong>, <strong>Word Counter</strong>, and all <strong>Calculators</strong>) execute strictly using client-side JavaScript APIs (HTML5 Canvas, WebAssembly, and local runtime memory).
          </p>
          <p>
            This means your images, PDF documents, and financial figures <strong>never leave your device</strong>.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">2. Information We Do Not Collect</h2>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>We do not collect names, passwords, or personal credentials (no login required).</li>
            <li>We do not store uploaded documents, images, or extracted text.</li>
            <li>We do not record your salary inputs, mortgage amounts, or private financial calculations.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-2">3. Local Storage</h2>
          <p>
            We may use standard browser <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">localStorage</code> solely to preserve non-sensitive interface preferences, such as your last selected country, currency preference, or theme choice, so you don’t have to re-select them upon returning. You can clear this anytime by clearing your browser cache.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">4. Analytics & Telemetry</h2>
          <p>
            To understand which tools are useful and troubleshoot broken pages, we may collect aggregated, non-personally identifiable telemetry (e.g., page views, error counts, general browser type). We do not correlate this with individual identities or sell analytics data.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">5. GDPR & CCPA Compliance</h2>
          <p>
            Because we do not store personal profiles or file records, we hold zero user-identifiable databases. If you contact us via email, your correspondence is used solely to respond to your specific inquiry.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">6. Contacting Us About Privacy</h2>
          <p>
            If you have questions or security observations, please email us at <strong className="text-slate-900">privacy@thevectortools.online</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
