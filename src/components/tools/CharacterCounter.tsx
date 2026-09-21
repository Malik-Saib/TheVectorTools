import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Trash2, Hash } from 'lucide-react';

export const CharacterCounter: React.FC = () => {
  const [text, setText] = useState<string>('The Vector Tools provides 100% free, fast, privacy-first online utilities.');
  const [copied, setCopied] = useState(false);

  const totalChars = text.length;
  const noSpaceChars = text.replace(/\s/g, '').length;
  const spaces = totalChars - noSpaceChars;
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const lines = text.length === 0 ? 0 : text.split('\n').length;

  // Social limits
  const platforms = [
    { name: 'X / Twitter Post', limit: 280 },
    { name: 'SMS Single Segment', limit: 160 },
    { name: 'Instagram Caption', limit: 2200 },
    { name: 'LinkedIn Post', limit: 3000 }
  ];

  // Case transforms
  const transformUpper = () => setText(text.toUpperCase());
  const transformLower = () => setText(text.toLowerCase());
  const transformTitle = () => {
    setText(
      text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )
    );
  };
  const transformSentence = () => {
    setText(
      text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 bg-slate-900 text-white rounded-xl col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Total Characters</span>
          <div className="text-2xl sm:text-3xl font-black mt-0.5">{totalChars.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Without Spaces</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{noSpaceChars.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Whitespace</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{spaces.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Words</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{words.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Lines</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{lines.toLocaleString()}</div>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text to count characters..."
          className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm sm:text-base text-slate-900 leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-y"
        />
        {text.length > 0 && (
          <button
            onClick={() => setText('')}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer shadow-2xs"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Format Action Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Case Tools:</span>
        <button
          onClick={transformUpper}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
        >
          UPPERCASE
        </button>
        <button
          onClick={transformLower}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
        >
          lowercase
        </button>
        <button
          onClick={transformTitle}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
        >
          Title Case
        </button>
        <button
          onClick={transformSentence}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
        >
          Sentence case
        </button>
      </div>

      {/* Social Media Character Limit Gauges */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Social Media & Message Length Benchmarks:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {platforms.map((p) => {
            const remaining = p.limit - totalChars;
            const percentUsed = Math.min(100, (totalChars / p.limit) * 100);
            const isOver = remaining < 0;

            return (
              <div key={p.name} className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">{p.name}</span>
                  <span className={`font-mono font-bold ${isOver ? 'text-rose-600' : 'text-slate-600'}`}>
                    {totalChars} / {p.limit} ({isOver ? `${Math.abs(remaining)} over` : `${remaining} left`})
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${
                      isOver ? 'bg-rose-500' : percentUsed > 90 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${percentUsed}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={() => setText('')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleCopy}
          disabled={!text}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
        </button>
      </div>
    </div>
  );
};
