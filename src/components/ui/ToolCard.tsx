import React from 'react';
import { ToolDefinition } from '../../types';
import { ToolIcon } from './ToolIcon';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: ToolDefinition;
  onSelectTool: (slug: string) => void;
  className?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelectTool, className = '' }) => {
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'calculators':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          iconBg: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
          borderHover: 'hover:border-emerald-300',
          cta: 'group-hover:text-emerald-700'
        };
      case 'converters':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          iconBg: 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
          borderHover: 'hover:border-blue-300',
          cta: 'group-hover:text-blue-700'
        };
      case 'text-file':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          iconBg: 'bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white',
          borderHover: 'hover:border-amber-300',
          cta: 'group-hover:text-amber-700'
        };
      case 'business':
        return {
          badge: 'bg-violet-50 text-violet-700 border-violet-200',
          iconBg: 'bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white',
          borderHover: 'hover:border-violet-300',
          cta: 'group-hover:text-violet-700'
        };
      default:
        return {
          badge: 'bg-slate-50 text-slate-700 border-slate-200',
          iconBg: 'bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white',
          borderHover: 'hover:border-slate-300',
          cta: 'group-hover:text-slate-700'
        };
    }
  };

  const theme = getCategoryTheme(tool.category);

  return (
    <div
      onClick={() => onSelectTool(tool.slug)}
      className={`group relative flex min-h-[240px] flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer ${theme.borderHover} ${className}`}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${theme.iconBg}`}>
            <ToolIcon name={tool.iconName} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {tool.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white tracking-[0.08em] uppercase">
                {tool.badge}
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${theme.badge}`}>
              {tool.categoryLabel}
            </span>
          </div>
        </div>

        <h3 className="min-h-[48px] text-base sm:text-lg font-bold text-slate-900 transition-colors tracking-tight">
          {tool.name}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className={`mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 ${theme.cta}`}>
        <span>Use Tool</span>
        <span className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-current" />
        </span>
      </div>
    </div>
  );
};
