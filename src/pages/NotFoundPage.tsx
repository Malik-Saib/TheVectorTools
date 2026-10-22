import React, { useEffect } from 'react';
import { TOOLS_REGISTRY } from '../data/toolsRegistry';
import { ToolCard } from '../components/ui/ToolCard';
import { Compass, BookOpen } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

/**
 * A real 404 page: explains that the address did not match any tool,
 * guide or information page, and routes the visitor to working content
 * instead of silently rendering the homepage (a soft-404).
 */
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Page Not Found – THE VECTOR TOOLS';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'The page you requested could not be found on The Vector Tools. Browse our free calculators, converters, text and file tools, or read our guides instead.'
      );
    }
  }, []);

  const popularTools = TOOLS_REGISTRY.filter((t) => t.popular).slice(0, 6);

  return (
    <div className="py-10 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs mb-10">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-3">
          <Compass className="w-4 h-4" />
          <span>Error 404</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          This page does not exist
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
          The address you opened does not match any tool, guide or information page on The Vector
          Tools. The link may be outdated, the address may have been typed with a small mistake, or
          the tool may have been renamed when our URLs were cleaned up in 2026. Nothing is broken on
          your side, and no data was sent anywhere by opening this page.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          The fastest way forward is to pick what you were looking for below: browse the full tools
          directory, jump into one of the four tool categories, or read one of our guides, which
          explain the formulas and concepts behind the most popular calculators and converters.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('tools')}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Browse all tools
          </button>
          <button
            onClick={() => onNavigate('guides')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Read the guides
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Go to homepage
          </button>
        </div>
      </div>

      {popularTools.length > 0 && (
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            Popular tools you may have been looking for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`tools/${slug}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
