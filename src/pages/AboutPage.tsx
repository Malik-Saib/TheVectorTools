import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ShieldCheck, Zap, HeartHandshake, Award, Cpu, Globe, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'About Us' }
        ]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Our Mission</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            About The Vector Tools
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            The Vector Tools (<strong>thevectortools.online</strong>) was built to fix a broken corner of the internet: online utility websites cluttered with deceptive download buttons, pop-ups, slow loading times, and aggressive trackers.
          </p>
        </div>

        {/* Company Card */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center p-2 shrink-0 shadow-md">
                <img src="/thevector-symbol-light.webp" alt="The Vector" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-lg">The Vector</span>
                  <span className="text-[10px] font-bold text-[#3D82FF] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 border border-blue-800/80">
                    Parent Company
                  </span>
                </div>
                <div className="text-xs text-blue-400 font-extrabold tracking-wider uppercase mt-0.5">
                  — We Build. We Innovate. We Scale. —
                </div>
              </div>
            </div>
            <a
              href="https://www.thevector.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0057F3] hover:bg-[#0046C7] text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <span>Visit www.thevector.systems</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
            The Vector Byte (Private) Limited is a premier software engineering firm architecting custom software, web and mobile applications, AI agents, and workflow automation for businesses worldwide. The Vector Tools is our public utility initiative providing zero-friction, privacy-first tools to the global community.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">What We Believe</h2>
          <p>
            Every day, millions of accountants, developers, freelancers, students, and professionals need to perform straightforward tasks: calculating net pay after tax, converting units, figuring out a mortgage, or turning images into a PDF.
          </p>
          <p>
            These tasks should take seconds. You shouldn’t need to create an account, enter a credit card, or risk your privacy by uploading confidential documents to remote third-party servers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side Privacy</span>
              </div>
              <p className="text-xs text-slate-600">
                Whenever technically possible, all conversions and calculations execute directly in your browser. Your PDFs and numbers stay on your machine.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Sub-Second Performance</span>
              </div>
              <p className="text-xs text-slate-600">
                Lightweight code with zero bloated frameworks, so pages load instantly even on modest mobile networks.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Verified Formula Precision</span>
              </div>
              <p className="text-xs text-slate-600">
                All statutory tax rates and benchmark calculations are documented against official government and central banking references.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <HeartHandshake className="w-4 h-4 text-purple-600" />
                <span>Free & Accessible</span>
              </div>
              <p className="text-xs text-slate-600">
                Accessible to everyone with WCAG compliance, clear contrast, keyboard navigability, and responsive layouts.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 pt-4">Continuous Improvement</h2>
          <p>
            The Vector Tools is continuously updated with the latest annual tax adjustments, unit constants, and helpful new utilities. Have an idea for a tool that would simplify your workflow? Reach out via our contact page.
          </p>
        </div>
      </div>
    </div>
  );
};
