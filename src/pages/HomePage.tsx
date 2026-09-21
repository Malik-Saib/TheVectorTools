import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  RefreshCw, 
  FileText,
  Clock,
  Coins,
  ExternalLink
} from 'lucide-react';
import { TOOLS_REGISTRY, getFeaturedTools, getToolsByCategory } from '../data/toolsRegistry';
import { ToolCard } from '../components/ui/ToolCard';
import { ToolCategory, ToolDefinition } from '../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredTools: ToolDefinition[] = useMemo(() => getFeaturedTools(), []);
  
  const filteredTools = useMemo(() => {
    const targetCat = selectedCategory === 'text-tools' ? 'text-file' : selectedCategory;
    let list = targetCat === 'all' ? TOOLS_REGISTRY : getToolsByCategory(targetCat);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const categories: { id: ToolCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Tools', count: TOOLS_REGISTRY.length },
    { id: 'calculators', label: 'Calculators', count: getToolsByCategory('calculators').length },
    { id: 'converters', label: 'Converters', count: getToolsByCategory('converters').length },
    { id: 'text-file', label: 'Text & File Tools', count: getToolsByCategory('text-file').length },
    { id: 'business', label: 'Business Tools', count: getToolsByCategory('business').length }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Brand identity badge with exact emblem, tagline, and link to company website */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-white text-xs font-semibold shadow-xs">
            <img
              src="/thevector-symbol-light.webp"
              alt="The Vector Symbol"
              className="w-4 h-4 object-contain"
            />
            <span className="font-extrabold tracking-tight">The Vector</span>
            <span className="text-[#0057F3] font-bold">—</span>
            <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">
              We Build. We Innovate. We Scale.
            </span>
          </div>

          <a
            href="https://www.thevector.systems"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-[#0057F3] text-xs font-bold transition-all shadow-2xs"
            title="Visit Company Website: www.thevector.systems"
          >
            <span>thevector.systems</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Free • Client-Side Processing • No Login Required</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
          Fast, Reliable Online Tools <br className="hidden sm:inline" />
          for Everyday Work.
        </h1>

        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Clean, ad-light calculators, unit converters, and document utilities engineered for precision. No accounts, no subscriptions, and your data never leaves your device.
        </p>

        {/* Search Bar Trigger */}
        <div className="mt-7 max-w-xl mx-auto">
          <div className="relative flex items-center shadow-xs">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search all ${TOOLS_REGISTRY.length} tools (e.g. salary, VAT, invoice, PDF, currency)...`}
              className="w-full pl-12 pr-28 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
            <button
              onClick={onOpenSearch}
              className="absolute right-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Press ⌘K
            </button>
          </div>
          {searchQuery && (
            <div className="mt-2 text-left text-xs text-slate-500 font-medium">
              Found {filteredTools.length} matching tool{filteredTools.length === 1 ? '' : 's'}
            </div>
          )}
        </div>

        {/* Quick Value Metrics */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Private & In-Browser</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-blue-500" />
            <span>Forever Free</span>
          </div>
        </div>
      </section>

      {/* 2. Featured Tools Section (when not searching) */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Featured Utilities
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Most frequently used calculators & converters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`tools/${slug}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 3. Browse by Category & Full Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              All Tools Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore our modular collection of verified tools
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onSelectTool={(slug) => onNavigate(`tools/${slug}`)}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No tools found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Why The Vector Tools (Trust & Architecture Highlights) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Engineered with Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              Why Users Trust The Vector Tools
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Most utility sites are bloated with intrusive ads, slow trackers, and subscription paywalls. The Vector Tools was built with a modern, lightweight philosophy:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Client-Side Privacy
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your files, documents, and financial numbers are calculated in your browser memory. We never store your inputs.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Zap className="w-4 h-4" />
                  Zero Latency
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instant calculation response with no server lag or buffering. Real-time feedback as you adjust figures.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Formulas
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Transparent mathematical methodologies and official references from central banks and statutory tax bodies.
                </p>
              </div>
            </div>

            {/* The Vector Systems Company Spotlight */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/90 -mx-4 sm:-mx-6 -mb-4 p-5 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center p-1.5 shrink-0 shadow-md">
                  <img src="/thevector-symbol-light.webp" alt="The Vector" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">The Vector Systems</span>
                    <span className="text-[10px] font-bold text-[#3D82FF] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800/60">
                      Parent Company
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Software, AI & Automation Engineering · <span className="text-blue-300 font-semibold">We Build. We Innovate. We Scale.</span>
                  </p>
                </div>
              </div>
              <a
                href="https://www.thevector.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0057F3] hover:bg-[#0046C7] text-white text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <span>Visit thevector.systems</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
