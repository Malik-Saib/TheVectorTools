import React, { useState, useEffect } from 'react';
import { ToolDefinition } from '../types';
import { Breadcrumbs } from './ui/Breadcrumbs';
import { ToolCard } from './ui/ToolCard';
import { getToolBySlug } from '../data/toolsRegistry';
import { ChevronDown, ChevronUp, HelpCircle, Lightbulb, BookOpen, Calculator, ShieldCheck, Info } from 'lucide-react';

interface ToolPageLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
  onNavigate: (route: string) => void;
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ tool, children, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    // Dynamic SEO synchronization
    const seoTitle = tool.seo?.title || `${tool.name} – THE VECTOR TOOLS`;
    document.title = seoTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', tool.seo?.metaDescription || tool.shortDescription);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://thevectortools.online/#/tools/${tool.slug}`);
  }, [tool]);

  const relatedTools = (tool.relatedToolSlugs || [])
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t))
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', onClick: () => onNavigate('home') },
    { label: tool.categoryLabel, onClick: () => onNavigate(`category/${tool.category}`) },
    { label: tool.name }
  ];

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 2. Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2.5">
          <span>{tool.categoryLabel}</span>
          {tool.badge && (
            <>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{tool.badge}</span>
            </>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {tool.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {tool.longDescription || tool.shortDescription}
        </p>
      </div>

      {/* 3. Interactive Tool Container */}
      <div className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 lg:p-8">
        {children}
      </div>

      {/* Financial disclaimer for calculators */}
      {tool.category === 'calculators' && (
        <div className="mb-10 p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Results are estimates for informational and educational purposes only. Tax laws, interest calculations, and statutory deductions can vary based on individual circumstances and regulatory updates. Always verify final figures with an authorized accountant, certified tax advisor, or lending institution.
          </p>
        </div>
      )}

      {/* 4. Explanatory Content Grid: How to Use, How it Works & Example */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* How to use */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-base">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h3>How to use this tool</h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {tool.howToUse.map((step, idx) => (
              <li key={idx} className="pl-1">
                <span className="text-slate-700 font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* How it works */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-base">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <h3>How it works</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {tool.howItWorks}
          </p>
          {tool.sources && tool.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Official reference: </span>
              {tool.sources.map((src, i) => (
                <span key={i}>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                      {src.name}
                    </a>
                  ) : (
                    src.name
                  )}
                  {i < tool.sources!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Realistic Example */}
        {tool.example && (
          <div className="md:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
              <Calculator className="w-4 h-4 text-blue-600" />
              <h3>Example: {tool.example.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-2">
              <strong className="text-slate-800">Scenario:</strong> {tool.example.scenario}
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 mb-2">
              {tool.example.calculation}
            </div>
            <p className="text-xs text-emerald-800 font-semibold">
              Result: {tool.example.result}
            </p>
          </div>
        )}
      </div>

      {/* 5. Frequently Asked Questions */}
      {tool.faq && tool.faq.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {tool.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Related Tools (You may also like) */}
      {relatedTools.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard
                key={relTool.id}
                tool={relTool}
                onSelectTool={(slug) => onNavigate(`tools/${slug}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
