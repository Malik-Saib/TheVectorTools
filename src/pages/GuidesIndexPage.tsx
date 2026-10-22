import React, { useEffect } from 'react';
import { GUIDES } from '../data/guidesRegistry';
import { ArrowRight, BookOpen } from 'lucide-react';

interface GuidesIndexPageProps {
  onNavigate: (route: string) => void;
}

export const GuidesIndexPage: React.FC<GuidesIndexPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Guides & Tutorials – THE VECTOR TOOLS';
  }, []);

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2.5">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span>Learn</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Guides & Tutorials
        </h1>
        <div className="mt-3 space-y-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          <p>
            Every tool on this site answers a question in seconds — what is my take-home pay, what does this PDF look like as an image. But a fast answer is only useful if you understand what sits behind it. A net salary figure means little if you do not know why German payslips deduct church tax, or which tax class you are in. A converted image is only useful if you picked the right resolution for the printer it is heading to.
          </p>
          <p>
            That is what these guides are for. Each one takes a topic and explains it: the concepts first, then a worked example with numbers you can check, then the mistakes people often make. They are written to be read before you use a tool — or after, when a result surprises you and you want to know whether the tool or your assumption is wrong. We keep them concrete, state our assumptions openly, and label every estimate as an estimate, because tax rules, prices and file formats all change over time. New guides are added as we publish tools that need more explanation than a page can hold. Start with the topic matching the task in front of you; every guide ends with links to the tools it discusses, so you can put the explanation to work immediately.
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GUIDES.map((guide) => (
          <div
            key={guide.slug}
            className="group flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {guide.metaDescription}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100">
              <button
                onClick={() => onNavigate(`guides/${guide.slug}`)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
