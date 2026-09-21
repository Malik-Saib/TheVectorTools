import React from 'react';
import { Shield, Sparkles, CheckCircle2, ExternalLink, Globe } from 'lucide-react';
import { TheVectorLogo } from '../ui/TheVectorLogo';
import { TOOLS_REGISTRY, getToolsByCategory } from '../../data/toolsRegistry';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Company Column */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <TheVectorLogo
                theme="dark"
                showTagline={true}
                showCompanyLink={false}
                onNavigateHome={() => onNavigate('home')}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Free online utilities platform built by <a href="https://www.thevector.systems" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-semibold">The Vector</a>. Fast, accurate, and privacy-conscious calculators, converters, and file tools.
            </p>

            {/* Link to company personal website */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Parent Company
              </div>
              <a
                href="https://www.thevector.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-xs font-bold text-white hover:text-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#0057F3]" />
                  <span>thevector.systems</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
              </a>
              <p className="text-[11px] text-slate-400 mt-1">
                Software, AI & Automation Engineering
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Client-Side Processing</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Tool Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('category/calculators')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Financial & Math Calculators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category/converters')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Unit & Currency Converters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category/text-file')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Text & File Utilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category/business')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Business Tools & Excel ({getToolsByCategory('business').length})
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                >
                  All Tools Directory ({TOOLS_REGISTRY.length}) →
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('tools/salary-calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Salary & Take-Home Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools/percentage-calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Percentage Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools/pdf-to-jpg')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  PDF to JPG Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools/mortgage-calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mortgage & Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools/currency-converter')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Currency & Unit Converter
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Platform & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About The Vector Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Data Sources & Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy (No File Tracking)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Financial & Mathematical Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Tool Suggestions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">THE VECTOR TOOLS</span> (thevectortools.online) · Engineered by <a href="https://www.thevector.systems" target="_blank" rel="noopener noreferrer" className="text-[#0057F3] hover:text-blue-300 font-bold underline">The Vector (www.thevector.systems)</a>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <a href="https://www.thevector.systems" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              The Vector Systems ↗
            </a>
            <span>•</span>
            <span>Client-Side Processing</span>
            <span>•</span>
            <span>100% Free Utilities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
