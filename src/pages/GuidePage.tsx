import React, { useState, useEffect } from 'react';
import { GuideArticle } from '../data/guidesRegistry';
import { ToolDefinition } from '../types';
import { getToolBySlug } from '../data/toolsRegistry';
import { ToolCard } from '../components/ui/ToolCard';
import { BookOpen, ChevronDown, ChevronRight, ChevronUp, HelpCircle, Home } from 'lucide-react';

interface GuidePageProps {
  guide: GuideArticle;
  onNavigate: (route: string) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ guide, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    // Dynamic SEO synchronization
    document.title = guide.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', guide.metaDescription);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://thevectortools.online/guides/${guide.slug}`);
  }, [guide]);

  const relatedTools = (guide.relatedToolSlugs || [])
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t))
    .slice(0, 3);

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
          <li className="inline-flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button
              onClick={() => onNavigate('guides')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Guides
            </button>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-900 truncate max-w-[220px] sm:max-w-none" aria-current="page">
              {guide.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2.5">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span>Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {guide.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {guide.intro}
        </p>
      </div>

      {/* 3. Article Sections */}
      <div className="space-y-6 mb-12">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
              {section.heading}
            </h2>
            <div className="space-y-3">
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 4. Frequently Asked Questions */}
      {guide.faq && guide.faq.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {guide.faq.map((item, idx) => {
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

      {/* 5. Related Tools */}
      {relatedTools.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            Try the tools from this guide
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
