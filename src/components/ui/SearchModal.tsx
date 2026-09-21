import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchTools } from '../../data/toolsRegistry';
import { ToolDefinition } from '../../types';
import { ToolIcon } from './ToolIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ToolDefinition[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(searchTools(''));
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(searchTools(query));
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools... (e.g. salary, percentage, pdf, currency, loan)"
            className="w-full bg-transparent px-3 py-1.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-200/70 hover:bg-slate-200 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Quick suggestions:</span>
            {['Salary', 'Percentage', 'PDF to JPG', 'Loan', 'Unit Converter', 'Word Counter'].map((p) => (
              <button
                key={p}
                onClick={() => setQuery(p)}
                className="text-xs px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto flex-1 p-2 sm:p-3 divide-y divide-slate-100">
          {results.length > 0 ? (
            results.map((tool) => (
              <div
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool.slug);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                    <ToolIcon name={tool.iconName} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 group-hover:text-emerald-700">
                        {tool.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {tool.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</p>
                  </div>
                </div>

                <span className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-slate-500">
              <p className="text-sm font-medium">No tools found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for generic terms like "tax", "converter", "text", or "file".</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Found {results.length} tools</span>
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Select to open tool
          </span>
        </div>
      </div>
    </div>
  );
};
