import React, { useState } from 'react';
import { Landmark, ArrowRightLeft, Clock, Building2, Globe2, HelpCircle, Menu, X, ShieldCheck } from 'lucide-react';
import { CountryMeta } from '../types';
import { COUNTRIES, getEuropeanCountries } from '../data/countries';

interface HeaderProps {
  currentCountry: CountryMeta;
  onSelectCountry: (country: CountryMeta) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDevGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCountry,
  onSelectCountry,
  activeTab,
  setActiveTab,
  onOpenDevGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const europeanCountries = getEuropeanCountries();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('calculator')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-slate-800 transition-colors">
              <span className="tracking-tighter">€</span>
              <span className="text-white text-xs font-semibold -ml-0.5">S</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  EuroSalary
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                European Take-Home Pay & Tax Calculator
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('calculator')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'calculator' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Salary Calculator
            </button>
            <button
              onClick={() => handleNavClick('countries')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'countries' || activeTab.startsWith('country-')
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Countries
            </button>
            <button
              onClick={() => handleNavClick('compare')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'compare' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
              Compare
            </button>
            <button
              onClick={() => handleNavClick('hourly')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'hourly' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Hourly
            </button>
            <button
              onClick={() => handleNavClick('employer')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'employer' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              Employer Cost
            </button>
            <button
              onClick={() => handleNavClick('bonus')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'bonus' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Bonus Tax
            </button>
          </nav>

          {/* Right Controls: Country Quick-Switch & CTA */}
          <div className="flex items-center gap-2.5">
            {/* Country Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors shadow-2xs"
                title="Switch country"
              >
                <span className="text-base leading-none">{currentCountry.flag}</span>
                <span className="hidden md:inline font-semibold">{currentCountry.name}</span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                  {currentCountry.currency}
                </span>
              </button>

              {countryDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setCountryDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    European Countries
                  </div>
                  {europeanCountries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCountry(c);
                        setCountryDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                        c.id === currentCountry.id ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{c.currencySymbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calculate CTA Button */}
            <button
              onClick={() => handleNavClick('calculator')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 active:scale-98 transition-all shadow-xs"
            >
              Calculate Pay
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('calculator')}
              className={`p-2.5 text-left text-sm font-semibold rounded-lg ${
                activeTab === 'calculator' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Take-Home Calculator
            </button>
            <button
              onClick={() => handleNavClick('compare')}
              className={`p-2.5 text-left text-sm font-semibold rounded-lg ${
                activeTab === 'compare' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Compare Countries
            </button>
            <button
              onClick={() => handleNavClick('hourly')}
              className={`p-2.5 text-left text-sm font-semibold rounded-lg ${
                activeTab === 'hourly' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Hourly to Annual
            </button>
            <button
              onClick={() => handleNavClick('employer')}
              className={`p-2.5 text-left text-sm font-semibold rounded-lg ${
                activeTab === 'employer' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Employer Cost
            </button>
          </div>

          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Country
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {europeanCountries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-md text-xs font-medium text-left ${
                    c.id === currentCountry.id ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button 
              onClick={() => {
                handleNavClick('about');
              }}
              className="hover:underline"
            >
              About & Methodology
            </button>
            <button 
              onClick={() => {
                onOpenDevGuide();
                setMobileMenuOpen(false);
              }}
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Tax Rules Docs
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
